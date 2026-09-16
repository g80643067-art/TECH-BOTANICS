export type Language =
  | "hi" // Hindi
  | "en" // English
  | "bn" // Bengali
  | "mr" // Marathi
  | "te" // Telugu
  | "ta" // Tamil
  | "gu" // Gujarati
  | "kn" // Kannada
  | "ml" // Malayalam
  | "pa" // Punjabi
  | "or" // Odia
  | "as" // Assamese
  | "ur" // Urdu
  | "bho" // Bhojpuri
  | "mai"; // Maithili

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  voiceLocale: string;
  isPrimary: boolean;
  region: string;
}

export type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type SeverityLevel = "Low" | "Medium" | "High";

export interface SoilOption {
  id: string;
  emoji: string;
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
  description_en: string;
  description_hi: string;
  description_bn?: string;
  description_mr?: string;
  description_te?: string;
  description_ta?: string;
  description_gu?: string;
  description_kn?: string;
  description_ml?: string;
  description_pa?: string;
  description_or?: string;
  description_as?: string;
  colorHex: string;
  characteristics: string[];
}

export interface ResolutionStep {
  stepNumber: number;
  title_en: string;
  title_hi: string;
  title_bn?: string;
  title_mr?: string;
  title_te?: string;
  title_ta?: string;
  title_gu?: string;
  title_kn?: string;
  title_ml?: string;
  title_pa?: string;
  title_or?: string;
  title_as?: string;
  tag_en: string;
  tag_hi: string;
  tag_bn?: string;
  tag_mr?: string;
  tag_te?: string;
  tag_ta?: string;
  tag_gu?: string;
  tag_kn?: string;
  tag_ml?: string;
  tag_pa?: string;
  tag_or?: string;
  tag_as?: string;
  description_en: string;
  description_hi: string;
  description_bn?: string;
  description_mr?: string;
  description_te?: string;
  description_ta?: string;
  description_gu?: string;
  description_kn?: string;
  description_ml?: string;
  description_pa?: string;
  description_or?: string;
  description_as?: string;
  duration_en?: string;
  duration_hi?: string;
}

export interface CropIssueData {
  id: string;
  cropName_en: string;
  cropName_hi: string;
  cropName_bn?: string;
  cropName_mr?: string;
  cropName_te?: string;
  cropName_ta?: string;
  cropName_gu?: string;
  cropName_kn?: string;
  cropName_ml?: string;
  cropName_pa?: string;
  cropName_or?: string;
  cropName_as?: string;
  category: "Cereal" | "Vegetable" | "Cash Crop" | "Fruit" | "Pulse";
  issueName_en: string;
  issueName_hi: string;
  issueName_bn?: string;
  issueName_mr?: string;
  issueName_te?: string;
  issueName_ta?: string;
  issueName_gu?: string;
  issueName_kn?: string;
  issueName_ml?: string;
  issueName_pa?: string;
  issueName_or?: string;
  issueName_as?: string;
  scientificName?: string;
  severity: SeverityLevel;
  confidenceScore: number;
  possibleCause_en: string;
  possibleCause_hi: string;
  possibleCause_bn?: string;
  possibleCause_mr?: string;
  possibleCause_te?: string;
  possibleCause_ta?: string;
  possibleCause_gu?: string;
  possibleCause_kn?: string;
  possibleCause_ml?: string;
  possibleCause_pa?: string;
  possibleCause_or?: string;
  possibleCause_as?: string;
  whyHappening_en: string;
  whyHappening_hi: string;
  whyHappening_bn?: string;
  whyHappening_mr?: string;
  whyHappening_te?: string;
  whyHappening_ta?: string;
  whyHappening_gu?: string;
  whyHappening_kn?: string;
  whyHappening_ml?: string;
  whyHappening_pa?: string;
  whyHappening_or?: string;
  whyHappening_as?: string;
  sampleImage: string;
  steps: ResolutionStep[];
}

export interface AgroClimateData {
  climateZone_en: string;
  climateZone_hi: string;
  temperatureRange: string;
  currentTemp?: number;
  humidity?: number;
  rainfallCategory_en: string;
  rainfallCategory_hi: string;
  currentRainfallEstimate?: string;
  currentSeason_en: "Rabi" | "Kharif" | "Zaid";
  currentSeason_hi: "रबी" | "खरीफ" | "जायद";
  dominantSoil_en: string;
  dominantSoil_hi: string;
  waterAvailability_en: string;
  waterAvailability_hi: string;
  regionalCroppingPattern_en: string;
  regionalCroppingPattern_hi: string;
  dataSource: "realtime_verified" | "agro_database" | "demo_recommendation";
}

