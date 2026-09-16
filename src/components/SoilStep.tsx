import React, { useState } from "react";
import {
  Trees,
  Sparkles,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Language, SoilOption } from "../types";
import { getTranslation } from "../data/translations";
import { SOIL_OPTIONS, determineSoilFromQuiz, getLocalizedSoilName, getLocalizedSoilDescription } from "../data/soilTypes";

interface SoilStepProps {
  language: Language;
  onSoilSelected: (soil: SoilOption) => void;
  savedSoil: SoilOption | null;
}

export const SoilStep: React.FC<SoilStepProps> = ({
  language,
  onSoilSelected,
  savedSoil,
}) => {
  const t = getTranslation(language);
  const isHi = language === "hi";

  const [selectedSoil, setSelectedSoil] = useState<SoilOption | null>(savedSoil || SOIL_OPTIONS[0]);
  const [showAiQuiz, setShowAiQuiz] = useState<boolean>(false);

  // Quiz state
  const [q1, setQ1] = useState<string>("q1_opt2");
  const [q2, setQ2] = useState<string>("q2_opt1");
  const [q3, setQ3] = useState<string>("q3_opt2");

  const handleSelectSoilCard = (soil: SoilOption) => {
    setSelectedSoil(soil);
  };

  const handleApplyQuizResult = () => {
    const identifiedSoil = determineSoilFromQuiz(q1, q2, q3);
    setSelectedSoil(identifiedSoil);
    setShowAiQuiz(false);
  };

  const handleContinue = () => {
    if (selectedSoil) {
      onSoilSelected(selectedSoil);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-lg relative overflow-hidden">
        {/* Header section */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <Trees className="w-3.5 h-3.5 text-emerald-600" /> {t.steps.step4}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            {t.soil.title}
          </h2>
          <p className="text-sm text-stone-600">
            {t.soil.subtitle}
          </p>
        </div>

        {/* 6 Visual Soil Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
          {SOIL_OPTIONS.map((soil) => {
            const isSelected = selectedSoil?.id === soil.id;

            return (
              <div
                key={soil.id}
                onClick={() => handleSelectSoilCard(soil)}
                className={`relative flex flex-col p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20 scale-[1.02]"
                    : "border-stone-200 hover:border-emerald-400 bg-stone-50 hover:bg-emerald-50/30"
                }`}
                id={`soil-card-${soil.id}`}
              >
                {/* Checkmark badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                )}

                {/* Emoji Icon */}
                <div className="text-3xl mb-2">{soil.emoji}</div>

                {/* Name */}
                <h3 className="font-bold text-sm sm:text-base text-stone-900 leading-snug">
                  {getLocalizedSoilName(soil, language)}
                </h3>

                {/* Description */}
                <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                  {getLocalizedSoilDescription(soil, language)}
                </p>

                {/* Characteristics chip */}
                <div className="mt-3 pt-2 border-t border-stone-200/60 flex flex-wrap gap-1">
                  <span className="text-[10px] font-medium bg-white px-2 py-0.5 rounded-md border border-stone-200 text-stone-600">
                    {soil.characteristics[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* "I don't know my soil type" AI Helper Button */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowAiQuiz(!showAiQuiz)}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 text-amber-950 font-bold text-sm transition-colors cursor-pointer"
            id="btn-soil-dont-know"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>{t.soil.dontKnowButton}</span>
            </div>
            <span className="text-xs font-semibold text-amber-800 underline">
              {showAiQuiz ? (isHi ? "प्रश्नावली छिपाएं" : "Hide Quiz") : (isHi ? "एआई पहचान खोलें" : "Open AI Quiz")}
            </span>
          </button>
        </div>

        {/* AI-Assisted Soil Identification Questionnaire */}
        {showAiQuiz && (
          <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-stone-50 border border-emerald-300 shadow-inner text-left">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm sm:text-base text-emerald-950">
                {t.soil.aiAssistedSoilTitle}
              </h3>
            </div>
            <p className="text-xs text-stone-600 mb-4">
              {t.soil.aiAssistedSoilDesc}
            </p>

            <div className="space-y-4">
              {/* Question 1: Touch & Feel */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  1. {t.soil.q1}
                </label>
                <select
                  value={q1}
                  onChange={(e) => setQ1(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="q1_opt1">{t.soil.q1_opt1}</option>
                  <option value="q1_opt2">{t.soil.q1_opt2}</option>
                  <option value="q1_opt3">{t.soil.q1_opt3}</option>
                </select>
              </div>

              {/* Question 2: Color */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  2. {t.soil.q2}
                </label>
                <select
                  value={q2}
                  onChange={(e) => setQ2(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="q2_opt1">{t.soil.q2_opt1}</option>
                  <option value="q2_opt2">{t.soil.q2_opt2}</option>
                  <option value="q2_opt3">{t.soil.q2_opt3}</option>
                </select>
              </div>

              {/* Question 3: Drainage */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  3. {t.soil.q3}
                </label>
                <select
                  value={q3}
                  onChange={(e) => setQ3(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="q3_opt1">{t.soil.q3_opt1}</option>
                  <option value="q3_opt2">{t.soil.q3_opt2}</option>
                  <option value="q3_opt3">{t.soil.q3_opt3}</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleApplyQuizResult}
                className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-all"
                id="btn-apply-soil-quiz"
              >
                {t.soil.applyRecommendedSoil}
              </button>
            </div>
          </div>
        )}

        {/* Selected Soil Summary Banner */}
        {selectedSoil && (
          <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedSoil.emoji}</span>
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                  {isHi ? "चुनी गई मिट्टी" : "Selected Soil"}
                </span>
                <p className="font-extrabold text-sm text-emerald-950">
                  {getLocalizedSoilName(selectedSoil, language)}
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-white px-2.5 py-1 rounded-full border border-emerald-200">
              Ready for diagnosis
            </span>
          </div>
        )}

        {/* Continue Button to Issue Detection */}
        <div>
          <button
            type="button"
            onClick={handleContinue}
            className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all active:scale-98 cursor-pointer"
            id="btn-soil-continue-to-detection"
          >
            <span>{t.soil.continueToDetection}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

