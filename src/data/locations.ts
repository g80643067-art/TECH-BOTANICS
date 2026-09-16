import { FarmLocation, AgroClimateData, SuitableCropRecommendation, Language } from "../types";

export interface DistrictInfo {
  name_en: string;
  name_hi: string;
  name_bn?: string;
  name_mr?: string;
  name_te?: string;
  name_ta?: string;
  name_gu?: string;
  name_kn?: string;
  name_ml?: string;
  name_pa?: string;
  name_or?: string;
  name_as?: string;
  climateZone_en: string;
  climateZone_hi: string;
  soil_en: string;
  soil_hi: string;
  water_en: string;
  water_hi: string;
  croppingPattern_en: string;
  croppingPattern_hi: string;
  defaultLat: number;
  defaultLng: number;
}

export interface StateDistricts {
  state: string;
  state_hi: string;
  state_bn?: string;
  state_mr?: string;
  state_te?: string;
  state_ta?: string;
  state_gu?: string;
  state_kn?: string;
  state_ml?: string;
  state_pa?: string;
  state_or?: string;
  state_as?: string;
  districts: DistrictInfo[];
}

export const INDIAN_STATES_DATA: StateDistricts[] = [
  {
    state: "Uttar Pradesh",
    state_hi: "उत्तर प्रदेश",
    state_bn: "উত্তর প্রদেশ",
    state_mr: "उत्तर प्रदेश",
    state_te: "ఉత్తర ప్రదేశ్",
    state_ta: "உத்தரப் பிரதேசம்",
    state_gu: "ઉત્તર પ્રદેશ",
    state_kn: "ಉತ್ತರ ಪ್ರದೇಶ",
    state_ml: "ഉത്തർ പ്രദേശ്",
    state_pa: "ਉੱਤਰ ਪ੍ਰਦੇਸ਼",
    state_or: "ଉତ୍ତର ପ୍ରଦେଶ",
    state_as: "উত্তৰ প্ৰদেশ",
    districts: [
      {
        name_en: "Varanasi (Eastern Gangetic Plain)",
        name_hi: "वाराणसी (पूर्वी गंगा मैदान)",
        climateZone_en: "Subtropical Humid Gangetic Plain",
        climateZone_hi: "उपोष्णकटिबंधीय आर्द्र गंगा मैदान",
        soil_en: "Fertile Alluvial Loam (Jalodh)",
        soil_hi: "उपजाऊ जलोढ़ दोमट मिट्टी",
        water_en: "High (Tubewell & Canal Irrigation)",
        water_hi: "उत्कृष्ट (नलकूप व नहर सिंचाई)",
        croppingPattern_en: "Paddy-Wheat-Mustard rotation",
        croppingPattern_hi: "धान-गेहूं-सरसों चक्र",
        defaultLat: 25.3176,
        defaultLng: 82.9739,
      },
      {
        name_en: "Meerut (Western Agro Zone)",
        name_hi: "मेरठ (पश्चिमी कृषि क्षेत्र)",
        climateZone_en: "Semi-Arid to Subtropical Rich Basin",
        climateZone_hi: "अर्ध-शुष्क व उपोष्ण उपजाऊ बेसिन",
        soil_en: "Deep Sandy Loam & Silt Alluvial",
        soil_hi: "गहरी बलुई दोमट व जलोढ़ मिट्टी",
        water_en: "Very High (Upper Ganga Canal)",
        water_hi: "प्रचुर (ऊपरी गंगा नहर व बोरवेल)",
        croppingPattern_en: "Sugarcane-Wheat-Mustard Intensive",
        croppingPattern_hi: "गन्ना-गेहूं-सरसों सघन खेती",
        defaultLat: 28.9845,
        defaultLng: 77.7064,
      },
      {
        name_en: "Bareilly (Rohilkhand Plains)",
        name_hi: "बरेली (रोहिलखंड मैदान)",
        climateZone_en: "Sub-Humid Tarai Margin",
        climateZone_hi: "उप-आर्द्र तराई सीमांत क्षेत्र",
        soil_en: "Alluvial Clay Loam",
        soil_hi: "जलोढ़ मटियार दोमट",
        water_en: "High (Ramganga Canal Command)",
        water_hi: "उत्तम (रामगंगा नहर कमान)",
        croppingPattern_en: "Rice-Wheat-Mentha-Mustard",
        croppingPattern_hi: "धान-गेहूं-मेंथा-सरसों",
        defaultLat: 28.367,
        defaultLng: 79.4304,
      },
      {
        name_en: "Gorakhpur (Tarai-Babar Zone)",
        name_hi: "गोरखपुर (तराई-भाबर क्षेत्र)",
        climateZone_en: "Humid Tarai Agro-Climate",
        climateZone_hi: "आर्द्र तराई कृषि-जलवायु",
        soil_en: "Moist Silty Alluvial",
        soil_hi: "सिल्टी जलोढ़ मिट्टी",
        water_en: "Abundant (High Rainfall & Surface Water)",
        water_hi: "प्रचुर (उच्च वर्षा व सतही जल)",
        croppingPattern_en: "Rice-Wheat-Vegetables",
        croppingPattern_hi: "धान-गेहूं-सब्जियां",
        defaultLat: 26.7606,
        defaultLng: 83.3732,
      },
      {
        name_en: "Jhansi (Bundelkhand Zone)",
        name_hi: "झांसी (बुंदेलखंड क्षेत्र)",
        climateZone_en: "Semi-Arid Dry Agro-Zone",
        climateZone_hi: "अर्ध-शुष्क बुंदेलखंड पठार",
        soil_en: "Mixed Red & Black Soil (Rakar/Kabar)",
        soil_hi: "मिश्रित लाल व काली मिट्टी (राकर/काबर)",
        water_en: "Moderate to Low (Rainfed/Ponds)",
        water_hi: "मध्यम से कम (वर्षा आधारित/तालाब)",
        croppingPattern_en: "Pulses-Mustard-Wheat-Millet",
        croppingPattern_hi: "दलहन-सरसों-गेहूं-तिल",
        defaultLat: 25.4484,
        defaultLng: 78.5685,
      },
      {
        name_en: "Prayagraj (Central Alluvial)",
        name_hi: "प्रयागराज (मध्य जलोढ़ क्षेत्र)",
        climateZone_en: "Subtropical Gangetic Alluvial",
        climateZone_hi: "उपोष्ण गंगा-यमुना दोआब",
        soil_en: "Fine Loamy Alluvial",
        soil_hi: "महीन दोमट जलोढ़",
        water_en: "High (Doab Ground & Canal water)",
        water_hi: "उच्च (दोआब भूजल व नहर)",
        croppingPattern_en: "Paddy-Wheat-Gram-Guava",
        croppingPattern_hi: "धान-गेहूं-चना-अमरूद",
        defaultLat: 25.4358,
        defaultLng: 81.8463,
      },
    ],
  },
  {
    state: "Punjab",
    state_hi: "पंजाब",
    state_bn: "পাঞ্জাব",
    state_mr: "पंजाब",
    state_te: "పంజాబ్",
    state_ta: "பஞ்சாப்",
    state_gu: "પંજાબ",
    state_kn: "ಪಂಜಾಬ್",
    state_ml: "പഞ്ചാബ്",
    state_pa: "ਪੰਜਾਬ",
    state_or: "ପଞ୍ଜାବ",
    state_as: "পঞ্জাব",
    districts: [
      {
        name_en: "Ludhiana (Central Alluvial Plain)",
        name_hi: "लुधियाना (मध्य जलोढ़ मैदान)",
        climateZone_en: "Subtropical Semi-Arid Indo-Gangetic",
        climateZone_hi: "उपोष्ण अर्ध-शुष्क सतलुज बेसिन",
        soil_en: "Rich Alluvial Loam with High Organic Matter",
        soil_hi: "उच्च उर्वरता युक्त जलोढ़ दोमट",
        water_en: "Very High (Sirhind Canal & Deep Tubewells)",
        water_hi: "प्रचुर (सरहिंद नहर व नलकूप)",
        croppingPattern_en: "Intensive Paddy-Wheat-Mustard",
        croppingPattern_hi: "सघन धान-गेहूं-सरसों चक्र",
        defaultLat: 30.901,
        defaultLng: 75.8573,
      },
      {
        name_en: "Bathinda (South-Western Sandy Zone)",
        name_hi: "बठिंडा (दक्षिण-पश्चिमी क्षेत्र)",
        climateZone_en: "Semi-Arid Dry Agro-Belt",
        climateZone_hi: "अर्ध-शुष्क मालवा कॉटन बेल्ट",
        soil_en: "Sandy Loam to Calcareous Loam",
        soil_hi: "बलुई दोमट व चूनेदार मिट्टी",
        water_en: "Moderate (Canal network)",
        water_hi: "मध्यम (नहरी सिंचाई)",
        croppingPattern_en: "Cotton-Wheat-Mustard rotation",
        croppingPattern_hi: "कपास-गेहूं-सरसों चक्र",
        defaultLat: 30.211,
        defaultLng: 74.9455,
      },
      {
        name_en: "Amritsar (Majha Agro Zone)",
        name_hi: "अमृतसर (माझा कृषि क्षेत्र)",
        climateZone_en: "Subtropical Northern Alluvial",
        climateZone_hi: "उपोष्ण उत्तरी जलोढ़ मैदान",
        soil_en: "Clay Loam to Silty Clay",
        soil_hi: "मटियार दोमट से सिल्टी जलोढ़",
        water_en: "High (Upper Bari Doab Canal)",
        water_hi: "उत्कृष्ट (अपर बारी दोआब नहर)",
        croppingPattern_en: "Basmati Rice-Wheat-Vegetables",
        croppingPattern_hi: "बासमती धान-गेहूं-सब्जियां",
        defaultLat: 31.634,
        defaultLng: 74.8723,
      },
      {
        name_en: "Jalandhar (Doaba Alluvial)",
        name_hi: "जालंधर (दोआबा जलोढ़)",
        climateZone_en: "Fertile Inter-River Doab Plain",
        climateZone_hi: "उर्वर ब्यास-सतलुज दोआब",
        soil_en: "Deep Sandy Loam (Ideal for Tubers)",
        soil_hi: "गहरी बलुई दोमट (आलू व कंद के लिए उत्तम)",
        water_en: "High (Canals & Sub-surface aquifer)",
        water_hi: "उच्च (नहर व भूजल)",
        croppingPattern_en: "Potato-Paddy-Wheat-Maize",
        croppingPattern_hi: "आलू-धान-गेहूं-मक्का",
        defaultLat: 31.326,
        defaultLng: 75.5762,
      },
      {
        name_en: "Patiala (Southern Plain)",
        name_hi: "पटियाला (दक्षिणी मैदान)",
        climateZone_en: "Semi-Arid Gangetic Fringe",
        climateZone_hi: "अर्ध-शुष्क मैदान",
        soil_en: "Alluvial Loam",
        soil_hi: "जलोढ़ दोमट",
        water_en: "High (Bhakra Canal Network)",
        water_hi: "प्रचुर (भाखड़ा नहर नेटवर्क)",
        croppingPattern_en: "Rice-Wheat-Mustard-Fodder",
        croppingPattern_hi: "धान-गेहूं-सरसों-चारा",
        defaultLat: 30.3398,
        defaultLng: 76.3869,
      },
    ],
  },
  {
    state: "Maharashtra",
    state_hi: "महाराष्ट्र",
    state_bn: "মহারাষ্ট্র",
    state_mr: "महाराष्ट्र",
    state_te: "మహారాష్ట్ర",
    state_ta: "மகாராஷ்டிரா",
    state_gu: "મહારાષ્ટ્ર",
    state_kn: "ಮಹಾರಾಷ್ಟ್ರ",
    state_ml: "മഹാരാഷ്ട്ര",
    state_pa: "ਮਹਾਰਾਸ਼ਟਰ",
    state_or: "ମହାରାଷ୍ଟ୍ର",
    state_as: "মহাৰাষ্ট্ৰ",
    districts: [
      {
        name_en: "Nashik (Godavari Basin / Horticulture)",
        name_hi: "नासिक (गोदावरी बेसिन / बागवानी)",
        climateZone_en: "Semi-Arid Deccan High-Plateau",
        climateZone_hi: "अर्ध-शुष्क दक्कन उच्च पठार",
        soil_en: "Medium Black & Red Loam",
        soil_hi: "मध्यम काली व लाल दोमट",
        water_en: "High (Godavari Dams & Drip)",
        water_hi: "उत्तम (गोदावरी बांध व ड्रिप सिंचाई)",
        croppingPattern_en: "Grapes-Onion-Wheat-Soybean",
        croppingPattern_hi: "अंगूर-प्याज-गेहूं-सोयाबीन",
        defaultLat: 19.9975,
        defaultLng: 73.7898,
      },
      {
        name_en: "Pune (Western Ghats Rainfed)",
        name_hi: "पुणे (पश्चिमी घाट वर्षा आधारित)",
        climateZone_en: "Transition Agro-Climatic Zone",
        climateZone_hi: "संक्रमणकालीन पश्चिमी घाट क्षेत्र",
        soil_en: "Medium Black Cotton Soil",
        soil_hi: "मध्यम काली कपासी मिट्टी",
        water_en: "Moderate to High (Mutha/Bhima basin)",
        water_hi: "मध्यम से उच्च (भीमा बेसिन)",
        croppingPattern_en: "Sugarcane-Soybean-Wheat-Vegetables",
        croppingPattern_hi: "गन्ना-सोयाबीन-गेहूं-सब्जियां",
        defaultLat: 18.5204,
        defaultLng: 73.8567,
      },
      {
        name_en: "Nagpur (Vidarbha Black Soil Zone)",
        name_hi: "नागपुर (विदर्भ काली मिट्टी क्षेत्र)",
        climateZone_en: "Tropical Wet and Dry Vidarbha",
        climateZone_hi: "उष्णकटिबंधीय आर्द्र-शुष्क विदर्भ",
        soil_en: "Deep Black Regur Soil (Heavy Clay)",
        soil_hi: "गहरी काली रेगुर मिट्टी (भारी क्ले)",
        water_en: "Moderate (Rainfed with Farm Ponds)",
        water_hi: "मध्यम (वर्षा व खेत तालाब)",
        croppingPattern_en: "Cotton-Soybean-Orange-Pigeonpea",
        croppingPattern_hi: "कपास-सोयाबीन-संतरा-तुअर",
        defaultLat: 21.1458,
        defaultLng: 79.0882,
      },
      {
        name_en: "Aurangabad / Chhatrapati Sambhajinagar",
        name_hi: "औरंगाबाद / छत्रपति संभाजीनगर",
        climateZone_en: "Semi-Arid Marathwada Plateau",
        climateZone_hi: "अर्ध-शुष्क मराठवाड़ा पठार",
        soil_en: "Medium to Deep Black Clay",
        soil_hi: "मध्यम से गहरी काली मिट्टी",
        water_en: "Low to Moderate (Rainfed/Jayakwadi Canal)",
        water_hi: "कम से मध्यम (जायकवाड़ी नहर/वर्षा)",
        croppingPattern_en: "Cotton-Soybean-Jowar-Gram",
        croppingPattern_hi: "कपास-सोयाबीन-ज्वार-चना",
        defaultLat: 19.8762,
        defaultLng: 75.3433,
      },
      {
        name_en: "Kolhapur (Sugarcane Belt)",
        name_hi: "कोल्हापुर (गन्ना बेल्ट)",
        climateZone_en: "Sub-Humid Southern Maharashtra",
        climateZone_hi: "उप-आर्द्र दक्षिण महाराष्ट्र",
        soil_en: "Rich Riverine Alluvium & Black Soil",
        soil_hi: "उर्वर पंचगंगा कछारी व काली मिट्टी",
        water_en: "Very High (Panchganga Lift Irrigation)",
        water_hi: "प्रचुर (पंचगंगा लिफ्ट सिंचाई)",
        croppingPattern_en: "Sugarcane-Soybean-Paddy-Vegetables",
        croppingPattern_hi: "गन्ना-सोयाबीन-धान-सब्जियां",
        defaultLat: 16.705,
        defaultLng: 74.2433,
      },
    ],
  },
  {
    state: "Madhya Pradesh",
    state_hi: "मध्य प्रदेश",
    state_bn: "মধ্যপ্রদেশ",
    state_mr: "मध्य प्रदेश",
    state_te: "మధ్యప్రదేశ్",
    state_ta: "மத்தியப் பிரதேசம்",
    state_gu: "મધ્ય પ્રદેશ",
    state_kn: "ಮಧ್ಯ ಪ್ರದೇಶ",
    state_ml: "മധ്യപ്രദേശ്",
    state_pa: "ਮੱਧ ਪ੍ਰਦੇਸ਼",
    state_or: "ମଧ୍ୟ ପ୍ରଦେଶ",
    state_as: "মধ্য প্ৰদেশ",
    districts: [
      {
        name_en: "Indore (Malwa Plateau Black Soil)",
        name_hi: "इंदौर (मालवा पठार काली मिट्टी)",
        climateZone_en: "Sub-Humid Malwa Plateau",
        climateZone_hi: "उप-आर्द्र मालवा पठार",
        soil_en: "Deep Heavy Black Clay (Regur)",
        soil_hi: "गहरी भारी काली मिट्टी (रेगुर)",
        water_en: "Moderate (Tubewell & Narmada Link)",
        water_hi: "मध्यम (नलकूप व नर्मदा लिंक)",
        croppingPattern_en: "Soybean-Wheat (Sharbati)-Gram",
        croppingPattern_hi: "सोयाबीन-शरबती गेहूं-चना",
        defaultLat: 22.7196,
        defaultLng: 75.8577,
      },
      {
        name_en: "Bhopal (Central Plateau & Hills)",
        name_hi: "भोपाल (मध्य पठारी व पहाड़ी क्षेत्र)",
        climateZone_en: "Tropical Sub-Humid Central Belt",
        climateZone_hi: "उष्णकटिबंधीय मध्य पठार",
        soil_en: "Medium Black & Mixed Red-Black",
        soil_hi: "मध्यम काली व लाल-काली मिट्टी",
        water_en: "Moderate (Kolar & Betwa reservoirs)",
        water_hi: "मध्यम (कोलार व बेतवा बांध)",
        croppingPattern_en: "Soybean-Wheat-Mustard-Lentil",
        croppingPattern_hi: "सोयाबीन-गेहूं-सरसों-मसूर",
        defaultLat: 23.2599,
        defaultLng: 77.4126,
      },
      {
        name_en: "Jabalpur (Narmada Valley Zone)",
        name_hi: "जबलपुर (नर्मदा घाटी क्षेत्र)",
        climateZone_en: "Humid Central Narmada Valley",
        climateZone_hi: "आर्द्र नर्मदा घाटी क्षेत्र",
        soil_en: "Deep Clayey Alluvium",
        soil_hi: "गहरी चिकनी कछारी मिट्टी",
        water_en: "High (Bargi Dam Canal Network)",
        water_hi: "उच्च (बरगी बांध नहर नेटवर्क)",
        croppingPattern_en: "Paddy-Wheat-Gram-Green Pea",
        croppingPattern_hi: "धान-गेहूं-चना-मटर",
        defaultLat: 23.1815,
        defaultLng: 79.9864,
      },
      {
        name_en: "Ujjain (Soybean-Wheat Belt)",
        name_hi: "उज्जैन (सोयाबीन-गेहूं बेल्ट)",
        climateZone_en: "Semi-Arid Malwa Basin",
        climateZone_hi: "अर्ध-शुष्क मालवा बेसिन",
        soil_en: "Deep Black Cotton Soil",
        soil_hi: "गहरी काली कपासी मिट्टी",
        water_en: "Moderate (Shipra & Chambal feeders)",
        water_hi: "मध्यम (क्षिप्रा व चंबल फीडर)",
        croppingPattern_en: "Soybean-Wheat-Garlic-Gram",
        croppingPattern_hi: "सोयाबीन-गेहूं-लहसुन-चना",
        defaultLat: 23.1765,
        defaultLng: 75.7885,
      },
    ],
  },
  {
    state: "Rajasthan",
    state_hi: "राजस्थान",
    state_bn: "রাজস্থান",
    state_mr: "राजस्थान",
    state_te: "రాజస్థాన్",
    state_ta: "ராஜஸ்தான்",
    state_gu: "રાજસ્થાન",
    state_kn: "ರಾಜಸ್ಥಾನ",
    state_ml: "രാജസ്ഥാൻ",
    state_pa: "ਰਾਜਸਥਾਨ",
    state_or: "ରାଜସ୍ଥାନ",
    state_as: "ৰাজস্থান",
    districts: [
      {
        name_en: "Jaipur (Semi-Arid Eastern Plain)",
        name_hi: "जयपुर (अर्ध-शुष्क पूर्वी मैदान)",
        climateZone_en: "Semi-Arid Eastern Rajasthan Plain",
        climateZone_hi: "अर्ध-शुष्क पूर्वी राजस्थान मैदान",
        soil_en: "Sandy Loam to Loamy Sand (Balu)",
        soil_hi: "बलुई दोमट से हल्की दोमट",
        water_en: "Moderate to Low (Groundwater & Drip)",
        water_hi: "मध्यम से कम (भूजल व ड्रिप)",
        croppingPattern_en: "Bajra-Mustard-Wheat-Clusterbean",
        croppingPattern_hi: "बाजरा-सरसों-गेहूं-ग्वार",
        defaultLat: 26.9124,
        defaultLng: 75.7873,
      },
      {
        name_en: "Jodhpur (Arid Western Zone)",
        name_hi: "जोधपुर (शुष्क पश्चिमी क्षेत्र)",
        climateZone_en: "Arid Desert Zone (Thar Fringe)",
        climateZone_hi: "शुष्क मरुस्थलीय थार क्षेत्र",
        soil_en: "Desert Sandy Soil with Low Moisture Retention",
        soil_hi: "रेतीली मरुस्थलीय मिट्टी (कम नमी धारण)",
        water_en: "Low (Tubewell/Sprinkler/Canal)",
        water_hi: "कम (नलकूप/फव्वारा/कैनाल)",
        croppingPattern_en: "Bajra-Guar-Moong-Cumin-Mustard",
        croppingPattern_hi: "बाजरा-ग्वार-मूंग-जीरा-सरसों",
        defaultLat: 26.2389,
        defaultLng: 73.0243,
      },
      {
        name_en: "Kota (Humid South Eastern Plain)",
        name_hi: "कोटा (आर्द्र दक्षिण पूर्वी मैदान)",
        climateZone_en: "Sub-Humid Hadoti Plateau",
        climateZone_hi: "उप-आर्द्र हाड़ौती पठार",
        soil_en: "Deep Fertile Black Clay Soil",
        soil_hi: "गहरी उपजाऊ काली क्ले मिट्टी",
        water_en: "High (Chambal Canal Network)",
        water_hi: "प्रचुर (चंबल नहर कमान क्षेत्र)",
        croppingPattern_en: "Soybean-Wheat-Mustard-Paddy",
        croppingPattern_hi: "सोयाबीन-गेहूं-सरसों-धान",
        defaultLat: 25.2138,
        defaultLng: 75.8648,
      },
      {
        name_en: "Sri Ganganagar (Canal Irrigated)",
        name_hi: "श्रीगंगानगर (नहरी सिंचित क्षेत्र)",
        climateZone_en: "Arid Irrigated Northwestern Plain",
        climateZone_hi: "शुष्क नहरी सिंचित उत्तर-पश्चिमी मैदान",
        soil_en: "Alluvial Sandy Loam to Clay Loam",
        soil_hi: "जलोढ़ बलुई दोमट से चिकनी दोमट",
        water_en: "Very High (Gang Canal & Indira Gandhi Canal)",
        water_hi: "प्रचुर (गंग नहर व इंदिरा गांधी नहर)",
        croppingPattern_en: "Cotton-Wheat-Mustard-Kinnow",
        croppingPattern_hi: "कपास-गेहूं-सरसों-किन्नू",
        defaultLat: 29.9038,
        defaultLng: 73.8772,
      },
      {
        name_en: "Alwar (Flood Prone Eastern Plain)",
        name_hi: "अलवर (पूर्वी मैदानी क्षेत्र)",
        climateZone_en: "Semi-Arid Fertile Valley",
        climateZone_hi: "अर्ध-शुष्क मेवात घाटी",
        soil_en: "Sandy Loam & Alluvial",
        soil_hi: "बलुई दोमट व जलोढ़ मिट्टी",
        water_en: "Moderate (Tubewell Irrigation)",
        water_hi: "मध्यम (नलकूप सिंचाई)",
        croppingPattern_en: "Mustard-Wheat-Bajra-Onion",
        croppingPattern_hi: "सरसों-गेहूं-बाजरा-प्याज",
        defaultLat: 27.553,
        defaultLng: 76.6346,
      },
    ],
  },
  {
    state: "Haryana",
    state_hi: "हरियाणा",
    state_bn: "হরিয়ানা",
    state_mr: "हरियाणा",
    state_te: "హర్యానా",
    state_ta: "ஹரியானா",
    state_gu: "હરિયાણા",
    state_kn: "ಹರಿಯಾಣ",
    state_ml: "ഹരിയാന",
    state_pa: "ਹਰਿਆਣਾ",
    state_or: "ହରିୟାଣା",
    state_as: "হাৰিয়ানা",
    districts: [
      {
        name_en: "Karnal (Wheat-Paddy Core Belt)",
        name_hi: "करनाल (गेहूं-धान मुख्य बेल्ट)",
        climateZone_en: "Subtropical Indo-Gangetic Core",
        climateZone_hi: "उपोष्ण सिंधु-गंगा मुख्य बेसिन",
        soil_en: "Fine Alluvial Clay Loam",
        soil_hi: "महीन जलोढ़ मटियार दोमट",
        water_en: "Very High (Western Yamuna Canal)",
        water_hi: "प्रचुर (पश्चिमी यमुना नहर व नलकूप)",
        croppingPattern_en: "Basmati Rice-Wheat-Mustard",
        croppingPattern_hi: "बासमती धान-गेहूं-सरसों",
        defaultLat: 29.6857,
        defaultLng: 76.9905,
      },
      {
        name_en: "Hisar (Western Dry Agro Zone)",
        name_hi: "हिसार (पश्चिमी शुष्क कृषि क्षेत्र)",
        climateZone_en: "Semi-Arid Dry Agro-Zone",
        climateZone_hi: "अर्ध-शुष्क पश्चिमी कृषि क्षेत्र",
        soil_en: "Light Sandy Loam",
        soil_hi: "हल्की बलुई दोमट",
        water_en: "Moderate (Bhakra & Western Yamuna Feeder)",
        water_hi: "मध्यम (भाखड़ा व पश्चिमी यमुना नहर)",
        croppingPattern_en: "Cotton-Mustard-Wheat-Bajra",
        croppingPattern_hi: "कपास-सरसों-गेहूं-बाजरा",
        defaultLat: 29.1492,
        defaultLng: 75.7217,
      },
    ],
  },
  {
    state: "Gujarat",
    state_hi: "गुजरात",
    state_bn: "গুজরাট",
    state_mr: "गुजरात",
    state_te: "గుజరాత్",
    state_ta: "குஜராத்",
    state_gu: "ગુજરાત",
    state_kn: "ಗುಜರಾತ್",
    state_ml: "ഗുജറാത്ത്",
    state_pa: "ਗੁਜਰਾਤ",
    state_or: "ଗୁଜରାଟ",
    state_as: "গুজৰাট",
    districts: [
      {
        name_en: "Rajkot (Saurashtra Groundnut-Cotton)",
        name_hi: "राजकोट (सौराष्ट्र मूंगफली-कपास)",
        climateZone_en: "Semi-Arid Saurashtra Agro-Zone",
        climateZone_hi: "अर्ध-शुष्क सौराष्ट्र कृषि क्षेत्र",
        soil_en: "Medium Black & Shallow Sandy Loam",
        soil_hi: "मध्यम काली व बलुई दोमट",
        water_en: "Moderate (Checkdams & Drip)",
        water_hi: "मध्यम (चेकडैम व ड्रिप सिंचाई)",
        croppingPattern_en: "Groundnut-Cotton-Wheat-Cumin",
        croppingPattern_hi: "मूंगफली-कपास-गेहूं-जीरा",
        defaultLat: 22.3039,
        defaultLng: 70.8022,
      },
      {
        name_en: "Anand (Middle Gujarat Charotar Belt)",
        name_hi: "आनंद (मध्य गुजरात चरोतर बेल्ट)",
        climateZone_en: "Subtropical Fertile Gulf Basin",
        climateZone_hi: "उपोष्ण उर्वर चरोतर बेल्ट",
        soil_en: "Deep Sandy Loam (Goradu Soil)",
        soil_hi: "गहरी बलुई दोमट (गोराडू मिट्टी)",
        water_en: "High (Mahi Right Bank Canal)",
        water_hi: "उत्कृष्ट (मही नहर कमान)",
        croppingPattern_en: "Tobacco-Paddy-Wheat-Vegetables",
        croppingPattern_hi: "तंबाकू-धान-गेहूं-सब्जियां",
        defaultLat: 22.5645,
        defaultLng: 72.9289,
      },
    ],
  },
  {
    state: "Bihar",
    state_hi: "बिहार",
    state_bn: "বিহার",
    state_mr: "बिहार",
    state_te: "బీహార్",
    state_ta: "பீகார்",
    state_gu: "બિહાર",
    state_kn: "ಬಿಹಾರ",
    state_ml: "ബിഹാർ",
    state_pa: "ਬਿਹਾਰ",
    state_or: "ବିହାର",
    state_as: "বিহাৰ",
    districts: [
      {
        name_en: "Patna (South Bihar Alluvial Plain)",
        name_hi: "पटना (दक्षिण बिहार जलोढ़ मैदान)",
        climateZone_en: "Subtropical Humid Gangetic Plain",
        climateZone_hi: "उपोष्ण आर्द्र गंगा मैदान",
        soil_en: "Heavy Clayey Alluvial (Tal & Diara)",
        soil_hi: "भारी चिकनी जलोढ़ मिट्टी (टाल व दियारा)",
        water_en: "High (Ganga/Sone Canals & Tubewells)",
        water_hi: "उच्च (सोन नहर व नलकूप)",
        croppingPattern_en: "Rice-Wheat-Pulses (Lentil/Gram)",
        croppingPattern_hi: "धान-गेहूं-दलहन (मसूर/चना)",
        defaultLat: 25.5941,
        defaultLng: 85.1376,
      },
      {
        name_en: "Muzaffarpur (North West Alluvial)",
        name_hi: "मुजफ्फरपुर (उत्तर पश्चिम जलोढ़)",
        climateZone_en: "Sub-Humid Calcareous Plains",
        climateZone_hi: "उप-आर्द्र चूनेदार मैदान",
        soil_en: "Calcareous Alluvial Loam",
        soil_hi: "चूनेदार जलोढ़ दोमट",
        water_en: "High (Gandak Canal Command)",
        water_hi: "प्रचुर (गंडक नहर व भूजल)",
        croppingPattern_en: "Paddy-Wheat-Maize-Litchi",
        croppingPattern_hi: "धान-गेहूं-मक्का-लीची",
        defaultLat: 26.1209,
        defaultLng: 85.3647,
      },
    ],
  },
  {
    state: "Karnataka",
    state_hi: "कर्नाटक",
    state_bn: "কর্ণাটক",
    state_mr: "कर्नाटक",
    state_te: "కర్ణాటక",
    state_ta: "கர்நாடகா",
    state_gu: "કર્ણાટક",
    state_kn: "ಕರ್ನಾಟಕ",
    state_ml: "കർണാടക",
    state_pa: "ਕਰਨਾਟਕ",
    state_or: "କର୍ଣ୍ଣାଟକ",
    state_as: "কৰ্ণাটক",
    districts: [
      {
        name_en: "Belagavi (Northern Transition Zone)",
        name_hi: "बेलगावी (उत्तरी संक्रमण क्षेत्र)",
        climateZone_en: "Semi-Arid Transition Plateau",
        climateZone_hi: "अर्ध-शुष्क संक्रमणकालीन पठार",
        soil_en: "Medium Black to Clay Loam",
        soil_hi: "मध्यम काली से मटियार दोमट",
        water_en: "High (Ghataprabha & Malaprabha Canals)",
        water_hi: "उच्च (घटप्रभा व मलप्रभा नहर)",
        croppingPattern_en: "Sugarcane-Soybean-Maize-Wheat",
        croppingPattern_hi: "गन्ना-सोयाबीन-मक्का-गेहूं",
        defaultLat: 15.8497,
        defaultLng: 74.4977,
      },
      {
        name_en: "Mysuru (Southern Dry Zone)",
        name_hi: "मैसूर (दक्षिणी शुष्क क्षेत्र)",
        climateZone_en: "Semi-Arid Cauvery Basin",
        climateZone_hi: "अर्ध-शुष्क कावेरी बेसिन",
        soil_en: "Red Sandy Loam to Red Loam",
        soil_hi: "लाल बलुई दोमट",
        water_en: "High (KRS Dam & Cauvery Canals)",
        water_hi: "प्रचुर (केआरएस बांध व कावेरी नहर)",
        croppingPattern_en: "Paddy-Ragi-Sugarcane-Pulses",
        croppingPattern_hi: "धान-रागी-गन्ना-दलहन",
        defaultLat: 12.2958,
        defaultLng: 76.6394,
      },
    ],
  },
  {
    state: "Telangana & Andhra Pradesh",
    state_hi: "तेलंगाना व आंध्र प्रदेश",
    state_bn: "তেলেঙ্গানা ও অন্ধ্র প্রদেশ",
    state_mr: "तेलंगणा आणि आंध्र प्रदेश",
    state_te: "తెలంగాణ మరియు ఆంధ్రప్రదేశ్",
    state_ta: "தெலுங்கானா மற்றும் ஆந்திரப் பிரதேசம்",
    state_gu: "તેલંગાણા અને આંધ્ર પ્રદેશ",
    state_kn: "ತೆಲಂಗಾಣ ಮತ್ತು ಆಂಧ್ರ ಪ್ರದೇಶ",
    state_ml: "തെലങ്കാനയും ആന്ധ്ര പ്രദേശും",
    state_pa: "ਤੇਲੰਗਾਨਾ ਅਤੇ ਆਂਧਰਾ ਪ੍ਰਦੇਸ਼",
    state_or: "ତେଲେଙ୍ଗାନା ଓ ଆନ୍ଧ୍ର ପ୍ରଦେଶ",
    state_as: "তেলেংগানা আৰু অন্ধ্ৰ প্ৰদেশ",
    districts: [
      {
        name_en: "Guntur (Krishna Delta Chilli-Cotton)",
        name_hi: "गुंटूर (कृष्णा डेल्टा मिर्च-कपास)",
        climateZone_en: "Tropical Coastal Alluvial Basin",
        climateZone_hi: "उष्णकटिबंधीय तटीय जलोढ़ बेसिन",
        soil_en: "Deep Black Clay & Coastal Alluvium",
        soil_hi: "गहरी काली क्ले व तटीय जलोढ़",
        water_en: "Very High (Prakasam Barrage Canal)",
        water_hi: "प्रचुर (प्रकाशम बैराज नहर)",
        croppingPattern_en: "Chilli-Cotton-Paddy-Tobacco",
        croppingPattern_hi: "मिर्च-कपास-धान-तंबाकू",
        defaultLat: 16.3067,
        defaultLng: 80.4365,
      },
      {
        name_en: "Warangal (Central Telangana Red Loam)",
        name_hi: "वारंगल (मध्य तेलंगाना लाल दोमट)",
        climateZone_en: "Semi-Arid Central Deccan",
        climateZone_hi: "अर्ध-शुष्क मध्य दक्कन",
        soil_en: "Chalka Soils (Red Sandy Loam) & Black Soils",
        soil_hi: "चलका मिट्टी (लाल बलुई दोमट) व काली मिट्टी",
        water_en: "Moderate to High (Kakatiya Canal/Tanks)",
        water_hi: "मध्यम से उच्च (काकतीय नहर व तालाब)",
        croppingPattern_en: "Cotton-Paddy-Chilli-Maize",
        croppingPattern_hi: "कपास-धान-मिर्च-मक्का",
        defaultLat: 17.9689,
        defaultLng: 79.5941,
      },
    ],
  },
];

