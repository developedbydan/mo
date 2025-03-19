import { HeroHeader } from "@/components/hero-header";
import { TextEffect } from "@/components/ui/text-effect";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  return (
    <section id="home">
      <HeroHeader />
      <main className="overflow-hidden">
        <section>
          <div>
            <video
              src="/videos/background.mp4"
              autoPlay
              muted
              loop
              className="-z-20 w-full h-dvh object-cover"
            />
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 h-dvh flex justify-center pt-86 md:pt-30 2xl:pt-48 3xl:pt-72">
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h1"
              className=" text-amber-400 font-semibold text-balance text-7xl md:text-7xl lg:mt-16 xl:text-[7.25rem]"
            >
              "portfolio"
            </TextEffect>
          </div>
        </section>
      </main>
    </section>
  );
}
