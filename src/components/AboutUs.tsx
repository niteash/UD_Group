import { useEffect, useState } from "react";
import { LiquidTransitionImage } from "./LiquidTransitionImage";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { useLanguage } from "../lib/LanguageContext";

const images = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop",
];

export function AboutUs() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const links = [
    {
      title: t("about.links.0.title"),
      subtitle: t("about.links.0.subtitle"),
    },
    {
      title: t("about.links.1.title"),
      subtitle: t("about.links.1.subtitle"),
    },
    {
      title: t("about.links.2.title"),
      subtitle: t("about.links.2.subtitle"),
    },
    {
      title: t("about.links.3.title"),
      subtitle: t("about.links.3.subtitle"),
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col lg:flex-row bg-[#F8F9FA] dark:bg-ink-deep transition-colors duration-500"
    >
      {/* Left Image Carousel */}
      <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto overflow-hidden bg-neutral-200 dark:bg-ink">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === currentImageIndex ? 1 : 0 }}
          />
        ))}
        <CanvasErrorBoundary fallback={null}>
          <LiquidTransitionImage
            images={images}
            currentIndex={currentImageIndex}
            className="absolute inset-0 w-full h-full"
          />
        </CanvasErrorBoundary>
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30 pointer-events-none transition-colors duration-500" />
      </div>

      {/* Right Information Section */}
      <div className="w-full lg:w-1/2 flex items-center p-6 md:p-12 lg:p-20 overflow-y-auto">
        <div className="w-full max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-400 dark:text-gold/60 mb-10 tracking-wide font-sans transition-colors duration-500">
            {t("about.title")}
          </h2>

          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-gold mb-6 leading-tight font-sans transition-colors duration-500">
            {t("about.h3")}
          </h3>

          <p className="text-neutral-800 dark:text-neutral-300 font-medium leading-relaxed mb-12 text-sm md:text-base transition-colors duration-500 whitespace-pre-line">
            {t("about.desc")}
          </p>

          {/* Bordered Container */}
          <div className="flex flex-col border border-black dark:border-gold/30 rounded-sm overflow-hidden bg-transparent transition-colors duration-500">
            {links.map((link, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-6 md:p-8 border-b border-black dark:border-gold/30 hover:bg-black/5 dark:hover:bg-gold/10 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-bold text-neutral-900 dark:text-gold mb-1 transition-colors duration-500">
                    {link.subtitle}
                  </span>
                  <div className="flex items-center text-neutral-500 dark:text-gold/70 font-mono text-sm tracking-widest transition-colors duration-500">
                    <span className="w-8 h-[1px] bg-neutral-400 dark:bg-gold/50 mr-3 transition-colors duration-500" />
                    {link.title}
                  </div>
                </div>
              </div>
            ))}

            {/* Split Companies Section */}
            <div className="flex flex-col md:flex-row">
              {/* UD */}
              <div className="group w-full md:w-1/2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-black dark:border-gold/30 hover:bg-black/5 dark:hover:bg-gold/10 transition-colors flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-gold mb-1 transition-colors duration-500">
                    {t("about.ud.title")}
                  </h4>
                  <div className="flex items-center text-neutral-500 dark:text-gold/70 font-mono text-xs md:text-sm tracking-widest mb-6 transition-colors duration-500">
                    <span className="w-6 h-[1px] bg-neutral-400 dark:bg-gold/50 mr-2 transition-colors duration-500 shrink-0" />
                    <span>
                      {t("about.ud.desc1")}
                      <br />
                      {t("about.ud.desc2")}
                      <br />
                      {t("about.ud.desc3")}
                    </span>
                  </div>
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-sm mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop"
                      alt="CKI Business"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* fTk */}
              <div className="group w-full md:w-1/2 p-6 md:p-8 hover:bg-black/5 dark:hover:bg-gold/10 transition-colors flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-gold mb-1 transition-colors duration-500">
                    {t("about.amara.title")}
                  </h4>
                  <div className="flex items-center text-neutral-500 dark:text-gold/70 font-mono text-md md:text-sm tracking-widest mb-6 transition-colors duration-500">
                    <span className="w-6 h-[1px] bg-neutral-400 dark:bg-gold/50 mr-2 transition-colors duration-500 shrink-0" />
                    <span>{t("about.amara.desc")}</span>
                  </div>

                  <div className="w-full aspect-[4/3] overflow-hidden rounded-sm mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop"
                      alt="fTk Manufacturing"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