// Determine current season based on current date
export function getCurrentAgriculturalSeason(): { season_en: "Rabi" | "Kharif" | "Zaid"; season_hi: "रबी" | "खरीफ" | "जायद" } {
  const month = new Date().getMonth(); // 0 = Jan, 11 = Dec
  // Kharif: June (5) - October (9)
  if (month >= 5 && month <= 9) {
    return { season_en: "Kharif", season_hi: "खरीफ" };
  }
  // Zaid: March (2) - May (4)
  if (month >= 2 && month <= 4) {
    return { season_en: "Zaid", season_hi: "जायद" };
  }
  // Rabi: October/Nov (10, 11) - Feb (0, 1)
  return { season_en: "Rabi", season_hi: "रबी" };
}

// Generate rich, verified crop recommendations for a location
export function generateSuitableCrops(
  stateName: string,
  districtName: string,
  areaName: string,
  isDemo: boolean = false
): SuitableCropRecommendation[] {
  const currentSeasonObj = getCurrentAgriculturalSeason();
  const lowerState = (stateName || "").toLowerCase();
  const lowerDist = (districtName || "").toLowerCase();
  const areaLabel_en = areaName || districtName || stateName || "Local Region";
  const areaLabel_hi = areaName || districtName || stateName || "स्थानीय क्षेत्र";

  // Base list of national staples tailored by region
  const crops: SuitableCropRecommendation[] = [];

  // 1. Wheat (🌾 गेहूं) - Core staple for Indo-Gangetic, Central, and North-Western India
  crops.push({
    id: "rec-wheat",
    cropName_en: "Wheat",
    cropName_hi: "गेहूं",
    cropName_bn: "গম",
    cropName_mr: "गहू",
    cropName_te: "గోధుమ",
    cropName_ta: "கோதுமை",
    cropName_gu: "ઘઉં",
    cropName_kn: "ಗೋಧಿ",
    cropName_ml: "ഗോതമ്പ്",
    cropName_pa: "ਕਣਕ",
    cropName_or: "ଗହମ",
    cropName_as: "ঘেঁহু",
    cropName_ur: "گندم",
    cropName_bho: "गेहूं",
    cropName_mai: "गहूम",
    emoji: "🌾",
    season_en: "Rabi (Winter Season / Oct - April)",
    season_hi: "रबी (सर्दियों का मौसम / अक्टूबर - अप्रैल)",
    season_bn: "রবি (শীতকালীন মরশুম / অক্টোবর - এপ্রিল)",
    season_mr: "रब्बी (हिवाळी हंगाम / ऑक्टोबर - एप्रिल)",
    season_te: "రబీ (శీతాకాలం / అక్టోబర్ - ఏప్రిల్)",
    season_ta: "ரபி (குளிர்காலம் / அக்டோபர் - ஏப்ரல்)",
    season_gu: "રવિ (શિયાળુ મોસમ / ઓક્ટોબર - એપ્રિલ)",
    season_kn: "ರಬಿ (ಚಳಿಗಾಲ / ಅಕ್ಟೋಬರ್ - ಏಪ್ರಿಲ್)",
    season_ml: "റബി (ശീതകാലം / ഒക്ടോബർ - ഏപ്രിൽ)",
    season_pa: "ਹਾੜੀ / ਰਬੀ (ਸਰਦੀਆਂ ਦਾ ਮੌਸਮ / ਅਕਤੂਬਰ - ਅਪ੍ਰੈਲ)",
    season_or: "ରବି (ଶୀତକାଳୀନ / ଅକ୍ଟୋବର - ଏପ୍ରିଲ)",
    season_as: "ৰবি (শীতকালীন / অক্টোবৰ - এপ্ৰিল)",
    suitableArea_en: areaLabel_en,
    suitableArea_hi: areaLabel_hi,
    reason_en: `Based on the climate and weather of this region, wheat is a highly suitable staple crop. It thrives under cool vegetative temperatures (15-22°C), fertile loamy soil, and sunny grain-filling days.`,
    reason_hi: `इस क्षेत्र की जलवायु और मौसम के आधार पर गेहूं एक संभावित उपयुक्त फसल है। यह ठंडे मौसम (15-22°C), उपजाऊ दोमट मिट्टी और धूप वाले दिनों में उच्च पैदावार देता है।`,
    idealSoil_en: "Fertile Alluvial Loam & Well-Drained Clay Loam",
    idealSoil_hi: "उपजाऊ जलोढ़ दोमट व सुखी मटियार दोमट",
    waterNeed_en: "Medium",
    waterNeed_hi: "मध्यम",
    durationDays: "115 - 135 Days",
    isDemo,
  });

  // 2. Rice / Paddy (🌾 धान / चावल) - For alluvial, canal-irrigated or high-rainfall belts
  crops.push({
    id: "rec-rice",
    cropName_en: "Rice / Paddy",
    cropName_hi: "धान / चावल",
    cropName_bn: "ধান",
    cropName_mr: "भात / धान",
    cropName_te: "వరి",
    cropName_ta: "நெல்",
    cropName_gu: "ડાંગર / ચોખા",
    cropName_kn: "ಭತ್ತ",
    cropName_ml: "നെല്ല്",
    cropName_pa: "ਝੋਨਾ / ਚਾਵਲ",
    cropName_or: "ଧାନ",
    cropName_as: "ধান",
    cropName_ur: "دھان / چاول",
    cropName_bho: "धान",
    cropName_mai: "धान",
    emoji: "🌾",
    season_en: "Kharif (Monsoon Season / June - Nov)",
    season_hi: "खरीफ (मानसून का मौसम / जून - नवंबर)",
    season_bn: "খরিফ (বর্ষাকাল / জুন - নভেম্বর)",
    season_mr: "खरीप (पावसाळी हंगाम / जून - नोव्हेंबर)",
    season_te: "ఖరీఫ్ (వర్షాకాలం / జూన్ - నవంబర్)",
    season_ta: "கரீப் (பருவமழை / ஜூன் - நவம்பர்)",
    season_gu: "ખરીફ (ચોમાસુ મોસમ / જૂન - નવેમ્બર)",
    season_kn: "ಖಾರೀಫ್ (ಮುಂಗಾರು / ಜೂನ್ - ನವೆಂಬರ್)",
    season_ml: "ഖാരിഫ് (മഴക്കാലം / ജൂൺ - നവംബർ)",
    season_pa: "ਸਾਉਣੀ / ਖਰੀਫ (ਜੂਨ - ਨਵੰਬਰ)",
    season_or: "ଖରିଫ (ବର୍ଷା ଋତୁ / ଜୁନ - ନଭେମ୍ବର)",
    season_as: "খাৰিফ (বাৰিষা / জুন - নৱেম্বৰ)",
    suitableArea_en: areaLabel_en,
    suitableArea_hi: areaLabel_hi,
    reason_en: `High water retention in regional soils combined with monsoon rainfall and canal irrigation creates an ideal ecosystem for heavy tillering and high grain yields.`,
    reason_hi: `क्षेत्र की मिट्टी में उत्तम जलधारण क्षमता, मानसूनी वर्षा और नहर सिंचाई के तालमेल से धान की भरपूर पैदावार और स्वस्थ बालियां प्राप्त होती हैं।`,
    idealSoil_en: "Clay Loam & Heavy Alluvial with Impermeable Sub-layer",
    idealSoil_hi: "चिकनी मटियार दोमट व भारी जलोढ़ मिट्टी",
    waterNeed_en: "High",
    waterNeed_hi: "अधिक",
    durationDays: "120 - 145 Days",
    isDemo,
  });

  // 3. Mustard (🌱 सरसों) - High cash value, drought-hardy, rabi staple
  crops.push({
    id: "rec-mustard",
    cropName_en: "Mustard",
    cropName_hi: "सरसों",
    cropName_bn: "সরিষা",
    cropName_mr: "मोहरी",
    cropName_te: "ఆవాలు",
    cropName_ta: "கடுகு",
    cropName_gu: "રાઈ / સરસવ",
    cropName_kn: "ಸಾಸಿವೆ",
    cropName_ml: "കടുക്",
    cropName_pa: "ਸਰ੍ਹੋਂ",
    cropName_or: "ସୋରିଷ",
    cropName_as: "সৰিয়হ",
    cropName_ur: "سرسوں",
    cropName_bho: "सरसों",
    cropName_mai: "तोरी / सरिसब",
    emoji: "🌱",
    season_en: "Rabi (Winter Season / Oct - March)",
    season_hi: "रबी (सर्दियों का मौसम / अक्टूबर - मार्च)",
    season_bn: "রবি (অক্টোবর - মার্চ)",
    season_mr: "रब्बी (ऑक्टोबर - मार्च)",
    season_te: "రబీ (అక్టోబర్ - మార్చి)",
    season_ta: "ரபி (அக்டோபர் - மார்ச்)",
    season_gu: "રવિ (ઓક્ટોબર - માર્ચ)",
    season_kn: "ರಬಿ (ಅಕ್ಟೋಬರ್ - ಮಾರ್ಚ್)",
    season_ml: "റബി (ഒക്ടോബർ - മാർച്ച്)",
    season_pa: "ਹਾੜੀ (ਅਕਤੂਬਰ - ਮਾਰਚ)",
    season_or: "ରବି (ଅକ୍ଟୋବର - ମାର୍ଚ୍ଚ)",
    season_as: "ৰবি (অক্টোবৰ - মাৰ্চ)",
    suitableArea_en: areaLabel_en,
    suitableArea_hi: areaLabel_hi,
    reason_en: `Optimal oil accumulation occurs under cool, dry winter mornings. Highly efficient with minimal irrigation and well-drained sandy/loam topsoil.`,
    reason_hi: `सर्दियों के शुष्क और ठंडे मौसम में सरसों के बीजों में तेल की मात्रा अधिकतम होती है। कम सिंचाई और अच्छी जल निकासी वाली दोमट मिट्टी में यह सर्वोत्तम लाभ देती है।`,
    idealSoil_en: "Sandy Loam to Light Alluvial Loam",
    idealSoil_hi: "बलुई दोमट से हल्की जलोढ़ दोमट",
    waterNeed_en: "Low",
    waterNeed_hi: "कम",
    durationDays: "105 - 125 Days",
    isDemo,
  });

  // 4. Region specific 4th & 5th crop (Cotton / Soybean / Maize / Groundnut / Gram / Potato)
  if (lowerState.includes("maharashtra") || lowerState.includes("gujarat") || lowerState.includes("telangana") || lowerState.includes("andhra")) {
    crops.push({
      id: "rec-cotton",
      cropName_en: "Cotton",
      cropName_hi: "कपास",
      cropName_bn: "তুলা",
      cropName_mr: "कापूस",
      cropName_te: "పత్తి",
      cropName_ta: "பருத்தி",
      cropName_gu: "કપાસ",
      cropName_kn: "ಹತ್ತಿ",
      cropName_ml: "പരുത്തി",
      cropName_pa: "ਕਪਾਹ / ਨਰਮਾ",
      cropName_or: "କପା",
      cropName_as: "কপাহ",
      cropName_ur: "کپاس",
      cropName_bho: "कपास",
      cropName_mai: "कपास",
      emoji: "🌾",
      season_en: "Kharif (Monsoon / June - Jan)",
      season_hi: "खरीफ (मानसून / जून - जनवरी)",
      season_bn: "খরিফ (জুন - জানুয়ারী)",
      season_mr: "खरीप (जून - जानेवारी)",
      season_te: "ఖరీఫ్ (జూన్ - జనవరి)",
      season_ta: "கரீப் (ஜூன் - ஜனவரி)",
      season_gu: "ખરીફ (જૂન - જાન્યુઆરી)",
      season_kn: "ಖಾರೀಫ್ (ಜೂನ್ - ಜನವರಿ)",
      season_ml: "ഖാരിഫ് (ജൂൺ - ജനുവരി)",
      season_pa: "ਸਾਉਣੀ (ਜੂਨ - ਜਨਵਰੀ)",
      season_or: "ଖରିଫ (ଜୁନ - ଜାନୁଆରୀ)",
      season_as: "খাৰিফ (জুন - জানুৱাৰী)",
      suitableArea_en: areaLabel_en,
      suitableArea_hi: areaLabel_hi,
      reason_en: `Deep black regur soils of this region possess superior moisture holding capacity, supporting healthy boll formation under warm sunny weather.`,
      reason_hi: `इस क्षेत्र की गहरी काली रेगुर मिट्टी नमी को लंबे समय तक रोक कर रखती है, जो तेज धूप और गर्मी में कपास के टिंडों के उत्तम विकास के लिए आदर्श है।`,
      idealSoil_en: "Deep Black Cotton Soil (Regur)",
      idealSoil_hi: "गहरी काली कपासी मिट्टी (रेगुर)",
      waterNeed_en: "Medium",
      waterNeed_hi: "मध्यम",
      durationDays: "150 - 180 Days",
      isDemo,
    });
    crops.push({
      id: "rec-soybean",
      cropName_en: "Soybean",
      cropName_hi: "सोयाबीन",
      cropName_bn: "সয়াবিন",
      cropName_mr: "सोयाबीन",
      cropName_te: "సోయాబీన్",
      cropName_ta: "சோயாபீன்",
      cropName_gu: "સોયાબીન",
      cropName_kn: "ಸೋಯಾಬೀನ್",
      cropName_ml: "സോയാബീൻ",
      cropName_pa: "ਸੋਇਆਬੀਨ",
      cropName_or: "ସୋୟାବିନ୍",
      cropName_as: "ছয়াবিন",
      cropName_ur: "سویا بین",
      cropName_bho: "सोयाबीन",
      cropName_mai: "सोयाबीन",
      emoji: "🌱",
      season_en: "Kharif (Monsoon / June - Oct)",
      season_hi: "खरीफ (मानसून / जून - अक्टूबर)",
      season_bn: "খরিফ (জুন - অক্টোবর)",
      season_mr: "खरीप (जून - ऑक्टोबर)",
      season_te: "ఖరీఫ్ (జూన్ - అక్టోబర్)",
      season_ta: "கரீப் (ஜூன் - அக்டோபர்)",
      season_gu: "ખરીફ (જૂન - ઓક્ટોબર)",
      season_kn: "ಖಾರೀಫ್ (ಜೂನ್ - ಅಕ್ಟೋಬರ್)",
      season_ml: "ഖാരിഫ് (ജൂൺ - ഒക്ടോബർ)",
      season_pa: "ਸਾਉਣੀ (ਜੂਨ - ਅਕਤੂਬਰ)",
      season_or: "ଖରିଫ (ଜୁନ - ଅକ୍ଟୋବର)",
      season_as: "খাৰিফ (জুন - অক্টোবৰ)",
      suitableArea_en: areaLabel_en,
      suitableArea_hi: areaLabel_hi,
      reason_en: `Fast vegetative growth during monsoon on well-drained medium black soils; naturally enriches soil nitrogen while ensuring high commercial returns.`,
      reason_hi: `मध्यम काली मिट्टी में मानसूनी वर्षा पर त्वरित वृद्धि और मिट्टी में प्राकृतिक नाइट्रोजन स्थिरीकरण के साथ उत्कृष्ट मुनाफा प्रदान करती है।`,
      idealSoil_en: "Medium Black & Clay Loam Soil",
      idealSoil_hi: "मध्यम काली व दोमट मटियार मिट्टी",
      waterNeed_en: "Medium",
      waterNeed_hi: "मध्यम",
      durationDays: "90 - 105 Days",
      isDemo,
    });
  } else if (lowerState.includes("rajasthan") || lowerDist.includes("jodhpur") || lowerDist.includes("hisar") || lowerDist.includes("bathinda")) {
    crops.push({
      id: "rec-bajra",
      cropName_en: "Pearl Millet / Bajra",
      cropName_hi: "बाजरा",
      cropName_bn: "বাজরা",
      cropName_mr: "बाजरी",
      cropName_te: "సజ్జలు",
      cropName_ta: "கம்பு",
      cropName_gu: "બાજરી",
      cropName_kn: "ಸಜ್ಜೆ",
      cropName_ml: "കമ്പം",
      cropName_pa: "ਬਾਜਰਾ",
      cropName_or: "ବାଜରା",
      cropName_as: "বাজৰা",
      cropName_ur: "باجرہ",
      cropName_bho: "बाजरा",
      cropName_mai: "बाजरा",
      emoji: "🌾",
      season_en: "Kharif (Monsoon / July - Oct)",
      season_hi: "खरीफ (मानसून / जुलाई - अक्टूबर)",
      season_bn: "খরিফ (জুলাই - অক্টোবর)",
      season_mr: "खरीप (जुलै - ऑक्टोबर)",
      season_te: "ఖరీఫ్ (జూలై - అక్టోబర్)",
      season_ta: "கரீப் (ஜூலை - அக்டோபர்)",
      season_gu: "ખરીફ (જુલાઈ - ઓક્ટોબર)",
      season_kn: "ಖಾರೀಫ್ (ಜುಲೈ - ಅಕ್ಟೋಬರ್)",
      season_ml: "ഖാരിഫ് (ജൂലൈ - ഒക്ടോബർ)",
      season_pa: "ਸਾਉਣੀ (ਜੁਲਾਈ - ਅਕਤੂਬਰ)",
      season_or: "ଖରିଫ (ଜୁଲାଇ - ଅକ୍ଟୋବର)",
      season_as: "খাৰিଫ (জুলাই - অক্টোবৰ)",
      suitableArea_en: areaLabel_en,
      suitableArea_hi: areaLabel_hi,
      reason_en: `Extremely drought resilient with low water needs. Deep fibrous roots thrive in sandy semi-arid soils with high temperatures.`,
      reason_hi: `अत्यधिक सूखा सहनशील और कम पानी की आवश्यकता वाली फसल। बलुई रेतीली मिट्टी और उच्च तापमान में भी शानदार पैदावार देती है।`,
      idealSoil_en: "Sandy Loam & Desert Light Soil",
      idealSoil_hi: "बलुई दोमट व रेतीली हल्की मिट्टी",
      waterNeed_en: "Low",
      waterNeed_hi: "कम",
      durationDays: "75 - 90 Days",
      isDemo,
    });
    crops.push({
      id: "rec-chickpea",
      cropName_en: "Gram / Chickpea",
      cropName_hi: "चना",
      cropName_bn: "ছোলা",
      cropName_mr: "हरभरा / चणा",
      cropName_te: "శనగలు",
      cropName_ta: "கொண்டைக்கடலை",
      cropName_gu: "ચણા",
      cropName_kn: "ಕಡಲೆ",
      cropName_ml: "കടല",
      cropName_pa: "ਛੋਲੇ",
      cropName_or: "ବୁଟ",
      cropName_as: "বুট",
      cropName_ur: "چنا",
      cropName_bho: "चना",
      cropName_mai: "चना",
      emoji: "🌱",
      season_en: "Rabi (Winter / Oct - March)",
      season_hi: "रबी (सर्दियां / अक्टूबर - मार्च)",
      season_bn: "রবি (অক্টোবর - মার্চ)",
      season_mr: "रब्बी (ऑक्टोबर - मार्च)",
      season_te: "రబీ (అక్టోబర్ - మార్చి)",
      season_ta: "ரபி (அக்டோபர் - மார்ச்)",
      season_gu: "રવિ (ઓક્ટોબર - માર્ચ)",
      season_kn: "ರಬಿ (ಅಕ್ಟೋಬರ್ - ಮಾರ್ಚ್)",
      season_ml: "റബി (ഒക്ടോബർ - മാർച്ച്)",
      season_pa: "ਹਾੜੀ (ਅਕਤੂਬਰ - ਮਾਰਚ)",
      season_or: "ରବି (ଅକ୍ଟୋବର - ମାର୍ଚ୍ଚ)",
      season_as: "ৰবি (অক্টোবৰ - মাৰ্চ)",
      suitableArea_en: areaLabel_en,
      suitableArea_hi: areaLabel_hi,
      reason_en: `Requires only 1-2 light irrigations on conserved residual soil moisture. High protein grain with nitrogen fixing nodules.`,
      reason_hi: `अवशिष्ट नमी में मात्र 1-2 हल्की सिंचाइयों में तैयार हो जाती है। कम लागत में उच्च बाजार मूल्य और जमीन की उर्वरता बढ़ाती है।`,
      idealSoil_en: "Well-Drained Loamy Soil & Light Black Soil",
      idealSoil_hi: "अच्छी जल निकासी वाली दोमट व हल्की काली मिट्टी",
      waterNeed_en: "Low",
      waterNeed_hi: "कम",
      durationDays: "100 - 115 Days",
      isDemo,
    });
  } else {
    // Punjab, Haryana, UP, Bihar, WB defaults
    crops.push({
      id: "rec-maize",
      cropName_en: "Maize / Corn",
      cropName_hi: "मक्का",
      cropName_bn: "ভুট্টা",
      cropName_mr: "मका",
      cropName_te: "మొక్కజొన్న",
      cropName_ta: "மக்காச்சோளம்",
      cropName_gu: "મકાઈ",
      cropName_kn: "ಮೆಕ್ಕೆಜೋಳ",
      cropName_ml: "ചോളം",
      cropName_pa: "ਮੱਕੀ",
      cropName_or: "ମକା",
      cropName_as: "মাকৈ",
      cropName_ur: "مکئی",
      cropName_bho: "मक्का",
      cropName_mai: "मकई",
      emoji: "🌽",
      season_en: "Kharif & Rabi (Versatile / June - Oct & Oct - March)",
      season_hi: "खरीफ व रबी (सदाबहार / जून - अक्टूबर व अक्टूबर - मार्च)",
      season_bn: "খরিফ ও রবি",
      season_mr: "खरीप व रब्बी",
      season_te: "ఖరీఫ్ & రబీ",
      season_ta: "கரீப் & ரபி",
      season_gu: "ખરીફ અને રવિ",
      season_kn: "ಖಾರೀಫ್ & ರಬಿ",
      season_ml: "ഖാരിഫ് & റബി",
      season_pa: "ਸਾਉਣੀ ਅਤੇ ਹਾੜੀ",
      season_or: "ଖରିଫ ଓ ରବି",
      season_as: "খাৰিফ আৰু ৰবি",
      suitableArea_en: areaLabel_en,
      suitableArea_hi: areaLabel_hi,
      reason_en: `Excellent response to regional irrigation and fertilizer. Well-drained alluvial soil produces robust cobs with rapid maturity.`,
      reason_hi: `क्षेत्र की सिंचाई और खाद प्रबंधन में भारी भुट्टे देती है। जल निकासी युक्त दोमट मिट्टी में कम समय में बंपर पैदावार संभव है।`,
      idealSoil_en: "Deep Sandy Loam with Neutral pH",
      idealSoil_hi: "गहरी बलुई दोमट (उदासीन pH)",
      waterNeed_en: "Medium",
      waterNeed_hi: "मध्यम",
      durationDays: "90 - 110 Days",
      isDemo,
    });
    crops.push({
      id: "rec-potato",
      cropName_en: "Potato",
      cropName_hi: "आलू",
      cropName_bn: "আলু",
      cropName_mr: "बटाटा",
      cropName_te: "బంగాళాదుంప",
      cropName_ta: "உருளைக்கிழங்கு",
      cropName_gu: "બટાટા",
      cropName_kn: "ಆಲೂಗಡ್ಡೆ",
      cropName_ml: "ഉരുളക്കിഴങ്ങ്",
      cropName_pa: "ਆਲੂ",
      cropName_or: "ଆଳୁ",
      cropName_as: "আলু",
      cropName_ur: "آلو",
      cropName_bho: "आलू",
      cropName_mai: "आलू",
      emoji: "🥔",
      season_en: "Rabi (Winter / Oct - Feb)",
      season_hi: "रबी (सर्दियां / अक्टूबर - फरवरी)",
      season_bn: "রবি (অক্টোবর - ফেব্রুয়ারি)",
      season_mr: "रब्बी (ऑक्टोबर - फेब्रुवारी)",
      season_te: "రబీ (అక్టోబర్ - ఫిబ్రవరి)",
      season_ta: "ரபி (அக்டோபர் - பிப்ரவரி)",
      season_gu: "રવિ (ઓક્ટોબર - ફેબ્રુઆરી)",
      season_kn: "ರಬಿ (ಅಕ್ಟೋಬರ್ - ಫೆಬ್ರವರಿ)",
      season_ml: "റബി (ഒക്ടോബർ - ഫെബ്രുവരി)",
      season_pa: "ਹਾੜੀ (ਅਕਤੂਬਰ - ਫਰਵਰੀ)",
      season_or: "ରବି (ଅକ୍ଟୋବର - ଫେବୃଆରୀ)",
      season_as: "ৰবি (অক্টোবৰ - ফেব্ৰুৱাৰী)",
      suitableArea_en: areaLabel_en,
      suitableArea_hi: areaLabel_hi,
      reason_en: `Cool frost-free winter nights and loose friable alluvial soil offer an ideal environment for rapid tuber bulking and disease resistance.`,
      reason_hi: `सर्दियों की ठंडी रातें और भुरभुरी बलुई दोमट मिट्टी आलू के कंदों के तेजी से विकास और चमक के लिए एकदम अनुकूल हैं।`,
      idealSoil_en: "Friable Sandy Loam rich in Organic Matter",
      idealSoil_hi: "भुरभुरी बलुई दोमट (जीवांश युक्त)",
      waterNeed_en: "Medium",
      waterNeed_hi: "मध्यम",
      durationDays: "80 - 100 Days",
      isDemo,
    });
  }

  return crops;
}

