import React from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Language, StepNumber } from "../types";
import { getTranslation, translations } from "../data/translations";

interface JourneyIndicatorProps {
  language: Language;
  currentStep: StepNumber;
  onNavigateStep: (step: StepNumber) => void;
  canNavigateBack: boolean;
}

const STEP_KEYS: Array<{ step: StepNumber; key: keyof typeof translations.en.steps; numberIcon: string }> = [
  { step: 1, key: "step1", numberIcon: "①" },
  { step: 2, key: "step2", numberIcon: "②" },
  { step: 3, key: "step3", numberIcon: "③" },
  { step: 4, key: "step4", numberIcon: "④" },
  { step: 5, key: "step5", numberIcon: "⑤" },
  { step: 6, key: "step6", numberIcon: "⑥" },
  { step: 7, key: "step7", numberIcon: "⑦" },
];

export const JourneyIndicator: React.FC<JourneyIndicatorProps> = ({
  language,
  currentStep,
  onNavigateStep,
  canNavigateBack,
}) => {
  const t = getTranslation(language);

  return (
    <div className="bg-white border-b border-stone-200 py-2.5 px-4 shadow-2xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
        {/* Back navigation button if available */}
        <div className="flex items-center gap-2">
          {canNavigateBack && currentStep > 1 && (
            <button
              onClick={() => onNavigateStep((currentStep - 1) as StepNumber)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-emerald-800 bg-stone-100 hover:bg-emerald-50 px-2.5 py-1 rounded-lg transition-colors border border-stone-200 select-none"
              id="btn-journey-back"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.back}</span>
            </button>
          )}

          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {language === "hi" ? "चरण" : "Step"} {currentStep} / 7
          </span>
        </div>

        {/* 7-Step Interactive Pipeline Progress */}
        <div className="flex items-center overflow-x-auto no-scrollbar py-1 gap-1 sm:gap-1.5">
          {STEP_KEYS.map((item, index) => {
            const isCurrent = currentStep === item.step;
            const isCompleted = currentStep > item.step;
            const isClickable = item.step <= currentStep;
            const stepLabel = t.steps[item.key];

            return (
              <React.Fragment key={item.step}>
                <button
                  disabled={!isClickable}
                  onClick={() => isClickable && onNavigateStep(item.step)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isCurrent
                      ? "bg-emerald-800 text-white shadow-xs scale-102 ring-2 ring-emerald-400/40"
                      : isCompleted
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-200/80 hover:bg-emerald-100 cursor-pointer"
                      : "bg-stone-100 text-stone-400 border border-stone-200/60 cursor-not-allowed opacity-75"
                  }`}
                  id={`step-indicator-${item.step}`}
                  title={`${item.numberIcon} ${stepLabel}`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      isCurrent
                        ? "bg-white text-emerald-900"
                        : isCompleted
                        ? "bg-emerald-700 text-white"
                        : "bg-stone-300 text-stone-600"
                    }`}
                  >
                    {item.step}
                  </span>
                  <span>{stepLabel}</span>
                </button>

                {index < STEP_KEYS.length - 1 && (
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 ${
                      item.step < currentStep ? "text-emerald-600" : "text-stone-300"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

