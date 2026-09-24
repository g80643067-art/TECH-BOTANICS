/**
 * Scalable Crop & Agricultural Plant Photo Registry for KrishiSetu AI
 * Supports Hindi + English + Hinglish + Botanical names for Indian crops, plants,
 * fruits, vegetables, seeds, leaves, stems, and roots.
 *
 * Mandate:
 * - Always match exact crop or plant name.
 * - Never return mismatched or unrelated images.
 * - Return neutral placeholder when no verified image exists.
 */

import regeneratedPaddyImage from "../assets/images/regenerated_image_1790275623529.webp";
import regeneratedCottonImage from "../assets/images/regenerated_image_1790275624830.webp";
import regeneratedSugarcaneImage from "../assets/images/regenerated_image_1790275626577.webp";

export interface CropVisualData {
  id: string;
  primaryName_en: string;
  primaryName_hi: string;
  category: "Cereal" | "Pulse" | "Oilseed" | "Cash Crop" | "Vegetable" | "Fruit" | "Spice" | "Medicinal" | "Plantation";
  photoUrl: string;
  photoCaption_en: string;
  photoCaption_hi: string;
  emoji: string;
  plantParts?: {
    plant?: string;
    leaf?: string;
    fruit?: string;
    seed?: string;
    flower?: string;
    root?: string;
    stem?: string;
  };
  aliases: string[];
}

export interface CropVisualResolution {
  crop: CropVisualData | null;
  matchedPart: "plant" | "leaf" | "stem" | "root" | "seed" | "fruit" | "flower" | null;
  photoUrl: string | null;
  isExactMatch: boolean;
  isNeutralPlaceholder: boolean;
  displayName_en: string;
  displayName_hi: string;
  partBadge_en?: string;
  partBadge_hi?: string;
  queryCleaned: string;
  statusMessage_en: string;
  statusMessage_hi: string;
}

