import React from "react";
import {
  CheckCircle,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Sprout,
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
    { badgeBg: "bg-[#F8FAF5] text-[#166534] border-[#DCE8DD]", border: "border-[#DCE8DD]", dot: "bg-[#166534]" },
    { badgeBg: "bg-[#F8FAF5] text-[#166534] border-[#DCE8DD]", border: "border-[#DCE8DD]", dot: "bg-[#22C55E]" },
    { badgeBg: "bg-[#FACC15]/20 text-[#163020] border-[#FACC15]/40", border: "border-[#DCE8DD]", dot: "bg-[#166534]" },
    { badgeBg: "bg-[#F8FAF5] text-[#166534] border-[#DCE8DD]", border: "border-[#DCE8DD]", dot: "bg-[#22C55E]" },
  ];

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8DD] shadow-sm relative overflow-hidden">
        {/* Step Header */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#F8FAF5] text-[#166534] border border-[#DCE8DD] mb-2">
            <CheckCircle className="w-3.5 h-3.5 text-[#22C55E]" /> {t.steps.step6}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163020] tracking-tight mb-2">
            {t.resolution.title}
          </h2>
          <p className="text-sm text-[#64748B]">
            {t.resolution.subtitle}
          </p>
        </div>

        {/* Issue Target Summary Banner */}
        <div className="bg-[#F8FAF5] rounded-2xl p-4 border border-[#DCE8DD] mb-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#64748B]">
              Target Disease Protocol
            </span>
            <h4 className="font-extrabold text-[#163020] text-sm sm:text-base">
              {getLocalizedIssueName(cropData, language)}
            </h4>
          </div>
          <button
            onClick={onOpenAiAgent}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-[#F8FAF5] text-[#166534] border border-[#DCE8DD] px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            id="btn-resolution-ask-ai-top"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#22C55E]" />
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
                className="bg-[#F8FAF5] hover:bg-white rounded-2xl p-5 border border-[#DCE8DD] transition-all duration-150 text-left"
                id={`resolution-plan-step-${step.stepNumber}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white ${theme.dot}`}>
                      {step.stepNumber}
                    </span>
                    <h3 className="font-extrabold text-base text-[#163020]">
                      {getLocalizedStepTitle(step, language)}
                    </h3>
                  </div>

                  <span className={`self-start sm:self-auto text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${theme.badgeBg}`}>
                    {getLocalizedStepTag(step, language)}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed pl-0 sm:pl-9">
                  {getLocalizedStepDesc(step, language)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Ask AI for More Help floating banner */}
        <div className="bg-[#163020] text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border border-[#166534]/50 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Sprout className="w-6 h-6 text-[#22C55E]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {isHi ? "क्या आपको खुराक या समय पर सवाल हैं?" : "Have questions about dosage or timing?"}
              </h4>
              <p className="text-xs text-[#DCE8DD]">
                {isHi ? "कृषिसेतु एआई सहायक से तुरंत स्थानीय भाषा में पूछें" : "Chat directly with our KrishiSetu AI advisor"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenAiAgent}
            className="w-full sm:w-auto bg-[#22C55E] hover:bg-[#16a34a] text-[#163020] font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            id="btn-resolution-ask-ai-banner"
          >
            <MessageSquare className="w-4 h-4 text-[#163020]" />
            <span>{t.resolution.askAiButton}</span>
          </button>
        </div>

        {/* "Is your problem resolved?" Decision Gate */}
        <div className="pt-6 border-t-2 border-dashed border-[#DCE8DD] text-center">
          <h3 className="text-lg sm:text-xl font-extrabold text-[#163020] mb-1">
            {t.resolution.problemResolvedQuestion}
          </h3>
          <p className="text-xs text-[#64748B] mb-6">
            {isHi
              ? "यदि आपको लगता है कि यह समाधान पर्याप्त है, तो YES चुनें। यदि फसल की स्थिति अनसुलझी है, तो NO चुनें।"
              : "Let us know if this action plan resolves your concern or if expert escalation is required."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Button 1: YES, RESOLVED */}
            <button
              type="button"
              onClick={onSelectResolved}
              className="flex items-center justify-center gap-2.5 bg-[#166534] hover:bg-[#14532d] text-white font-extrabold py-4 px-6 rounded-2xl shadow-sm transition-all active:scale-98 cursor-pointer"
              id="btn-resolved-yes"
            >
              <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
              <span>{t.resolution.resolvedYesButton}</span>
            </button>

            {/* Button 2: NO, STILL HAVE A PROBLEM */}
            <button
              type="button"
              onClick={onSelectNotResolved}
              className="flex items-center justify-center gap-2.5 bg-[#F8FAF5] hover:bg-white text-[#163020] border-2 border-[#DCE8DD] hover:border-[#166534] font-extrabold py-4 px-6 rounded-2xl shadow-2xs transition-all active:scale-98 cursor-pointer"
              id="btn-resolved-no"
            >
              <XCircle className="w-5 h-5 text-[#64748B]" />
              <span>{t.resolution.resolvedNoButton}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

