import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { LiquidImage } from "./LiquidImage";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { MagneticButton } from "./MagneticButton";

const businessAreas = {
  eyebrow: "03 / Capabilities",
  heading: "BUSINESS AREAS",
  cards: [
    {
      index: "01",
      title: "Car Production",
      body: "Creating sustainable urban environments and premium commercial spaces that redefine city skylines.",
      image:
        "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782360652/lightTruck1_keu9ml.webp",
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=2067&auto=format&fit=crop",
      ],
      href: "#",
    },
    {
      index: "02",
      title: "Custom Generator Assembly & Sale",
      body: "Building robust transportation networks and public facilities that connect communities.",
      image:
        "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782360846/generator_hryyau.jpg",
      images: [
        "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541888086925-0c13bb135f60?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=2072&auto=format&fit=crop",
      ],
      href: "#",
    },
    {
      index: "03",
      title: "Crane Services",
      body: "Pioneering green energy solutions for a sustainable and resilient future.",
      image:
        "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782360742/crane_geztwz.png",
      images: [
        "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782391140/crane1_jcsbxi.jpg",
        "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782391138/crane2_t7skyh.jpg",
        "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782391154/crane3_qrf3tg.jpg",
        "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782391176/crane4_kq4vti.jpg",
        "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782391189/crane5_wmxbj2.jpg",
        "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782391206/crane6_vaghov.jpg",
        "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782392321/crane7_iuy9rt.jpg",
        "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782392324/crane8_osaid5.jpg",
        "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782392329/crane9_ct8lxr.jpg",
        "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782392334/crane10_dh6k2f.jpg",
      ],
      href: "#",
    },
    {
      index: "04",
      title: "Real Estate Development",
      body: "Developing next-generation building materials that are lighter, stronger, and eco-friendly.",
      image:
        "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782360965/construction_zuwsoq.jpg",
      images: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=2097&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
      ],
      href: "#",
    },
  ],
};

function MarqueeCard({
  card,
  onClick,
}: {
  card: (typeof businessAreas.cards)[0];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="relative flex-shrink-0 cursor-pointer w-[85vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] xl:w-[22vw] aspect-[4/5] mx-1 md:mx-2 transition-transform duration-500 hover:scale-[1.02]"
    >
      <div className="relative w-full h-full rounded-[1rem] md:rounded-[2rem] overflow-hidden bg-neutral-900 border border-white/5 group shadow-2xl">
        <img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/0 pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />
        <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
          <h3 className="text-white font-serif text-2xl md:text-3xl leading-tight font-light">
            {card.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export function BusinessCards() {
  const [activeCard, setActiveCard] = useState<
    (typeof businessAreas.cards)[0] | null
  >(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (activeCard !== null) {
      document.body.style.overflow = "hidden";
      // @ts-ignore
      if (window.appLenis) window.appLenis.stop();
    } else {
      document.body.style.overflow = "";
      // @ts-ignore
      if (window.appLenis) window.appLenis.start();
    }

    return () => {
      document.body.style.overflow = "";
      // @ts-ignore
      if (window.appLenis) window.appLenis.start();
    };
  }, [activeCard]);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeCard) {
      setCurrentImageIndex((prev) => (prev + 1) % activeCard.images.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeCard) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + activeCard.images.length) % activeCard.images.length,
      );
    }
  };

  // We duplicate the cards array 4 times to ensure it's wide enough for a seamless loop
  // across all screen sizes.
  const marqueeCards = [
    ...businessAreas.cards,
    ...businessAreas.cards,
    ...businessAreas.cards,
    ...businessAreas.cards,
  ];

  return (
    <>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <section className="relative bg-[#050505] overflow-hidden min-h-[90vh] flex flex-col justify-center py-24 transition-colors duration-500">
        <div className="container mx-auto px-4 mb-12 md:mb-20 z-10">
          <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-[4.5rem] text-center text-white/90 max-w-4xl mx-auto leading-[1.1] tracking-tight">
            Selected and popular
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>business areas
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>right now
          </h2>
        </div>

        <div className="relative w-full overflow-hidden flex">
          <div className="flex w-max animate-marquee py-4">
            {marqueeCards.map((card, index) => (
              <MarqueeCard
                key={index}
                card={card}
                onClick={() => {
                  setActiveCard(card);
                  setCurrentImageIndex(0);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Photos Modal */}
      {activeCard !== null && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-6xl h-[80vh] flex flex-col justify-center items-center">
            <MagneticButton
              strength={0.5}
              className="absolute -top-12 right-0 md:top-0 md:-right-16 z-10"
            >
              <button
                onClick={() => setActiveCard(null)}
                className="p-3 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </MagneticButton>

            <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-black/50 border border-white/10 shadow-2xl">
              <img
                key={currentImageIndex}
                src={activeCard.images[currentImageIndex]}
                alt={`${activeCard.title} photo ${currentImageIndex + 1}`}
                className="w-full h-full object-contain animate-in fade-in duration-500"
              />

              {activeCard.images.length > 1 && (
                <>
                  <MagneticButton
                    strength={0.6}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                  >
                    <button
                      onClick={handlePrevImage}
                      className="p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full transition-colors"
                    >
                      <ChevronLeft size={28} />
                    </button>
                  </MagneticButton>
                  <MagneticButton
                    strength={0.6}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <button
                      onClick={handleNextImage}
                      className="p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full transition-colors"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </MagneticButton>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {activeCard.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? "bg-white scale-125"
                            : "bg-white/40 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 text-center">
              <h3 className="font-serif text-2xl text-white tracking-wide">
                {activeCard.title}
              </h3>
              <p className="font-sans text-white/60 mt-2 max-w-2xl text-sm leading-relaxed px-4">
                {activeCard.body}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