// Curated high-resolution realistic agricultural photographs
export const CROP_PHOTO_REGISTRY: CropVisualData[] = [
  // 1. Wheat / गेहूं
  {
    id: "wheat",
    primaryName_en: "Wheat",
    primaryName_hi: "गेहूं",
    category: "Cereal",
    emoji: "🌾",
    photoUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Golden wheat field with ripening ears (Triticum aestivum)",
    photoCaption_hi: "पकी हुई सुनहरी बालियों के साथ गेहूं की फसल (Triticum aestivum)",
    plantParts: {
      leaf: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1000&q=80",
      seed: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "wheat", "gehun", "gehu", "गेहूं", "गेहु", "गेहू", "triticum", "triticum aestivum", "kanak", "godhumai", "godhuma", "gahu"
    ],
  },

  // 2. Mustard / सरसों
  {
    id: "mustard",
    primaryName_en: "Mustard / Rapeseed",
    primaryName_hi: "सरसों / राई",
    category: "Oilseed",
    emoji: "🌼",
    photoUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Yellow flowering mustard crop in full bloom (Brassica juncea)",
    photoCaption_hi: "पीले फूलों से लहलहाती सरसों की फसल (Brassica juncea)",
    plantParts: {
      flower: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "mustard", "sarson", "sarso", "सरसों", "सरसो", "राई", "rai", "rapeseed", "toria", "brassica", "brassica juncea", "kadugu", "aavalu", "mohari"
    ],
  },

  // 3. Rice / Paddy / धान
  {
    id: "rice",
    primaryName_en: "Rice / Paddy",
    primaryName_hi: "धान / चावल",
    category: "Cereal",
    emoji: "🌾",
    photoUrl: regeneratedPaddyImage,
    photoCaption_en: "Lush green irrigated paddy field (Oryza sativa)",
    photoCaption_hi: "लहलहाते हरे धान के खेत (Oryza sativa)",
    aliases: [
      "rice", "paddy", "dhan", "chawal", "धान", "चावल", "oryza", "oryza sativa", "jhona", "nellu", "bhat", "vari", "bhatta"
    ],
  },

  // 4. Maize / Corn / मक्का
  {
    id: "maize",
    primaryName_en: "Maize / Corn",
    primaryName_hi: "मक्का / भुट्टा",
    category: "Cereal",
    emoji: "🌽",
    photoUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Healthy maize plant canopy with developing corn cobs (Zea mays)",
    photoCaption_hi: "स्वस्थ मक्के का पौधा और भुट्टे (Zea mays)",
    aliases: [
      "maize", "corn", "makka", "bhutta", "मक्का", "भुट्टा", "zea mays", "makki", "maka", "mokkajonna", "cholam"
    ],
  },

  // 5. Tomato / टमाटर
  {
    id: "tomato",
    primaryName_en: "Tomato",
    primaryName_hi: "टमाटर",
    category: "Vegetable",
    emoji: "🍅",
    photoUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Ripening tomatoes on healthy green vine (Solanum lycopersicum)",
    photoCaption_hi: "पौधे पर पकते हुए ताजे लाल टमाटर (Solanum lycopersicum)",
    plantParts: {
      fruit: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1000&q=80",
      leaf: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "tomato", "tamatar", "tamater", "टमाटर", "टमाटार", "solanum lycopersicum", "thakkali", "tamata", "tomato plant", "tomato fruit"
    ],
  },

  // 6. Mango / आम
  {
    id: "mango",
    primaryName_en: "Mango",
    primaryName_hi: "आम",
    category: "Fruit",
    emoji: "🥭",
    photoUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Sunlit fresh mangoes ripening on tree branch (Mangifera indica)",
    photoCaption_hi: "आम के पेड़ की डाली पर लटकते ताजे फल (Mangifera indica)",
    plantParts: {
      fruit: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1000&q=80",
      leaf: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "mango", "aam", "आम", "amb", "manga", "mangifera", "mangifera indica", "mango tree", "mango fruit", "mango leaf"
    ],
  },

  // 7. Potato / आलू
  {
    id: "potato",
    primaryName_en: "Potato",
    primaryName_hi: "आलू",
    category: "Vegetable",
    emoji: "🥔",
    photoUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Fresh farm potato tubers & foliage (Solanum tuberosum)",
    photoCaption_hi: "खेत से ताजे आलू कंद व पौधे की पत्तियां (Solanum tuberosum)",
    plantParts: {
      root: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "potato", "aloo", "alu", "आलू", "solanum tuberosum", "batata", "urulaikizhangu", "bangaladumpa", "potato tuber"
    ],
  },

  // 8. Cotton / कपास
  {
    id: "cotton",
    primaryName_en: "Cotton",
    primaryName_hi: "कपास / नरमा",
    category: "Cash Crop",
    emoji: "🌱",
    photoUrl: regeneratedCottonImage,
    photoCaption_en: "White cotton bolls blossoming in field (Gossypium hirsutum)",
    photoCaption_hi: "खेत में खिली हुई सफेद कपास की फसल (Gossypium hirsutum)",
    aliases: [
      "cotton", "kapas", "narma", "rui", "कपास", "नरमा", "रुई", "gossypium", "paruthi", "pratti", "kapus"
    ],
  },

  // 9. Sugarcane / गन्ना
  {
    id: "sugarcane",
    primaryName_en: "Sugarcane",
    primaryName_hi: "गन्ना / ईख",
    category: "Cash Crop",
    emoji: "🎋",
    photoUrl: regeneratedSugarcaneImage,
    photoCaption_en: "Tall green sugarcane stalks in plantation (Saccharum officinarum)",
    photoCaption_hi: "खेत में खड़े गन्ने के घने तने व फसल (Saccharum officinarum)",
    plantParts: {
      stem: regeneratedSugarcaneImage,
    },
    aliases: [
      "sugarcane", "ganna", "eekh", "kamaad", "गन्ना", "ईख", "saccharum", "saccharum officinarum", "karumbu", "cheraku", "us"
    ],
  },

  // 10. Chilli / मिर्च
  {
    id: "chilli",
    primaryName_en: "Chilli / Pepper",
    primaryName_hi: "मिर्च / हरी मिर्च",
    category: "Vegetable",
    emoji: "🌶️",
    photoUrl: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Vibrant chillies hanging on farm plant (Capsicum annuum)",
    photoCaption_hi: "पौधे पर लटकती तीखी हरी व लाल मिर्च (Capsicum annuum)",
    aliases: [
      "chilli", "chili", "mirch", "hari mirch", "lal mirch", "pepper", "मिर्च", "हरी मिर्च", "लाल मिर्च", "capsicum", "milagai", "mirapa"
    ],
  },

  // 11. Onion / प्याज
  {
    id: "onion",
    primaryName_en: "Onion",
    primaryName_hi: "प्याज",
    category: "Vegetable",
    emoji: "🧅",
    photoUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Fresh harvested red onion bulbs (Allium cepa)",
    photoCaption_hi: "खेत से ताजी लाल प्याज की फसल (Allium cepa)",
    plantParts: {
      root: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "onion", "pyaz", "pyaaj", "kanda", "प्याज", "प्याज़", "कांदा", "allium cepa", "vengayam", "ulligadda"
    ],
  },

  // 12. Garlic / लहसुन
  {
    id: "garlic",
    primaryName_en: "Garlic",
    primaryName_hi: "लहसुन",
    category: "Spice",
    emoji: "🧄",
    photoUrl: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Fresh garlic bulbs and green shoots (Allium sativum)",
    photoCaption_hi: "ताजा लहसुन की कलियां और पौधा (Allium sativum)",
    aliases: [
      "garlic", "lahsun", "lasun", "लहसुन", "लहसून", "allium sativum", "poondu", "vellulli"
    ],
  },

  // 13. Ginger / अदरक
  {
    id: "ginger",
    primaryName_en: "Ginger",
    primaryName_hi: "अदरक",
    category: "Spice",
    emoji: "🫚",
    photoUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Fresh aromatic ginger rhizomes (Zingiber officinale)",
    photoCaption_hi: "ताजी खोदी हुई अदरक की गांठें (Zingiber officinale)",
    plantParts: {
      root: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "ginger", "adrak", "adrakh", "अदरक", "आदा", "zingiber", "zingiber officinale", "inji", "allam", "ale"
    ],
  },

  // 14. Turmeric / हल्दी
  {
    id: "turmeric",
    primaryName_en: "Turmeric",
    primaryName_hi: "हल्दी",
    category: "Spice",
    emoji: "🌿",
    photoUrl: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Raw golden turmeric root rhizomes (Curcuma longa)",
    photoCaption_hi: "कच्ची पीली हल्दी की गांठें व जड़ें (Curcuma longa)",
    plantParts: {
      root: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "turmeric", "haldi", "हल्दी", "हळद", "curcuma", "curcuma longa", "manjal", "pasupu"
    ],
  },

  // 15. Chickpea / चना
  {
    id: "chickpea",
    primaryName_en: "Chickpea / Gram",
    primaryName_hi: "चना / छोले",
    category: "Pulse",
    emoji: "🌱",
    photoUrl: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Chickpea pods in field (Cicer arietinum)",
    photoCaption_hi: "खेत में चने के पौधे और फलियां (Cicer arietinum)",
    aliases: [
      "chickpea", "gram", "chana", "chane", "चना", "चने", "छोले", "cicer arietinum", "konda kadalai", "senagalu", "harbara"
    ],
  },

  // 16. Soybean / सोयाबीन
  {
    id: "soybean",
    primaryName_en: "Soybean",
    primaryName_hi: "सोयाबीन",
    category: "Oilseed",
    emoji: "🌱",
    photoUrl: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Soybean crop pods in farm (Glycine max)",
    photoCaption_hi: "खेत में लहलहाती सोयाबीन की फलियां (Glycine max)",
    aliases: [
      "soybean", "soya", "soy", "सोयाबीन", "सोया", "glycine max", "soya bean"
    ],
  },

  // 17. Green Peas / मटर
  {
    id: "peas",
    primaryName_en: "Green Peas",
    primaryName_hi: "मटर",
    category: "Vegetable",
    emoji: "🫛",
    photoUrl: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Fresh green pea pods on vine (Pisum sativum)",
    photoCaption_hi: "बेल पर लगी हरी मटर की फलियां (Pisum sativum)",
    aliases: [
      "pea", "peas", "green peas", "matar", "mattar", "मटर", "pisum sativum", "pattani", "batani"
    ],
  },

  // 18. Banana / केला
  {
    id: "banana",
    primaryName_en: "Banana",
    primaryName_hi: "केला",
    category: "Fruit",
    emoji: "🍌",
    photoUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Lush green banana tree and fruit bunch (Musa acuminata)",
    photoCaption_hi: "केले का पेड़ और फलों का घौद (Musa)",
    aliases: [
      "banana", "kela", "केला", "केले", "musa", "valai", "arati", "kele"
    ],
  },

  // 19. Apple / सेब
  {
    id: "apple",
    primaryName_en: "Apple",
    primaryName_hi: "सेब",
    category: "Fruit",
    emoji: "🍎",
    photoUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Crisp red apples ripening in orchard (Malus domestica)",
    photoCaption_hi: "बगीचे में पके हुए लाल सेब (Malus domestica)",
    aliases: [
      "apple", "seb", "saeb", "सेब", "malus", "malus domestica", "apple tree", "apple fruit"
    ],
  },

  // 20. Papaya / पपीता
  {
    id: "papaya",
    primaryName_en: "Papaya",
    primaryName_hi: "पपीता",
    category: "Fruit",
    emoji: "🍈",
    photoUrl: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Papaya tree laden with heavy fruits (Carica papaya)",
    photoCaption_hi: "फलों से लदा हुआ पपीते का पेड़ (Carica papaya)",
    aliases: [
      "papaya", "papita", "पपीता", "carica papaya", "pappali", "boppayi"
    ],
  },

  // 21. Guava / अमरूद
  {
    id: "guava",
    primaryName_en: "Guava",
    primaryName_hi: "अमरूद",
    category: "Fruit",
    emoji: "🍏",
    photoUrl: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Fresh green guavas on orchard branch (Psidium guajava)",
    photoCaption_hi: "पेड़ पर लगे ताजे हरे अमरूद (Psidium guajava)",
    aliases: [
      "guava", "amrood", "amrud", "अमरूद", "अमरुद", "पेरू", "psidium guajava", "koyya", "jama"
    ],
  },

  // 22. Lemon / Citrus / नींबू
  {
    id: "lemon",
    primaryName_en: "Lemon / Citrus",
    primaryName_hi: "नींबू",
    category: "Fruit",
    emoji: "🍋",
    photoUrl: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Yellow ripe lemons hanging on citrus tree (Citrus limon)",
    photoCaption_hi: "नींबू के पेड़ पर पके हुए फल (Citrus limon)",
    aliases: [
      "lemon", "lime", "nimbu", "neembu", "citrus", "नींबू", "निंबू", "citrus limon", "elumichai", "nimma"
    ],
  },

  // 23. Grapes / अंगूर
  {
    id: "grapes",
    primaryName_en: "Grapes",
    primaryName_hi: "अंगूर",
    category: "Fruit",
    emoji: "🍇",
    photoUrl: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Grape bunches ripening on vineyard trellis (Vitis vinifera)",
    photoCaption_hi: "बेल पर लटकते ताजे अंगूरों के गुच्छे (Vitis vinifera)",
    aliases: [
      "grapes", "grape", "angoor", "अंगूर", "द्राक्ष", "vitis vinifera", "thiratchai", "draksha"
    ],
  },

  // 24. Cauliflower / फूलगोभी
  {
    id: "cauliflower",
    primaryName_en: "Cauliflower",
    primaryName_hi: "फूलगोभी",
    category: "Vegetable",
    emoji: "🥦",
    photoUrl: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Crisp white cauliflower curd with leaves (Brassica oleracea botrytis)",
    photoCaption_hi: "खेत में ताजी सफेद फूलगोभी (Brassica oleracea botrytis)",
    aliases: [
      "cauliflower", "phoolgobhi", "gobhi", "फूलगोभी", "गोभी", "cauli", "brassica oleracea botrytis"
    ],
  },

  // 25. Cabbage / पत्तागोभी
  {
    id: "cabbage",
    primaryName_en: "Cabbage",
    primaryName_hi: "पत्तागोभी / बंदगोभी",
    category: "Vegetable",
    emoji: "🥬",
    photoUrl: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Green cabbage head in vegetable field (Brassica oleracea capitata)",
    photoCaption_hi: "खेत में ताजी हरी पत्तागोभी (Brassica oleracea capitata)",
    aliases: [
      "cabbage", "pattagobhi", "bandgobhi", "पत्तागोभी", "बंदगोभी", "brassica oleracea capitata", "muttakose"
    ],
  },

  // 26. Carrot / गाजर
  {
    id: "carrot",
    primaryName_en: "Carrot",
    primaryName_hi: "गाजर",
    category: "Vegetable",
    emoji: "🥕",
    photoUrl: "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Freshly harvested orange-red carrots with feathery green foliage (Daucus carota)",
    photoCaption_hi: "खेत से ताजी गाजर व हरी पत्तियां (Daucus carota)",
    plantParts: {
      root: "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "carrot", "gajar", "गाजर", "daucus carota", "gajjara"
    ],
  },

  // 27. Radish / मूली
  {
    id: "radish",
    primaryName_en: "Radish",
    primaryName_hi: "मूली",
    category: "Vegetable",
    emoji: "🌱",
    photoUrl: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Fresh white radish roots with green tops (Raphanus sativus)",
    photoCaption_hi: "खेत से ताजी सफेद मूली (Raphanus sativus)",
    plantParts: {
      root: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "radish", "mooli", "muli", "मूली", "raphanus sativus", "mullangi"
    ],
  },

  // 28. Spinach / पालक
  {
    id: "spinach",
    primaryName_en: "Spinach",
    primaryName_hi: "पालक",
    category: "Vegetable",
    emoji: "🥬",
    photoUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Lush green tender spinach leaves (Spinacia oleracea)",
    photoCaption_hi: "ताजा हरी पालक की पत्तियां (Spinacia oleracea)",
    plantParts: {
      leaf: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "spinach", "palak", "पालक", "spinacia oleracea", "pasalai keerai", "palakura"
    ],
  },

  // 29. Coriander / धनिया
  {
    id: "coriander",
    primaryName_en: "Coriander",
    primaryName_hi: "धनिया",
    category: "Spice",
    emoji: "🌿",
    photoUrl: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Fragrant green coriander foliage (Coriandrum sativum)",
    photoCaption_hi: "सुगंधित हरा धनिया का पौधा व पत्तियां (Coriandrum sativum)",
    plantParts: {
      leaf: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=80",
      seed: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "coriander", "cilantro", "dhaniya", "dhaniyan", "धनिया", "धनीया", "coriandrum sativum", "koththamalli", "kothimeera"
    ],
  },

  // 30. Brinjal / Eggplant / बैंगन
  {
    id: "brinjal",
    primaryName_en: "Brinjal / Eggplant",
    primaryName_hi: "बैंगन",
    category: "Vegetable",
    emoji: "🍆",
    photoUrl: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Glossy purple brinjal growing on plant (Solanum melongena)",
    photoCaption_hi: "पौधे पर लटकता हुआ ताजा चमकदार बैंगन (Solanum melongena)",
    aliases: [
      "brinjal", "eggplant", "baingan", "aubergine", "बैंगन", "बैगन", "भाटा", "solanum melongena", "kathirikai", "vankaya", "vangi"
    ],
  },

  // 31. Okra / भिंडी
  {
    id: "okra",
    primaryName_en: "Okra / Ladyfinger",
    primaryName_hi: "भिंडी",
    category: "Vegetable",
    emoji: "🌿",
    photoUrl: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Fresh green tender okra pods on stem (Abelmoschus esculentus)",
    photoCaption_hi: "पौधे पर लगी ताजी हरी भिंडी (Abelmoschus esculentus)",
    aliases: [
      "okra", "ladyfinger", "lady finger", "bhindi", "bhendi", "भिंडी", "भेंडी", "abelmoschus esculentus", "vendakkai", "bhenda"
    ],
  },

  // 32. Groundnut / मूंगफली
  {
    id: "groundnut",
    primaryName_en: "Groundnut / Peanut",
    primaryName_hi: "मूंगफली",
    category: "Oilseed",
    emoji: "🥜",
    photoUrl: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Harvested peanut pods with subterranean roots (Arachis hypogaea)",
    photoCaption_hi: "खेत से ताजी खोदी गई मूंगफली की फलियां (Arachis hypogaea)",
    plantParts: {
      seed: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "groundnut", "peanut", "moongphali", "mungfali", "मूंगफली", "arachis hypogaea", "verkkadalai", "verusenaga", "shengdana"
    ],
  },

  // 33. Sunflower / सूरजमुखी
  {
    id: "sunflower",
    primaryName_en: "Sunflower",
    primaryName_hi: "सूरजमुखी",
    category: "Oilseed",
    emoji: "🌻",
    photoUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Vibrant yellow sunflowers in crop field (Helianthus annuus)",
    photoCaption_hi: "सूरज की ओर मुख किए पीले सूरजमुखी के फूल (Helianthus annuus)",
    aliases: [
      "sunflower", "surajmukhi", "suraj mukhi", "सूरजमुखी", "helianthus annuus", "suryakanthi"
    ],
  },

  // 34. Tulsi / Holy Basil / तुलसी
  {
    id: "tulsi",
    primaryName_en: "Tulsi / Holy Basil",
    primaryName_hi: "तुलसी",
    category: "Medicinal",
    emoji: "🌿",
    photoUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Aromatic holy basil foliage and blossoms (Ocimum tenuiflorum)",
    photoCaption_hi: "पवित्र तुलसी का पौधा व मंजरी (Ocimum tenuiflorum)",
    plantParts: {
      leaf: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "tulsi", "holy basil", "basil", "तुलसी", "ocimum tenuiflorum", "thulasi"
    ],
  },

  // 35. Neem / नीम
  {
    id: "neem",
    primaryName_en: "Neem",
    primaryName_hi: "नीम",
    category: "Medicinal",
    emoji: "🌳",
    photoUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Pinnate compound leaves of Neem tree (Azadirachta indica)",
    photoCaption_hi: "नीम के पेड़ की हरी औषधीय पत्तियां (Azadirachta indica)",
    plantParts: {
      leaf: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "neem", "nim", "नीम", "azadirachta indica", "veppam", "vepa"
    ],
  },

  // 36. Pearl Millet / बाजरा
  {
    id: "bajra",
    primaryName_en: "Pearl Millet / Bajra",
    primaryName_hi: "बाजरा",
    category: "Cereal",
    emoji: "🌾",
    photoUrl: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Robust pearl millet crop spikes (Pennisetum glaucum)",
    photoCaption_hi: "खेत में खड़ी बाजरे की लंबी बालियां (Pennisetum glaucum)",
    aliases: [
      "bajra", "pearl millet", "millet", "बाजरा", "pennisetum glaucum", "kambu", "sajjalu"
    ],
  },

  // 37. Sorghum / ज्वार
  {
    id: "jowar",
    primaryName_en: "Sorghum / Jowar",
    primaryName_hi: "ज्वार",
    category: "Cereal",
    emoji: "🌾",
    photoUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Sorghum heads maturing under sun (Sorghum bicolor)",
    photoCaption_hi: "ज्वार की लहलहाती फसल व दाने (Sorghum bicolor)",
    aliases: [
      "jowar", "sorghum", "great millet", "ज्वार", "sorghum bicolor", "cholam", "jonna"
    ],
  },

  // 38. Watermelon / तरबूज
  {
    id: "watermelon",
    primaryName_en: "Watermelon",
    primaryName_hi: "तरबूज",
    category: "Fruit",
    emoji: "🍉",
    photoUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Striped watermelon on sandy farm patch (Citrullus lanatus)",
    photoCaption_hi: "खेत की बेल पर लगा हुआ बड़ा तरबूज (Citrullus lanatus)",
    aliases: [
      "watermelon", "tarbooj", "tarbuz", "तरबूज", "तरबुज", "कलिंद", "citrullus lanatus", "tharpoosani"
    ],
  },

  // 39. Tea / चाय
  {
    id: "tea",
    primaryName_en: "Tea",
    primaryName_hi: "चाय / चायपत्ती",
    category: "Plantation",
    emoji: "🍃",
    photoUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Lush green tea estate bushes (Camellia sinensis)",
    photoCaption_hi: "चाय के बागान की कोमल हरी पत्तियां (Camellia sinensis)",
    plantParts: {
      leaf: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=80",
    },
    aliases: [
      "tea", "chai", "cha", "चाय", "चायपत्ती", "camellia sinensis", "theila"
    ],
  },

  // 40. Coffee / कॉफी
  {
    id: "coffee",
    primaryName_en: "Coffee",
    primaryName_hi: "कॉफ़ी / कॉफी",
    category: "Plantation",
    emoji: "☕",
    photoUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    photoCaption_en: "Red ripe coffee cherries on tree branch (Coffea arabica)",
    photoCaption_hi: "कॉफी के पौधे पर पकी लाल चेरी (Coffea arabica)",
    aliases: [
      "coffee", "kapi", "कॉफी", "कॉफ़ी", "coffea"
    ],
  },
];

