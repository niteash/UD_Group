import { useState, useEffect, lazy, Suspense } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Preloader } from "./components/Preloader";
import { Cursor } from "./components/Cursor";
import { DeferredWebglBackground } from "./components/DeferredWebglBackground";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CommitmentSection } from "./components/CommitmentSection";
import { ScrollVideoReveal } from "./components/ScrollVideoReveal";
import { BusinessCards } from "./components/BusinessCards";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { AnimatePresence, motion } from "motion/react";
import { LanguageProvider } from "./lib/LanguageContext";
import { SEOHead } from "./components/SEOHead";

gsap.registerPlugin(ScrollTrigger);

// Lazy load heavy components for better initial load performance
const Strengths = lazy(() => import("./components/Strengths").then(m => ({ default: m.Strengths })));
const TeamRecruitment = lazy(() => import("./components/TeamRecruitment").then(m => ({ default: m.TeamRecruitment })));
const AboutUs = lazy(() => import("./components/AboutUs").then(m => ({ default: m.AboutUs })));
const Chatbot = lazy(() => import("./components/Chatbot").then(m => ({ default: m.Chatbot })));

export default function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis and scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);

    // Defer Lenis initialization to avoid blocking initial render
    const initLenis = () => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      // @ts-ignore
      window.appLenis = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      function update(time: number) {
        lenis.raf(time * 1000);
      }

      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(update);
        lenis.destroy();
        // @ts-ignore
        delete window.appLenis;
      };
    };

    // Initialize after preloader completes
    let cleanup: (() => void) | undefined;
    if (!loading) {
      cleanup = initLenis();
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, [loading]);

  return (
    <LanguageProvider>
      <SEOHead />
      <div className="relative min-h-screen bg-transparent selection:bg-neutral-900/10 selection:text-neutral-900 text-[#1A1A1A] font-sans">
        <Cursor />

        {/* Deferred WebGL background to improve LCP */}
        <DeferredWebglBackground />

        <AnimatePresence mode="wait">
          {loading ? (
            <Preloader key="preloader" onComplete={() => setLoading(false)} />
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Navbar />
              <main>
                <Hero />
                <CommitmentSection />
                <ScrollVideoReveal />
                <BusinessCards />
                
                {/* Lazy load heavy 3D components */}
                <Suspense fallback={<div className="min-h-screen bg-white dark:bg-ink-deep" />}>
                  <Strengths />
                  <TeamRecruitment />
                  <AboutUs />
                </Suspense>
              </main>

              <Footer />
              <BackToTop />
              
              {/* Lazy load chatbot */}
              <Suspense fallback={null}>
                <Chatbot />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LanguageProvider>
  );
}
