import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { AnimatePresence, motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const teamData = [
  {
    id: 1,
    name: "U Khin Maung Win",
    role: "CEO",
    quote1: "I always knew I wanxted to be a businessman.",
    quote2:
      "Starting from a young age I made learning a priority- I never skimmed over books, I asked teachers a lot of questions and I observed those around me.",
    desc1:
      "U Khin Maung Win was born in Mandalay, the second of four children. At the tender age of six, his parents divorced and he and his siblings moved to the countryside with their mother.",
    desc2:
      "His first lesson in management was taking care of his family’s cows. ‘I was just a little boy but I had to make sure they were kept safe, were fed on time and had enough water.’ A short time later, U Khin Maung Win started attending a monastic school. He was captivated by the head monks’ ability to manage the students.",
    readMore: [
      "The experiences and struggles that he faced in the following decade are, in U Khin Maung Win’s eyes, the reason he is the successful man he is today. He was captivated by the head monks’ ability to manage the students and the daily activities of the monastery. This observation was, he later realized, the second leadership lesson that would impact his later life.",
      "Having completed fifth standard at the monastic school, U Khin Maung Win decided to move back to Mandalay and start working. Arriving back to the buzzing city, with just 35 kyats in his pocket, he got a job at a mechanic workshop run by a family friend. The work was a perfect fit- the engines and machines captivated his curious mind. And it was here, he says, that he learned his third lesson. ‘The master mechanic had to control his staff, organize the shop, maintain the quality of work and still make a profit. His business skills made a big impression on me.",
      "After cutting his teeth as a mechanic, U Khin Maung Win had gained the confidence and experience, as well as saved up enough money, to set up UD Group in 2002. It may seem like an almost casual decision. But U Khin Maung Win is not one to leave things to chance. He was confident in his abilities as a businessman and confident in his technical skills, but he humbly knew he was not yet ready to strike out fully alone. So in his early years running UD Group, he regularly sought the advice and guidance of successful Mandalay business owners and poured over management books in his free time.",
      "This combination of factors equated to success from the start. And in the 17 years that UD Group has been operating, the company has grown from a team of 10 workers to more than 300 employees. The head office and two main factories are located in Mandalay with their manufactured products, such as generators and light trucks, sold throughout the country. As well, UD Group provides crane rental and support services in all of Myanmar’s states and divisions. To have achieved such widespread success and to manage such challenging logistics is a testament to U Khin Maung Win’s dedication and business savvy.",
      "With his son now handling most of the daily running of UDCorporation, one would think that U Khin Maung Win is enjoying some down time and relaxing. But when asked about his leisure time he quickly replies with a smile, ‘My job is my passion. I don’t need to relax after working as work is enjoyable for me.’ This mimics the sentiments of one of his business heroes, Sochiro Honda. The founder of Honda Automotive was, like U Khin Maung Win, a self-made man and a visionary who loved his work.",
      "U Khin Maung Win fondly recalls one example of this, ‘One day he [Mr Honda] was speaking to a group of students and he asked them ‘What do you do on your days off from school and work?’. The students responded that they liked to relax to which Mr Honda said ‘My work is relaxing for me. That’s why I never have a day off’. But U Khin Maung Win does have hobbies other than work. His biggest passion is reading and researching- a notebook is never far from his side, where he jots down notes or inspiration for new ideas. ‘The more I read and the more I learn, the better I am as a business owner and member of Myanmar society. There is no need to stop learning once you are successful as being successful doesn’t mean you know it all. I would be bored if I wasn’t learning something new every day’, he remarks.",
      "In addition to these academic hobbies, U Khin Maung Win dabbles in photography and gardening. And, as is expected from a man who has built a business on automobile manufacturing, he loves cars and is the proud owner of a Rolls Royce among other luxury vehicles. Despite this picture of success, U Khin Maung Win never forgets his humble beginnings and the people who helped him along the way. His legacy is important to him and he wants to encourage not just only his family but all young people to strive for success. ‘It may sound strange, but I want my loved ones to struggle. I want them to face challenges and find ways to overcome them. This is the best way to learn’, he stated.",
      "U Khin Maung Win plans to write a book in the near future, passing on his knowledge and experience to potential business leaders. ‘It is important that we encourage the younger generation to be interested in technology, to believe in the value of education and to serve their community’, he says. ‘There is potential but too many young people are not motivated. They blame their parents for not providing money to help them start a business. But that should not be the case – their parents gave them a brain and a healthy body. That is all that is needed to get a start in the business world’.",
    ],
    image:
      "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782316302/01_tbzpwc.png",
  },
  {
    id: 2,
    name: "Mr. Wai Lin Tun",
    role: "Director",
    quote1:
      "I have a strong passion for machines, technology, and efficient project execution.",
    quote2:
      "My deep understanding of mechanical systems allows me to tackle complex technical issues while driving efficiency in project development.",
    desc1:
      "Mr. Wai Lin Tun is a dynamic leader and problem-solver. As the Director of Amara Garden City, he plays a pivotal role in leading the implementation of the project.",
    desc2:
      "He manages government and investment sector dealings, and oversees strategic planning. A fast learner with a hands-on approach, he is known for his ability to analyze challenges and find innovative solutions.",
    readMore: [
      "His deep understanding of mechanical systems allows him to tackle complex technical issues while driving efficiency in project development.",
      "Beyond project execution, he leads key meetings, collaborates with stakeholders, and listens closely to the CEO’s vision to translate ideas into actionable plans. His leadership ensures that Amara Garden City is developed with precision, innovation, and long-term sustainability in mind.",
      "With a commitment to excellence and strategic growth, Mr. Wai Lin Tun is shaping the future of Amara Garden City, making it a landmark project in urban development.",
    ],
    image:
      "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782316304/waiLinhtun_qmfcgq.png",
  },
  {
    id: 3,
    name: "Ms Win Win Htun",
    role: "Director of UD Group",
    quote1:
      "I focus on building strategic partnerships and expanding investment opportunities.",
    quote2:
      "I actively work to support and connect business leaders, foster entrepreneurship, and introduce innovative programs.",
    desc1:
      "As the Director of UD Group, Ms Win Win Htun plays a key role in shaping the company’s growth and strategic direction.",
    desc2:
      "With a strong background in marketing, branding, and business development, she has been instrumental in expanding UD Group’s presence across various industries.",
    readMore: [
      "Beyond UD Group, Ms Win Win Htun is also the Co-founder of Swara Branding & Marketing, where they specialize in helping businesses establish strong brand identities and market positioning. Their expertise in marketing has been crucial in elevating UD Group’s reputation and projects, including the flagship Amara Garden City.",
      "In addition, Ms Win Win Htun serves as the Treasurer of the Mandalay Region Young Entrepreneur Association (MRYEA), actively working to support and connect business leaders, foster entrepreneurship, and introduce innovative programs to the local business community.",
      "Committed to social impact, Ms Win Win Htun is also the Membership Chair of the Rotary Club of Yadanabon Myanmar, leading initiatives that contribute to community development and humanitarian efforts.",
      "Ms Win Win Htun is focused on building strategic partnerships and expanding investment opportunities to drive UD Group’s future growth, particularly in the real estate sector. Their leadership across multiple sectors ensures that Amara Garden City remains a benchmark for modern, sustainable living in Myanmar.",
    ],
    image:
      "https://res.cloudinary.com/dcdc4hj6v/image/upload/v1782316305/winwinhtun_rx5tdv.png",
  },
];

export function TeamRecruitment() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (expandedId !== null) {
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
  }, [expandedId]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hanging-card-wrapper",
        { y: -50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.2)",
          clearProps: "transform",
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#f8f9fa] dark:bg-[#050505] py-24 md:py-32 overflow-hidden transition-colors duration-500"
    >
      {/* Decorative Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-[#e1cd18]/10 dark:bg-[#e1cd18]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-200 dark:border-[#e1cd18]/30 bg-white/50 dark:bg-[#121212]/50 backdrop-blur-sm mb-6 text-[10px] md:text-xs font-sans font-bold uppercase tracking-widest text-neutral-600 dark:text-[#e1cd18] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e1cd18]"></span>
            {t("team.title") || "Our Leadership"}
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black font-sans uppercase tracking-tighter text-neutral-900 dark:text-white leading-[0.9] max-w-4xl mx-auto">
            DRIVING <span className="text-[#e1cd18]">INNOVATION</span>
            <br className="hidden md:block" /> AND SUSTAINABLE GROWTH
          </h2>
          <p className="mt-6 text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-medium max-w-2xl mx-auto px-4">
            With decades of experience and visionary planning, our team leads
            the way in modern business, engineering, and lifestyle development.
          </p>
        </div>

        {/* Cards & Line Container */}
        <div className="relative w-full flex flex-col md:block items-center gap-16 pt-10 pb-10 md:pt-10 md:h-[700px] mt-10">
          {/* SVG String (Desktop) */}
          <svg
            className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <path
              d="M -10 20 Q 50 100 110 20"
              fill="none"
              className="stroke-neutral-300 dark:stroke-neutral-700"
              strokeWidth="0.3"
            />
          </svg>

          {/* Vertical String (Mobile) */}
          <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-neutral-300 dark:bg-neutral-800 z-0"></div>

          {/* Combined Cards */}
          {teamData.map((person, idx) => {
            const xPos = idx === 0 ? 20 : idx === 1 ? 50 : 80;
            const yPos = idx === 1 ? 60 : 50;
            const rotationDesktop =
              idx === 0
                ? "md:-rotate-6"
                : idx === 1
                  ? "md:rotate-2"
                  : "md:rotate-6";
            const rotationMobile = idx % 2 === 0 ? "-rotate-3" : "rotate-3";

            return (
              <div
                key={person.id}
                className="hanging-card-wrapper relative md:absolute z-10 w-fit md:left-[var(--desk-x)] md:top-[var(--desk-y)]"
                style={
                  {
                    "--desk-x": `${xPos}%`,
                    "--desk-y": `calc(${yPos}% - 14px)`,
                  } as React.CSSProperties
                }
              >
                <div
                  onClick={() => setExpandedId(person.id)}
                  className={`relative group cursor-pointer transition-all duration-500 hover:z-30 hover:-translate-y-2 md:hover:-translate-y-4 hover:rotate-0 md:-translate-x-1/2 ${rotationMobile} ${rotationDesktop}`}
                >
                  {/* The Pin */}
                  <div className="absolute -top-5 md:-top-6 left-1/2 -translate-x-1/2 w-6 md:w-8 h-8 md:h-10 bg-[#e1cd18] dark:bg-[#e1cd18] rounded-t-md rounded-b-sm shadow-md flex items-start justify-center pt-2 z-20 transition-colors origin-bottom">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#f8f9fa] dark:bg-[#050505] shadow-inner"></div>
                  </div>

                  {/* The Card */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white dark:bg-[#121212] p-3 md:p-4 pb-5 md:pb-6 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/80 border border-neutral-100 dark:border-neutral-800/60 w-[280px] sm:w-[320px] lg:w-[320px] transition-all duration-300 group-hover:shadow-2xl group-hover:border-[#e1cd18]/50"
                  >
                    <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100 dark:bg-[#1a1a1a] border border-neutral-100 dark:border-neutral-800">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 md:mt-5 text-left px-1">
                      <h3 className="text-lg md:text-xl font-bold font-sans text-neutral-900 dark:text-white group-hover:text-[#e1cd18] transition-colors">
                        {person.name}
                      </h3>
                      <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                        {person.role}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Read More Modal (Detailed Card Pop-up) */}
      <AnimatePresence>
        {expandedId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-[#121212] text-neutral-900 dark:text-[#e6c875] w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-2xl shadow-2xl dark:shadow-[0_25px_50px_-12px_rgba(225,205,24,0.2)] flex flex-col overflow-hidden relative transition-colors duration-500 border border-neutral-100 dark:border-[#e1cd18]/20"
            >
              <button
                onClick={() => setExpandedId(null)}
                className="absolute top-4 right-4 p-2 bg-white/50 dark:bg-black/50 backdrop-blur-sm text-neutral-500 dark:text-[#e1cd18] hover:text-neutral-900 dark:hover:text-[#e1cd18] hover:bg-neutral-100 dark:hover:bg-[#e1cd18]/20 rounded-full transition-colors z-20"
                title="Close modal"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {teamData
                .filter((d) => d.id === expandedId)
                .map((data) => (
                  <div
                    key={data.id}
                    className="flex flex-col md:flex-row w-full h-full md:h-auto overflow-hidden"
                  >
                    {/* Left: Image */}
                    <div className="w-full md:w-2/5 h-64 md:h-auto md:min-h-[500px] bg-neutral-100 dark:bg-[#1a1a1a] relative shrink-0">
                      <img
                        src={data.image}
                        alt={data.name}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
                    </div>

                    {/* Right: Content */}
                    <div
                      className="w-full md:w-3/5 p-6 md:p-12 overflow-y-auto"
                      data-lenis-prevent="true"
                    >
                      <p className="font-sans font-bold text-[#e1cd18] dark:text-[#e1cd18] text-sm tracking-widest uppercase mb-2 transition-colors duration-500">
                        {data.role}
                      </p>
                      <h3 className="font-sans text-3xl md:text-5xl font-black mb-6 md:mb-8 tracking-tight text-neutral-900 dark:text-white transition-colors duration-500">
                        {data.name}
                      </h3>

                      <div className="space-y-6 text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed text-base md:text-lg transition-colors duration-500">
                        <p className="text-xl md:text-2xl font-serif italic text-neutral-800 dark:text-white/90 mb-8 pb-8 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-500">
                          "{data.quote1} {data.quote2}"
                        </p>

                        <p>{data.desc1}</p>
                        <p>{data.desc2}</p>

                        {data.readMore?.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
