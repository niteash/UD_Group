import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { LogoSVG } from "./Logo";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0a] text-neutral-400 border-t border-white/5 pt-24 pb-8 overflow-hidden z-20">
      {/* Background Glow / Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#B89851]/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-32 bg-[#B89851]/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Top Call to Action */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-16 mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
              Building the Future.
            </h2>
            <p className="font-mono text-sm tracking-widest uppercase text-[#B89851]">
              Together with UD Group
            </p>
          </div>
          <button className="group flex items-center gap-4 px-8 py-4 bg-white text-black font-mono text-sm tracking-widest uppercase font-bold hover:bg-[#B89851] hover:text-white transition-all duration-300 rounded-full cursor-pointer">
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand & Social */}
          <div className="flex flex-col items-start lg:col-span-3">
            <div className="text-white mb-6">
              <LogoSVG className="w-16 h-auto text-white" />
            </div>
            <p className="text-sm font-light leading-relaxed mb-8 max-w-xs text-neutral-400">
              Elevating standards and crafting the future of modern business and
              lifestyle in Myanmar and beyond.
            </p>
            <div className="flex gap-4">
              {[FaTwitter, FaLinkedin, FaInstagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#B89851] hover:bg-[#B89851]/10 transition-all transform hover:-translate-y-1 duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-white mb-6">
              Navigation
            </h3>
            <ul className="space-y-4">
              {[
                "About Us",
                "Our Projects",
                "Leadership",
                "Careers",
                "News & Media",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm font-light hover:text-[#B89851] transition-colors relative group inline-block"
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B89851] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-white mb-6">
              Contact
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-3 group cursor-pointer">
                <MapPin className="w-5 h-5 text-[#B89851] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-light leading-relaxed group-hover:text-white transition-colors">
                  No. 123, UD Tower, <br />
                  Mandalay, Myanmar
                </span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <Phone className="w-5 h-5 text-[#B89851] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-light group-hover:text-white transition-colors">
                  +95 2 123 4567
                </span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <Mail className="w-5 h-5 text-[#B89851] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-light group-hover:text-white transition-colors">
                  info@udgroup.com
                </span>
              </li>
            </ul>
          </div>

          {/* Query Form */}
          <div className="lg:col-span-4">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-white mb-6">
              Send a Query
            </h3>
            <p className="text-sm font-light mb-4 text-neutral-400">
              Have questions? We'd love to hear from you.
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Full Name"
                required
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#B89851] focus:ring-1 focus:ring-[#B89851] focus:bg-white/10 transition-all duration-300"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#B89851] focus:ring-1 focus:ring-[#B89851] focus:bg-white/10 transition-all duration-300"
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#B89851] focus:ring-1 focus:ring-[#B89851] focus:bg-white/10 transition-all duration-300"
                />
              </div>
              <textarea
                placeholder="Your Query..."
                rows={3}
                required
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#B89851] focus:ring-1 focus:ring-[#B89851] focus:bg-white/10 transition-all duration-300 resize-none"
              ></textarea>
              <button className="bg-[#B89851] text-black font-mono text-xs font-bold uppercase tracking-widest px-4 py-3 mt-1 rounded-lg hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(184,152,81,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                Submit Query
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
            © {currentYear} UD GROUP. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 hover:text-[#B89851] uppercase transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 hover:text-[#B89851] uppercase transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
