import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Info,
  Layers,
  Leaf,
} from "lucide-react";
import {
  CropIssueData,
  FarmLocation,
  Language,
  SoilOption,
  VisionAnalysisResult,
} from "../types";
import { getTranslation } from "../data/translations";
import {
  getLocalizedCropName,
  getLocalizedIssueName,
  getLocalizedPossibleCause,
  getLocalizedWhyHappening,
} from "../data/mockCrops";
import { getLocalizedSoilName } from "../data/soilTypes";

interface DetectionStepProps {
  language: Language;
  cropData: CropIssueData;
  cropImage: string | null;
  location: FarmLocation | null;
  soilType: SoilOption | null;
  visionResult?: VisionAnalysisResult | null;
  onContinueToResolution: () => void;
}

export const DetectionStep: React.FC<DetectionStepProps> = ({
  language,
  cropData,
  cropImage,
  location,
  soilType,
  visionResult,
  onContinueToResolution,
}) => {
  const t = getTranslation(language);
  const isHi = language === "hi";

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "High":
        return {
          bg: "bg-rose-100 text-rose-800 border-rose-300",
          icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />,
          label: isHi ? "उच्च (High)" : "High",
        };
      case "Medium":
        return {
          bg: "bg-amber-100 text-amber-800 border-amber-300",
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
          label: isHi ? "मध्यम (Medium)" : "Medium",
        };
      default:
        return {
          bg: "bg-emerald-100 text-emerald-800 border-emerald-300",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          label: isHi ? "कम (Low)" : "Low",
        };
    }
  };

  const severityBadge = getSeverityBadge(cropData.severity);
  const confidenceScore = visionResult?.confidenceScore || cropData.confidenceScore || 92;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-lg relative overflow-hidden">
        {/* Step Header */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-rose-50 text-rose-800 border border-rose-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" /> {t.steps.step5} • Agro-Diagnosis
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            {t.detection.title}
          </h2>
          <p className="text-sm text-stone-600">
            {t.detection.subtitle}
          </p>
        </div>

        {/* Combined Context Snapshot Bar */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Farm Location item */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">
                {isHi ? "स्थान" : "Location"}
              </span>
              <p className="font-bold text-stone-900 truncate">
                {location?.displayName || "Regional Agro-Zone"}
              </p>
            </div>
          </div>

          {/* Soil Type item */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <span className="text-base">{soilType?.emoji || "🌱"}</span>
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">
                {isHi ? "मिट्टी" : "Soil Type"}
              </span>
              <p className="font-bold text-stone-900 truncate">
                {soilType ? getLocalizedSoilName(soilType, language) : "Loamy Soil"}
              </p>
            </div>
          </div>

          {/* Scan Confidence item */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">
                {t.detection.confidenceLabel}
              </span>
              <p className="font-bold text-teal-900 truncate">
                {confidenceScore}% {isHi ? "सटीकता" : "Confidence"}
              </p>
            </div>
          </div>
        </div>

        {/* The Main Result Card */}
        <div className="bg-gradient-to-br from-stone-50 via-white to-emerald-50/40 rounded-2xl p-5 sm:p-7 border-2 border-emerald-700/20 shadow-sm mb-6">
          {/* Top Label & Severity Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-200">
            <div className="inline-flex items-center gap-1.5 bg-emerald-900 text-emerald-100 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.detection.aiAssistedLabel}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-semibold">{t.detection.severityLabel}:</span>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold border ${severityBadge.bg}`}>
                {severityBadge.icon}
                <span>{severityBadge.label}</span>
              </span>
            </div>
          </div>

          {/* Crop & Leaf Imagery with Symptoms Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-5">
            {/* Scanned Leaf Thumbnail & Traits */}
            <div className="md:col-span-4 flex flex-col items-center space-y-3">
              <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden border-2 border-stone-200 bg-stone-900 shadow-sm">
                <img
                  src={cropImage || cropData.sampleImage}
                  alt={cropData.cropName_en}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-stone-900/85 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded-xs">
                  {cropData.category}
                </span>
              </div>

              {/* Visual botanical cues from vision analysis */}
              {visionResult?.visualFeatures && (
                <div className="w-full p-2.5 bg-white rounded-xl border border-stone-200 text-[11px] text-stone-700 space-y-1">
                  <div className="flex items-center gap-1 font-bold text-stone-900">
                    <Layers className="w-3 h-3 text-emerald-700" />
                    <span>{isHi ? "पहचाने गए लक्षण" : "Botanical Traits"}</span>
                  </div>
                  <p className="line-clamp-2">
                    • {visionResult.visualFeatures.leafShape}
                  </p>
                </div>
              )}
            </div>

            {/* Diagnostic Details */}
            <div className="md:col-span-8 space-y-4">
              {/* Crop Name */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-stone-500">
                  {t.detection.cropLabel}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                  {getLocalizedCropName(cropData, language)}
                </h3>
              </div>

              {/* Possible Issue */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-rose-700">
                  {t.detection.issueLabel}
                </span>
                <div className="text-base sm:text-lg font-black text-rose-950">
                  {getLocalizedIssueName(cropData, language)}
                </div>
                {cropData.scientificName && (
                  <p className="text-xs italic text-stone-500 mt-0.5">
                    Pathogen: {cropData.scientificName}
                  </p>
                )}
              </div>

              {/* Possible Cause */}
              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                <span className="text-xs font-bold text-stone-900 block mb-1">
                  🔬 {t.detection.possibleCauseLabel}
                </span>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {getLocalizedPossibleCause(cropData, language)}
                </p>
              </div>
            </div>
          </div>

          {/* "Why this may be happening" farmer friendly explanation */}
          <div className="mt-4 pt-4 border-t border-stone-200 bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
            <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5 mb-1.5">
              <Info className="w-4 h-4 text-emerald-700" />
              <span>{t.detection.whyHappeningLabel}</span>
            </span>
            <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
              {getLocalizedWhyHappening(cropData, language)}
            </p>
          </div>
        </div>

        {/* Clear Transparent AI Disclaimer */}
        <div className="mb-6 p-3.5 rounded-xl bg-stone-100 border border-stone-200/80 flex items-start gap-2.5 text-xs text-stone-600">
          <ShieldAlert className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t.detection.disclaimer}
          </p>
        </div>

        {/* Continue Button to Step 6 (Resolution) */}
        <div>
          <button
            type="button"
            onClick={onContinueToResolution}
            className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all active:scale-98 cursor-pointer"
            id="btn-detection-continue-to-resolution"
          >
            <span>{t.detection.continueToResolution}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
