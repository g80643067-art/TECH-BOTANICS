import { Language } from "../types";

export interface TranslationSchema {
  appName: string;
  tagline: string;
  kisanHelpline: string;
  changeLanguage: string;
  back: string;
  next: string;
  continue: string;
  steps: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    step6: string;
    step7: string;
  };
  welcomeTitle: string;
  welcomeSubtitle: string;
  chooseLanguage: string;
  moreLanguages: string;
  searchLanguagePlaceholder: string;
  allIndianLanguagesSupported: string;
  scanner: {
    title: string;
    subtitle: string;
    takePhotoButton: string;
    uploadButton: string;
    dragDropText: string;
    orChooseSample: string;
    demoNotice: string;
    cameraAccessError: string;
    closeCamera: string;
    captureShot: string;
    analyzingTitle: string;
    analyzingSubtitle: string;
    stages: string[];
    cropIdentified: string;
    confidenceLabel: string;
    imageAnalyzed: string;
    possibleIssue: string;
    severityLabel: string;
    recommendedAction: string;
    scanAgain: string;
    askAiAgent: string;
    continueToFarmAnalysis: string;
    cropAndFarmSynergy: string;
    uncertainMessage: string;
    multipleCropsTitle: string;
    multipleCropsSubtitle: string;
    selectWhichCrop: string;
    demoAiDiagnosisBadge: string;
    verifiedAiBadge: string;
    visualFeaturesLabel: string;
    leafShapeLabel: string;
    leafArrangementLabel: string;
    plantStructureLabel: string;
    stemCharacteristicsLabel: string;
    overallAppearanceLabel: string;
    takeAnotherPhoto: string;
  };
  location: {
    title: string;
    subtitle: string;
    useMyLocation: string;
    selectManually: string;
    detectingLocation: string;
    locationFound: string;
    permissionDenied: string;
    selectState: string;
    selectDistrict: string;
    privacyNote: string;
    confirmAndContinue: string;
    yourCurrentLocation: string;
    cropsSuitableForArea: string;
    useMyLocationAgain: string;
    changeLocationManually: string;
    suitableFor: string;
    seasonLabel: string;
    whyLabel: string;
    idealSoilLabel: string;
    waterRequirementLabel: string;
    durationLabel: string;
    demoRecommendationBadge: string;
    verifiedDataBadge: string;
    climateZoneLabel: string;
    tempAndWeatherLabel: string;
    rainfallLabel: string;
    croppingPatternLabel: string;
    environmentalFactorsTitle: string;
    askAiForCropAdvice: string;
  };
  soil: {
    title: string;
    subtitle: string;
    dontKnowButton: string;
    aiAssistedSoilTitle: string;
    aiAssistedSoilDesc: string;
    q1: string;
    q1_opt1: string;
    q1_opt2: string;
    q1_opt3: string;
    q2: string;
    q2_opt1: string;
    q2_opt2: string;
    q2_opt3: string;
    q3: string;
    q3_opt1: string;
    q3_opt2: string;
    q3_opt3: string;
    applyRecommendedSoil: string;
    continueToDetection: string;
  };
  detection: {
    title: string;
    subtitle: string;
    cropLabel: string;
    issueLabel: string;
    severityLabel: string;
    possibleCauseLabel: string;
    whyHappeningLabel: string;
    confidenceLabel: string;
    aiAssistedLabel: string;
    disclaimer: string;
    continueToResolution: string;
  };
  resolution: {
    title: string;
    subtitle: string;
    targetProtocol: string;
    askAiButton: string;
    problemResolvedQuestion: string;
    resolvedYesButton: string;
    resolvedNoButton: string;
  };
  success: {
    badge: string;
    title: string;
    subtitle: string;
    item1Title: string;
    item1Desc: string;
    item2Title: string;
    item2Desc: string;
    item3Title: string;
    item3Desc: string;
    downloadReportButton: string;
    scanAgainButton: string;
    viewReportButton: string;
  };
  escalation: {
    badge: string;
    title: string;
    subtitle: string;
    expertCardTitle: string;
    expertCardSubtitle: string;
    demoHelplineLabel: string;
    contactExpertButton: string;
    whatsappSupportButton: string;
    availableHours: string;
    orFillForm: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    phoneLabel: string;
    cropLabel: string;
    locationLabel: string;
    problemLabel: string;
    imageLabel: string;
    submitButton: string;
    submittedTitle: string;
    submittedDesc: string;
    referenceIdLabel: string;
    editableBadge?: string;
    editNotice?: string;
    resetDefault?: string;
    editResubmit?: string;
  };
  aiAgent: {
    buttonText: string;
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    voiceActive: string;
    voiceNotSupported: string;
    suggestedQuestions: string[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{ question: string; answer: string }>;
  };
  settings: {
    title: string;
    subtitle: string;
    expertPhoneLabel: string;
    saveSettings: string;
    resetDemo: string;
  };
}

