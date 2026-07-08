import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThreeStarsBackground } from "./ThreeStarsBackground";
import { useLanguage } from "../lib/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export function ScrollVideoReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
        });

        gsap.fromTo(
          ".reveal-header",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 20%",
              end: "top -10%",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          ".reveal-item",
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 10%",
              end: "top -40%",
              scrub: true,
            },
          },
        );
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          ".reveal-header",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          ".reveal-item",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "center center",
              scrub: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-500 flex items-center justify-center py-20 lg:py-0"
    >
      <ThreeStarsBackground />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,rgba(245,245,245,0.9)_100%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4)_0%,rgba(5,5,5,0.9)_100%)] pointer-events-none z-0 transition-colors duration-500" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center h-full pt-12">
        <div className="reveal-header text-center mb-16 md:mb-24">
          <p className="font-mono text-[#B89851] text-[10px] md:text-sm uppercase tracking-[0.4em] mb-6">
            {t("scroll.eyebrow")}
          </p>
          <h2 className="font-serif font-light text-neutral-900 dark:text-white text-[3rem] md:text-[5rem] lg:text-[6rem] leading-[1.1] tracking-tight drop-shadow-2xl transition-colors duration-500">
            {t("scroll.heading")
              .split(" ")
              .map((word, i) => (
                <span
                  key={i}
                  className={i % 2 === 1 ? "italic text-[#B89851]" : ""}
                >
                  {word}{" "}
                </span>
              ))}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num, i) => {
            const item = t(`scroll.item${num}`);
            const [title, ...rest] = item.split(":");
            return (
              <div
                key={i}
                className="reveal-item group relative p-6 md:p-8 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-md hover:bg-black/[0.05] dark:hover:bg-white/[0.05] hover:border-[#B89851]/30 dark:hover:border-[#B89851]/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B89851]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="mb-4 text-[#B89851] opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-mono text-[10px] uppercase tracking-widest">
                    0{i + 1}
                  </span>
                </div>

                <div>
                  {rest.length > 0 ? (
                    <>
                      <h3 className="font-serif text-neutral-900/90 dark:text-white/90 text-lg md:text-xl mb-2 tracking-wide group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300">
                        {title}
                      </h3>
                      <p className="text-neutral-600 dark:text-white/50 text-xs md:text-sm font-light leading-relaxed group-hover:text-neutral-900/80 dark:group-hover:text-white/70 transition-colors duration-300">
                        {rest.join(":").trim()}
                      </p>
                    </>
                  ) : (
                    <h3 className="font-serif text-neutral-900/90 dark:text-white/90 text-lg md:text-xl group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300">
                      {title}
                    </h3>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
