import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Save to public directory
    const filename = 'cv.pdf'
    const filepath = path.join(process.cwd(), 'public', filename)
    await writeFile(filepath, buffer)
    
    // Try to parse PDF using pdf2json
    let extractedData = null
    try {
      const PDFParser = (await import('pdf2json')).default;
      
      const text = await new Promise<string>((resolve, reject) => {
        const pdfParser = new PDFParser(null, true);
        pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError));
        pdfParser.on("pdfParser_dataReady", () => {
          resolve(pdfParser.getRawTextContent());
        });
        pdfParser.parseBuffer(buffer);
      });

      const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
      const phoneMatch = text.match(/(\+?\d[\d -]{8,15}\d)/);
      const linkedinMatch = text.match(/(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/i);

      const lines = text.split('\n').map(t => t.replace(/\r/g, '').trim()).filter(t => t.length > 0);
      const possibleNames = lines.filter(t => /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*){1,3}$/.test(t) && t !== t.toUpperCase());

      // Universal AI Extraction (OpenAI API standard format supported by OpenAI, Gemini, Groq, DeepSeek, etc.)
      const aiApiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;
      let aiBaseUrl = process.env.AI_BASE_URL || 'https://api.openai.com/v1';
      if (aiBaseUrl.endsWith('/')) aiBaseUrl = aiBaseUrl.slice(0, -1);
      const aiModel = process.env.AI_MODEL || 'gpt-4o-mini';

      let extractedExperiences = [];
      let extractedProjects = [];
      let aiName = null;
      let aiEmail = null;
      let aiPhone = null;
      let aiLinkedin = null;
      let aiTitle = null;
      let aiHeroText = null;
      let aiDescription = null;

      if (aiApiKey) {
        try {
          const isGeminiNative = aiBaseUrl.includes('generativelanguage.googleapis.com') && !aiBaseUrl.includes('openai');
          
          const prompt = `Extract all relevant professional data from the following CV text.
Return a valid JSON object with these exact keys:
"name": string (the person's full name, null if not found)
"email": string (null if not found)
"phone": string (null if not found)
"linkedin": string (linkedin profile URL, null if not found)
"title": string (a professional job title based on the CV, e.g., "Software Engineer")
"heroText": string (a short, catchy hero headline for a portfolio website, e.g., "Building scalable web solutions.")
"description": string (a 2-3 sentence professional bio summarizing their experience)
"experiences": array of objects with keys: "company", "role", "startDate", "endDate" (empty string if present/current), "summary" (short 1 sentence string), "description", "techStack" (array of strings)
"projects": array of objects with keys: "title", "description", "techStack" (array of strings)

Only return the raw JSON object, no markdown blocks, no other text.
CV Text:\n${text}`;

          let apiUrl = `${aiBaseUrl}/chat/completions`;
          let fetchOptions: RequestInit = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${aiApiKey}`
            },
            body: JSON.stringify({
              model: aiModel,
              messages: [{ role: 'user', content: prompt }]
            })
          };

          // Fallback to Native Gemini API if the user provides a raw Gemini URL
          if (isGeminiNative || aiModel.includes('gemini')) {
             apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${aiModel.replace('models/', '')}:generateContent?key=${aiApiKey}`;
             fetchOptions = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                 contents: [{ parts: [{ text: prompt }] }]
               })
             };
          }

          const response = await fetch(apiUrl, fetchOptions);

          if (response.ok) {
            const result = await response.json();
            let aiText = '';
            
            if (isGeminiNative || aiModel.includes('gemini')) {
              aiText = result.candidates[0].content.parts[0].text;
            } else {
              aiText = result.choices[0].message.content;
            }
            
            // Clean up possible markdown wrappers
            if (aiText.startsWith('```json')) aiText = aiText.substring(7);
            if (aiText.startsWith('```')) aiText = aiText.substring(3);
            if (aiText.endsWith('```')) aiText = aiText.substring(0, aiText.length - 3);
            
            const parsed = JSON.parse(aiText.trim());
            console.log("=== AI Extracted Data ===");
            console.log("Raw Text:", aiText);
            console.log("Parsed keys:", Object.keys(parsed));
            
            extractedExperiences = parsed.experiences || [];
            extractedProjects = parsed.projects || [];
            aiName = parsed.name || null;
            aiEmail = parsed.email || null;
            aiPhone = parsed.phone || null;
            aiLinkedin = parsed.linkedin || null;
            aiTitle = parsed.title || null;
            aiHeroText = parsed.heroText || null;
            aiDescription = parsed.description || null;
          } else {
            console.error(`AI API Error (${response.status}):`, await response.text());
          }
        } catch (e) {
          console.error('AI extraction failed:', e);
        }
      }

      extractedData = {
        email: aiEmail || emailMatch ? (aiEmail || emailMatch![1]) : null,
        phone: aiPhone || phoneMatch ? (aiPhone || phoneMatch![1].trim()) : null,
        linkedin: aiLinkedin || linkedinMatch ? (aiLinkedin || `https://${linkedinMatch![1]}`) : null,
        guessedName: aiName || (possibleNames.length > 0 ? possibleNames[0] : null),
        title: aiTitle,
        heroTitle: aiHeroText,
        description: aiDescription,
        experiences: extractedExperiences,
        projects: extractedProjects
      }
    } catch (e) {
      console.error('PDF parse error:', e)
    }

    return NextResponse.json({ success: true, url: `/${filename}`, extractedData })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}

