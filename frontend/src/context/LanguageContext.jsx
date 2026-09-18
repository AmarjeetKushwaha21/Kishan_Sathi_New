import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'kishanSathiLanguage';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
];

const TRANSLATIONS = {
  en: {
    // Navigation
    navHome: 'Home',
    navFeatures: 'Features',
    navAbout: 'About',
    navContact: 'Contact',
    navFarmer: 'Farmer',
    navCompany: 'Company / Buyer',
    navSignIn: 'Sign In',
    navProfile: 'Profile',
    tagline: 'Farmers Today, A Greener Tomorrow',

    // Hero
    heroTitle: 'Empowering Farmers,',
    heroTitleHighlight: 'Enabling a Better Tomorrow',
    heroSubtitle:
      'AI-powered insights, real-time weather, market prices, expert guidance and direct business opportunities — all in one place.',
    heroQuote:
      '“Empower the hands that feed the nation, and you empower the future of India.”',
    heroQuoteStep: 'A step towards a smarter, stronger and greener India.',
    heroTagLeft: 'Sustainable Farming\nStronger India',
    heroTagRight: 'Better Farms\nBrighter Tomorrow',

    // Role Selection
    roleEyebrow: 'CHOOSE YOUR ROLE',
    roleHeading: 'Join the Movement for a Greener India',
    roleSubtitle:
      'Whether you grow food or power the supply chain — Kishan Sathi is for you.',
    farmerTitle: 'Farmer',
    farmerDesc:
      'Get AI crop advice, real-time weather updates, market prices, access to agriculture store, government schemes and expert support.',
    continueFarmer: 'Continue as Farmer →',
    companyTitle: 'Company / Buyer',
    companyDesc:
      'Find quality crops, connect with farmers, manage procurement, place bids and orders, and use supply chain tools.',
    continueCompany: 'Continue as Company →',

    // Core Solutions
    solutionsEyebrow: 'OUR CORE SOLUTIONS',
    solutionsHeading: 'Everything a Farmer Needs, In One Place',
    solutionsSubtitle:
      'Smart tools and real opportunities to help farmers grow better, earn better and live better.',
    weatherTitle: 'Weather Updates',
    weatherDesc: 'Real-time weather forecasts for smarter decisions.',
    cropAdvisorTitle: 'AI Crop Advisor',
    cropAdvisorDesc:
      'Get crop suggestions based on your soil, season and market demand.',
    marketPricesTitle: 'Market Prices',
    marketPricesDesc: 'Latest mandi prices to help you sell at the right time.',
    directSellTitle: 'Direct Sell to Company',
    directSellDesc:
      'Connect directly with verified companies and buyers. Get better prices and grow without middlemen.',
    storeTitle: 'Agriculture Store',
    storeDesc: 'Buy seeds, fertilizers, tools and more at the best prices.',
    schemesTitle: 'Government Schemes',
    schemesDesc: 'Find and apply for central and state government schemes.',
    expertTitle: 'Expert Consultation',
    expertDesc: 'Connect with agriculture experts for personalized advice.',

    // How it works
    howEyebrow: 'HOW KISHAN SATHI WORKS',
    howHeading: 'A Simple Journey Towards a Better Harvest',
    howSubtitle: 'From information to income — everything you need, step by step.',
    step1Title: 'Create Account',
    step1Desc: 'Sign up as a farmer or buyer and complete your profile.',
    step1Btn: 'Get Started →',
    step2Title: 'Explore Tools',
    step2Desc: 'Use AI, weather, market prices and more.',
    step2Btn: 'Explore Now →',
    step3Title: 'Take Action',
    step3Desc: 'Get advice, buy inputs, sell your produce.',
    step3Btn: 'Take Action →',
    step4Title: 'Grow Together',
    step4Desc: 'Increase your income and build a better future.',
    step4Btn: 'Build Your Future →',
    howTagline: '“Empowered Farmers. A Stronger, Greener India.”',

    // Impact
    impactEyebrow: 'OUR IMPACT (DEMO STATISTICS)',
    impactHeading: 'Growing Together for a Stronger India',
    impactDemoLabel:
      'These are demo numbers highlighting our vision for impact. Demo statistics — placeholder values for prototype',
    statFarmers: 'Registered Farmers',
    statCompanies: 'Registered Companies / Buyers',
    statCrops: 'Crops Supported',
    statStates: 'States Reached',
    statExperts: 'Expert Partners',
    statReports: 'Crop Reports Generated',

    // About Us
    aboutEyebrow: 'ABOUT US',
    aboutHeading: 'About Kishan Sathi',
    aboutParagraph:
      'Kishan Sathi is a digital agriculture platform that connects farmers, technology, experts, markets and government services — all in one place. Our mission is to empower farmers with the right information, better opportunities and continuous support for a more prosperous and sustainable India.',
    aboutQuote:
      '“Technology for today’s farmers. A greener tomorrow for India.”',
    pillTech: 'Powered by Technology',
    pillExperts: 'Guided by Experts',
    pillMarkets: 'Connected to Markets',
    pillGov: 'Linked with Government',
    pillGreen: 'Built for a Greener India',

    // Contact & Collaborate
    contactEyebrow: 'GET IN TOUCH',
    contactMainHeading:
      'Let’s Build a Stronger Agricultural Future Together',
    contactCardTitle: 'Contact Us',
    contactCardSubtitle: 'Have a question? We’d love to hear from you.',
    fieldName: 'Name',
    namePlaceholder: 'Your name',
    fieldEmail: 'Email',
    emailPlaceholder: 'your@email.com',
    fieldPhone: 'Phone',
    phonePlaceholder: '+91 98765 43210',
    fieldMessage: 'Message',
    messagePlaceholder: 'Type your message here...',
    btnSendMessage: 'Send Message →',
    btnSending: 'Sending...',
    contactSuccessAlert:
      'Thank you! Your message has been sent successfully (Prototype mode).',
    collabCardTitle: 'Collaborate With Us',
    collabCardSubtitle: 'Partner with us to create a bigger impact.',
    collabOpt1Title: 'Companies / Buyers',
    collabOpt1Desc: 'Work with farmers directly',
    collabOpt2Title: 'Experts',
    collabOpt2Desc: 'Share knowledge & guidance',
    collabOpt3Title: 'NGOs',
    collabOpt3Desc: 'Support farmer communities',
    collabOpt4Title: 'Government / Institutions',
    collabOpt4Desc: 'Collaborate for greater reach',
    btnStartCollab: 'Start a Collaboration →',
    togetherGreener: 'Together\nfor a Greener\nTomorrow',

    // Testimonials
    testimonialsEyebrow: 'WHAT PEOPLE SAY (DEMO TESTIMONIALS)',
    testimonialsHeading: 'Real Stories. Real Impact.',
    testimonialsNotice:
      'Demo testimonials — Replace with verified farmer feedback after launch.',

    // Final CTA
    ctaHeading: 'Join Kishan Sathi Today',
    ctaSubtitle: 'Be part of a smarter, stronger and greener India.',
    ctaButton: 'Get Started →',

    // Footer
    footerTagline: 'Farmers Today, A Greener Tomorrow',
    footerQuickLinks: 'Quick Links',
    footerOurPlatform: 'Our Platform',
    footerForFarmers: 'For Farmers',
    footerForCompanies: 'For Companies',
    footerExpertNetwork: 'Expert Network',
    footerGovSchemes: 'Government Schemes',
    footerContactUs: 'Contact Us',
    footerFollowUs: 'Follow Us',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms & Conditions',
    footerRights: 'All rights reserved.',
  },

  hi: {
    // Navigation
    navHome: 'होम',
    navFeatures: 'सुविधाएं',
    navAbout: 'परिचय',
    navContact: 'संपर्क',
    navFarmer: 'किसान',
    navCompany: 'कंपनी / खरीदार',
    navSignIn: 'लॉग इन',
    navProfile: 'प्रोफाइल',
    tagline: 'आज के किसान, एक हरित कल',

    // Hero
    heroTitle: 'किसानों को सशक्त बनाना,',
    heroTitleHighlight: 'एक बेहतर कल का निर्माण',
    heroSubtitle:
      'एआई-संचालित अंतर्दृष्टि, वास्तविक समय मौसम, मंडी भाव, विशेषज्ञ मार्गदर्शन और सीधे व्यापार के अवसर — सब एक ही स्थान पर।',
    heroQuote:
      '“जो हाथ देश का पेट भरते हैं, उन्हें सशक्त बनाना भारत के भविष्य को सशक्त बनाना है।”',
    heroQuoteStep: 'एक स्मार्ट, सशक्त और हरित भारत की दिशा में एक कदम।',
    heroTagLeft: 'सतत कृषि\nसशक्त भारत',
    heroTagRight: 'बेहतर खेत\nउज्ज्वल भविष्य',

    // Role Selection
    roleEyebrow: 'अपनी भूमिका चुनें',
    roleHeading: 'हरित भारत के आंदोलन से जुड़ें',
    roleSubtitle:
      'चाहे आप अन्न उगाते हों या आपूर्ति श्रृंखला को सशक्त बनाते हों — किसान साथी आपके साथ है।',
    farmerTitle: 'किसान',
    farmerDesc:
      'एआई फसल सलाह, वास्तविक समय मौसम अपडेट, मंडी भाव, कृषि स्टोर, सरकारी योजनाएं और विशेषज्ञ सहायता प्राप्त करें।',
    continueFarmer: 'किसान के रूप में जारी रखें →',
    companyTitle: 'कंपनी / खरीदार',
    companyDesc:
      'उच्च गुणवत्ता फसलें खोजें, किसानों से सीधे जुड़ें, खरीद का प्रबंधन करें, बोलियां लगाएं और अपनी सप्लाई चेन मजबूत करें।',
    continueCompany: 'कंपनी के रूप में जारी रखें →',

    // Core Solutions
    solutionsEyebrow: 'हमारे प्रमुख समाधान',
    solutionsHeading: 'किसान की हर ज़रूरत, एक ही स्थान पर',
    solutionsSubtitle:
      'किसानों को बेहतर उगाने, अधिक कमाने और बेहतर जीने में मदद करने वाले स्मार्ट टूल्स और वास्तविक अवसर।',
    weatherTitle: 'मौसम अपडेट',
    weatherDesc: 'स्मार्ट निर्णयों के लिए सटीक और वास्तविक समय मौसम पूर्वानुमान।',
    cropAdvisorTitle: 'एआई फसल सलाहकार',
    cropAdvisorDesc:
      'अपनी मिट्टी, मौसम और बाजार की मांग के आधार पर सबसे उपयुक्त फसल सुझाव पाएं।',
    marketPricesTitle: 'मंडी भाव',
    marketPricesDesc: 'सही समय पर फसल बेचने के लिए ताज़ा मंडी भाव और रुझान।',
    directSellTitle: 'कंपनियों को सीधे बेचें',
    directSellDesc:
      'सत्यापित कंपनियों और खरीदारों से सीधे जुड़ें। बिना बिचौलियों के बेहतर मूल्य प्राप्त करें।',
    storeTitle: 'कृषि स्टोर',
    storeDesc: 'सर्वोत्तम मूल्यों पर प्रमाणित बीज, खाद, कीटनाशक और कृषि उपकरण खरीदें।',
    schemesTitle: 'सरकारी योजनाएं',
    schemesDesc: 'केंद्र और राज्य सरकार की सभी कृषि योजनाओं की जानकारी व सीधा आवेदन।',
    expertTitle: 'विशेषज्ञ परामर्श',
    expertDesc: 'व्यक्तिगत खेती सलाह व रोग निदान के लिए कृषि वैज्ञानिकों से जुड़ें।',

    // How it works
    howEyebrow: 'किसान साथी कैसे काम करता है',
    howHeading: 'बेहतर उपज की ओर एक सरल और सुगम यात्रा',
    howSubtitle: 'सटीक जानकारी से लेकर बेहतर आमदनी तक — हर कदम पर आपका साथी।',
    step1Title: 'खाता बनाएं',
    step1Desc: 'किसान या खरीदार के रूप में साइन अप करें और अपनी प्रोफाइल पूरी करें।',
    step1Btn: 'शुरू करें →',
    step2Title: 'टूल्स का उपयोग करें',
    step2Desc: 'एआई सलाहकार, मौसम, मंडी भाव और अन्य आधुनिक टूल्स का लाभ उठाएं।',
    step2Btn: 'अभी देखें →',
    step3Title: 'कदम उठाएं',
    step3Desc: 'विशेषज्ञ सलाह लें, कृषि सामग्री खरीदें और अपनी उपज सही दाम पर बेचें।',
    step3Btn: 'कदम उठाएं →',
    step4Title: 'साथ आगे बढ़ें',
    step4Desc: 'अपनी आय में वृद्धि करें और एक सुरक्षित, समृद्ध भविष्य का निर्माण करें।',
    step4Btn: 'भविष्य बनाएं →',
    howTagline: '“सशक्त किसान। मजबूत और हरित भारत।”',

    // Impact
    impactEyebrow: 'हमारा प्रभाव (डेमो आंकड़े)',
    impactHeading: 'सशक्त भारत के लिए एक साथ प्रगति',
    impactDemoLabel:
      'ये डेमो आंकड़े हैं जो हमारे प्रभाव के विज़न को दर्शाते हैं। डेमो आंकड़े — प्रोटोटाइप के लिए प्लेसहोल्डर मान',
    statFarmers: 'पंजीकृत किसान',
    statCompanies: 'पंजीकृत कंपनियां / खरीदार',
    statCrops: 'समर्थित फसलें',
    statStates: 'राज्य शामिल',
    statExperts: 'विशेषज्ञ साथी',
    statReports: 'तैयार फसल रिपोर्ट',

    // About Us
    aboutEyebrow: 'हमारे बारे में',
    aboutHeading: 'किसान साथी के बारे में',
    aboutParagraph:
      'किसान साथी एक डिजिटल कृषि मंच है जो किसानों, आधुनिक तकनीक, विशेषज्ञों, मंडियों और सरकारी सेवाओं को एक साथ जोड़ता है। हमारा उद्देश्य किसानों को सही जानकारी, बेहतर बाजार और निरंतर सहयोग देकर एक समृद्ध व आत्मनिर्भर भारत का निर्माण करना है।',
    aboutQuote:
      '“आज के किसानों के लिए आधुनिक तकनीक। भारत के लिए एक हरित कल।”',
    pillTech: 'प्रौद्योगिकी द्वारा संचालित',
    pillExperts: 'विशेषज्ञों द्वारा निर्देशित',
    pillMarkets: 'बाजारों से सीधा जुड़ाव',
    pillGov: 'सरकारी सेवाओं से सम्बद्ध',
    pillGreen: 'हरित भारत के लिए समर्पित',

    // Contact & Collaborate
    contactEyebrow: 'संपर्क करें',
    contactMainHeading:
      'आइए मिलकर एक मजबूत कृषि भविष्य का निर्माण करें',
    contactCardTitle: 'हमसे संपर्क करें',
    contactCardSubtitle: 'कोई प्रश्न या सुझाव है? हम आपकी सहायता के लिए तैयार हैं।',
    fieldName: 'नाम',
    namePlaceholder: 'आपका नाम',
    fieldEmail: 'ईमेल',
    emailPlaceholder: 'your@email.com',
    fieldPhone: 'फोन नंबर',
    phonePlaceholder: '+91 98765 43210',
    fieldMessage: 'संदेश',
    messagePlaceholder: 'अपना संदेश यहां लिखें...',
    btnSendMessage: 'संदेश भेजें →',
    btnSending: 'भेजा जा रहा है...',
    contactSuccessAlert:
      'धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है (प्रोटोटाइप मोड)।',
    collabCardTitle: 'हमारे साथ साझेदारी करें',
    collabCardSubtitle: 'अधिक से अधिक किसानों तक पहुंचने के लिए हमारे साथ जुड़ें।',
    collabOpt1Title: 'कंपनियां / खरीदार',
    collabOpt1Desc: 'किसानों के साथ सीधे काम करें और खरीद करें',
    collabOpt2Title: 'कृषि विशेषज्ञ',
    collabOpt2Desc: 'किसानों के साथ अपना ज्ञान और मार्गदर्शन साझा करें',
    collabOpt3Title: 'एनजीओ (NGOs)',
    collabOpt3Desc: 'ग्रामीण किसान समुदायों का उत्थान करें',
    collabOpt4Title: 'सरकारी संस्थान',
    collabOpt4Desc: 'कृषि योजनाओं के विस्तार के लिए सहयोग करें',
    btnStartCollab: 'साझेदारी शुरू करें →',
    togetherGreener: 'हरित कल\nके लिए\nएक साथ',

    // Testimonials
    testimonialsEyebrow: 'संतुष्ट किसानों की आवाज़ (डेमो)',
    testimonialsHeading: 'सच्ची कहानियां। वास्तविक प्रभाव।',
    testimonialsNotice:
      'डेमो प्रतिक्रियाएं — वास्तविक लॉन्च के बाद सत्यापित किसान समीक्षाओं से बदला जाएगा।',

    // Final CTA
    ctaHeading: 'आज ही किसान साथी से जुड़ें',
    ctaSubtitle: 'एक स्मार्ट, सशक्त और हरित भारत का अभिन्न हिस्सा बनें।',
    ctaButton: 'शुरुआत करें →',

    // Footer
    footerTagline: 'आज के किसान, एक हरित कल',
    footerQuickLinks: 'त्वरित लिंक',
    footerOurPlatform: 'हमारा मंच',
    footerForFarmers: 'किसानों के लिए',
    footerForCompanies: 'कंपनियों के लिए',
    footerExpertNetwork: 'विशेषज्ञ नेटवर्क',
    footerGovSchemes: 'सरकारी योजनाएं',
    footerContactUs: 'संपर्क करें',
    footerFollowUs: 'हमसे जुड़ें',
    footerPrivacy: 'गोपनीयता नीति',
    footerTerms: 'नियम और शर्तें',
    footerRights: 'सर्वाधिकार सुरक्षित।',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored || 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (langCode) => {
    try {
      localStorage.setItem(STORAGE_KEY, langCode);
      document.documentElement.lang = langCode;
    } catch {
      // ignore
    }
    setLanguageState(langCode);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Sync if another tab or component updates localStorage
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setLanguageState(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const t = useMemo(() => {
    return (key, fallback = '') => {
      const activeDict = TRANSLATIONS[language] || TRANSLATIONS.en;
      if (activeDict && activeDict[key] !== undefined) {
        return activeDict[key];
      }
      if (TRANSLATIONS.en && TRANSLATIONS.en[key] !== undefined) {
        return TRANSLATIONS.en[key];
      }
      return fallback || key;
    };
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      supportedLanguages: SUPPORTED_LANGUAGES,
    }),
    [language, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}

export default LanguageContext;
