import HeroCollage from "@/components/home/HeroCollage";
import ExperienceList from "@/components/home/ExperienceList";
import Testimonials from "@/components/home/Testimonials";
import CreativeGallery from "@/components/home/CreativeGallery";
import PageTransition from "@/components/shared/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main className="flex flex-col items-center">
        {/* Hero with scroll-driven collage */}
        <HeroCollage />

        {/* Experience section with hover cards */}
        <ExperienceList />

        {/* Testimonials */}
        <Testimonials />

        {/* Creative gallery */}
        <CreativeGallery />
      </main>
    </PageTransition>
  );
}
