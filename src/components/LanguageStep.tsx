import React, { useState } from "react";
import { Sprout, ArrowRight, ShieldCheck, HeartHandshake, Globe, MoreHorizontal } from "lucide-react";
import { Language } from "../types";
import { PRIMARY_LANGUAGES } from "../data/languages";
import { getTranslation } from "../data/translations";
import { LanguageModal } from "./LanguageModal";

interface LanguageStepProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageStep: React.FC<LanguageStepProps> = ({
  currentLanguage,
  onSelectLanguage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const t = getTranslation(currentLanguage);

  const handleChoose = (lang: Language) => {
    onSelectLanguage(lang);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4">
      {/* Welcome Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DCE8DD] shadow-sm text-center relative overflow-hidden">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#166534]" />

        {/* Icon & Welcome Header */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-[#F8FAF5] border border-[#DCE8DD] flex items-center justify-center text-[#166534] shadow-2xs mb-5">
          <Sprout className="w-9 h-9 sm:w-11 sm:h-11 text-[#166534]" />
        </div>

        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#F8FAF5] text-[#166534] border border-[#DCE8DD] mb-3">
          KrishiSetu AI • {t.steps.step1}
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163020] tracking-tight mb-2">
          {t.welcomeTitle}
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] max-w-xl mx-auto mb-8 leading-relaxed">
          {t.welcomeSubtitle}
        </p>

        {/* Language Selection Card */}
        <div className="bg-[#F8FAF5] rounded-2xl p-5 sm:p-7 border border-[#DCE8DD] mb-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div>
              <h2 className="text-lg font-bold text-[#163020] flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#166534]" />
                {t.chooseLanguage}
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                {t.allIndianLanguagesSupported}
              </p>
            </div>
            <button
              id="more-languages-header-btn"
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#DCE8DD] bg-white hover:bg-[#F8FAF5] hover:border-[#22C55E] text-[#163020] transition-colors self-start sm:self-auto cursor-pointer"
            >
              <MoreHorizontal className="w-4 h-4 text-[#166534]" />
              <span>{t.moreLanguages}</span>
            </button>
          </div>

          {/* 12 Primary Indian Language Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-3.5">
            {PRIMARY_LANGUAGES.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  id={`select-lang-btn-${lang.code}`}
                  onClick={() => handleChoose(lang.code)}
                  className={`relative p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 text-left flex flex-col justify-between group cursor-pointer ${
                    isSelected
                      ? "border-[#166534] bg-white text-[#163020] shadow-md ring-2 ring-[#166534]/20 scale-[1.02]"
                      : "border-[#DCE8DD] hover:border-[#22C55E] bg-white text-[#163020] hover:bg-[#F8FAF5] shadow-2xs hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F8FAF5] group-hover:bg-[#DCE8DD]/50 text-[#166534] transition-colors">
                      {lang.code.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-black tracking-tight text-[#163020] group-hover:text-[#166534]">
                      {lang.nativeName}
                    </p>
                    <p className="text-xs text-[#64748B] font-medium">
                      {lang.name}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#DCE8DD]">
                    <span className="text-[10px] text-[#64748B] truncate max-w-[80px]">
                      {lang.region.split(",")[0]}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-[#F8FAF5] text-[#166534] group-hover:bg-[#166534] group-hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </button>
              );
            })}

            {/* "More Languages" card */}
            <button
              type="button"
              id="select-more-languages-card"
              onClick={() => setShowModal(true)}
              className="p-3.5 sm:p-4 rounded-2xl border-2 border-dashed border-[#DCE8DD] hover:border-[#22C55E] bg-white hover:bg-[#F8FAF5] text-[#163020] transition-all flex flex-col justify-between text-left group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🇮🇳</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F8FAF5] text-[#163020] border border-[#DCE8DD]">
                  +3
                </span>
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-[#163020] group-hover:text-[#166534]">
                  {t.moreLanguages}
                </p>
                <p className="text-xs text-[#64748B]">
                  Urdu, Bhojpuri, Maithili...
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#DCE8DD] text-xs font-semibold text-[#166534]">
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-3 border-t border-[#DCE8DD]">
          <div className="flex items-center gap-2.5 text-xs text-[#64748B]">
            <ShieldCheck className="w-4 h-4 text-[#166534] shrink-0" />
            <span>100% Free Kisan Advisory • Verified Agricultural Protocols</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#64748B]">
            <HeartHandshake className="w-4 h-4 text-[#22C55E] shrink-0" />
            <span>Direct Agronomist Escalation & WhatsApp Desk</span>
          </div>
        </div>
      </div>

      {/* Language Modal */}
      <LanguageModal
        isOpen={showModal}
        currentLanguage={currentLanguage}
        onSelectLanguage={onSelectLanguage}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};
