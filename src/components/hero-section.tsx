import { HeroHeader } from "@/components/hero-header";
import { TextEffect } from "@/components/ui/text-effect";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="home" className="overflow-x-hidden">
      <HeroHeader />
      <main className="overflow-hidden">
        <section>
          <div className="hidden xl:block">
            <video
              src="/videos/background.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="-z-20 w-full h-dvh object-cover"
            />
          </div>
          <div className="xl:hidden w-full h-dvh">
            <Image
              src="/background.webp"
              alt="Hero Image"
              className="w-full h-dvh object-cover"
              width={2000}
              height={2000}
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