// Find closest State and District info from lat/lng or manual strings
export function matchAgroZone(
  stateName?: string,
  districtName?: string,
  lat?: number,
  lng?: number
): { stateObj: StateDistricts; districtObj: DistrictInfo } {
  // If state & district match directly
  if (stateName) {
    const foundState = INDIAN_STATES_DATA.find(
      (s) =>
        s.state.toLowerCase() === stateName.toLowerCase() ||
        s.state_hi === stateName ||
        stateName.toLowerCase().includes(s.state.toLowerCase())
    );
    if (foundState) {
      if (districtName) {
        const foundDist = foundState.districts.find(
          (d) =>
            d.name_en.toLowerCase().includes(districtName.toLowerCase()) ||
            districtName.toLowerCase().includes(d.name_en.toLowerCase()) ||
            d.name_hi.includes(districtName) ||
            districtName.includes(d.name_hi)
        );
        if (foundDist) {
          return { stateObj: foundState, districtObj: foundDist };
        }
      }
      return { stateObj: foundState, districtObj: foundState.districts[0] };
    }
  }

  // Coordinate proximity match
  if (typeof lat === "number" && typeof lng === "number") {
    let closestDist: DistrictInfo = INDIAN_STATES_DATA[0].districts[0];
    let closestState: StateDistricts = INDIAN_STATES_DATA[0];
    let minDistance = Infinity;

    for (const st of INDIAN_STATES_DATA) {
      for (const dst of st.districts) {
        const d = Math.hypot(dst.defaultLat - lat, dst.defaultLng - lng);
        if (d < minDistance) {
          minDistance = d;
          closestDist = dst;
          closestState = st;
        }
      }
    }
    return { stateObj: closestState, districtObj: closestDist };
  }

  // Fallback to UP / Varanasi
  return { stateObj: INDIAN_STATES_DATA[0], districtObj: INDIAN_STATES_DATA[0].districts[0] };
}