export const englishTranslations: TranslationSchema = {
  appName: "KRISHISETU AI",
  tagline: "Farmer-First Guided Agricultural Intelligence",
  kisanHelpline: "Kisan Support Helpline",
  changeLanguage: "Change Language",
  back: "Back",
  next: "Next",
  continue: "Continue",
  steps: {
    step1: "Language",
    step2: "Scanner",
    step3: "Location",
    step4: "Soil Type",
    step5: "Detection",
    step6: "Resolution",
    step7: "Expert Help",
  },
  welcomeTitle: "Welcome to KrishiSetu AI",
  welcomeSubtitle: "Intelligent, step-by-step crop disease diagnostic guide and agronomist support.",
  chooseLanguage: "Choose your language",
  moreLanguages: "More Languages",
  searchLanguagePlaceholder: "Search Indian languages...",
  allIndianLanguagesSupported: "Select your preferred regional language to proceed",
  scanner: {
    title: "Scan Your Crop",
    subtitle: "Take or upload a clear photo of the affected crop or leaf.",
    takePhotoButton: "Take Photo",
    uploadButton: "Upload Image",
    dragDropText: "Click or drag and drop leaf images (.JPG, .PNG)",
    orChooseSample: "Or select a test crop sample:",
    demoNotice: "Simulation Notice: This demonstration showcases AI-assisted crop diagnosis with verified agricultural protocols.",
    cameraAccessError: "Camera permission denied or camera device not found. Please select an image file or use the test samples.",
    closeCamera: "Close Camera",
    captureShot: "Capture Photo",
    analyzingTitle: "Analyzing your crop...",
    analyzingSubtitle: "Deep learning models are processing leaf symptoms and visual patterns",
    stages: [
      "Image processing & visual feature inspection",
      "Botanical identification & confidence check",
      "Phytopathology & health lesion analysis",
      "Location, soil & season integration",
    ],
    cropIdentified: "Crop Identified",
    confidenceLabel: "Confidence",
    imageAnalyzed: "Image Analyzed",
    possibleIssue: "Possible Issue",
    severityLabel: "Severity",
    recommendedAction: "Recommended Action",
    scanAgain: "Scan Another Crop",
    askAiAgent: "Ask AI Agent About This Crop",
    continueToFarmAnalysis: "Continue to Farm & Location Analysis",
    cropAndFarmSynergy: "Crop & Farm Integration",
    uncertainMessage: "Crop identification is uncertain. Please upload a clear photo of the full plant or leaf.",
    multipleCropsTitle: "Multiple Crops Detected",
    multipleCropsSubtitle: "Multiple crop varieties were recognized in this image.",
    selectWhichCrop: "Which crop do you want to analyze?",
    demoAiDiagnosisBadge: "Demo AI Vision Diagnosis",
    verifiedAiBadge: "Gemini Vision AI Analysis",
    visualFeaturesLabel: "Visual Botanical Features",
    leafShapeLabel: "Leaf Shape",
    leafArrangementLabel: "Leaf Arrangement",
    plantStructureLabel: "Plant Structure",
    stemCharacteristicsLabel: "Stem Structure",
    overallAppearanceLabel: "Overall Appearance",
    takeAnotherPhoto: "Take / Upload Another Photo",
  },
  location: {
    title: "Where is your farm located?",
    subtitle: "Helps tailor diagnosis according to your regional climate, temperature, and seasonal pest trends.",
    useMyLocation: "Use My Location",
    selectManually: "Select Location Manually",
    detectingLocation: "Detecting approximate regional location...",
    locationFound: "Farm location identified",
    permissionDenied: "Location access was denied. You can easily choose your State and District manually below.",
    selectState: "Select State",
    selectDistrict: "Select District",
    privacyNote: "Your privacy is protected. Exact GPS coordinates are not publicly exposed; only regional agro-climatic zone data is used.",
    confirmAndContinue: "Confirm & Continue",
    yourCurrentLocation: "Your Current Location",
    cropsSuitableForArea: "Crops Suitable for Your Area",
    useMyLocationAgain: "Use My Location Again",
    changeLocationManually: "Change Location Manually",
    suitableFor: "Suitable for",
    seasonLabel: "Season",
    whyLabel: "Why",
    idealSoilLabel: "Ideal Soil",
    waterRequirementLabel: "Water Need",
    durationLabel: "Maturity Duration",
    demoRecommendationBadge: "Demo recommendation",
    verifiedDataBadge: "Verified Agro-Zone Data",
    climateZoneLabel: "Agro-Climatic Zone",
    tempAndWeatherLabel: "Temperature & Climate",
    rainfallLabel: "Rainfall / Moisture",
    croppingPatternLabel: "Regional Cropping Pattern",
    environmentalFactorsTitle: "Agro-Ecological & Environmental Indicators",
    askAiForCropAdvice: "Ask AI Agent: What crops should I grow here?",
  },
  soil: {
    title: "What type of soil does your farm have?",
    subtitle: "Soil moisture and drainage characteristics directly influence disease spread and nutrient absorption.",
    dontKnowButton: "I don't know my soil type",
    aiAssistedSoilTitle: "AI-Assisted Soil Identification",
    aiAssistedSoilDesc: "Answer 3 quick sensory questions about your farmland soil to identify its type:",
    q1: "How does the moist soil feel when rolled in your palm?",
    q1_opt1: "Gritty and loose, falls apart quickly",
    q1_opt2: "Smooth, slightly sticky, holds together into a soft ball",
    q1_opt3: "Very sticky, plastic-like, hard to break when dry",
    q2: "What is the primary color of the topsoil?",
    q2_opt1: "Deep black / dark grey",
    q2_opt2: "Reddish / brownish red",
    q2_opt3: "Light brown / yellowish",
    q3: "How does water behave after heavy rain or irrigation?",
    q3_opt1: "Drains away almost immediately",
    q3_opt2: "Drains moderately, stays moist for 2-3 days",
    q3_opt3: "Water stays pooled for days (poor drainage)",
    applyRecommendedSoil: "Apply Recommended Soil Type",
    continueToDetection: "Continue to Issue Detection",
  },
  detection: {
    title: "AI Crop Health Analysis",
    subtitle: "Combined synthesis of crop imagery, agro-climatic zone, and soil composition.",
    cropLabel: "Detected Crop",
    issueLabel: "Possible Issue",
    severityLabel: "Severity Level",
    possibleCauseLabel: "Possible Cause",
    whyHappeningLabel: "Why this may be happening (Farmer Explanation)",
    confidenceLabel: "Confidence Match",
    aiAssistedLabel: "AI-Assisted Analysis",
    disclaimer: "Disclaimer: AI diagnostic output is generated as an advisory aid. Always follow certified agricultural practices.",
    continueToResolution: "Continue to Problem Resolution",
  },
  resolution: {
    title: "Recommended Resolution",
    subtitle: "Structured 4-step actionable recovery and management plan.",
    targetProtocol: "Target Disease Treatment Protocol",
    askAiButton: "Ask AI for More Help",
    problemResolvedQuestion: "Is your problem resolved?",
    resolvedYesButton: "YES, RESOLVED ✓",
    resolvedNoButton: "NO, STILL HAVE A PROBLEM",
  },
  success: {
    badge: "Case Resolved Successfully",
    title: "Great! Your problem appears to be resolved.",
    subtitle: "Follow the 4-step management guide to protect your yield and prevent future outbreaks.",
    item1Title: "Resolution completed",
    item1Desc: "Target treatment plan applied for current crop cycle.",
    item2Title: "Save scan report",
    item2Desc: "Download or print your digital crop health certificate for local KVK records.",
    item3Title: "Monitor crop again",
    item3Desc: "Re-scan the crop in 5 to 7 days to evaluate leaf recovery.",
    downloadReportButton: "Download / Print Report",
    scanAgainButton: "Scan Another Crop",
    viewReportButton: "View Report",
  },
  escalation: {
    badge: "Agronomist Escalation Required",
    title: "We need additional expert help.",
    subtitle: "Our AI could not confidently resolve this issue. You can contact an agricultural expert for further assistance.",
    expertCardTitle: "Agricultural Expert Support",
    expertCardSubtitle: "Direct telephone and WhatsApp consultation with certified agronomists.",
    demoHelplineLabel: "Toll-Free Kisan Desk",
    contactExpertButton: "Contact Expert",
    whatsappSupportButton: "WhatsApp Support",
    availableHours: "Available 7:00 AM – 7:00 PM IST (Mon–Sat)",
    orFillForm: "Or request an agronomist callback by submitting the case form below:",
    formTitle: "Request Expert Help",
    formSubtitle: "Your scanned image, soil, and location details will be automatically attached for faster resolution.",
    nameLabel: "Farmer Name",
    phoneLabel: "Mobile Number",
    cropLabel: "Crop",
    locationLabel: "Location",
    problemLabel: "Problem Description",
    imageLabel: "Attached Leaf Scan",
    submitButton: "Submit Request",
    submittedTitle: "Your request has been submitted!",
    submittedDesc: "An agricultural extension officer will review your crop scan and contact you at",
    referenceIdLabel: "Reference Case ID",
    editableBadge: "Editable",
    editNotice: "All words and fields below (including crop and location) are fully editable before submitting.",
    resetDefault: "Reset to detected",
    editResubmit: "Edit Details & Resubmit",
  },
  aiAgent: {
    buttonText: "Ask KrishiSetu AI",
    title: "KrishiSetu AI Advisor",
    subtitle: "Live Context-Aware Agricultural Assistant",
    inputPlaceholder: "Ask in your language or click mic...",
    voiceActive: "Listening in your language...",
    voiceNotSupported: "Voice input not supported in this browser. Please type your query.",
    suggestedQuestions: [
      "What is wrong with my crop?",
      "Why is this happening?",
      "What should I do first?",
      "Is this serious?",
      "Explain in simple Hindi",
    ],
  },
  faq: {
    title: "Frequently Asked Questions (FAQ)",
    subtitle: "Clear answers to common questions about KrishiSetu AI",
    items: [
      {
        question: "How does KrishiSetu AI diagnose crop diseases?",
        answer: "KrishiSetu AI analyzes visual leaf symptoms (color changes, lesions, wilting) and combines this with your local climate zone and soil type to deliver a tailored 4-step action plan.",
      },
      {
        question: "Can I use KrishiSetu AI in my regional language?",
        answer: "Yes! KrishiSetu AI supports 12+ Indian languages including Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Odia, and Assamese.",
      },
      {
        question: "What happens if the AI cannot solve my issue?",
        answer: "If you select 'NO, STILL HAVE A PROBLEM', you can immediately call an expert agronomist, chat via WhatsApp, or submit a request for a free callback.",
      },
      {
        question: "Are my farm details and location kept private?",
        answer: "Yes. Your exact GPS coordinates are never publicly shown or shared. We only use broad agro-climatic region data to recommend suitable treatments.",
      },
    ],
  },
  settings: {
    title: "Application & Helpline Settings",
    subtitle: "Configure expert demo phone numbers and reset options",
    expertPhoneLabel: "Expert Support / KVK Phone Number",
    saveSettings: "Save Settings",
    resetDemo: "Reset Demo Journey",
  },
};

