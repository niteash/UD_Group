import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "EN" | "MM" | "ZH";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    "nav.company": "COMPANY",
    "nav.business": "BUSINESS",
    "nav.strengths": "STRENGTHS",
    "nav.recruitment": "RECRUITMENT",
    "nav.news": "NEWS",
    "nav.contact": "CONTACT",
    "hero.tagline": "INDUSTRIAL SOLUTIONS",
    "hero.marquee": "AMARA GARDEN CITY",
    "hero.scroll": "SCROLL MORE",
    "team.title": "OUR HEADS",
    "about.title": "About Us",
    "about.h3":
      "UD Group Co., Ltd. was established in Year 2002, June 1. Located in Mandalay city and middle of Myanmar.",
    "about.desc":
      "The main products are Light Trucks, Jeeps and Generators to over fifty suppliers.\nAnd we do Crane and Generator service, Car import , Car rental ,Jade mining , Mining Machine , Construction and Real estate too.\nThere are seventeen technicians working together with the assistance of 400 workers.",
    "about.links.0.title": "Our Team",
    "about.links.0.subtitle":
      "We are powered by 17 skilled technicians and a dedicated workforce of 400 employees, ensuring the highest standards in our operations.",
    "about.links.1.title": "Our Future Vision",
    "about.links.1.subtitle":
      "As we move forward, UD Group is committed to strengthening its position in the real estate and construction sector, delivering innovative projects that enhance urban living in Myanmar. We warmly welcome you to visit our company and explore collaboration opportunities.",
    "about.links.2.title": "Our Approach",
    "about.links.2.subtitle":
      "Every project is grounded in long-term thinking: durable materials, transparent timelines, and a focus on the people who will actually live and work in what we build.",
    "about.links.3.title": "Specialise",
    "about.links.3.subtitle":
      "Light Trucks & Jeeps Distribution – Supplying to over fifty trusted partners. Crane & Generator Services – Providing reliable equipment rental and maintenance. Construction & Real Estate – Developing large-scale projects, including our latest Amara Garden City housing project.",
    "about.ud.title": "Company Profile: UD Group",
    "about.ud.desc1": "Main Factory Area: 43,200 sq. ft.",
    "about.ud.desc2": "Parts Factory Area: 64,000 sq. ft.",
    "about.ud.desc3": "Generator Factory: 43,200 sq. ft.",
    "about.amara.title": "Amara Garden City – A Vision for Modern Living",
    "about.amara.desc":
      "Located on a 60-acre site, Amara Garden City is our flagship real estate development, designed to offer a high-quality residential experience in Mandalay. Our project aims to create a thriving community with modern infrastructure, green spaces, and premium facilities.",
  },
  MM: {
    "nav.company": "ကုမ္ပဏီ",
    "nav.business": "စီးပွားရေး",
    "nav.strengths": "အားသာချက်များ",
    "nav.recruitment": "အလုပ်အကိုင်",
    "nav.news": "သတင်းများ",
    "nav.contact": "ဆက်သွယ်ရန်",
    "hero.tagline": "စက်မှုလုပ်ငန်းဆိုင်ရာ ဖြေရှင်းချက်များ",
    "hero.marquee": "အမရ ဥယျာဉ်မြို့တော်",
    "hero.scroll": "ဆက်လက်ဖတ်ရှုရန်",
    "team.title": "ကျွန်ုပ်တို့၏ ခေါင်းဆောင်များ",
    "about.title": "ကျွန်ုပ်တို့အကြောင်း",
    "about.h3":
      "UD Group Co., Ltd. ကို ၂၀၀၂ ခုနှစ်၊ ဇွန်လ ၁ ရက်နေ့တွင် စတင်တည်ထောင်ခဲ့ပါသည်။ မြန်မာနိုင်ငံအလယ်ပိုင်း မန္တလေးမြို့တွင် တည်ရှိပါသည်။",
    "about.desc":
      "အဓိကထုတ်ကုန်များမှာ အပေါ့စားကုန်တင်ကားများ၊ ဂျစ်ကားများနှင့် မီးစက်များဖြစ်ပြီး ပေးသွင်းသူ ၅၀ ကျော်သို့ ဖြန့်ချိလျက်ရှိပါသည်။\nကရိန်းနှင့် မီးစက် ဝန်ဆောင်မှု၊ ကားတင်သွင်းခြင်း၊ ကားငှားရမ်းခြင်း၊ ကျောက်စိမ်းတူးဖော်ခြင်း၊ သတ္တုတူးဖော်ရေးစက်များ၊ ဆောက်လုပ်ရေးနှင့် အိမ်ခြံမြေ လုပ်ငန်းများကိုလည်း လုပ်ကိုင်လျက်ရှိပါသည်။\nကျွမ်းကျင်ပညာရှင် ၁၇ ဦးနှင့် အလုပ်သမား ၄၀၀ ကျော် ပူးပေါင်းလုပ်ဆောင်လျက်ရှိပါသည်။",
    "about.links.0.title": "ကျွန်ုပ်တို့၏ အဖွဲ့သားများ",
    "about.links.0.subtitle":
      "ကျွန်ုပ်တို့၏ လုပ်ငန်းလည်ပတ်မှုများတွင် အမြင့်မားဆုံးစံနှုန်းများကို သေချာစေရန် ကျွမ်းကျင်ပညာရှင် ၁၇ ဦးနှင့် စေတနာ့ဝန်ထမ်း အလုပ်သမား ၄၀၀ တို့ဖြင့် လည်ပတ်လျက်ရှိပါသည်။",
    "about.links.1.title": "ကျွန်ုပ်တို့၏ အနာဂတ် မျှော်မှန်းချက်",
    "about.links.1.subtitle":
      "ရှေ့ဆက်လှမ်းမည်ဆိုပါက UD Group သည် မြန်မာနိုင်ငံရှိ မြို့ပြနေထိုင်မှုဘဝကို မြှင့်တင်ပေးမည့် ဆန်းသစ်သောစီမံကိန်းများကို ပေးအပ်လျက် အိမ်ခြံမြေနှင့် ဆောက်လုပ်ရေးကဏ္ဍတွင် ၎င်း၏ရပ်တည်ချက်ကို ခိုင်မာစေရန် ကတိကဝတ်ပြုပါသည်။ ကျွန်ုပ်တို့၏ ကုမ္ပဏီသို့ လာရောက်လည်ပတ်ရန်နှင့် ပူးပေါင်းဆောင်ရွက်မှု အခွင့်အလမ်းများကို ရှာဖွေရန် နွေးထွေးစွာ ကြိုဆိုပါသည်။",
    "about.links.2.title": "ကျွန်ုပ်တို့၏ ချဉ်းကပ်မှု",
    "about.links.2.subtitle":
      "စီမံကိန်းတိုင်းသည် ရေရှည်တွေးခေါ်မှုအပေါ် အခြေခံထားသည်- ခိုင်ခံ့သောပစ္စည်းများ၊ ပွင့်လင်းမြင်သာသော အချိန်ဇယားများနှင့် ကျွန်ုပ်တို့တည်ဆောက်မည့်အရာတွင် အမှန်တကယ်နေထိုင်လုပ်ကိုင်မည့်သူများကို အာရုံစိုက်ထားပါသည်။",
    "about.links.3.title": "အထူးပြုလုပ်ငန်းစဉ်များ",
    "about.links.3.subtitle":
      "အပေါ့စားကုန်တင်ကားများနှင့် ဂျစ်ကားများ ဖြန့်ဖြူးခြင်း – ယုံကြည်ရသော မိတ်ဖက် ၅၀ ကျော်သို့ ပံ့ပိုးပေးခြင်း။ ကရိန်းနှင့် မီးစက် ဝန်ဆောင်မှု – ယုံကြည်စိတ်ချရသော စက်ကိရိယာများ ငှားရမ်းခြင်းနှင့် ပြုပြင်ထိန်းသိမ်းခြင်းကို ပံ့ပိုးပေးခြင်း။ ဆောက်လုပ်ရေးနှင့် အိမ်ခြံမြေ – ကျွန်ုပ်တို့၏ နောက်ဆုံးပေါ် Amara Garden City အိမ်ရာစီမံကိန်းအပါအဝင် အကြီးစားစီမံကိန်းများကို တည်ဆောက်ခြင်း။",
    "about.ud.title": "ကုမ္ပဏီအကြောင်း: UD Group",
    "about.ud.desc1": "ပင်မစက်ရုံ ဧရိယာ: ၄၃,၂၀၀ စတုရန်းပေ",
    "about.ud.desc2": "အပိုပစ္စည်းစက်ရုံ ဧရိယာ: ၆၄,၀၀၀ စတုရန်းပေ",
    "about.ud.desc3": "မီးစက်စက်ရုံ ဧရိယာ: ၄၃,၂၀၀ စတုရန်းပေ",
    "about.amara.title":
      "Amara Garden City – ခေတ်မီနေထိုင်မှုဘဝအတွက် မျှော်မှန်းချက်",
    "about.amara.desc":
      "ဧက ၆၀ ကျယ်ဝန်းသော မြေနေရာတွင် တည်ရှိသည့် Amara Garden City သည် မန္တလေးမြို့တွင် အရည်အသွေးမြင့် လူနေမှုအတွေ့အကြုံကို ပေးစွမ်းနိုင်ရန် ဒီဇိုင်းထုတ်ထားသော ကျွန်ုပ်တို့၏ အထင်ကရ အိမ်ခြံမြေစီမံကိန်းဖြစ်သည်။ ကျွန်ုပ်တို့၏စီမံကိန်းသည် ခေတ်မီအခြေခံအဆောက်အအုံများ၊ စိမ်းလန်းသောနေရာများနှင့် ပရီမီယံပစ္စည်းများဖြင့် စည်ကားသော လူ့အသိုင်းအဝိုင်းတစ်ခုကို ဖန်တီးရန် ရည်ရွယ်ပါသည်။",
  },
  ZH: {
    "nav.company": "公司",
    "nav.business": "业务",
    "nav.strengths": "优势",
    "nav.recruitment": "招聘",
    "nav.news": "新闻",
    "nav.contact": "联系",
    "hero.tagline": "工业解决方案",
    "hero.marquee": "阿玛拉花园城市",
    "hero.scroll": "向下滚动",
    "team.title": "我们的领导",
    "about.title": "关于我们",
    "about.h3":
      "UD Group Co., Ltd. 成立于 2002 年 6 月 1 日。位于缅甸中部的曼德勒市。",
    "about.desc":
      "主要产品是轻型卡车、吉普车和发电机，供应给五十多家供应商。\n我们还提供起重机和发电机服务、汽车进口、汽车租赁、玉石开采、采矿机、建筑和房地产。\n有十七名技术人员和 400 名工人的协助共同工作。",
    "about.links.0.title": "我们的团队",
    "about.links.0.subtitle":
      "我们由 17 名熟练的技术人员和 400 名敬业的员工组成，确保我们运营的最高标准。",
    "about.links.1.title": "我们的未来愿景",
    "about.links.1.subtitle":
      "在向前迈进的过程中，UD Group 致力于巩固其在房地产和建筑领域的地位，提供创新项目以改善缅甸的城市生活。我们热忱欢迎您访问我们公司并探索合作机会。",
    "about.links.2.title": "我们的方法",
    "about.links.2.subtitle":
      "每个项目都立足于长远考虑：耐用的材料、透明的时间表，并关注真正将在我们建造的建筑中生活和工作的人。",
    "about.links.3.title": "专业领域",
    "about.links.3.subtitle":
      "轻型卡车和吉普车分销 – 供应给五十多个值得信赖的合作伙伴。起重机和发电机服务 – 提供可靠的设备租赁和维护。建筑和房地产 – 开发大型项目，包括我们最新的 Amara Garden City 住房项目。",
    "about.ud.title": "公司简介：UD Group",
    "about.ud.desc1": "主厂区：43,200 平方英尺",
    "about.ud.desc2": "零件厂区：64,000 平方英尺",
    "about.ud.desc3": "发电机厂区：43,200 平方英尺",
    "about.amara.title": "Amara Garden City – 现代生活愿景",
    "about.amara.desc":
      "Amara Garden City 占地 60 英亩，是我们旗舰房地产开发项目，旨在为曼德勒提供高品质的住宅体验。我们的项目旨在创建一个拥有现代化基础设施、绿地和优质设施的繁荣社区。",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
