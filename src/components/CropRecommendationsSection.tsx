import React from "react";
import {
  MapPin,
  RefreshCw,
  Edit3,
  Thermometer,
  CloudRain,
  Calendar,
  Layers,
  Droplets,
  Sparkles,
  ShieldCheck,
  Compass,
  MessageSquareQuote,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";
import { FarmLocation, Language, SuitableCropRecommendation } from "../types";
import { getTranslation } from "../data/translations";
import {
  getLocalizedCropName,
  getLocalizedCropSeason,
  getLocalizedCropReason,
  getLocalizedCropArea,
} from "../data/locations";
import { FarmLocationMap } from "./FarmLocationMap";

interface CropRecommendationsSectionProps {
  location: FarmLocation;
  language: Language;
  onUseLocationAgain: () => void;
  onChangeLocationManually: () => void;
  onAskAiQuery?: (queryText: string) => void;
  isDetecting?: boolean;
}

export const CropRecommendationsSection: React.FC<CropRecommendationsSectionProps> = ({
  location,
  language,
  onUseLocationAgain,
  onChangeLocationManually,
  onAskAiQuery,
  isDetecting = false,
}) => {
  const t = getTranslation(language);
  const isHi = language === "hi";

  const agro = location.agroClimate;
  const crops = location.recommendedCrops || [];
  const isDemo = location.isDemoData || agro?.dataSource === "demo_recommendation";

  // Prompt helper for AI agent
  const handleAskCropAdvice = () => {
    const promptText = isHi
      ? `यहाँ कौन सी फसल उगानी चाहिए? (${location.displayName} के लिए विस्तृत सलाह)`
      : `Which crop should I grow here? (Detailed agro-advice for ${location.displayName})`;
    if (onAskAiQuery) {
      onAskAiQuery(promptText);
    }
  };

  return (
    <div className="space-y-6 pt-2" id="crop-recommendations-section">
      {/* 1. Location Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg border border-emerald-700/40 relative overflow-hidden">
        {/* Abstract pattern */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-400" />
                {t.location.yourCurrentLocation}
              </span>
              {isDemo ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
                  <AlertTriangle className="w-3 h-3" />
                  {t.location.demoRecommendationBadge}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  {t.location.verifiedDataBadge}
                </span>
              )}
            </div>

            {/* Approximate Area, District, State Display */}
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {location.displayName}
            </h3>
            <p className="text-xs text-emerald-200/90 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{t.location.privacyNote}</span>
            </p>
          </div>

          {/* Location Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onUseLocationAgain}
              disabled={isDetecting}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-700/80 hover:bg-emerald-600 text-white border border-emerald-500/50 shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              id="btn-use-location-again"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isDetecting ? "animate-spin" : ""}`} />
              <span>[ {t.location.useMyLocationAgain} ]</span>
            </button>
            <button
              type="button"
              onClick={onChangeLocationManually}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-800/90 hover:bg-stone-700 text-stone-200 border border-stone-600/60 shadow-sm transition-all active:scale-95 cursor-pointer"
              id="btn-change-location-manually"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>[ {t.location.changeLocationManually} ]</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Map Preview */}
      <FarmLocationMap location={location} language={language} />

      {/* 3. Agro-Ecological Environmental Indicators Grid */}
      {agro && (
        <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200">
          <div className="flex items-center justify-between mb-3.5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>{t.location.environmentalFactorsTitle}</span>
            </h4>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              {isHi ? `ऋतु: ${agro.currentSeason_hi}` : `Season: ${agro.currentSeason_en}`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
            {/* Climate */}
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <div className="text-stone-500 font-medium flex items-center gap-1 mb-1">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.location.climateZoneLabel}</span>
              </div>
              <p className="font-bold text-stone-900 truncate" title={isHi ? agro.climateZone_hi : agro.climateZone_en}>
                {isHi ? agro.climateZone_hi : agro.climateZone_en}
              </p>
            </div>

            {/* Temperature & Weather */}
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <div className="text-stone-500 font-medium flex items-center gap-1 mb-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.location.tempAndWeatherLabel}</span>
              </div>
              <p className="font-bold text-stone-900">
                {agro.temperatureRange}
              </p>
            </div>

            {/* Rainfall / Moisture */}
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <div className="text-stone-500 font-medium flex items-center gap-1 mb-1">
                <CloudRain className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.location.rainfallLabel}</span>
              </div>
              <p className="font-bold text-stone-900 truncate" title={isHi ? agro.rainfallCategory_hi : agro.rainfallCategory_en}>
                {isHi ? agro.rainfallCategory_hi : agro.rainfallCategory_en}
              </p>
            </div>

            {/* Soil */}
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <div className="text-stone-500 font-medium flex items-center gap-1 mb-1">
                <Layers className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.location.idealSoilLabel}</span>
              </div>
              <p className="font-bold text-stone-900 truncate" title={isHi ? agro.dominantSoil_hi : agro.dominantSoil_en}>
                {isHi ? agro.dominantSoil_hi : agro.dominantSoil_en}
              </p>
            </div>

            {/* Water Availability */}
            <div className="bg-white p-3 rounded-xl border border-stone-200 col-span-2 sm:col-span-1">
              <div className="text-stone-500 font-medium flex items-center gap-1 mb-1">
                <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                <span>{t.location.waterRequirementLabel}</span>
              </div>
              <p className="font-bold text-stone-900 truncate" title={isHi ? agro.waterAvailability_hi : agro.waterAvailability_en}>
                {isHi ? agro.waterAvailability_hi : agro.waterAvailability_en}
              </p>
            </div>

            {/* Regional Cropping Pattern */}
            <div className="bg-white p-3 rounded-xl border border-stone-200 col-span-2 sm:col-span-2 md:col-span-3">
              <div className="text-stone-500 font-medium flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.location.croppingPatternLabel}</span>
              </div>
              <p className="font-bold text-stone-900">
                {isHi ? agro.regionalCroppingPattern_hi : agro.regionalCroppingPattern_en}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Crops Suitable for Your Area Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-stone-200">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-stone-900 flex items-center gap-2">
              <span className="text-xl">🌱</span>
              <span>{t.location.cropsSuitableForArea}</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {isHi
                ? "जलवायु, तापमान, मिट्टी व जल उपलब्धता के आधार पर अनुशंसित फसलें:"
                : "Recommended crops based on local climate, temperature, soil, and water resources:"}
            </p>
          </div>

          {/* Quick AI Trigger */}
          <button
            type="button"
            onClick={handleAskCropAdvice}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 transition-all cursor-pointer shadow-2xs"
            id="btn-quick-ask-crops-ai"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isHi ? "एआई से पूछें: यहाँ क्या लगाएं?" : "Ask AI: What to grow here?"}</span>
          </button>
        </div>

        {/* The Suitable Crop Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crops.map((crop) => {
            const cropName = getLocalizedCropName(crop, language);
            const season = getLocalizedCropSeason(crop, language);
            const reason = getLocalizedCropReason(crop, language);
            const area = getLocalizedCropArea(crop, language);

            return (
              <div
                key={crop.id}
                className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle side accent */}
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-emerald-600" />

                <div>
                  {/* Top Bar: Crop emoji & Name */}
                  <div className="flex items-center justify-between gap-2 mb-2 pl-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{crop.emoji}</span>
                      <h4 className="text-base sm:text-lg font-extrabold text-stone-900">
                        {cropName}
                      </h4>
                    </div>
                    <span className="text-[11px] font-bold bg-stone-100 text-stone-700 px-2.5 py-1 rounded-full border border-stone-200">
                      {crop.durationDays}
                    </span>
                  </div>

                  {/* Metadata fields strictly matching the prompt specifications */}
                  <div className="space-y-2 text-xs pl-2 mb-3">
                    {/* Suitable for */}
                    <div className="flex items-start gap-1.5">
                      <span className="font-bold text-stone-700 shrink-0">
                        {t.location.suitableFor}:
                      </span>
                      <span className="font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {area}
                      </span>
                    </div>

                    {/* Season */}
                    <div className="flex items-start gap-1.5">
                      <span className="font-bold text-stone-700 shrink-0">
                        {t.location.seasonLabel}:
                      </span>
                      <span className="text-stone-800 font-medium">
                        {season}
                      </span>
                    </div>

                    {/* Why */}
                    <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 mt-2">
                      <div className="font-bold text-stone-800 mb-1 flex items-center gap-1">
                        <MessageSquareQuote className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{t.location.whyLabel}:</span>
                      </div>
                      <p className="text-stone-600 leading-relaxed italic">
                        "{reason}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom tags: Soil & Water Requirement */}
                <div className="pt-2 pl-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-1 text-stone-600">
                    <span className="font-semibold text-stone-500">
                      {t.location.idealSoilLabel}:
                    </span>
                    <span className="font-bold text-stone-800 truncate max-w-[150px]" title={isHi ? crop.idealSoil_hi : crop.idealSoil_en}>
                      {isHi ? crop.idealSoil_hi : crop.idealSoil_en}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-stone-500">
                      {t.location.waterRequirementLabel}:
                    </span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full ${
                        crop.waterNeed_en === "High"
                          ? "bg-blue-100 text-blue-800"
                          : crop.waterNeed_en === "Medium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {isHi ? crop.waterNeed_hi : crop.waterNeed_en}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