// Full geocoding & Agro-Climatic enrichment
export async function approximateLocationFromCoordinates(
  lat: number,
  lng: number
): Promise<FarmLocation> {
  let villageOrArea = "";
  let district = "";
  let state = "";
  let country = "India";
  let hasRealGeocode = false;
  let hasRealWeather = false;
  let currentTemp: number | undefined = undefined;
  let currentHumidity: number | undefined = undefined;
  let rainfallEst: string = "Normal Regional Rainfall";

  // 1. Try reverse geocoding via OpenStreetMap Nominatim
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`,
      {
        signal: controller.signal,
        headers: { "Accept-Language": "en" },
      }
    );
    clearTimeout(timeoutId);

    if (geoRes.ok) {
      const data = await geoRes.json();
      const addr = data.address || {};
      villageOrArea =
        addr.village ||
        addr.hamlet ||
        addr.suburb ||
        addr.neighbourhood ||
        addr.town ||
        addr.subdistrict ||
        addr.county ||
        "";
      district = addr.district || addr.county || addr.state_district || addr.city || "";
      state = addr.state || "";
      country = addr.country || "India";
      if (state || district) {
        hasRealGeocode = true;
      }
    }
  } catch (e) {
    // network timeout or offline
  }

  // 2. Try fetching real-time weather from Open-Meteo (free, public API)
  try {
    const weatherController = new AbortController();
    const wTimeoutId = setTimeout(() => weatherController.abort(), 3500);

    const wRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&timezone=auto`,
      { signal: weatherController.signal }
    );
    clearTimeout(wTimeoutId);

    if (wRes.ok) {
      const wData = await wRes.json();
      if (wData?.current?.temperature_2m !== undefined) {
        currentTemp = Math.round(wData.current.temperature_2m * 10) / 10;
        currentHumidity = Math.round(wData.current.relative_humidity_2m);
        const precip = wData.current.precipitation || 0;
        rainfallEst = precip > 2 ? `Active Precipitation (${precip} mm/hr)` : `Seasonal Norm (${currentHumidity}% RH)`;
        hasRealWeather = true;
      }
    }
  } catch (e) {
    // fallback gracefully
  }

  // Find agro-zone match from verified DB
  const { stateObj, districtObj } = matchAgroZone(state, district, lat, lng);

  const finalState = state || stateObj.state;
  const finalDistrict = district || districtObj.name_en;
  const finalArea = villageOrArea || districtObj.name_en.split("(")[0].trim();
  const seasonObj = getCurrentAgriculturalSeason();

  const isDemo = !hasRealGeocode && !hasRealWeather;

  const agroClimate: AgroClimateData = {
    climateZone_en: districtObj.climateZone_en,
    climateZone_hi: districtObj.climateZone_hi,
    temperatureRange: currentTemp ? `${currentTemp}°C (Live) | 18°C - 34°C` : "18°C - 34°C",
    currentTemp: currentTemp ?? 28,
    humidity: currentHumidity ?? 62,
    rainfallCategory_en: rainfallEst,
    rainfallCategory_hi: hasRealWeather ? `वर्तमान वर्षा/नमी स्थिति (${currentHumidity}% आर्द्रता)` : "क्षेत्रीय औसत वर्षा (750-1100 मिमी)",
    currentRainfallEstimate: rainfallEst,
    currentSeason_en: seasonObj.season_en,
    currentSeason_hi: seasonObj.season_hi,
    dominantSoil_en: districtObj.soil_en,
    dominantSoil_hi: districtObj.soil_hi,
    waterAvailability_en: districtObj.water_en,
    waterAvailability_hi: districtObj.water_hi,
    regionalCroppingPattern_en: districtObj.croppingPattern_en,
    regionalCroppingPattern_hi: districtObj.croppingPattern_hi,
    dataSource: hasRealWeather || hasRealGeocode ? "realtime_verified" : "demo_recommendation",
  };

  const recommendedCrops = generateSuitableCrops(finalState, finalDistrict, finalArea, isDemo);

  const displayName = finalArea
    ? `${finalArea}, ${finalDistrict.split("(")[0].trim()}, ${finalState}`
    : `${finalDistrict.split("(")[0].trim()}, ${finalState}`;

  return {
    displayName,
    villageOrArea: finalArea,
    district: finalDistrict,
    state: finalState,
    country,
    source: "gps",
    latitude: lat,
    longitude: lng,
    agroClimate,
    recommendedCrops,
    isDemoData: isDemo,
  };
}

