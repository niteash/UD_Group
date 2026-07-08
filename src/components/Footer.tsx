import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const navLinks = [
    { key: "nav.company", href: "#company" },
    { key: "nav.business", href: "#business" },
    { key: "nav.strengths", href: "#strengths" },
    { key: "nav.recruitment", href: "#recruitment" },
    { key: "nav.news", href: "#news" },
    { key: "nav.contact", href: "#contact" },
  ];

  return (
    <>
      <footer className="relative w-full bg-white px-2 pb-2 md:px-4 md:pb-4 pt-10">
        <div className="relative w-full rounded-[2rem] overflow-hidden min-h-[500px] md:min-h-[600px] flex flex-col justify-between pt-16 md:pt-24 bg-[#a3b19b]">
          {/* Background Image */}
          <img
            src="https://res.cloudinary.com/dcdc4hj6v/image/upload/v1783497587/mm2_uvvsly.jpg"
            alt="Landscape"
            className="absolute inset-0 w-full h-full object-cover z-0 object-top"
          />

          {/* Top Section */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 mt-8 md:mt-12 mb-20 md:mb-32">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans text-white font-medium max-w-4xl tracking-tight leading-snug mb-6">
              Ready to Build the Future <br className="hidden md:block" />
              with UD{" "}
              <span className="inline-block align-middle w-12 h-6 md:w-24 md:h-12 mx-1 md:mx-2 rounded-full overflow-hidden border border-white/20 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop"
                  className="w-full h-full object-cover"
                  alt="Building"
                />
              </span>{" "}
              Group?
            </h2>
            <p className="text-white/90 max-w-xl text-xs md:text-sm font-light mb-8">
              Elevating standards and crafting the future of modern business,
              engineering, and lifestyle development in Myanmar and beyond.
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="flex items-center gap-3 pl-6 pr-2 py-2 bg-white/95 backdrop-blur-md text-black rounded-full font-medium text-sm hover:bg-white transition-colors cursor-pointer group shadow-xl"
            >
              <span>Contact Us</span>
              <div className="bg-black text-white rounded-full p-2 flex items-center justify-center">
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>

          {/* Bottom Glassmorphism Section */}
          <div className="relative z-10 w-full bg-white/20 backdrop-blur-[24px] border-t border-white/20 pt-8 md:pt-10 px-4 md:px-12 lg:px-16 pb-4 md:pb-6 rounded-b-[2rem]">
            {/* Copyright Row */}
            <div className="flex flex-col md:flex-row justify-between items-center text-white/90 text-xs md:text-sm font-light mb-8 md:mb-12 gap-2 md:gap-4">
              <span>© Copyright {currentYear}</span>
              <div className="hidden md:block flex-1 mx-8 h-[1px] bg-white/30"></div>
              <span>All Rights Reserved</span>
            </div>

            {/* Links Row */}
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-x-4 gap-y-3 md:gap-6 text-white text-xs md:text-sm font-medium mb-8 md:mb-16">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="hover:text-black transition-colors whitespace-nowrap"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>

            {/* Huge Text */}
            <div className="w-full flex justify-center items-end overflow-hidden pt-4 pb-2">
              <h1 className="text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] font-sans font-bold text-white tracking-tighter leading-none select-none whitespace-nowrap">
                UD Group
              </h1>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#121212] rounded-2xl p-6 md:p-8 w-full max-w-md relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              Contact Us
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
              Send us a message and we'll get back to you.
            </p>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setIsContactModalOpen(false);
              }}
            >
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#10b981]/50 focus:border-[#10b981]"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Mobile
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#10b981]/50 focus:border-[#10b981]"
                  placeholder="Your Phone Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#10b981]/50 focus:border-[#10b981]"
                  placeholder="Your Email Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Query
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#10b981]/50 focus:border-[#10b981] resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#10b981] hover:bg-[#0ea5e9] text-white rounded-lg font-medium transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
