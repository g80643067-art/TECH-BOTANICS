import { SoilOption, Language } from "../types";

export const SOIL_OPTIONS: SoilOption[] = [
  {
    id: "loamy",
    emoji: "🌱",
    name_en: "Loamy Soil",
    name_hi: "दोमट मिट्टी",
    name_bn: "দোআঁশ মাটি",
    name_mr: "गाळाची / पोयटा माती",
    name_te: "వరి/ఎర్ర నేల (లోమి సాయిల్)",
    name_ta: "வண்டல் மண்",
    name_gu: "ગોરાડુ જમીન",
    name_kn: "ಗೋಡು ಮಣ್ಣು",
    name_ml: "എക്കൽ മണ്ണ്",
    name_pa: "ਦੋਮਟ ਮਿੱਟੀ",
    name_or: "ଦୋରସା ମାଟି",
    name_as: "পলসুৱা মাটি",
    description_en: "Balanced mix of sand, silt, and clay. Retains moisture with optimal aeration.",
    description_hi: "रेत, गाद और चिकनी मिट्टी का आदर्श मिश्रण। नमी और वायु संचार का श्रेष्ठ संतुलन।",
    description_bn: "বালি, পলি ও এঁটেল মাটির সুষম মিশ্রণ। আর্দ্রতা ধরে রাখে ও শিকড়ের জন্য উপযুক্ত।",
    description_mr: "वाळू, पोयटा आणि चिकनमातीचे उत्तम मिश्रण. ओलावा आणि हवा खेळती ठेवते.",
    colorHex: "#15803d",
    characteristics: ["Rich organic matter", "High fertility", "Ideal root penetration"],
  },
  {
    id: "black",
    emoji: "🟤",
    name_en: "Black Soil (Regur)",
    name_hi: "काली मिट्टी (रेगुर)",
    name_bn: "কালো মাটি (রেগুর)",
    name_mr: "काळी माती (रेगूर)",
    name_te: "నల్లరేగడి నేల",
    name_ta: "கரிசல் மண்",
    name_gu: "કાળી જમીન (રેગુર)",
    name_kn: "ಕಪ್ಪು ಮಣ್ಣು (ರೆಗುರ್)",
    name_ml: "കരിമണ്ണ് (റെഗുർ)",
    name_pa: "ਕਾਲੀ ਮਿੱਟੀ (ਰੇਗੁਰ)",
    name_or: "କଳା ମାଟି",
    name_as: "ক'লা মাটি",
    description_en: "High clay content and water retention. Ideal for cotton, sugarcane, and pulses.",
    description_hi: "अत्यधिक जलधारण क्षमता और पोषक तत्व। कपास, गन्ना और दालों के लिए सर्वोत्तम।",
    description_bn: "উচ্চ জল ধারণ ক্ষমতা ও উর্বরতা। তুলা, আখ ও ডাল চাষের জন্য আদর্শ।",
    description_mr: "जास्त पाणी धरून ठेवणारी माती. कापूस, ऊस आणि कडधान्यांसाठी अत्यंत फायदेशीर.",
    colorHex: "#3e2723",
    characteristics: ["Rich in calcium & magnesium", "Deep cracks in summer", "Heavy water-holding"],
  },
  {
    id: "red",
    emoji: "🟠",
    name_en: "Red Soil",
    name_hi: "लाल मिट्टी",
    name_bn: "লাল মাটি",
    name_mr: "तांबडी माती",
    name_te: "ఎర్ర నేల",
    name_ta: "செம்மண்",
    name_gu: "રાતી / લાલ જમીન",
    name_kn: "ಕೆಂಪು ಮಣ್ಣು",
    name_ml: "ചെങ്കൽ മണ്ണ്",
    name_pa: "ਲਾਲ ਮਿੱਟੀ",
    name_or: "ନାଲି ମାଟି",
    name_as: "ৰঙা মাটি",
    description_en: "Porous and rich in iron oxides. Well-suited for groundnuts, millets, and tobacco.",
    description_hi: "आयरन ऑक्साइड से भरपूर, हल्की और भुरभुरी। मूंगफली, बाजरा और मोटे अनाजों के लिए उपयुक्त।",
    description_bn: "আয়রন অক্সাইড সমৃদ্ধ ও ছিদ্রযুক্ত। চিনাবাদাম ও বাজরা চাষের জন্য উপযুক্ত।",
    description_mr: "लोहयुक्त आणि सच्छिद्र माती. भुईमूग, बाजरी आणि इतर पिकांसाठी चांगली.",
    colorHex: "#c2410c",
    characteristics: ["Fast draining", "Requires organic manure", "Responsive to irrigation"],
  },
  {
    id: "sandy",
    emoji: "🏖",
    name_en: "Sandy Soil",
    name_hi: "बलुई / रेतीली मिट्टी",
    name_bn: "বেলে মাটি",
    name_mr: "वाळूयुक्त / रेताड माती",
    name_te: "ఇసుక నేల",
    name_ta: "மணல் மண்",
    name_gu: "રેતાળ જમીન",
    name_kn: "ಮರಳು ಮಣ್ಣು",
    name_ml: "മണൽ മണ്ണ്",
    name_pa: "ਰੇਤਲੀ ਮਿੱਟੀ",
    name_or: "ବାଲିଆ ମାଟି",
    name_as: "বালিচহীয়া মাটি",
    description_en: "Large particles with rapid water drainage. Needs frequent irrigation and mulching.",
    description_hi: "बड़े कण और अत्यंत तेज जल निकास। बार-बार सिंचाई और जैविक मल्चिंग की आवश्यकता।",
    description_bn: "মোটা কণা ও দ্রুত জল নিষ্কাশন। ঘন ঘন সেচ প্রয়োজন।",
    description_mr: "मोठे कण आणि पाणी पटकन वाहून जाणारी माती. वारंवार पाणी देण्याची गरज.",
    colorHex: "#d97706",
    characteristics: ["Low water retention", "Warms up rapidly", "Prone to nutrient leaching"],
  },
  {
    id: "clay",
    emoji: "🪨",
    name_en: "Clay Soil",
    name_hi: "चिकनी / मटियार मिट्टी",
    name_bn: "এঁটেল মাটি",
    name_mr: "चिकनमाती / काळी चिकट माती",
    name_te: "బంకమట్టి నేల",
    name_ta: "களிமண்",
    name_gu: "ચીકણી જમીન",
    name_kn: "ಜೇಡಿ ಮಣ್ಣು",
    name_ml: "കളിമണ്ണ്",
    name_pa: "ਚੀਕਣੀ ਮਿੱਟੀ",
    name_or: "ଚିକିଟା ମାଟି",
    name_as: "এটেল মাটি",
    description_en: "Very fine particles, sticky when wet, prone to waterlogging if drainage is low.",
    description_hi: "अत्यंत बारीक कण, गीली होने पर चिपचिपी। जलभराव का खतरा रहता है।",
    description_bn: "খুব সূক্ষ্ম কণা, ভিজলে আঠালো। জল নিষ্কাশন ব্যবস্থা প্রয়োজন।",
    description_mr: "अत्यंत बारीक कण असलेली, ओली झाल्यावर चिकट होणारी माती.",
    colorHex: "#475569",
    characteristics: ["Highest water retention", "Nutrient rich", "Requires aeration management"],
  },
  {
    id: "silt",
    emoji: "💧",
    name_en: "Silt Soil",
    name_hi: "गाद / सिल्ट मिट्टी",
    name_bn: "পলি মাটি",
    name_mr: "गाळाची माती",
    name_te: "సిల్ట్ నేల (ఒండ్రు నేల)",
    name_ta: "வண்டல் வண்டல் மண்",
    name_gu: "કાંપવાળી જમીન",
    name_kn: "ಹೂಳು ಮಣ್ಣು",
    name_ml: "എക്കൽ മണ്ണ്",
    name_pa: "ਗਾਰ / ਸਿਲਟ ਮਿੱਟੀ",
    name_or: "ପଟୁ ମାଟି",
    name_as: "পলি মাটি",
    description_en: "Smooth, flour-like texture transported by rivers. Excellent fertility and moisture hold.",
    description_hi: "नदियों द्वारा लाई गई मुलायम, उर्वरक मिट्टी। उत्कृष्ट नमी और पोषण धारण क्षमता।",
    description_bn: "নদী বাহিত উর্বর নরম মাটি। চমৎকার উর্বরতা ও আর্দ্রতা ধারণ ক্ষমতা।",
    description_mr: "नद्यांनी आणलेली सुपीक आणि मऊ माती. ओलावा धरून ठेवण्याची उत्तम क्षमता.",
    colorHex: "#0284c7",
    characteristics: ["River floodplain deposit", "Highly fertile", "Prone to surface crusting"],
  },
];