export const hindiTranslations: TranslationSchema = {
  appName: "कृषिसेतु एआई (KRISHISETU AI)",
  tagline: "किसान-प्रथम सरल फसल निदान प्रणाली",
  kisanHelpline: "किसान सहायता हेल्पलाइन",
  changeLanguage: "भाषा बदलें",
  back: "पीछे जाएं",
  next: "आगे बढ़ें",
  continue: "जारी रखें",
  steps: {
    step1: "भाषा",
    step2: "स्कैनर",
    step3: "खेत स्थान",
    step4: "मिट्टी प्रकार",
    step5: "रोग पहचान",
    step6: "उपचार समाधान",
    step7: "विशेषज्ञ सहायता",
  },
  welcomeTitle: "कृषिसेतु एआई में आपका स्वागत है",
  welcomeSubtitle: "आपकी फसल की सुरक्षा और सही निदान के लिए सरल, चरणबद्ध एआई कृषि मार्गदर्शक।",
  chooseLanguage: "अपनी भाषा चुनें",
  moreLanguages: "अन्य भारतीय भाषाएं",
  searchLanguagePlaceholder: "भाषा खोजें...",
  allIndianLanguagesSupported: "अपनी पसंदीदा क्षेत्रीय भाषा चुनें और आगे बढ़ें",
  scanner: {
    title: "अपनी फसल को स्कैन करें",
    subtitle: "प्रभावित फसल या पत्ती की स्पष्ट फोटो लें या अपलोड करें।",
    takePhotoButton: "कैमरा से फोटो लें",
    uploadButton: "फोटो अपलोड करें",
    dragDropText: "पत्ती की फोटो चुनें या यहाँ खींचकर छोड़ें (.JPG, .PNG)",
    orChooseSample: "या टेस्ट के लिए एक नमूना फसल चुनें:",
    demoNotice: "एआई सिमुलेशन सूचना: यह प्रोटोटाइप प्रमाणित कृषि पद्धतियों के आधार पर एआई-सहायता प्राप्त निदान का प्रदर्शन करता है।",
    cameraAccessError: "कैमरा अनुमति नहीं मिली या कैमरा डिवाइस उपलब्ध नहीं है। कृपया इमेज फाइल अपलोड करें या नीचे दिए गए नमूने चुनें।",
    closeCamera: "कैमरा बंद करें",
    captureShot: "फोटो खींचें",
    analyzingTitle: "आपकी फसल का विश्लेषण हो रहा है...",
    analyzingSubtitle: "डीप लर्निंग मॉडल पत्ती के धब्बों और लक्षणों की जांच कर रहे हैं",
    stages: [
      "छवि विश्लेषण व वानस्पतिक लक्षणों की जांच",
      "फसल प्रजाति की पहचान व सटीकता स्कोर",
      "पादप रोग व पत्ती धब्बों की जांच",
      "जलवायु, मिट्टी व ऋतु डेटा का एकीकरण",
    ],
    cropIdentified: "पहचानी गई फसल",
    confidenceLabel: "सटीकता (Confidence)",
    imageAnalyzed: "विश्लेषित तस्वीर",
    possibleIssue: "संभावित समस्या / रोग",
    severityLabel: "गंभीरता",
    recommendedAction: "अनुशंसित समाधान व उपाय",
    scanAgain: "दूसरी फसल स्कैन करें",
    askAiAgent: "एआई सलाहकार से फसल के बारे में पूछें",
    continueToFarmAnalysis: "खेत व लोकेशन विश्लेषण के लिए आगे बढ़ें",
    cropAndFarmSynergy: "फसल और खेत का एकीकृत विश्लेषण",
    uncertainMessage: "फसल की पहचान अनिश्चित है। कृपया पूरे पौधे या पत्ती की एक साफ और स्पष्ट फोटो अपलोड करें।",
    multipleCropsTitle: "तस्वीर में एक से अधिक फसलें पाई गईं",
    multipleCropsSubtitle: "इस तस्वीर में कई फसलों की प्रजातियां मौजूद हैं।",
    selectWhichCrop: "आप किस फसल का विश्लेषण करना चाहते हैं?",
    demoAiDiagnosisBadge: "डेमो एआई विज़न निदान",
    verifiedAiBadge: "जेमिनी विज़न एआई विश्लेषण",
    visualFeaturesLabel: "वानस्पतिक दृश्य लक्षण",
    leafShapeLabel: "पत्ती का आकार",
    leafArrangementLabel: "पत्तियों का विन्यास",
    plantStructureLabel: "पौधे की संरचना",
    stemCharacteristicsLabel: "तने के लक्षण",
    overallAppearanceLabel: "पौधे का समग्र रूप",
    takeAnotherPhoto: "दूसरी साफ फोटो लें / अपलोड करें",
  },
  location: {
    title: "आपका खेत कहाँ स्थित है?",
    subtitle: "यह आपके क्षेत्रीय मौसम, तापमान और कीट-रोगों के अनुसार सही उपचार तय करने में मदद करता है।",
    useMyLocation: "मेरे स्थान का उपयोग करें",
    selectManually: "स्थान मैन्युअल रूप से चुनें",
    detectingLocation: "अनुमानित क्षेत्रीय स्थान का पता लगाया जा रहा है...",
    locationFound: "खेत का स्थान सफलतापूर्वक पहचाना गया",
    permissionDenied: "स्थान की अनुमति नहीं मिली। आप नीचे आसानी से अपना राज्य और जिला चुन सकते हैं।",
    selectState: "राज्य चुनें",
    selectDistrict: "जिला चुनें",
    privacyNote: "आपकी गोपनीयता सुरक्षित है। सटीक जीपीएस निर्देशांक सार्वजनिक नहीं किए जाते; केवल क्षेत्रीय कृषि-जलवायु क्षेत्र का उपयोग होता है।",
    confirmAndContinue: "पुष्टि करें और आगे बढ़ें",
    yourCurrentLocation: "आपकी लोकेशन",
    cropsSuitableForArea: "आपके क्षेत्र के लिए उपयुक्त फसलें",
    useMyLocationAgain: "फिर से मेरी लोकेशन का उपयोग करें",
    changeLocationManually: "स्थान मैन्युअल रूप से बदलें",
    suitableFor: "उपयुक्त क्षेत्र",
    seasonLabel: "मौसम / ऋतु",
    whyLabel: "कारण",
    idealSoilLabel: "अनुकूल मिट्टी",
    waterRequirementLabel: "पानी की जरूरत",
    durationLabel: "फसल पकने की अवधि",
    demoRecommendationBadge: "डेमो सिफारिश",
    verifiedDataBadge: "सत्यापित कृषि डेटा",
    climateZoneLabel: "कृषि-जलवायु क्षेत्र",
    tempAndWeatherLabel: "तापमान व मौसम",
    rainfallLabel: "वर्षा / नमी स्तर",
    croppingPatternLabel: "क्षेत्रीय फसल चक्र",
    environmentalFactorsTitle: "कृषि-पारिस्थितिक व पर्यावरणीय संकेतक",
    askAiForCropAdvice: "एआई एजेंट से पूछें: यहाँ कौन सी फसल उगानी चाहिए?",
  },
  soil: {
    title: "आपके खेत की मिट्टी किस प्रकार की है?",
    subtitle: "मिट्टी की नमी और जल निकासी क्षमता सीधे तौर पर रोग के फैलाव और पोषक तत्वों को प्रभावित करती है।",
    dontKnowButton: "मुझे अपनी मिट्टी का प्रकार नहीं पता",
    aiAssistedSoilTitle: "एआई-सहायता प्राप्त मिट्टी पहचान",
    aiAssistedSoilDesc: "अपनी मिट्टी का प्रकार जानने के लिए 3 सरल सवालों के जवाब दें:",
    q1: "हथेली पर गीली मिट्टी को रगड़ने पर कैसा महसूस होता है?",
    q1_opt1: "खुरदुरी और भुरभुरी, जल्दी टूट जाती है",
    q1_opt2: "मुलायम, हल्की चिपचिपी, नरम गोला बन जाती है",
    q1_opt3: "बहुत चिपचिपी, सूखने पर बहुत कठोर हो जाती है",
    q2: "खेत की ऊपरी मिट्टी का मुख्य रंग कैसा है?",
    q2_opt1: "गहरा काला / स्लेटी",
    q2_opt2: "लाल / हल्का भूरा-लाल",
    q2_opt3: "हल्का भूरा / पीलापन लिए हुए",
    q3: "बारिश या सिंचाई के बाद पानी का क्या होता है?",
    q3_opt1: "पानी तुरंत जमीन में सूख/रिस जाता है",
    q3_opt2: "मध्यम गति से रिसता है, 2-3 दिन नमी बनी रहती है",
    q3_opt3: "कई दिनों तक पानी जमा रहता है (जलभराव)",
    applyRecommendedSoil: "अनुशंसित मिट्टी प्रकार लागू करें",
    continueToDetection: "रोग विश्लेषण पर आगे बढ़ें",
  },
  detection: {
    title: "एआई फसल स्वास्थ्य विश्लेषण",
    subtitle: "फसल की छवि, क्षेत्रीय जलवायु और मिट्टी के प्रकार का एकीकृत विश्लेषण।",
    cropLabel: "पहचानी गई फसल",
    issueLabel: "संभावित रोग / समस्या",
    severityLabel: "गंभीरता स्तर",
    possibleCauseLabel: "संभावित कारण",
    whyHappeningLabel: "यह क्यों हो रहा है (किसान-हितैषी व्याख्या)",
    confidenceLabel: "सटीकता मिलान",
    aiAssistedLabel: "एआई-सहायता प्राप्त विश्लेषण",
    disclaimer: "अस्वीकरण: एआई परिणाम केवल सलाहकारी सहायता के लिए हैं। हमेशा प्रमाणित कृषि पद्धतियों का पालन करें।",
    continueToResolution: "उपचार समाधान पर आगे बढ़ें",
  },
  resolution: {
    title: "अनुशंसित उपचार समाधान",
    subtitle: "फसल बचाव के लिए 4-चरणीय व्यावहारिक कार्ययोजना।",
    targetProtocol: "लक्षित रोग उपचार प्रोटोकॉल",
    askAiButton: "एआई से अधिक जानकारी पूछें",
    problemResolvedQuestion: "क्या आपकी समस्या हल हो गई?",
    resolvedYesButton: "हाँ, समस्या हल हो गई ✓",
    resolvedNoButton: "नहीं, अभी भी समस्या है",
  },
  success: {
    badge: "समस्या का समाधान हुआ",
    title: "बहुत बढ़िया! आपकी समस्या सुलझ गई प्रतीत होती है।",
    subtitle: "अपनी फसल की अच्छी पैदावार और भविष्य के रोगों से बचाव के लिए 4-चरणीय योजना का पालन करें।",
    item1Title: "उपचार पूर्ण",
    item1Desc: "वर्तमान फसल चक्र के लिए अनुशंसित उपचार लागू किया गया।",
    item2Title: "स्कैन रिपोर्ट सहेजें",
    item2Desc: "अपने रिकॉर्ड के लिए डिजिटल फसल स्वास्थ्य प्रमाण पत्र डाउनलोड या प्रिंट करें।",
    item3Title: "फसल की पुनः निगरानी करें",
    item3Desc: "सुधार की जांच के लिए 5 से 7 दिनों में फसल को दोबारा स्कैन करें।",
    downloadReportButton: "रिपोर्ट डाउनलोड / प्रिंट करें",
    scanAgainButton: "अन्य फसल स्कैन करें",
    viewReportButton: "रिपोर्ट देखें",
  },
  escalation: {
    badge: "कृषि विशेषज्ञ परामर्श आवश्यक",
    title: "हमें अतिरिक्त विशेषज्ञ सहायता की आवश्यकता है।",
    subtitle: "हमारा एआई इस समस्या को पूरी तरह हल नहीं कर सका। आप आगे की सहायता के लिए कृषि विशेषज्ञ से संपर्क कर सकते हैं।",
    expertCardTitle: "कृषि विशेषज्ञ सहायता",
    expertCardSubtitle: "प्रमाणित कृषि वैज्ञानिकों के साथ सीधा टेलीफोन व व्हाट्सएप परामर्श।",
    demoHelplineLabel: "टोल-फ्री किसान हेल्पलाइन",
    contactExpertButton: "विशेषज्ञ से बात करें",
    whatsappSupportButton: "व्हाट्सएप पर संपर्क करें",
    availableHours: "उपलब्ध समय: सुबह 7:00 से शाम 7:00 बजे (सोम-शनि)",
    orFillForm: "या नीचे दिए गए फॉर्म को भरकर विशेषज्ञ कॉल-बैक का अनुरोध करें:",
    formTitle: "विशेषज्ञ सहायता का अनुरोध करें",
    formSubtitle: "तेज़ समाधान के लिए आपकी स्कैन की गई फोटो, मिट्टी और स्थान का विवरण स्वचालित रूप से जोड़ा जाएगा।",
    nameLabel: "किसान का नाम",
    phoneLabel: "मोबाइल नंबर",
    cropLabel: "फसल",
    locationLabel: "स्थान",
    problemLabel: "समस्या का विवरण",
    imageLabel: "संलग्न पत्ती की फोटो",
    submitButton: "अनुरोध सबमिट करें",
    submittedTitle: "आपका अनुरोध सफलतापूर्वक सबमिट हो गया!",
    submittedDesc: "कृषि विस्तार अधिकारी आपकी फसल की जांच करेंगे और शीघ्र ही इस नंबर पर संपर्क करेंगे:",
    referenceIdLabel: "केस संदर्भ संख्या (Reference ID)",
    editableBadge: "संपादन योग्य",
    editNotice: "सबमिट करने से पहले नीचे दिए गए सभी शब्द और विवरण (फसल और स्थान सहित) पूरी तरह संपादन योग्य हैं।",
    resetDefault: "स्वतः मान पर रीसेट करें",
    editResubmit: "विवरण संपादित करें व पुनः सबमिट करें",
  },
  aiAgent: {
    buttonText: "कृषिसेतु एआई से पूछें",
    title: "कृषिसेतु एआई सहायक",
    subtitle: "सक्रिय फसल परामर्श एवं मार्गदर्शन",
    inputPlaceholder: "अपनी भाषा में पूछें या माइक दबाएं...",
    voiceActive: "आपकी आवाज़ सुनी जा रही है...",
    voiceNotSupported: "इस ब्राउज़र में वॉयस इनपुट समर्थित नहीं है। कृपया टाइप करें।",
    suggestedQuestions: [
      "मेरी फसल में क्या खराबी है?",
      "यह बीमारी क्यों हो रही है?",
      "मुझे सबसे पहले क्या करना चाहिए?",
      "क्या यह समस्या बहुत गंभीर है?",
      "सरल शब्दों में दवा की मात्रा बताएं",
    ],
  },
  faq: {
    title: "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
    subtitle: "कृषिसेतु एआई के बारे में किसानों के मुख्य सवाल",
    items: [
      {
        question: "कृषिसेतु एआई फसल के रोगों की पहचान कैसे करता है?",
        answer: "कृषिसेतु एआई पत्ती के धब्बों, रंग और लक्षणों की जांच करता है तथा आपके क्षेत्र की जलवायु और मिट्टी के प्रकार के साथ मिलाकर 4-चरणीय सटीक उपचार योजना बताता है।",
      },
      {
        question: "क्या मैं इसे अपनी क्षेत्रीय भाषा में उपयोग कर सकता हूँ?",
        answer: "हाँ! कृषिसेतु एआई हिन्दी, बांग्ला, मराठी, तेलुगु, तमिल, गुजराती, कन्नड़, मलयालम, पंजाबी, ओड़िया और असमिया सहित 12+ भाषाओं का समर्थन करता है।",
      },
      {
        question: "अगर एआई से समस्या हल न हो तो क्या करें?",
        answer: "यदि आप 'नहीं, अभी भी समस्या है' चुनते हैं, तो आप तुरंत टोल-फ्री नंबर पर कॉल कर सकते हैं, व्हाट्सएप कर सकते हैं या विशेषज्ञ कॉलबैक का फॉर्म भर सकते हैं।",
      },
      {
        question: "क्या मेरी जानकारी सुरक्षित है?",
        answer: "हाँ, आपका सटीक जीपीएस कभी सार्वजनिक नहीं होता। केवल सही कृषि सलाह देने के लिए जिले और क्षेत्र की जलवायु का उपयोग किया जाता है।",
      },
    ],
  },
  settings: {
    title: "सेटिंग्स एवं हेल्पलाइन",
    subtitle: "हेल्पलाइन नंबर और परीक्षण रीसेट विकल्प",
    expertPhoneLabel: "कृषि विशेषज्ञ / केवीके फोन नंबर",
    saveSettings: "सेटिंग्स सुरक्षित करें",
    resetDemo: "डेमो रीसेट करें",
  },
};