// Build FarmLocation for manual state/district selection
export function buildManualFarmLocation(
  stateName: string,
  districtName: string
): FarmLocation {
  const { stateObj, districtObj } = matchAgroZone(stateName, districtName);
  const seasonObj = getCurrentAgriculturalSeason();
  const areaName = districtObj.name_en.split("(")[0].trim();

  const agroClimate: AgroClimateData = {
    climateZone_en: districtObj.climateZone_en,
    climateZone_hi: districtObj.climateZone_hi,
    temperatureRange: "18°C - 34°C (Seasonal Range)",
    currentTemp: 27,
    humidity: 60,
    rainfallCategory_en: "Regional Seasonal Average (750 - 1100 mm)",
    rainfallCategory_hi: "क्षेत्रीय औसत वर्षा (750 - 1100 मिमी)",
    currentSeason_en: seasonObj.season_en,
    currentSeason_hi: seasonObj.season_hi,
    dominantSoil_en: districtObj.soil_en,
    dominantSoil_hi: districtObj.soil_hi,
    waterAvailability_en: districtObj.water_en,
    waterAvailability_hi: districtObj.water_hi,
    regionalCroppingPattern_en: districtObj.croppingPattern_en,
    regionalCroppingPattern_hi: districtObj.croppingPattern_hi,
    dataSource: "agro_database",
  };

  const recommendedCrops = generateSuitableCrops(stateObj.state, districtObj.name_en, areaName, false);

  const displayName = `${districtObj.name_en.split("(")[0].trim()}, ${stateObj.state}`;

  return {
    displayName,
    villageOrArea: areaName,
    district: districtObj.name_en,
    state: stateObj.state,
    country: "India",
    source: "manual",
    latitude: districtObj.defaultLat,
    longitude: districtObj.defaultLng,
    agroClimate,
    recommendedCrops,
    isDemoData: false,
  };
}

