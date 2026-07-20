import Hero from '@/sections/Hero';
import Introduction from '@/sections/Introduction';
import FeaturedProjects from '@/sections/FeaturedProjects';
import ServicesPreview from '@/sections/ServicesPreview';
import Philosophy from '@/sections/Philosophy';
import Testimonials from '@/sections/Testimonials';
import Process from '@/sections/Process';
import Awards from '@/sections/Awards';
import InstagramGallery from '@/sections/InstagramGallery';
import ContactCTA from '@/sections/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <FeaturedProjects />
      <ServicesPreview />
      <Philosophy />
      <Testimonials />
      <Process />
      <Awards />
      <InstagramGallery />
      <ContactCTA />
    </>
  );
}