// Bengali Translations
export const bengaliTranslations: Partial<TranslationSchema> = {
  appName: "কৃষিসেতু এআই (KRISHISETU AI)",
  tagline: "কৃষক-প্রথম নির্দেশিত কৃষি বুদ্ধিমত্তা",
  kisanHelpline: "কৃষক সহায়তা হেল্পলাইন",
  changeLanguage: "ভাষা পরিবর্তন করুন",
  back: "পিছনে যান",
  next: "পরবর্তী",
  continue: "চালিয়ে যান",
  steps: {
    step1: "ভাষা",
    step2: "স্ক্যানার",
    step3: "অবস্থান",
    step4: "মাটির ধরন",
    step5: "রোগ শনাক্তকরণ",
    step6: "সমাধান",
    step7: "বিশেষজ্ঞ সহায়তা",
  },
  welcomeTitle: "কৃষিসেতু এআই-এ স্বাগতম",
  welcomeSubtitle: "ফসলের রোগ নির্ণয় ও বিশেষজ্ঞ পরামর্শের জন্য সহজ ধাপভিত্তিক এআই নির্দেশিকা।",
  chooseLanguage: "আপনার ভাষা নির্বাচন করুন",
  moreLanguages: "অন্যান্য ভাষা",
  searchLanguagePlaceholder: "ভাষা খুঁজুন...",
  scanner: {
    ...englishTranslations.scanner,
    title: "আপনার ফসল স্ক্যান করুন",
    subtitle: "আক্রান্ত ফসল বা পাতার একটি পরিষ্কার ছবি তুলুন বা আপলোড করুন।",
    takePhotoButton: "ক্যামেরা দিয়ে ছবি তুলুন",
    uploadButton: "ছবি আপলোড করুন",
    orChooseSample: "অথবা পরীক্ষার জন্য একটি নমুনা ফসল বেছে নিন:",
    analyzingTitle: "আপনার ফসল বিশ্লেষণ করা হচ্ছে...",
    stages: [
      "ছবি প্রক্রিয়াকরণ ও বিশ্লেষণ",
      "ফসল ও পাতার প্রজাতি শনাক্তকরণ",
      "রোগের তীব্রতা ও ক্ষতের মূল্যায়ন",
      "আবহাওয়াভিত্তিক রোগ মডেলের সাথে মেলানো",
    ],
  },
  location: {
    ...englishTranslations.location,
    title: "আপনার খামার কোথায় অবস্থিত?",
    subtitle: "আপনার আঞ্চলিক জলবায়ু ও ঋতুভিত্তিক রোগ অনুযায়ী সঠিক প্রতিকার পেতে সহায়তা করে।",
    useMyLocation: "আমার অবস্থান ব্যবহার করুন",
    selectManually: "ম্যানুয়ালি অবস্থান নির্বাচন করুন",
    confirmAndContinue: "নিশ্চিত করুন এবং এগিয়ে যান",
  },
  soil: {
    ...englishTranslations.soil,
    title: "আপনার খামারের মাটি কোন ধরনের?",
    subtitle: "মাটির আর্দ্রতা ও নিষ্কাশন সরাসরি রোগের বিস্তারকে প্রভাবিত করে।",
    dontKnowButton: "আমি আমার মাটির ধরন জানি না",
    continueToDetection: "রোগ শনাক্তকরণে এগিয়ে যান",
  },
  detection: {
    ...englishTranslations.detection,
    title: "এআই ফসল স্বাস্থ্য বিশ্লেষণ",
    cropLabel: "শনাক্তকৃত ফসল",
    issueLabel: "সম্ভাব্য সমস্যা / রোগ",
    severityLabel: "তীব্রতার মাত্রা",
    possibleCauseLabel: "সম্ভাব্য কারণ",
    whyHappeningLabel: "কেন এটি ঘটছে (কৃষক ব্যাখ্যা)",
    continueToResolution: "সমাধানে এগিয়ে যান",
  },
  resolution: {
    ...englishTranslations.resolution,
    title: "প্রস্তাবিত সমাধান",
    subtitle: "ফসল সুরক্ষার জন্য ৪-ধাপের কর্মপরিকল্পনা।",
    askAiButton: "এআই-এর কাছে আরও সাহায্য চান",
    problemResolvedQuestion: "আপনার সমস্যা কি সমাধান হয়েছে?",
    resolvedYesButton: "হ্যাঁ, সমাধান হয়েছে ✓",
    resolvedNoButton: "না, এখনও সমস্যা রয়েছে",
  },
  success: {
    ...englishTranslations.success,
    title: "চমৎকার! আপনার সমস্যার সমাধান হয়েছে বলে মনে হচ্ছে।",
    downloadReportButton: "রিপোর্ট ডাউনলোড / প্রিন্ট করুন",
    scanAgainButton: "আরেকটি ফসল স্ক্যান করুন",
  },
  escalation: {
    ...englishTranslations.escalation,
    title: "আমাদের অতিরিক্ত বিশেষজ্ঞের সহায়তা প্রয়োজন।",
    contactExpertButton: "বিশেষজ্ঞের সাথে যোগাযোগ করুন",
    whatsappSupportButton: "হোয়াটসঅ্যাপ সহায়তা",
    submitButton: "অনুরোধ জমা দিন",
  },
  aiAgent: {
    ...englishTranslations.aiAgent,
    buttonText: "কৃষিসেতু এআই-কে জিজ্ঞাসা করুন",
    title: "কৃষিসেতু এআই সহকারী",
    inputPlaceholder: "আপনার ভাষায় প্রশ্ন করুন...",
    suggestedQuestions: [
      "আমার ফসলের কী সমস্যা হয়েছে?",
      "কেন এই রোগ হচ্ছে?",
      "আমার প্রথমে কী করা উচিত?",
      "এটি কি খুব গুরুতর?",
    ],
  },
};