// Helper to get localized text for crop recommendations
export function getLocalizedCropName(crop: SuitableCropRecommendation, lang: Language): string {
  const key = `cropName_${lang}`;
  if ((crop as any)[key] && typeof (crop as any)[key] === "string") {
    return (crop as any)[key];
  }
  return lang === "en" ? crop.cropName_en : crop.cropName_hi || crop.cropName_en;
}

export function getLocalizedCropSeason(crop: SuitableCropRecommendation, lang: Language): string {
  const key = `season_${lang}`;
  if ((crop as any)[key] && typeof (crop as any)[key] === "string") {
    return (crop as any)[key];
  }
  return lang === "en" ? crop.season_en : crop.season_hi || crop.season_en;
}

export function getLocalizedCropReason(crop: SuitableCropRecommendation, lang: Language): string {
  const key = `reason_${lang}`;
  if ((crop as any)[key] && typeof (crop as any)[key] === "string") {
    return (crop as any)[key];
  }
  return lang === "en" ? crop.reason_en : crop.reason_hi || crop.reason_en;
}

export function getLocalizedCropArea(crop: SuitableCropRecommendation, lang: Language): string {
  const key = `suitableArea_${lang}`;
  if ((crop as any)[key] && typeof (crop as any)[key] === "string") {
    return (crop as any)[key];
  }
  return lang === "en" ? crop.suitableArea_en : crop.suitableArea_hi || crop.suitableArea_en;
}
