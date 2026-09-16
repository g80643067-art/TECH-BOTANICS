import React from "react";
import {
  CheckCircle,
  Sparkles,
  CheckCircle2,
  XCircle,
  Bot,
} from "lucide-react";
import { CropIssueData, Language } from "../types";
import { getTranslation } from "../data/translations";
import {
  getLocalizedIssueName,
  getLocalizedStepTitle,
  getLocalizedStepDesc,
  getLocalizedStepTag,
} from "../data/mockCrops";

interface ResolutionStepProps {
  language: Language;
  cropData: CropIssueData;
  onSelectResolved: () => void;
  onSelectNotResolved: () => void;
  onOpenAiAgent: () => void;
}

export const ResolutionStep: React.FC<ResolutionStepProps> = ({
  language,
  cropData,
  onSelectResolved,
  onSelectNotResolved,
  onOpenAiAgent,
}) => {
  const t = getTranslation(language);
  const isHi = language === "hi";

  const stepColorThemes = [
    { badgeBg: "bg-rose-100 text-rose-800 border-rose-200", border: "border-rose-200", dot: "bg-rose-600" },
    { badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200", border: "border-emerald-200", dot: "bg-emerald-600" },
    { badgeBg: "bg-amber-100 text-amber-800 border-amber-200", border: "border-amber-200", dot: "bg-amber-600" },
    { badgeBg: "bg-blue-100 text-blue-800 border-blue-200", border: "border-blue-200", dot: "bg-blue-600" },
  ];

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-lg relative overflow-hidden">
        {/* Step Header */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> {t.steps.step6}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            {t.resolution.title}
          </h2>
          <p className="text-sm text-stone-600">
            {t.resolution.subtitle}
          </p>
        </div>

        {/* Issue Target Summary Banner */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 mb-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-500">
              Target Disease Protocol
            </span>
            <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">
              {getLocalizedIssueName(cropData, language)}
            </h4>
          </div>
          <button
            onClick={onOpenAiAgent}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            id="btn-resolution-ask-ai-top"
          >
            <Bot className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.resolution.askAiButton}</span>
          </button>
        </div>

        {/* 4-Step Action Plan */}
        <div className="space-y-4 mb-8">
          {cropData.steps.map((step, index) => {
            const theme = stepColorThemes[index % stepColorThemes.length];

            return (
              <div
                key={step.stepNumber}
                className="bg-stone-50/70 hover:bg-stone-50 rounded-2xl p-5 border border-stone-200/80 transition-all duration-150 text-left"
                id={`resolution-plan-step-${step.stepNumber}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white ${theme.dot}`}>
                      {step.stepNumber}
                    </span>
                    <h3 className="font-extrabold text-base text-stone-900">
                      {getLocalizedStepTitle(step, language)}
                    </h3>
                  </div>

                  <span className={`self-start sm:self-auto text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${theme.badgeBg}`}>
                    {getLocalizedStepTag(step, language)}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pl-0 sm:pl-9">
                  {getLocalizedStepDesc(step, language)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Ask AI for More Help floating banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {isHi ? "क्या आपको खुराक या समय पर सवाल हैं?" : "Have questions about dosage or timing?"}
              </h4>
              <p className="text-xs text-stone-300">
                {isHi ? "कृषिसेतु एआई सहायक से तुरंत स्थानीय भाषा में पूछें" : "Chat directly with our KrishiSetu AI advisor"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenAiAgent}
            className="w-full sm:w-auto bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            id="btn-resolution-ask-ai-banner"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.resolution.askAiButton}</span>
          </button>
        </div>

        {/* "Is your problem resolved?" Decision Gate */}
        <div className="pt-6 border-t-2 border-dashed border-stone-200 text-center">
          <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 mb-1">
            {t.resolution.problemResolvedQuestion}
          </h3>
          <p className="text-xs text-stone-500 mb-6">
            {isHi
              ? "यदि आपको लगता है कि यह समाधान पर्याप्त है, तो YES चुनें। यदि फसल की स्थिति अनसुलझी है, तो NO चुनें।"
              : "Let us know if this action plan resolves your concern or if expert escalation is required."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Button 1: YES, RESOLVED */}
            <button
              type="button"
              onClick={onSelectResolved}
              className="flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              id="btn-resolved-yes"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-200" />
              <span>{t.resolution.resolvedYesButton}</span>
            </button>

            {/* Button 2: NO, STILL HAVE A PROBLEM */}
            <button
              type="button"
              onClick={onSelectNotResolved}
              className="flex items-center justify-center gap-2.5 bg-stone-100 hover:bg-rose-50 text-stone-800 hover:text-rose-900 border-2 border-stone-300 hover:border-rose-400 font-extrabold py-4 px-6 rounded-2xl shadow-xs hover:shadow-sm transition-all active:scale-98 cursor-pointer"
              id="btn-resolved-no"
            >
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>{t.resolution.resolvedNoButton}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

