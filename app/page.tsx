import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AboutSection from "@/components/sections/AboutSection";
import Hero from "@/components/sections/Hero";
import ProductCategories from "@/components/sections/ProductCategories";
import WhyChooseSection from "@/components/sections/WhyChooseSection";

export default function HomePage() {
  return (
    <main className="theme-shell">
      <Navbar />
      <Hero />
      <AboutSection />
      <WhyChooseSection />
      <ProductCategories />
      {/* <IndustriesSection /> */}
      {/* <CtaSection /> */}
      <Footer />
    </main>
  );
}
