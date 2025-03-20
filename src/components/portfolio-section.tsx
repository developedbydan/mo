import React from "react";
import { ScrollVelocity } from "./ui/scroll-velocity";
import Card from "./card";

const cards = [
  {
    id: 1,
    src: "videos/video1.webm",
  },
  {
    id: 2,
    src: "videos/video2.webm",
  },
  {
    id: 3,
    src: "videos/video3.webm",
  },
  {
    id: 4,
    src: "videos/video4.webm",
  },
  {
    id: 5,
    src: "videos/video5.webm",
  },
];

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="min-h-dvh w-full flex flex-col items-center relative"
    >
      <div className="h-dvh w-full flex flex-col items-center pt-32 overflow-hidden relative">
        <div className="block md:hidden ">
          <h2 className="text-white text-4xl font-bold">My Projects</h2>
        </div>
        <div className="hidden md:block">
          <ScrollVelocity
            texts={["My Projects", "Scroll Down"]}
            velocity={100}
            className="custom-scroll-text"
          />
        </div>
      </div>

      <div className="w-full -mt-[500px] 2xl:-mt-60 3xl:-mt-96">
        {cards.map((card, i) => (
          <Card
            key={card.id}
            i={i}
            src={card.src}
            range={[i * 0.25, (i + 0.5) * 0.25]}
            targetScale={0.95}
            progress={0}
          />
        ))}
      </div>
    </section>
  );
}
