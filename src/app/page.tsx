import CircularGallery from "@/components/gallery";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="h-dvh relative">
        <CircularGallery bend={3} borderRadius={0.05} />
      </div>
    </div>
  );
}
