import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  MapPin,
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
import { SynchronizedCropPhoto } from "./SynchronizedCropPhoto";

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
          bg: "bg-rose-50 text-rose-800 border-rose-200",
          icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />,
          label: isHi ? "उच्च (High)" : "High",
        };
      case "Medium":
        return {
          bg: "bg-[#FACC15]/20 text-[#163020] border-[#FACC15]/50",
          icon: <AlertTriangle className="w-3.5 h-3.5 text-[#166534]" />,
          label: isHi ? "मध्यम (Medium)" : "Medium",
        };
      default:
        return {
          bg: "bg-[#F8FAF5] text-[#166534] border-[#DCE8DD]",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />,
          label: isHi ? "कम (Low)" : "Low",
        };
    }
  };

  const severityBadge = getSeverityBadge(cropData.severity);
  const confidenceScore = visionResult?.confidenceScore || cropData.confidenceScore || 92;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8DD] shadow-sm relative overflow-hidden">
        {/* Step Header */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#F8FAF5] text-[#166534] border border-[#DCE8DD] mb-2">
            {t.steps.step5} • Agro-Diagnosis
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163020] tracking-tight mb-2">
            {t.detection.title}
          </h2>
          <p className="text-sm text-[#64748B]">
            {t.detection.subtitle}
          </p>
        </div>

        {/* Combined Context Snapshot Bar */}
        <div className="bg-[#F8FAF5] rounded-2xl p-4 border border-[#DCE8DD] mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Farm Location item */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FACC15]/20 text-[#163020] border border-[#FACC15]/40 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#166534]" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] uppercase font-bold text-[#64748B] block">
                {isHi ? "स्थान" : "Location"}
              </span>
              <p className="font-bold text-[#163020] truncate">
                {location?.displayName || "Regional Agro-Zone"}
              </p>
            </div>
          </div>

          {/* Soil Type item */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#DCE8DD] text-[#166534] flex items-center justify-center shrink-0">
              <span className="text-base">{soilType?.emoji || "🌱"}</span>
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] uppercase font-bold text-[#64748B] block">
                {isHi ? "मिट्टी" : "Soil Type"}
              </span>
              <p className="font-bold text-[#163020] truncate">
                {soilType ? getLocalizedSoilName(soilType, language) : "Loamy Soil"}
              </p>
            </div>
          </div>

          {/* Scan Confidence item */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#DCE8DD] text-[#166534] flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 text-[#22C55E]" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] uppercase font-bold text-[#64748B] block">
                {t.detection.confidenceLabel}
              </span>
              <p className="font-bold text-[#166534] truncate">
                {confidenceScore}% {isHi ? "सटीकता" : "Confidence"}
              </p>
            </div>
          </div>
        </div>

        {/* The Main Result Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#DCE8DD] shadow-xs mb-6">
          {/* Top Label & Severity Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#DCE8DD]">
            <div className="inline-flex items-center gap-1.5 bg-[#166534] text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              <span>{t.detection.aiAssistedLabel}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#64748B] font-semibold">{t.detection.severityLabel}:</span>
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
              <div className="w-full">
                <SynchronizedCropPhoto
                  cropName={cropData.cropName_hi || cropData.cropName_en}
                  directImageUrl={cropImage || cropData.sampleImage}
                  aspectRatio="aspect-4/3"
                  showBadge={true}
                  showSyncIndicator={false}
                  language={language}
                />
              </div>

              {/* Visual botanical cues from vision analysis */}
              {visionResult?.visualFeatures && (
                <div className="w-full p-2.5 bg-[#F8FAF5] rounded-xl border border-[#DCE8DD] text-[11px] text-[#163020] space-y-1">
                  <div className="flex items-center gap-1 font-bold text-[#163020]">
                    <Layers className="w-3 h-3 text-[#166534]" />
                    <span>{isHi ? "पहचाने गए लक्षण" : "Botanical Traits"}</span>
                  </div>
                  <p className="line-clamp-2 text-[#64748B]">
                    • {visionResult.visualFeatures.leafShape}
                  </p>
                </div>
              )}
            </div>

            {/* Diagnostic Details */}
            <div className="md:col-span-8 space-y-4">
              {/* Crop Name */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-[#64748B]">
                  {t.detection.cropLabel}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#163020]">
                  {getLocalizedCropName(cropData, language)}
                </h3>
              </div>

              {/* Possible Issue */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-[#166534]">
                  {t.detection.issueLabel}
                </span>
                <div className="text-base sm:text-lg font-black text-[#163020]">
                  {getLocalizedIssueName(cropData, language)}
                </div>
                {cropData.scientificName && (
                  <p className="text-xs italic text-[#64748B] mt-0.5">
                    Pathogen: {cropData.scientificName}
                  </p>
                )}
              </div>

              {/* Possible Cause */}
              <div className="bg-[#F8FAF5] p-3.5 rounded-xl border border-[#DCE8DD]">
                <span className="text-xs font-bold text-[#163020] block mb-1">
                  🔬 {t.detection.possibleCauseLabel}
                </span>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {getLocalizedPossibleCause(cropData, language)}
                </p>
              </div>
            </div>
          </div>

          {/* "Why this may be happening" farmer friendly explanation */}
          <div className="mt-4 pt-4 border-t border-[#DCE8DD] bg-[#F8FAF5] p-4 rounded-xl border border-[#DCE8DD]">
            <span className="text-xs font-extrabold text-[#163020] flex items-center gap-1.5 mb-1.5">
              <Info className="w-4 h-4 text-[#166534]" />
              <span>{t.detection.whyHappeningLabel}</span>
            </span>
            <p className="text-xs sm:text-sm text-[#163020] leading-relaxed font-medium">
              {getLocalizedWhyHappening(cropData, language)}
            </p>
          </div>
        </div>

        {/* Clear Transparent AI Disclaimer */}
        <div className="mb-6 p-3.5 rounded-xl bg-[#F8FAF5] border border-[#DCE8DD] flex items-start gap-2.5 text-xs text-[#64748B]">
          <ShieldAlert className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t.detection.disclaimer}
          </p>
        </div>

        {/* Continue Button to Step 6 (Resolution) */}
        <div>
          <button
            type="button"
            onClick={onContinueToResolution}
            className="w-full flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white font-bold py-3.5 px-6 rounded-2xl shadow-sm transition-all active:scale-98 cursor-pointer"
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
