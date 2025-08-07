import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { CasesSection } from "@/components/sections/cases";
import { ContactsSection } from "@/components/sections/contacts";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark text-white font-inter">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CasesSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}
