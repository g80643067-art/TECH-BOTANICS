import React, { useState } from "react";
import { Sprout, ArrowRight, ShieldCheck, HeartHandshake, Sparkles, Globe, MoreHorizontal } from "lucide-react";
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
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xl shadow-stone-200/40 text-center relative overflow-hidden">
        {/* Decorative top accent gradient */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700" />

        {/* Icon & Welcome Header */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shadow-inner mb-5">
          <Sprout className="w-9 h-9 sm:w-11 sm:h-11 text-emerald-700" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> KrishiSetu AI • {t.steps.step1}
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
          {t.welcomeTitle}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto mb-8 leading-relaxed">
          {t.welcomeSubtitle}
        </p>

        {/* Language Selection Card */}
        <div className="bg-stone-50 rounded-2xl p-5 sm:p-7 border border-stone-200/70 mb-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div>
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                {t.chooseLanguage}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {t.allIndianLanguagesSupported}
              </p>
            </div>
            <button
              id="more-languages-header-btn"
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-stone-700 transition-colors self-start sm:self-auto"
            >
              <MoreHorizontal className="w-4 h-4 text-emerald-600" />
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
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md ring-2 ring-emerald-500/20 scale-[1.02]"
                      : "border-stone-200/90 hover:border-emerald-400 bg-white text-stone-800 hover:bg-emerald-50/40 shadow-xs hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-100 group-hover:bg-emerald-100 text-stone-600 group-hover:text-emerald-800 transition-colors">
                      {lang.code.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-black tracking-tight text-stone-900 group-hover:text-emerald-900">
                      {lang.nativeName}
                    </p>
                    <p className="text-xs text-stone-500 font-medium">
                      {lang.name}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-100">
                    <span className="text-[10px] text-stone-400 truncate max-w-[80px]">
                      {lang.region.split(",")[0]}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
              className="p-3.5 sm:p-4 rounded-2xl border-2 border-dashed border-stone-300 hover:border-emerald-400 bg-stone-50/60 hover:bg-emerald-50/40 text-stone-700 transition-all flex flex-col justify-between text-left group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🇮🇳</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">
                  +3
                </span>
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-stone-800 group-hover:text-emerald-900">
                  {t.moreLanguages}
                </p>
                <p className="text-xs text-stone-500">
                  Urdu, Bhojpuri, Maithili...
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-200/60 text-xs font-semibold text-emerald-700">
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-3 border-t border-stone-100">
          <div className="flex items-center gap-2.5 text-xs text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Free Kisan Advisory • Verified Agricultural Protocols</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-stone-600">
            <HeartHandshake className="w-4 h-4 text-teal-600 shrink-0" />
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
