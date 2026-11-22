import Navbar from '@/components/Navbar';
import ScrollCanvas from '@/components/ScrollCanvas';
import ProjectsSection from '@/components/ProjectsSection';
import GallerySection from '@/components/GallerySection';
import SpecsSection from '@/components/SpecsSection';
import InquirySection from '@/components/InquirySection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative bg-background text-neutral-100 min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Canvas Smooth Scroll Animation (300 Frames) */}
      <ScrollCanvas />

      {/* Editorial Narrative Transition */}
      <section className="relative z-10 py-16 sm:py-28 px-4 sm:px-8 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-accent uppercase">
            ARCHITECTURAL PHILOSOPHY
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-neutral-100 tracking-tight leading-[1.2]">
            Where monumental raw masonry yields to boundless horizon light.
          </h2>
          <p className="text-xs sm:text-base text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Verve Residences stands as an uncompromising exploration of monolithic concrete, dark volcanic basalt, and panoramic structural glazing. Conceived for collectors who perceive residential space as enduring high art.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Materiality & Engineering Specs */}
      <SpecsSection />

      {/* Private Acquisition Inquiries */}
      <InquirySection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
