import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FaWhatsapp, FaLinkedin, FaDownload } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default async function Navbar() {
  const profile = await prisma.profile.findFirst();

  return (
    <nav className="sticky top-0 z-50 bg-accent-yellow text-[#111] border-b-4 border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold font-[family-name:var(--font-space-mono)] tracking-tight">
          {"<BRR />"}
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          {profile?.whatsapp && (
            <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer" className="brutal-btn bg-accent-green px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-bold flex items-center gap-2" title="WhatsApp">
              <FaWhatsapp className="text-lg" />
              <span className="hidden sm:inline-block">WhatsApp</span>
            </a>
          )}
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="brutal-btn bg-card-bg text-foreground px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-bold flex items-center gap-2" title="Email">
              <MdEmail className="text-lg" />
              <span className="hidden sm:inline-block">Email</span>
            </a>
          )}
          {profile?.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="brutal-btn bg-accent-blue text-white px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-bold flex items-center gap-2" title="LinkedIn">
              <FaLinkedin className="text-lg" />
              <span className="hidden sm:inline-block">LinkedIn</span>
            </a>
          )}
          <a href="/cv.pdf" className="brutal-btn bg-accent-red text-white px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-bold flex items-center gap-2" title="Download CV" target="_blank" rel="noopener noreferrer">
            <FaDownload className="text-lg" />
            <span className="hidden sm:inline-block">CV</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
