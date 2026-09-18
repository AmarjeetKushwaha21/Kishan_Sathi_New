import Navbar from '@/components/layout/Navbar';
import LandingFooter from '@/components/landing/LandingFooter';
import HeroSection from '@/components/landing/HeroSection';
import RoleSelection from '@/components/landing/RoleSelection';
import CoreSolutions from '@/components/landing/CoreSolutions';
import HowItWorks from '@/components/landing/HowItWorks';
import ImpactStats from '@/components/landing/ImpactStats';
import AboutSection from '@/components/landing/AboutSection';
import ContactCollaborateSection from '@/components/landing/ContactCollaborateSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FinalCTA from '@/components/landing/FinalCTA';

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
      {/* 1. Header with Language Selector & Role Buttons */}
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Farmer + Company/Buyer Role Selection */}
        <RoleSelection />

        {/* 4. Our Core Solutions */}
        <CoreSolutions />

        {/* 5. How Kishan Sathi Works */}
        <HowItWorks />

        {/* 6. Impact / Demo Statistics */}
        <ImpactStats />

        {/* 7. About Us */}
        <AboutSection />

        {/* 8. Contact + Collaborate With Us */}
        <ContactCollaborateSection />

        {/* 9. Reviews / Testimonials */}
        <TestimonialsSection />

        {/* 10. Final CTA Banner */}
        <FinalCTA />
      </main>

      {/* 11. Complete Professional Footer */}
      <LandingFooter />
    </div>
  );
}