import ContactSection from "@/sections/ContactSection"
import CTASection from "@/sections/CTASection"
import FeaturesSection from "@/sections/FeaturesSection"
import HeroSection from "@/sections/HeroSection"
import PricingSection from "@/sections/PricingSection"
import TestimonialSection from "@/sections/TestimonialSection"


function page() {
  return (
    <>
            <HeroSection />
            <FeaturesSection />
            <TestimonialSection />
            <PricingSection />
            <ContactSection />
            <CTASection />
    </>
  )
}

export default page
