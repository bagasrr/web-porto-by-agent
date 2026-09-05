import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function HeroSection() {
  const profile = await prisma.profile.findFirst();

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Profile Image */}
        <div className="w-64 h-64 md:w-80 lg:w-96 md:h-80 relative brutal-border brutal-shadow-lg bg-accent-red overflow-hidden">
          <Image src="/images/profile.jpg" alt={profile?.fullName || "Profile"} fill className="object-cover" priority />
        </div>

        {/* Hero Text */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-space-mono)] leading-tight">{profile?.heroTitle || "I Build Things For The Web."}</h1>
          <div className="mt-6">
            <p className="text-2xl md:text-3xl font-bold">{profile?.fullName || "Bagas  Ramadhan Rusnadi"}</p>
            <p className="mt-2 text-lg md:text-xl brutal-btn bg-accent-yellow inline-block px-4 py-2 font-bold">{profile?.title || "Software Engineer"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
