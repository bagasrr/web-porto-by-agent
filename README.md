# Web Compro AI - Smart Portfolio Builder

A modern, brutalist-style personal portfolio builder powered by Next.js 15, Prisma, PostgreSQL, and AI. This project acts as both your public portfolio and an administrative dashboard to manage your experiences, projects, and tech stacks.

## Features

- **Brutalist Design**: Unique, bold, and high-contrast UI using Tailwind CSS.
- **Admin Dashboard**: Secure `/admin` dashboard protected by JWT authentication to manage your data.
- **CV Auto-Extraction**: Upload your PDF CV, and the system will instantly extract your Name, Email, Phone, and LinkedIn.
- **Universal AI Integration (OpenAI Standard)**: Connect ANY AI model (Gemini, OpenAI, Groq, DeepSeek) to automatically parse unstructured Work Experience from your CV into neat, structured database records!
- **Auto-Sync Tech Stack**: Whenever you type a new tech stack (e.g., "React, Node.js") into a project or experience, it automatically saves it to your database and pulls the corresponding logo from an open-source icon library.
- **Infinite Marquee**: Displays your configured tech stack icons in a sleek, infinite scroll animation below the hero section.

## Universal AI Setup

To enable intelligent Work Experience extraction from CV uploads, you just need an API key from any major AI provider. The project uses the universal OpenAI API standard format.

In your `.env` file, configure these variables:

### For Gemini (Default)
```env
AI_API_KEY="your-gemini-api-key"
AI_BASE_URL="https://generativelanguage.googleapis.com/v1beta/openai/"
AI_MODEL="gemini-flash"
```

### For OpenAI (GPT)
```env
AI_API_KEY="sk-your-openai-key"
AI_BASE_URL="https://api.openai.com/v1"
AI_MODEL="gpt-4o-mini"
```

### For Groq
```env
AI_API_KEY="gsk_your_groq_key"
AI_BASE_URL="https://api.groq.com/openai/v1"
AI_MODEL="llama-3.1-8b-instant"
```

*If the AI API fails or is not configured, the app will gracefully fall back to basic Regex extraction (Email, Phone, Name) without crashing.*

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set up your PostgreSQL `DATABASE_URL` and `JWT_SECRET`.

3. Push the Prisma schema to your database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) for the public portfolio.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to manage your content.

## Deployment

This app is fully compatible with Vercel. Don't forget to provision a PostgreSQL database (like Neon or Supabase) and add all your `.env` variables to your Vercel project settings!