export function getLocalizedSoilName(soil: SoilOption, lang: Language): string {
  const key = `name_${lang}` as keyof SoilOption;
  if (soil[key] && typeof soil[key] === "string") {
    return soil[key] as string;
  }
  return lang === "en" ? soil.name_en : soil.name_hi || soil.name_en;
}

export function getLocalizedSoilDescription(soil: SoilOption, lang: Language): string {
  const key = `description_${lang}` as keyof SoilOption;
  if (soil[key] && typeof soil[key] === "string") {
    return soil[key] as string;
  }
  return lang === "en" ? soil.description_en : soil.description_hi || soil.description_en;
}

export function determineSoilFromQuiz(q1: string, q2: string, q3: string): SoilOption {
  if (q1 === "q1_opt1" || q3 === "q3_opt1") {
    if (q2 === "q2_opt1") {
      return SOIL_OPTIONS.find((s) => s.id === "black") || SOIL_OPTIONS[1];
    }
    return SOIL_OPTIONS.find((s) => s.id === "clay") || SOIL_OPTIONS[4];
  }
  if (q1 === "q1_opt3" || q3 === "q3_opt3") {
    return SOIL_OPTIONS.find((s) => s.id === "sandy") || SOIL_OPTIONS[3];
  }
  if (q2 === "q2_opt2") {
    return SOIL_OPTIONS.find((s) => s.id === "red") || SOIL_OPTIONS[2];
  }
  if (q2 === "q2_opt1") {
    return SOIL_OPTIONS.find((s) => s.id === "black") || SOIL_OPTIONS[1];
  }
  return SOIL_OPTIONS.find((s) => s.id === "loamy") || SOIL_OPTIONS[0];
}