// Marathi Translations
export const marathiTranslations: Partial<TranslationSchema> = {
  appName: "कृषीसेतू एआय (KRISHISETU AI)",
  tagline: "शेतकरी-प्रथम कृषी मार्गदर्शन प्रणाली",
  kisanHelpline: "शेतकरी हेल्पलाइन",
  changeLanguage: "भाषा बदला",
  back: "मागे जा",
  next: "पुढे जा",
  continue: "सुरू ठेवा",
  steps: {
    step1: "भाषा",
    step2: "स्कॅनर",
    step3: "शेत स्थान",
    step4: "मातीचा प्रकार",
    step5: "रोग ओळख",
    step6: "उपाययोजना",
    step7: "तज्ज्ञ मदत",
  },
  welcomeTitle: "कृषीसेतू एआय मध्ये आपले स्वागत आहे",
  welcomeSubtitle: "पिकांचे अचूक निदान आणि तज्ज्ञ सल्ला मिळवण्यासाठी सोपे एआय मार्गदर्शक.",
  chooseLanguage: "आपली भाषा निवडा",
  moreLanguages: "इतर भाषा",
  scanner: {
    ...englishTranslations.scanner,
    title: "आपले पीक स्कॅन करा",
    subtitle: "बाधित पीक किंवा पानाचा स्पष्ट फोटो काढा किंवा अपलोड करा.",
    takePhotoButton: "कॅमेऱ्याने फोटो घ्या",
    uploadButton: "फोटो अपलोड करा",
    orChooseSample: "किंवा चाचणीसाठी नमुना पीक निवडा:",
    analyzingTitle: "पिकाचे विश्लेषण सुरू आहे...",
  },
  location: {
    ...englishTranslations.location,
    title: "आपले शेत कुठे आहे?",
    useMyLocation: "माझे स्थान वापरा",
    selectManually: "स्थान स्वतः निवडा",
    confirmAndContinue: "पुष्टी करा आणि पुढे जा",
  },
  soil: {
    ...englishTranslations.soil,
    title: "आपल्या शेतातील माती कोणत्या प्रकारची आहे?",
    dontKnowButton: "मला माझ्या मातीचा प्रकार माहित नाही",
    continueToDetection: "रोग ओळखीकडे पुढे जा",
  },
  detection: {
    ...englishTranslations.detection,
    title: "एआय पीक आरोग्य विश्लेषण",
    cropLabel: "ओळखलेले पीक",
    issueLabel: "संभाव्य रोग / समस्या",
    severityLabel: "तीव्रता पातळी",
    continueToResolution: "उपाययोजना पहा",
  },
  resolution: {
    ...englishTranslations.resolution,
    title: "शिफारस केलेले उपाय",
    askAiButton: "एआय ला अधिक विचारा",
    problemResolvedQuestion: "आपली समस्या सुटली का?",
    resolvedYesButton: "होय, समस्या सुटली ✓",
    resolvedNoButton: "नाही, अजूनही समस्या आहे",
  },
  success: {
    ...englishTranslations.success,
    title: "उत्तम! आपल्या समस्येचे निवारण झाले आहे.",
    downloadReportButton: "अहवाल डाउनलोड / प्रिंट करा",
    scanAgainButton: "दुसरे पीक स्कॅन करा",
  },
  escalation: {
    ...englishTranslations.escalation,
    title: "आम्हाला कृषी तज्ज्ञांच्या मदतीची गरज आहे.",
    contactExpertButton: "तज्ज्ञांशी संपर्क साधा",
    whatsappSupportButton: "व्हॉट्सॲप सपोर्ट",
  },
  aiAgent: {
    ...englishTranslations.aiAgent,
    buttonText: "कृषीसेतू एआय ला विचारा",
    suggestedQuestions: [
      "माझ्या पिकाला काय झाले आहे?",
      "हा रोग का होत आहे?",
      "मी सर्वप्रथम काय करावे?",
      "ही समस्या गंभीर आहे का?",
    ],
  },
};

// Telugu Translations
export const teluguTranslations: Partial<TranslationSchema> = {
  appName: "కృషిసేతు AI (KRISHISETU AI)",
  tagline: "రైతు-మొదటి దశలవారీ వ్యవసాయ సలహా",
  kisanHelpline: "రైతు హెల్ప్‌లైన్",
  changeLanguage: "భాష మార్చండి",
  back: "వెనుకకు",
  next: "తరువాత",
  continue: "కొనసాగించండి",
  steps: {
    step1: "భాష",
    step2: "స్కానర్",
    step3: "పొలం ప్రాంతం",
    step4: "నేల రకం",
    step5: "తెగులు గుర్తింపు",
    step6: "నివారణ",
    step7: "నిపుణుల సహాయం",
  },
  welcomeTitle: "కృషిసేతు AI కి స్వాగతం",
  welcomeSubtitle: "పంట తెగుళ్ల నిర్ధారణ మరియు నిపుణుల సలహాల కోసం సరళమైన AI మార్గదర్శి.",
  chooseLanguage: "మీ భాషను ఎంచుకోండి",
  moreLanguages: "మరిన్ని భాషలు",
  scanner: {
    ...englishTranslations.scanner,
    title: "మీ పంటను స్కాన్ చేయండి",
    subtitle: "దెబ్బతిన్న పంట లేదా ఆకు యొక్క స్పష్టమైన ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి.",
    takePhotoButton: "కెమెరాతో ఫోటో తీయండి",
    uploadButton: "ఫోటో అప్‌లోడ్ చేయండి",
    orChooseSample: "లేదా పరీక్ష కోసం నమూనా పంటను ఎంచుకోండి:",
  },
  location: {
    ...englishTranslations.location,
    title: "మీ పొలం ఎక్కడ ఉంది?",
    useMyLocation: "నా లొకేషన్ ఉపయోగించండి",
    selectManually: "లొకేషన్ స్వయంగా ఎంచుకోండి",
    confirmAndContinue: "ధృవీకరించి ముందుకు సాగండి",
  },
  soil: {
    ...englishTranslations.soil,
    title: "మీ పొలంలో ఏ రకమైన నేల ఉంది?",
    dontKnowButton: "నాకు నేల రకం తెలియదు",
    continueToDetection: "తెగులు గుర్తింపుకు వెళ్లండి",
  },
  detection: {
    ...englishTranslations.detection,
    title: "AI పంట ఆరోగ్య విశ్లేషణ",
    cropLabel: "గుర్తించిన పంట",
    issueLabel: "సంభావ్య తెగులు / సమస్య",
    severityLabel: "తీవ్రత స్థాయి",
    continueToResolution: "నివారణ చర్యలు చూడండి",
  },
  resolution: {
    ...englishTranslations.resolution,
    title: "సిఫార్సు చేయబడిన నివారణ చర్యలు",
    askAiButton: "AI ని మరింత అడగండి",
    problemResolvedQuestion: "మీ సమస్య పరిష్కరించబడిందా?",
    resolvedYesButton: "అవును, పరిష్కారమైంది ✓",
    resolvedNoButton: "లేదు, ఇంకా సమస్య ఉంది",
  },
  success: {
    ...englishTranslations.success,
    title: "చాలా బాగుంది! మీ సమస్య పరిష్కరించబడినట్లుంది.",
    downloadReportButton: "రిపోర్ట్ డౌన్‌లోడ్ / ప్రింట్ చేయండి",
    scanAgainButton: "మరొక పంటను స్కాన్ చేయండి",
  },
  escalation: {
    ...englishTranslations.escalation,
    title: "మాకు అదనపు వ్యవసాయ నిపుణుల సహాయం అవసరం.",
    contactExpertButton: "నిపుణుడిని సంప్రదించండి",
    whatsappSupportButton: "వాట్సాప్ సహాయం",
  },
  aiAgent: {
    ...englishTranslations.aiAgent,
    buttonText: "కృషిసేతు AI ని అడగండి",
    suggestedQuestions: [
      "నా పంటకు ఏమి జరిగింది?",
      "ఈ తెగులు ఎందుకు వస్తోంది?",
      "నేను మొదట ఏమి చేయాలి?",
      "ఇది తీవ్రమైన సమస్యా?",
    ],
  },
};

