import {
  CropIssueData,
  FarmLocation,
  Language,
  SoilOption,
  VisionAnalysisResult,
} from "../types";
import { identifyCropFromImage } from "./cropIdentificationService";
import { analyzeCropHealth } from "./cropHealthService";
import { buildCropAndFarmRecommendation } from "./recommendationService";
import { SAMPLE_CROPS } from "../data/mockCrops";

/**
 * Execute end-to-end Crop Vision Analysis:
 * Calls server-side Gemini 3.8 Flash Vision API when available,
 * or safely executes curated testing suite / honest unconnected demo.
 */
export async function analyzeCropImage(
  imageSource: string,
  preferredCrop: CropIssueData | null,
  location: FarmLocation | null,
  soil: SoilOption | null,
  language: Language
): Promise<VisionAnalysisResult> {
  try {
    const response = await fetch("/api/analyze-crop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: imageSource,
        language,
        preferredCropId: preferredCrop?.id,
        location: location
          ? {
              displayName: location.displayName,
              district: location.district,
              state: location.state,
              agroClimate: location.agroClimate,
            }
          : null,
        soilType: soil?.name_en,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.status) {
        return data as VisionAnalysisResult;
      }
    }
  } catch (err) {
    console.warn("Server AI Vision call returned error, using fallback pipeline:", err);
  }

  // Fallback to client-side botanical service
  const idResult = await identifyCropFromImage(imageSource, preferredCrop?.id);

  if (idResult.status === "uncertain") {
    return {
      status: "uncertain",
      cropData: idResult.identifiedCrop,
      confidence: "Low",
      confidenceScore: idResult.confidenceScore,
      isDemo: true,
      analysisSource: "demo_ai",
      visualFeatures: idResult.visualFeatures,
      healthSummary: {
        isHealthy: false,
        issueName_en: "Uncertain Diagnosis",
        issueName_hi: "अनिश्चित निदान",
        severity: "Low",
        possibleCause_en: "Image clarity insufficient for definitive botanical diagnosis.",
        possibleCause_hi: "सटीक वनस्पति निदान के लिए फोटो की गुणवत्ता अपर्याप्त है।",
        visualSymptoms_en: "Visual contours obscured.",
        visualSymptoms_hi: "पत्तियों के लक्षण स्पष्ट नहीं हैं।",
      },
      recommendedResolution: [],
      uncertaintyReason: idResult.uncertaintyReason,
      debugMetadata: {
        modelName: "client_fallback",
        isLiveApi: false,
        identifiedCropRaw: "Uncertain",
        timestamp: new Date().toISOString(),
      },
    };
  }

  if (idResult.status === "multiple_crops") {
    return {
      status: "multiple_crops",
      cropData: idResult.identifiedCrop,
      confidence: "Medium",
      confidenceScore: idResult.confidenceScore,
      isDemo: true,
      analysisSource: "demo_ai",
      visualFeatures: idResult.visualFeatures,
      healthSummary: {
        isHealthy: false,
        issueName_en: "Multiple Crop Species Visible",
        issueName_hi: "तस्वीर में एक से अधिक फसलें मौजूद हैं",
        severity: "Medium",
        possibleCause_en: "Mixed intercropping or border vegetation in frame.",
        possibleCause_hi: "खेत में मिश्रित बुवाई या कई फसलों की पत्तियां एक साथ दिख रही हैं।",
        visualSymptoms_en: "Polyculture foliage overlap.",
        visualSymptoms_hi: "कई तरह की पत्तियों का मिश्रण।",
      },
      recommendedResolution: [],
      multipleCropOptions: idResult.multipleCropOptions,
      debugMetadata: {
        modelName: "client_fallback_polyculture",
        isLiveApi: false,
        identifiedCropRaw: "Polyculture",
        timestamp: new Date().toISOString(),
      },
    };
  }

  // Standard Identified flow
  const targetCrop = idResult.identifiedCrop || preferredCrop || SAMPLE_CROPS[0];
  const health = analyzeCropHealth(targetCrop);
  const rec = buildCropAndFarmRecommendation(targetCrop, location, soil, language);

  return {
    status: "identified",
    cropData: targetCrop,
    confidence: idResult.confidence,
    confidenceScore: idResult.confidenceScore,
    isDemo: true,
    analysisSource: preferredCrop ? "demo_curated_sample" : "demo_ai",
    visualFeatures: idResult.visualFeatures,
    healthSummary: {
      isHealthy: health.isHealthy,
      issueName_en: health.issueName_en,
      issueName_hi: health.issueName_hi,
      severity: health.severity,
      possibleCause_en: health.possibleCause_en,
      possibleCause_hi: health.possibleCause_hi,
      visualSymptoms_en: health.visualSymptoms_en,
      visualSymptoms_hi: health.visualSymptoms_hi,
    },
    cropAndFarmAnalysis: rec.cropAndFarmAnalysis,
    recommendedResolution: rec.resolutionSteps,
    debugMetadata: {
      modelName: "client_botanical_catalog",
      isLiveApi: false,
      identifiedCropRaw: targetCrop.cropName_en,
      timestamp: new Date().toISOString(),
    },
  };
}
