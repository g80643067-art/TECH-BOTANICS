import React, { useState } from "react";
import { Sprout, Globe, Phone, Settings, Sparkles, RefreshCw, HelpCircle, ChevronDown } from "lucide-react";
import { Language, StepNumber } from "../types";
import { getLanguageInfo } from "../data/languages";
import { getTranslation } from "../data/translations";
import { LanguageModal } from "./LanguageModal";
import { FaqModal } from "./FaqModal";

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentStep: StepNumber;
  onNavigateStep: (step: StepNumber) => void;
  expertPhoneNumber: string;
  onOpenConfig: () => void;
  onReset: () => void;
  onOpenAiAgent?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  currentStep,
  onNavigateStep,
  expertPhoneNumber,
  onOpenConfig,
  onReset,
  onOpenAiAgent,
}) => {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const t = getTranslation(language);
  const langInfo = getLanguageInfo(language);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div
            onClick={() => onNavigateStep(1)}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="brand-logo-button"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-emerald-950">
                  {t.appName}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide bg-emerald-100/90 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300/60">
                  <Sparkles className="w-3 h-3 text-emerald-700" /> AI Guided
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium line-clamp-1">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Helpline Quick Badge */}
            <a
              href={`tel:${expertPhoneNumber.replace(/\s+/g, "")}`}
              className="hidden lg:flex items-center gap-2 text-xs font-semibold bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 px-3 py-1.5 rounded-full border border-stone-200 transition-colors"
              title={t.kisanHelpline}
              id="header-helpline-badge"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{expertPhoneNumber}</span>
            </a>

            {/* Global Language Switcher Button */}
            <button
              type="button"
              onClick={() => setShowLanguageModal(true)}
              id="header-language-switcher-btn"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-emerald-900 transition-all text-xs font-bold shadow-xs group"
              title={t.changeLanguage}
            >
              <Globe className="w-4 h-4 text-emerald-700 group-hover:rotate-12 transition-transform" />
              <span className="text-sm leading-none">{langInfo.flag}</span>
              <span className="font-bold">{langInfo.nativeName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-600 opacity-70" />
            </button>

            {/* Help / FAQ Button */}
            <button
              type="button"
              onClick={() => setShowFaqModal(true)}
              className="p-2 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors"
              title="Help & FAQ"
              id="btn-header-faq"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Reset / New Journey Button */}
            {currentStep > 1 && (
              <button
                type="button"
                onClick={onReset}
                className="p-2 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors"
                title="Reset Journey"
                id="btn-header-reset"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}

            {/* Config Settings Trigger */}
            <button
              type="button"
              onClick={onOpenConfig}
              className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-full transition-colors"
              title={t.settings.title}
              id="btn-header-settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Language Selection Modal */}
      <LanguageModal
        isOpen={showLanguageModal}
        currentLanguage={language}
        onSelectLanguage={onLanguageChange}
        onClose={() => setShowLanguageModal(false)}
      />

      {/* Help & FAQ Modal */}
      <FaqModal
        isOpen={showFaqModal}
        language={language}
        onClose={() => setShowFaqModal(false)}
        onAskAi={() => onOpenAiAgent && onOpenAiAgent()}
        expertPhoneNumber={expertPhoneNumber}
      />
    </>
  );
};