// Tamil Translations
export const tamilTranslations: Partial<TranslationSchema> = {
  appName: "கிருஷிசேது AI (KRISHISETU AI)",
  tagline: "விவசாயிகளுக்கான வழிகாட்டல் வேளாண் நுண்ணறிவு",
  kisanHelpline: "உழவர் உதவி எண்",
  changeLanguage: "மொழியை மாற்றவும்",
  back: "பின்னால்",
  next: "அடுத்து",
  continue: "தொடரவும்",
  steps: {
    step1: "மொழி",
    step2: "ஸ்கேனர்",
    step3: "பண்ணை இடம்",
    step4: "மண் வகை",
    step5: "நோய் கண்டறிதல்",
    step6: "தீர்வு",
    step7: "நிபுணர் உதவி",
  },
  welcomeTitle: "கிருஷிசேது AI-க்கு நல்வரவு",
  welcomeSubtitle: "பயிர் நோய் கண்டறிதல் மற்றும் வேளாண்மை ஆலோசனைக்கான எளிய வழிகாட்டி.",
  chooseLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
  moreLanguages: "மேலும் மொழிகள்",
  scanner: {
    ...englishTranslations.scanner,
    title: "உங்கள் பயிரை ஸ்கேன் செய்யவும்",
    subtitle: "பாதிக்கப்பட்ட பயிர் அல்லது இலையின் தெளிவான புகைப்படத்தை எடுக்கவும் அல்லது பதிவேற்றவும்.",
    takePhotoButton: "புகைப்படம் எடுக்கவும்",
    uploadButton: "படத்தை பதிவேற்றவும்",
  },
  location: {
    ...englishTranslations.location,
    title: "உங்கள் பண்ணை எங்கு உள்ளது?",
    useMyLocation: "எனது இருப்பிடத்தைப் பயன்படுத்தவும்",
    selectManually: "இருப்பிடத்தை கைமுறையாகத் தேர்ந்தெடுக்கவும்",
    confirmAndContinue: "உறுதிசெய்து தொடரவும்",
  },
  soil: {
    ...englishTranslations.soil,
    title: "உங்கள் பண்ணையில் என்ன வகை மண் உள்ளது?",
    dontKnowButton: "எனக்கு மண் வகை தெரியாது",
  },
  detection: {
    ...englishTranslations.detection,
    title: "AI பயிர் நல பகுப்பாய்வு",
    cropLabel: "கண்டறியப்பட்ட பயிர்",
    issueLabel: "சாத்தியமான நோய்",
    severityLabel: "தீவிர நிலை",
  },
  resolution: {
    ...englishTranslations.resolution,
    title: "பரிந்துரைக்கப்பட்ட தீர்வு",
    problemResolvedQuestion: "உங்கள் பிரச்சினை தீர்க்கப்பட்டதா?",
    resolvedYesButton: "ஆம், தீர்க்கப்பட்டது ✓",
    resolvedNoButton: "இல்லை, இன்னும் பிரச்சினை உள்ளது",
  },
  success: {
    ...englishTranslations.success,
    title: "அற்புதம்! உங்கள் பிரச்சினை தீர்க்கப்பட்டது.",
    scanAgainButton: "மற்றொரு பயிரை ஸ்கேன் செய்யவும்",
  },
  escalation: {
    ...englishTranslations.escalation,
    title: "வேளாண் நிபுணரின் உதவி தேவைப்படுகிறது.",
    contactExpertButton: "நிபுணரைத் தொடர்பு கொள்ளவும்",
    whatsappSupportButton: "வாட்ஸ்அப் உதவி",
  },
  aiAgent: {
    ...englishTranslations.aiAgent,
    buttonText: "கிருஷிசேது AI-யிடம் கேளுங்கள்",
  },
};

// Gujarati Translations
export const gujaratiTranslations: Partial<TranslationSchema> = {
  appName: "કૃષિસેતુ AI (KRISHISETU AI)",
  tagline: "ખેડૂત-પ્રથમ માર્ગદર્શિત કૃષિ પ્રણાલી",
  kisanHelpline: "કિસાન હેલ્પલાઇન",
  changeLanguage: "ભાષા બદલો",
  back: "પાછા જાઓ",
  next: "આગળ વધો",
  continue: "ચાલુ રાખો",
  steps: {
    step1: "ભાષા",
    step2: "સ્કેનર",
    step3: "સ્થાન",
    step4: "જમીનનો પ્રકાર",
    step5: "રોગ ઓળખ",
    step6: "ઉપાય",
    step7: "નિષ્ણાત સહાય",
  },
  welcomeTitle: "કૃષિસેતુ AI માં આપનું સ્વાગત છે",
  welcomeSubtitle: "પાકના રોગનું સચોટ નિદાન અને કૃષિ સલાહ માટે સરળ પગલાંવાર માર્ગદર્શિકા.",
  chooseLanguage: "તમારી ભાષા પસંદ કરો",
  moreLanguages: "વધુ ભાષાઓ",
  scanner: {
    ...englishTranslations.scanner,
    title: "તમારા પાકને સ્કેન કરો",
    subtitle: "રોગગ્રસ્ત પાક અથવા પાનનો સ્પષ્ટ ફોટો લો અથવા અપલોડ કરો.",
    takePhotoButton: "કેમેરાથી ફોટો લો",
    uploadButton: "ફોટો અપલોડ કરો",
  },
  location: {
    ...englishTranslations.location,
    title: "તમારું ખેતર ક્યાં આવેલું છે?",
    useMyLocation: "મારું સ્થાન વાપરો",
    selectManually: "સ્થાન મેન્યુઅલી પસંદ કરો",
    confirmAndContinue: "પુષ્ટિ કરો અને આગળ વધો",
  },
  soil: {
    ...englishTranslations.soil,
    title: "તમારા ખેતરમાં કયા પ્રકારની જમીન છે?",
    dontKnowButton: "મને મારી જમીનનો પ્રકાર ખબર નથી",
  },
  detection: {
    ...englishTranslations.detection,
    title: "AI પાક આરોગ્ય વિશ્લેષણ",
    cropLabel: "ઓળખાયેલ પાક",
    issueLabel: "સંભવિત રોગ",
    severityLabel: "તીવ્રતા સ્તર",
  },
  resolution: {
    ...englishTranslations.resolution,
    title: "ભલામણ કરેલ ઉપાયો",
    problemResolvedQuestion: "શું તમારી સમસ્યા હલ થઈ ગઈ?",
    resolvedYesButton: "હા, ઉકેલાઈ ગઈ ✓",
    resolvedNoButton: "ના, હજુ પણ સમસ્યા છે",
  },
  success: {
    ...englishTranslations.success,
    title: "ખૂબ સરસ! તમારી સમસ્યા હલ થઈ ગઈ છે.",
    scanAgainButton: "બીજો પાક સ્કેન કરો",
  },
  escalation: {
    ...englishTranslations.escalation,
    title: "કૃષિ નિષ્ણાતની સહાયની જરૂર છે.",
    contactExpertButton: "નિષ્ણાતનો સંપર્ક કરો",
    whatsappSupportButton: "વોટ્સએપ સપોર્ટ",
  },
  aiAgent: {
    ...englishTranslations.aiAgent,
    buttonText: "કૃષિસેતુ AI ને પૂછો",
  },
};

// Kannada Translations
export const kannadaTranslations: Partial<TranslationSchema> = {
  appName: "ಕೃಷಿಸೇತು AI (KRISHISETU AI)",
  tagline: "ರೈತ-ಮೊದಲು ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ",
  kisanHelpline: "ರೈತ ಸಹಾಯವಾಣಿ",
  changeLanguage: "ಭಾಷೆ ಬದಲಾಯಿಸಿ",
  back: "ಹಿಂದೆ",
  next: "ಮುಂದೆ",
  continue: "ಮುಂದುವರಿಯಿರಿ",
  steps: {
    step1: "ಭಾಷೆ",
    step2: "ಸ್ಕ್ಯಾನರ್",
    step3: "ಸ್ಥಳ",
    step4: "ಮಣ್ಣಿನ ವಿಧ",
    step5: "ರೋಗ ಪತ್ತೆ",
    step6: "ಪರಿಹಾರ",
    step7: "ತಜ್ಞರ ನೆರವು",
  },
  welcomeTitle: "ಕೃಷಿಸೇತು AI ಗೆ ಸುಸ್ವಾಗತ",
  welcomeSubtitle: "ಬೆಳೆ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಪರಿಹಾರಕ್ಕಾಗಿ ಸರಳ AI ಮಾರ್ಗದರ್ಶಿ.",
  chooseLanguage: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  moreLanguages: "ಇತರ ಭಾಷೆಗಳು",
  scanner: {
    ...englishTranslations.scanner,
    title: "ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    takePhotoButton: "ಕ್ಯಾಮೆರಾದಿಂದ ಫೋಟೋ ತೆಗೆಯಿರಿ",
    uploadButton: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
  },
  location: {
    ...englishTranslations.location,
    title: "ನಿಮ್ಮ ಜಮೀನು ಎಲ್ಲಿದೆ?",
    useMyLocation: "ನನ್ನ ಸ್ಥಳವನ್ನು ಬಳಸಿ",
    selectManually: "ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    confirmAndContinue: "ಖಚಿತಪಡಿಸಿ ಮತ್ತು ಮುಂದುವರಿಯಿರಿ",
  },
  soil: {
    ...englishTranslations.soil,
    title: "ನಿಮ್ಮ ಜಮೀನಿನಲ್ಲಿ ಯಾವ ರೀತಿಯ ಮಣ್ಣು ಇದೆ?",
    dontKnowButton: "ನನಗೆ ಮಣ್ಣಿನ ಪ್ರಕಾರ ತಿಳಿದಿಲ್ಲ",
  },
  detection: {
    ...englishTranslations.detection,
    title: "AI ಬೆಳೆ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆ",
    cropLabel: "ಪತ್ತೆಯಾದ ಬೆಳೆ",
    issueLabel: "ಸಾಧ್ಯವಿರುವ ರೋಗ",
    severityLabel: "ತೀವ್ರತೆಯ ಮಟ್ಟ",
  },
  resolution: {
    ...englishTranslations.resolution,
    title: "ಶಿಫಾರಸು ಮಾಡಿದ ಪರಿಹಾರ",
    problemResolvedQuestion: "ನಿಮ್ಮ ಸಮಸ್ಯೆ ಬಗೆಹರಿದಿದೆಯೇ?",
    resolvedYesButton: "ಹೌದು, ಬಗೆಹರಿದಿದೆ ✓",
    resolvedNoButton: "ಇಲ್ಲ, ಇನ್ನೂ ಸಮಸ್ಯೆಯಿದೆ",
  },
  success: {
    ...englishTranslations.success,
    title: "ಉತ್ತಮ! ನಿಮ್ಮ ಸಮಸ್ಯೆಗೆ ಪರಿಹಾರ ಸಿಕ್ಕಿದೆ.",
    scanAgainButton: "ಮತ್ತೊಂದು ಬೆಳೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
  },
  escalation: {
    ...englishTranslations.escalation,
    title: "ಕೃಷಿ ತಜ್ಞರ ಸಹಾಯದ ಅಗತ್ಯವಿದೆ.",
    contactExpertButton: "ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ",
    whatsappSupportButton: "ವಾಟ್ಸಾಪ್ ಸಹಾಯ",
  },
  aiAgent: {
    ...englishTranslations.aiAgent,
    buttonText: "ಕೃಷಿಸೇತು AI ಅನ್ನು ಕೇಳಿ",
  },
};