// Clean text for normalization
export function normalizeCropText(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[()[\]{}_,./\\!?:;'"~`@#$%^&*+=|<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Plant part keywords detector
export function detectPlantPart(query: string): "plant" | "leaf" | "stem" | "root" | "seed" | "fruit" | "flower" | null {
  const norm = normalizeCropText(query);
  
  if (norm.includes("leaf") || norm.includes("leaves") || norm.includes("पत्ती") || norm.includes("पत्तियां") || norm.includes("patta") || norm.includes("patti")) {
    return "leaf";
  }
  if (norm.includes("root") || norm.includes("जड़") || norm.includes("कंद") || norm.includes("rhizome") || norm.includes("tuber") || norm.includes("jad")) {
    return "root";
  }
  if (norm.includes("stem") || norm.includes("तनाव") || norm.includes("तना") || norm.includes("stalk") || norm.includes("tana")) {
    return "stem";
  }
  if (norm.includes("seed") || norm.includes("बीज") || norm.includes("grain") || norm.includes("dana") || norm.includes("beej")) {
    return "seed";
  }
  if (norm.includes("fruit") || norm.includes("फल") || norm.includes("fal") || norm.includes("pod") || norm.includes("fali")) {
    return "fruit";
  }
  if (norm.includes("flower") || norm.includes("फूल") || norm.includes("phool") || norm.includes("blossom")) {
    return "flower";
  }
  if (norm.includes("plant") || norm.includes("पौधा") || norm.includes("paudha") || norm.includes("tree") || norm.includes("पेड़")) {
    return "plant";
  }
  return null;
}

/**
 * Intelligent Crop Photo Finder
 * Strictly prevents mismatched or unrelated crops.
 * Returns null crop & neutral placeholder if not a verified crop/plant.
 */
export function findCropVisual(queryOrName: string | null | undefined): CropVisualResolution {
  if (!queryOrName || !queryOrName.trim()) {
    return {
      crop: null,
      matchedPart: null,
      photoUrl: null,
      isExactMatch: false,
      isNeutralPlaceholder: true,
      displayName_en: "Unspecified Plant",
      displayName_hi: "अनिर्दिष्ट पौधा",
      queryCleaned: "",
      statusMessage_en: "No crop name provided. Showing neutral plant placeholder.",
      statusMessage_hi: "कोई फसल का नाम नहीं दिया गया। तटस्थ प्रतिरूप दिखाया जा रहा है।",
    };
  }

  const cleaned = normalizeCropText(queryOrName);
  const part = detectPlantPart(queryOrName);

  // Noise words to strip during matching
  const noiseWords = [
    "crop", "plant", "tree", "leaf", "leaves", "stem", "root", "seed", "fruit", "flower",
    "fasal", "paudha", "ped", "patti", "tana", "jad", "beej", "fal", "phool",
    "ka", "ki", "ke", "disease", "rog", "rust", "blight", "curl", "rot", "problem", "spray"
  ];

  // Tokenize and extract core keywords
  const tokens = cleaned.split(" ").filter((t) => t.length > 0 && !noiseWords.includes(t));

  let matchedCrop: CropVisualData | null = null;
  let isExact = false;

  // 1. Direct ID check or direct aliases match
  for (const item of CROP_PHOTO_REGISTRY) {
    if (item.id === cleaned || item.primaryName_en.toLowerCase() === cleaned || item.primaryName_hi === queryOrName.trim()) {
      matchedCrop = item;
      isExact = true;
      break;
    }
    if (item.aliases.some((alias) => alias.toLowerCase() === cleaned)) {
      matchedCrop = item;
      isExact = true;
      break;
    }
  }

  // 2. Token / word boundary check
  if (!matchedCrop) {
    for (const item of CROP_PHOTO_REGISTRY) {
      // Check if any alias matches the query as a whole word or substring
      for (const alias of item.aliases) {
        const aliasNorm = normalizeCropText(alias);
        // Regex word boundary match
        const regex = new RegExp(`(^|\\s)${aliasNorm}(\\s|$)`, "i");
        if (regex.test(cleaned)) {
          matchedCrop = item;
          isExact = true;
          break;
        }
      }
      if (matchedCrop) break;
    }
  }

  // 3. Fallback: match tokens against aliases
  if (!matchedCrop && tokens.length > 0) {
    for (const item of CROP_PHOTO_REGISTRY) {
      for (const token of tokens) {
        if (token.length >= 3) {
          const hasMatch = item.aliases.some((alias) => {
            const a = normalizeCropText(alias);
            return a === token || a.startsWith(token) || token.startsWith(a);
          });
          if (hasMatch) {
            matchedCrop = item;
            break;
          }
        }
      }
      if (matchedCrop) break;
    }
  }

  // If no match found: Strictly enforce rule "Never show a mismatched or unrelated crop image"
  if (!matchedCrop) {
    return {
      crop: null,
      matchedPart: part,
      photoUrl: null,
      isExactMatch: false,
      isNeutralPlaceholder: true,
      displayName_en: queryOrName.trim(),
      displayName_hi: queryOrName.trim(),
      queryCleaned: cleaned,
      statusMessage_en: `No verified photograph found for '${queryOrName}'. Neutral placeholder active to avoid mismatched imagery.`,
      statusMessage_hi: `'${queryOrName}' के लिए कोई सत्यापित फोटो नहीं मिली। गलत फोटो से बचने के लिए तटस्थ प्रतिरूप दिखाया जा रहा है।`,
    };
  }

  // Choose specific plant part photo if available, otherwise default crop photo
  let finalPhotoUrl = matchedCrop.photoUrl;
  if (part && matchedCrop.plantParts && matchedCrop.plantParts[part]) {
    finalPhotoUrl = matchedCrop.plantParts[part]!;
  }

  const partLabels: Record<string, { en: string; hi: string }> = {
    leaf: { en: "Leaf", hi: "पत्ती" },
    root: { en: "Root / Tuber", hi: "जड़ / कंद" },
    stem: { en: "Stem / Stalk", hi: "तना / डंठल" },
    seed: { en: "Seed / Grain", hi: "बीज / दाना" },
    fruit: { en: "Fruit / Pod", hi: "फल / फली" },
    flower: { en: "Flower", hi: "फूल" },
    plant: { en: "Plant", hi: "पौधा" },
  };

  return {
    crop: matchedCrop,
    matchedPart: part,
    photoUrl: finalPhotoUrl,
    isExactMatch: isExact,
    isNeutralPlaceholder: false,
    displayName_en: matchedCrop.primaryName_en,
    displayName_hi: matchedCrop.primaryName_hi,
    partBadge_en: part ? partLabels[part]?.en : undefined,
    partBadge_hi: part ? partLabels[part]?.hi : undefined,
    queryCleaned: cleaned,
    statusMessage_en: `Synchronized: ${matchedCrop.primaryName_en}${part ? ` (${partLabels[part]?.en})` : ""}`,
    statusMessage_hi: `सटीक मिलान: ${matchedCrop.primaryName_hi}${part ? ` (${partLabels[part]?.hi})` : ""}`,
  };
}

export const resolveCropPhoto = findCropVisual;