export interface SuitableCropRecommendation {
  id: string;
  cropName_en: string;
  cropName_hi: string;
  cropName_bn?: string;
  cropName_mr?: string;
  cropName_te?: string;
  cropName_ta?: string;
  cropName_gu?: string;
  cropName_kn?: string;
  cropName_ml?: string;
  cropName_pa?: string;
  cropName_or?: string;
  cropName_as?: string;
  cropName_ur?: string;
  cropName_bho?: string;
  cropName_mai?: string;
  emoji: string;
  season_en: string;
  season_hi: string;
  season_bn?: string;
  season_mr?: string;
  season_te?: string;
  season_ta?: string;
  season_gu?: string;
  season_kn?: string;
  season_ml?: string;
  season_pa?: string;
  season_or?: string;
  season_as?: string;
  season_ur?: string;
  season_bho?: string;
  season_mai?: string;
  suitableArea_en: string;
  suitableArea_hi: string;
  suitableArea_bn?: string;
  suitableArea_mr?: string;
  suitableArea_te?: string;
  suitableArea_ta?: string;
  suitableArea_gu?: string;
  suitableArea_kn?: string;
  suitableArea_ml?: string;
  suitableArea_pa?: string;
  suitableArea_or?: string;
  suitableArea_as?: string;
  suitableArea_ur?: string;
  suitableArea_bho?: string;
  suitableArea_mai?: string;
  reason_en: string;
  reason_hi: string;
  reason_bn?: string;
  reason_mr?: string;
  reason_te?: string;
  reason_ta?: string;
  reason_gu?: string;
  reason_kn?: string;
  reason_ml?: string;
  reason_pa?: string;
  reason_or?: string;
  reason_as?: string;
  reason_ur?: string;
  reason_bho?: string;
  reason_mai?: string;
  idealSoil_en: string;
  idealSoil_hi: string;
  waterNeed_en: "Low" | "Medium" | "High";
  waterNeed_hi: "कम" | "मध्यम" | "अधिक";
  durationDays: string;
  isDemo?: boolean;
}

export interface FarmLocation {
  displayName: string;
  villageOrArea?: string;
  district: string;
  state: string;
  country: string;
  source: "gps" | "manual" | "preset";
  latitude?: number;
  longitude?: number;
  accuracyMeters?: number;
  agroClimate?: AgroClimateData;
  recommendedCrops?: SuitableCropRecommendation[];
  isDemoData?: boolean;
}

export interface SessionState {
  language: Language;
  step: StepNumber;
  uploadedImage: string | null;
  imageFileName?: string;
  detectedCrop: CropIssueData | null;
  location: FarmLocation | null;
  soilType: SoilOption | null;
  isScanning: boolean;
  scanProgress: number;
  scanStageIndex: number;
  isProblemResolved: boolean | null;
  expertRequestId?: string;
}

export interface ExpertRequestPayload {
  name: string;
  phone: string;
  crop: string;
  location: string;
  problem: string;
  image?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export type ConfidenceLevel = "High" | "Medium" | "Low";

export type VisionIdentificationStatus = "identified" | "uncertain" | "multiple_crops";

export interface VisualFeaturesAnalysis {
  leafShape: string;
  leafArrangement: string;
  plantStructure: string;
  stemCharacteristics: string;
  reproductiveParts?: string; // flowers/fruits/seeds if visible
  overallAppearance: string;
}

export interface CropCandidateOption {
  cropId: string;
  cropName_en: string;
  cropName_hi: string;
  cropName_bn?: string;
  cropName_mr?: string;
  cropName_te?: string;
  cropName_ta?: string;
  cropName_gu?: string;
  cropName_kn?: string;
  cropName_ml?: string;
  cropName_pa?: string;
  cropName_or?: string;
  cropName_as?: string;
  emoji: string;
  confidence: ConfidenceLevel;
  visualClue_en: string;
  visualClue_hi: string;
}

export interface CropAndFarmAnalysisInsight {
  locationDisplay: string;
  soilTypeDisplay: string;
  seasonDisplay: string;
  combinedInsight_en: string;
  combinedInsight_hi: string;
  potentialRiskFactors_en?: string[];
  potentialRiskFactors_hi?: string[];
}

export interface VisionDebugMetadata {
  modelName: string;
  isLiveApi: boolean;
  latencyMs?: number;
  identifiedCropRaw?: string;
  visualEvidenceSummary?: string;
  rawConfidence?: string;
  timestamp: string;
}

export interface VisionAnalysisResult {
  status: VisionIdentificationStatus;
  cropData: CropIssueData;
  confidence: ConfidenceLevel;
  confidenceScore: number;
  isDemo: boolean;
  analysisSource: "gemini_vision" | "demo_ai" | "demo_curated_sample" | "unconnected_demo";
  visualFeatures: VisualFeaturesAnalysis;
  healthSummary: {
    isHealthy: boolean;
    issueName_en: string;
    issueName_hi: string;
    severity: SeverityLevel;
    possibleCause_en: string;
    possibleCause_hi: string;
    visualSymptoms_en: string;
    visualSymptoms_hi: string;
  };
  cropAndFarmAnalysis?: CropAndFarmAnalysisInsight;
  recommendedResolution: ResolutionStep[];
  multipleCropOptions?: CropCandidateOption[];
  uncertaintyReason?: {
    reason_en: string;
    reason_hi: string;
  };
  debugMetadata?: VisionDebugMetadata;
}