// Malayalam Translations
export const malayalamTranslations: Partial<TranslationSchema> = {
  appName: "കൃഷിസേതു AI (KRISHISETU AI)",
  tagline: "കർഷക-സൗഹൃദ കാർഷിക ഉപദേശകൻ",
  kisanHelpline: "കിസാൻ ഹെൽപ്പ്‌ലൈൻ",
  changeLanguage: "ഭാഷ മാറ്റുക",
  back: "പിന്നിലേക്ക്",
  next: "അടുത്തത്",
  continue: "തുടരുക",
  steps: {
    step1: "ഭാഷ",
    step2: "സ്കാനർ",
    step3: "സ്ഥലം",
    step4: "മണ്ണിന്റെ തരം",
    step5: "രോഗനിർണയം",
    step6: "പരിഹാരം",
    step7: "വിദഗ്ദ്ധ സഹായം",
  },
  welcomeTitle: "കൃഷിസേതു AI-ലേക്ക് സ്വാഗതം",
  welcomeSubtitle: "വിളകളുടെ രോഗനിർണയത്തിനും കൃഷി ഉപദേശത്തിനുമുള്ള ലളിതമായ ഗൈഡ്.",
  chooseLanguage: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക",
  moreLanguages: "കൂടുതൽ ഭാഷകൾ",
  scanner: {
    ...englishTranslations.scanner,
    title: "വിള സ്കാൻ ചെയ്യുക",
    takePhotoButton: "ഫോട്ടോ എടുക്കുക",
    uploadButton: "ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
  },
  location: {
    ...englishTranslations.location,
    title: "നിങ്ങളുടെ കൃഷിസ്ഥലം എവിടെയാണ്?",
    useMyLocation: "എന്റെ സ്ഥാനം ഉപയോഗിക്കുക",
    selectManually: "സ്വയം തിരഞ്ഞെടുക്കുക",
    confirmAndContinue: "സ്ഥിരീകരിച്ച് തുടരുക",
  },
  soil: {
    ...englishTranslations.soil,
    title: "നിങ്ങളുടെ സ്ഥലത്തെ മണ്ണ് ഏത് തരമാണ്?",
    dontKnowButton: "എനിക്ക് മണ്ണിന്റെ തരം അറിയില്ല",
  },
  detection: {
    ...englishTranslations.detection,
    title: "AI വിള ആരോഗ്യ വിശകലനം",
    cropLabel: "തിരിച്ചറിഞ്ഞ വിള",
    issueLabel: "സാധ്യമായ രോഗം",
    severityLabel: "തീവ്രത",
  },
  resolution: {
    ...englishTranslations.resolution,
    title: "നിർദ്ദേശിച്ച പരിഹാരങ്ങൾ",
    problemResolvedQuestion: "നിങ്ങളുടെ പ്രശ്നം പരിഹരിക്കപ്പെട്ടോ?",
    resolvedYesButton: "അതെ, പരിഹരിച്ചു ✓",
    resolvedNoButton: "ഇല്ല, ഇപ്പോഴും പ്രശ്നമുണ്ട്",
  },
  success: {
    ...englishTranslations.success,
    title: "വളരെ നല്ലത്! പ്രശ്നം പരിഹരിക്കപ്പെട്ടു.",
    scanAgainButton: "മറ്റൊരു വിള സ്കാൻ ചെയ്യുക",
  },
  escalation: {
    ...englishTranslations.escalation,
    title: "കാർഷിക വിദഗ്ദ്ധന്റെ സഹായം ആവശ്യമാണ്.",
    contactExpertButton: "വിദഗ്ദ്ധനെ വിളിക്കുക",
    whatsappSupportButton: "വാട്ട്‌സ്ആപ്പ് സഹായം",
  },
  aiAgent: {
    ...englishTranslations.aiAgent,
    buttonText: "കൃഷിസേതു AI-യോട് ചോദിക്കുക",
  },
};

// Punjabi Translations
export const punjabiTranslations: Partial<TranslationSchema> = {
  appName: "ਕ੍ਰਿਸ਼ੀਸੇਤੂ AI (KRISHISETU AI)",
  tagline: "ਕਿਸਾਨ-ਪਹਿਲ ਖੇਤੀਬਾੜੀ ਸਲਾਹਕਾਰ",
  kisanHelpline: "ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ",
  changeLanguage: "ਭਾਸ਼ਾ ਬਦਲੋ",
  back: "ਪਿੱਛੇ",
  next: "ਅੱਗੇ",
  continue: "ਜਾਰੀ ਰੱਖੋ",
  steps: {
    step1: "ਭਾਸ਼ਾ",
    step2: "ਸਕੈਨਰ",
    step3: "ਖੇਤ ਦਾ ਸਥਾਨ",
    step4: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
    step5: "ਬਿਮਾਰੀ ਦੀ ਪਛਾਣ",
    step6: "ਇਲਾਜ",
    step7: "ਮਾਹਿਰ ਸਹਾਇਤਾ",
  },
  welcomeTitle: "ਕ੍ਰਿਸ਼ੀਸੇਤੂ AI ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ",
  welcomeSubtitle: "ਫਸਲਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਦੀ ਜਾਂਚ ਅਤੇ ਸਹੀ ਇਲਾਜ ਲਈ ਸਰਲ AI ਗਾਈਡ।",
  chooseLanguage: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
  moreLanguages: "ਹੋਰ ਭਾਸ਼ਾਵਾਂ",
  scanner: {
    ...englishTranslations.scanner,
    title: "ਆਪਣੀ ਫਸਲ ਸਕੈਨ ਕਰੋ",
    takePhotoButton: "ਕੈਮਰੇ ਨਾਲ ਫੋਟੋ ਲਓ",
    uploadButton: "ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ",
  },
  location: {
    ...englishTranslations.location,
    title: "ਤੁਹਾਡਾ ਖੇਤ ਕਿੱਥੇ ਸਥਿਤ ਹੈ?",
    useMyLocation: "ਮੇਰਾ ਸਥਾਨ ਵਰਤੋ",
    selectManually: "ਸਥਾਨ ਖੁਦ ਚੁਣੋ",
    confirmAndContinue: "ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਅੱਗੇ ਵਧੋ",
  },
  soil: {
    ...englishTranslations.soil,
    title: "ਤੁਹਾਡੇ ਖੇਤ ਦੀ ਮਿੱਟੀ ਕਿਹੋ ਜਿਹੀ ਹੈ?",
    dontKnowButton: "ਮੈਨੂੰ ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਨਹੀਂ ਪਤਾ",
  },
  detection: {
    ...englishTranslations.detection,
    title: "AI ਫਸਲ ਸਿਹਤ ਜਾਂਚ",
    cropLabel: "ਪਛਾਣੀ ਗਈ ਫਸਲ",
    issueLabel: "ਸੰਭਾਵੀ ਬਿਮਾਰੀ",
    severityLabel: "ਗੰਭੀਰਤਾ",
  },
  resolution: {
    ...englishTranslations.resolution,
    title: "ਸਿਫਾਰਸ਼ ਕੀਤੇ ਇਲਾਜ",
    problemResolvedQuestion: "ਕੀ ਤੁਹਾਡੀ ਸਮੱਸਿਆ ਹੱਲ ਹੋ ਗਈ ਹੈ?",
    resolvedYesButton: "ਹਾਂ, ਹੱਲ ਹੋ ਗਈ ✓",
    resolvedNoButton: "ਨਹੀਂ, ਅਜੇ ਵੀ ਸਮੱਸਿਆ ਹੈ",
  },
  success: {
    ...englishTranslations.success,
    title: "ਬਹੁਤ ਵਧੀਆ! ਤੁਹਾਡੀ ਸਮੱਸਿਆ ਹੱਲ ਹੋ ਗਈ ਹੈ।",
    scanAgainButton: "ਕੋਈ ਹੋਰ ਫਸਲ ਸਕੈਨ ਕਰੋ",
  },
  escalation: {
    ...englishTranslations.escalation,
    title: "ਖੇਤੀਬਾੜੀ ਮਾਹਿਰ ਦੀ ਸਹਾਇਤਾ ਦੀ ਲੋੜ ਹੈ।",
    contactExpertButton: "ਮਾਹਿਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    whatsappSupportButton: "ਵਟਸਐਪ ਸਹਾਇਤਾ",
  },
  aiAgent: {
    ...englishTranslations.aiAgent,
    buttonText: "ਕ੍ਰਿਸ਼ੀਸੇਤੂ AI ਨੂੰ ਪੁੱਛੋ",
  },
};

