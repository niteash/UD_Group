import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThreeStarsBackground } from "./ThreeStarsBackground";

gsap.registerPlugin(ScrollTrigger);

export const scrollReveal = {
  eyebrow: "SITE LOCATION",
  heading: "INTEGRATED SPACES",
  bodyItems: [
    "Prime Location: Conveniently situated with easy access to essential services.",
    "Sustainable Design: Energy-efficient buildings, green rooftops, and eco-friendly features.",
    "Luxury Living: High-end residences with modern amenities.",
    "Investment Potential: Strong growth prospects in Mandalay’s booming real estate market.",
    "High return on investment (ROI) potential.",
    "Exclusive early-bird offers for investors.",
    "A well-planned, future-proof community development.",
    "Partnerships: Open for collaborations with developers, realtors, and financial institutions.",
  ],
};

export function ScrollVideoReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
      });

      gsap.fromTo(
        ".reveal-caption",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            end: "top -30%",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        ".reveal-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            end: "top -30%",
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#050505] transition-colors duration-500 flex items-center justify-center"
    >
      <ThreeStarsBackground />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none z-0" />

      <div className="reveal-caption relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        <div className="flex-1 text-left w-full">
          <div className="inline-block border border-[#B89851]/30 px-4 py-1.5 backdrop-blur-sm bg-black/20 mb-8 rounded-full">
            <p className="font-mono text-[#B89851] text-[10px] md:text-xs uppercase tracking-[0.3em]">
              {scrollReveal.eyebrow}
            </p>
          </div>
          <h2 className="font-serif font-light text-white text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] leading-[1] tracking-tight mb-8 drop-shadow-lg">
            {scrollReveal.heading.split(" ").map((word, i) => (
              <span
                key={i}
                className={i % 2 === 1 ? "italic text-[#B89851]" : "block"}
              >
                {word}{" "}
              </span>
            ))}
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-[#B89851] to-transparent mb-8" />
        </div>

        <div className="flex-1 w-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <ul className="space-y-8 text-white/60 text-sm md:text-base font-light leading-relaxed pl-8 md:pl-12">
            {scrollReveal.bodyItems.map((item, i) => {
              const [title, ...rest] = item.split(":");
              return (
                <li
                  key={i}
                  className="reveal-item flex items-start gap-6 group"
                >
                  <span className="text-[#B89851] mt-1.5 text-[10px] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    ◇
                  </span>
                  <div>
                    {rest.length > 0 ? (
                      <>
                        <span className="font-medium text-white/90 tracking-wide block mb-1">
                          {title}
                        </span>
                        <span className="block text-white/50 leading-relaxed">
                          {rest.join(":").trim()}
                        </span>
                      </>
                    ) : (
                      <span className="text-white/70">{title}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
