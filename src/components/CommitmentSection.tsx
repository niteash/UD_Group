import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const commitment = {
  eyebrow: "01 / Site Overview",
  paragraphs: [
    "Mandalay is the economic centre of Upper Burma and considered the centre of Burmese culture. Mandalay City consists of the following townships: Pyigyidagun, Chanmyathazi, Mahaaungmyay, Chanayethazan (city centre), Aungmyethazan. Amarapura constitutes the North border of the site as well as a buffer township with Mandalay city.",
    "The site is located in Amarapura township which is known today for Burmese traditional handcrafts. The site is also strategically located between Taung Tha Man lake, a tourist attractive place and Pyigyitagon township, industrial zone of Mandalay. According to Yangon-Mandalay highway road in front of the site, any transports can be easily accessible to the site.",
    "Site is located at 35 km from Mandalay International Airport. Site is well connected to existing road network and important touristic destinations. Mandalay continue to grow in the vision of Modernity and International connections.",
  ],
  division: {
    org: "MANDALAY PROJECT",
    team: "Site Location & Urban Context",
  },
  heading: "MANDALAY",
  subheading: "PROJECT",
  thumbSrc:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
};

export function CommitmentSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".commit-reveal", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".commit-image", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".commit-image-container",
          start: "top 80%",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden flex items-center bg-[#f8f8f8] dark:bg-[#050505] transition-colors duration-500"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="site-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#site-grid)"
            className="text-black dark:text-white"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Visuals & Title */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <div>
              <p className="commit-reveal font-mono text-neutral-500 dark:text-[#B89851] text-[10px] md:text-xs tracking-[0.2em] uppercase mb-8">
                {commitment.eyebrow}
              </p>
              <h2 className="commit-reveal font-serif text-[4rem] md:text-[6rem] lg:text-[7rem] leading-[0.85] tracking-tight">
                <span className="block text-neutral-400 dark:text-neutral-500 italic font-light">
                  {commitment.subheading}
                </span>
                <span className="block text-neutral-900 dark:text-white">
                  {commitment.heading}
                </span>
              </h2>
            </div>

            <div className="commit-image-container relative w-full aspect-[4/3] rounded-sm overflow-hidden group">
              <img
                src={commitment.thumbSrc}
                alt="Site Overview"
                className="commit-image w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-1000" />

              {/* Site Marker */}
              <div className="absolute bottom-6 left-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/20">
                  <div className="w-2 h-2 rounded-full bg-[#B89851] shadow-[0_0_10px_#B89851] animate-pulse" />
                </div>
                <div className="text-xs font-mono tracking-widest text-white/90">
                  SITE_LOC_01
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-5 lg:pt-32 flex flex-col gap-12">
            <div className="commit-reveal flex flex-col gap-3">
              <div className="inline-block border border-neutral-300 dark:border-[#B89851]/30 px-5 py-2.5 w-fit bg-white/50 dark:bg-white/5 backdrop-blur-sm shadow-sm">
                <span className="font-sans font-medium text-neutral-900 dark:text-[#B89851] text-[10px] md:text-xs uppercase tracking-[0.2em]">
                  {commitment.division.org}
                </span>
              </div>
              <p className="text-neutral-500 dark:text-[#B89851]/60 text-[10px] uppercase tracking-[0.1em] ml-1">
                {commitment.division.team}
              </p>
            </div>

            <div className="space-y-6">
              {commitment.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="commit-reveal text-neutral-600 dark:text-neutral-300 text-sm md:text-base font-light leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="commit-reveal pt-8 border-t border-neutral-200 dark:border-white/10 flex gap-12">
              <div>
                <div className="text-4xl font-serif text-neutral-900 dark:text-white mb-2">
                  35
                  <span className="text-xl text-neutral-400 dark:text-neutral-500">
                    km
                  </span>
                </div>
                <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                  From Airport
                </div>
              </div>
              <div>
                <div className="text-4xl font-serif text-neutral-900 dark:text-white mb-2">
                  04
                </div>
                <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                  Townships
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