// Odia Translations
export const odiaTranslations: Partial<TranslationSchema> = {
  appName: "କୃଷିସେତୁ AI (KRISHISETU AI)",
  tagline: "କୃଷକ-ପ୍ରଥମ କୃଷି ମାର୍ଗଦର୍ଶିକା",
  kisanHelpline: "କିଷାନ ହେଲ୍ପଲାଇନ୍",
  changeLanguage: "ଭାଷା ବଦଳାନ୍ତୁ",
  back: "ପଛକୁ",
  next: "ଆଗକୁ",
  continue: "ଜାରି ରଖନ୍ତୁ",
  steps: {
    step1: "ଭାଷା",
    step2: "ସ୍କାନର୍",
    step3: "ସ୍ଥାନ",
    step4: "ମାଟିର ପ୍ରକାର",
    step5: "ରୋଗ ଚିହ୍ନଟ",
    step6: "ପ୍ରତିକାର",
    step7: "ବିଶେଷଜ୍ଞ ସହାୟତା",
  },
  welcomeTitle: "କୃଷିସେତୁ AI କୁ ସ୍ୱାଗତ",
  welcomeSubtitle: "ଫସଲ ରୋଗ ନିର୍ଣ୍ଣୟ ଏବଂ ଉପଯୁକ୍ତ ପରାମର୍ଶ ପାଇଁ ସରଳ AI ନିର୍ଦ୍ଦେଶିକା।",
  chooseLanguage: "ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ",
  moreLanguages: "ଅନ୍ୟ ଭାଷା",
  scanner: {
    ...englishTranslations.scanner,
    title: "ଫସଲ ସ୍କାନ୍ କରନ୍ତୁ",
    takePhotoButton: "ଫଟୋ ଉଠାନ୍ତୁ",
    uploadButton: "ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ",
  },
  location: {
    ...englishTranslations.location,
    title: "ଆପଣଙ୍କ ଜମି କେଉଁଠାରେ ଅବସ୍ଥିତ?",
    useMyLocation: "ମୋର ସ୍ଥାନ ବ୍ୟବହାର କରନ୍ତୁ",
    selectManually: "ସ୍ଥାନ ନିଜେ ବାଛନ୍ତୁ",
    confirmAndContinue: "ନିଶ୍ଚିତ କରନ୍ତୁ ଏବଂ ଆଗକୁ ବଢନ୍ତୁ",
  },
  soil: {
    ...englishTranslations.soil,
    title: "ଆପଣଙ୍କ ଜମିର ମାଟି କେଉଁ ପ୍ରକାରର?",
    dontKnowButton: "ମୋତେ ମାଟି ପ୍ରକାର ଜଣାନାହିଁ",
  },
  detection: {
    ...englishTranslations.detection,
    title: "AI ଫସଲ ସ୍ୱାସ୍ଥ୍ୟ ବିଶ୍ଳେଷଣ",
    cropLabel: "ଚିହ୍ନଟ ଫସଲ",
    issueLabel: "ସମ୍ଭାବ୍ୟ ରୋଗ",
    severityLabel: "ଗୁରୁତରତା",
  },
  resolution: {
    ...englishTranslations.resolution,
    title: "ପରାମର୍ଶିତ ପ୍ରତିକାର",
    problemResolvedQuestion: "ଆପଣଙ୍କ ସମସ୍ୟା ସମାଧାନ ହେଲା କି?",
    resolvedYesButton: "ହଁ, ସମାଧାନ ହୋଇଛି ✓",
    resolvedNoButton: "ନାହିଁ, ଏବେ ବି ସମସ୍ୟା ଅଛି",
  },
  success: {
    ...englishTranslations.success,
    title: "ଚମତ୍କାର! ଆପଣଙ୍କ ସମସ୍ୟାର ସମାଧାନ ହୋଇଛି।",
    scanAgainButton: "ଅନ୍ୟ ଏକ ଫସଲ ସ୍କାନ୍ କରନ୍ତୁ",
  },
  escalation: {
    ...englishTranslations.escalation,
    title: "କୃଷି ବିଶେଷଜ୍ଞଙ୍କ ସହାୟତା ଆବଶ୍ୟକ।",
    contactExpertButton: "ବିଶେଷଜ୍ଞଙ୍କ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ",
    whatsappSupportButton: "ହ୍ୱାଟ୍ସଆପ୍ ସହାୟତା",
  },
  aiAgent: {
    ...englishTranslations.aiAgent,
    buttonText: "କୃଷିସେତୁ AI କୁ ପଚାରନ୍ତୁ",
  },
};

// Assamese Translations
export const assameseTranslations: Partial<TranslationSchema> = {
  appName: "কৃষি সেতু এআই (KRISHISETU AI)",
  tagline: "কৃষক-প্ৰথম পথপ্ৰদৰ্শক কৃষি বুদ্ধিমত্তা",
  kisanHelpline: "কৃষক হেল্পলাইন",
  changeLanguage: "ভাষা সলনি কৰক",
  back: "পিছলৈ",
  next: "আগলৈ",
  continue: "অব্যাহত ৰাখক",
  steps: {
    step1: "ভাষা",
    step2: "স্ক্যানাৰ",
    step3: "স্থান",
    step4: "মাটিৰ প্ৰকাৰ",
    step5: "ৰোগ চিনাক্তকৰণ",
    step6: "সমাধান",
    step7: "বিশেষজ্ঞ সহায়",
  },
  welcomeTitle: "কৃষি সেতু এআইলৈ স্বাগতম",
  welcomeSubtitle: "শস্যৰ ৰোগ নিৰ্ণয় আৰু পৰামৰ্শৰ বাবে সহজ AI নিৰ্দেশিকা।",
  chooseLanguage: "আপোনাৰ ভাষা বাছক",
  moreLanguages: "অন্যান্য ভাষা",
  scanner: {
    ...englishTranslations.scanner,
    title: "আপোনাৰ শস্য স্কেন কৰক",
    takePhotoButton: "ফটো তোলক",
    uploadButton: "ফটো আপলোড কৰক",
  },
  location: {
    ...englishTranslations.location,
    title: "আপোনাৰ পথাৰ ক'ত অৱস্থিত?",
    useMyLocation: "মোৰ স্থান ব্যৱহাৰ কৰক",
    selectManually: "স্থান নিজে বাছক",
    confirmAndContinue: "নিশ্চিত কৰক আৰু আগবাঢ়ক",
  },
  soil: {
    ...englishTranslations.soil,
    title: "আপোনাৰ পথাৰৰ মাটি কেনেকুৱা?",
    dontKnowButton: "মই মাটিৰ প্ৰকাৰ নাজানো",
  },
  detection: {
    ...englishTranslations.detection,
    title: "AI শস্য স্বাস্থ্য বিশ্লেষণ",
    cropLabel: "চিনাক্ত শস্য",
    issueLabel: "সম্ভাব্য ৰোগ",
    severityLabel: "তীব্ৰতা",
  },
  resolution: {
    ...englishTranslations.resolution,
    title: "পৰামৰ্শিত সমাধান",
    problemResolvedQuestion: "আপোনাৰ সমস্যা সমাধান হ'লনে?",
    resolvedYesButton: "হয়, সমাধান হ'ল ✓",
    resolvedNoButton: "নহয়, এতিয়াও সমস্যা আছে",
  },
  success: {
    ...englishTranslations.success,
    title: "বৰ ভাল! সমস্যা সমাধান হৈছে।",
    scanAgainButton: "অন্য শস্য স্কেন কৰਕ",
  },
  escalation: {
    ...englishTranslations.escalation,
    title: "কৃষি বিশেষজ্ঞৰ সহায় প্ৰয়োজন।",
    contactExpertButton: "বিশেষজ্ঞৰ সৈতে যোগাযোগ কৰক",
    whatsappSupportButton: "হোৱাটছএপ সহায়",
  },
  aiAgent: {
    ...englishTranslations.aiAgent,
    buttonText: "কৃষি সেতু এআইক সোধক",
  },
};

// Central Translation Registry
const rawTranslations: Record<Language, any> = {
  en: englishTranslations,
  hi: hindiTranslations,
  bn: bengaliTranslations,
  mr: marathiTranslations,
  te: teluguTranslations,
  ta: tamilTranslations,
  gu: gujaratiTranslations,
  kn: kannadaTranslations,
  ml: malayalamTranslations,
  pa: punjabiTranslations,
  or: odiaTranslations,
  as: assameseTranslations,
  ur: hindiTranslations, // gracefully mapped with Urdu phrasing where available
  bho: hindiTranslations,
  mai: hindiTranslations,
};

// Deep merge with English fallback to guarantee no missing fields or runtime breaks
export function getTranslation(language: Language): TranslationSchema {
  const target = rawTranslations[language] || rawTranslations.hi;
  return deepMerge(englishTranslations, target);
}

function deepMerge(target: any, source: any): any {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export const translations = {
  en: getTranslation("en"),
  hi: getTranslation("hi"),
};
