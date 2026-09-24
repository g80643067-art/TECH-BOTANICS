import React, { useState } from "react";
import { Sprout, Globe, Phone, Settings, RefreshCw, HelpCircle, ChevronDown } from "lucide-react";
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
  activeSection?: "voice-assistant" | "pipeline";
  onSelectSection?: (section: "voice-assistant" | "pipeline") => void;
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
  activeSection,
  onSelectSection,
}) => {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const t = getTranslation(language);
  const langInfo = getLanguageInfo(language);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DCE8DD] shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div
            onClick={() => {
              if (onSelectSection) onSelectSection("voice-assistant");
              onNavigateStep(1);
            }}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="brand-logo-button"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#166534] flex items-center justify-center text-white shadow-md shadow-[#166534]/20 group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-6 h-6 text-[#22C55E]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#166534]">
                  {t.appName}
                </span>
                <span className="hidden sm:inline-flex items-center text-[11px] font-semibold tracking-wide bg-[#F8FAF5] text-[#166534] px-2 py-0.5 rounded-full border border-[#DCE8DD]">
                  AI Guided
                </span>
              </div>
              <p className="text-xs text-[#64748B] font-medium line-clamp-1">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Crop Health Voice AI Quick Switcher */}
            {onSelectSection && (
              <button
                type="button"
                onClick={() =>
                  onSelectSection(
                    activeSection === "voice-assistant" ? "pipeline" : "voice-assistant"
                  )
                }
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  activeSection === "voice-assistant"
                    ? "bg-[#166534] text-white border-[#166534] shadow-xs"
                    : "bg-[#F8FAF5] hover:bg-white text-[#163020] border-[#DCE8DD] hover:border-[#22C55E]"
                }`}
                title="फसल स्वास्थ्य जांच व वॉइस असिस्टेंट"
                id="header-voice-assistant-toggle"
              >
                <span>🎙️</span>
                <span className="hidden sm:inline">फसल हेल्थ AI</span>
                <span className="sm:hidden">वॉइस AI</span>
                {activeSection === "voice-assistant" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                )}
              </button>
            )}
            {/* Helpline Quick Badge */}
            <a
              href={`tel:${expertPhoneNumber.replace(/\s+/g, "")}`}
              className="hidden lg:flex items-center gap-2 text-xs font-semibold bg-[#F8FAF5] hover:bg-white text-[#163020] hover:text-[#166534] px-3 py-1.5 rounded-full border border-[#DCE8DD] hover:border-[#22C55E] transition-all"
              title={t.kisanHelpline}
              id="header-helpline-badge"
            >
              <Phone className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>{expertPhoneNumber}</span>
            </a>

            {/* Global Language Switcher Button */}
            <button
              type="button"
              onClick={() => setShowLanguageModal(true)}
              id="header-language-switcher-btn"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-[#F8FAF5] border border-[#DCE8DD] hover:border-[#22C55E] text-[#163020] transition-all text-xs font-bold shadow-2xs group cursor-pointer"
              title={t.changeLanguage}
            >
              <Globe className="w-4 h-4 text-[#166534] group-hover:rotate-12 transition-transform" />
              <span className="text-sm leading-none">{langInfo.flag}</span>
              <span className="font-bold">{langInfo.nativeName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#64748B] opacity-70" />
            </button>

            {/* Help / FAQ Button */}
            <button
              type="button"
              onClick={() => setShowFaqModal(true)}
              className="p-2 text-[#64748B] hover:text-[#166534] hover:bg-[#F8FAF5] rounded-full transition-colors cursor-pointer"
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
                className="p-2 text-[#64748B] hover:text-[#166534] hover:bg-[#F8FAF5] rounded-full transition-colors cursor-pointer"
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
              className="p-2 text-[#64748B] hover:text-[#166534] hover:bg-[#F8FAF5] rounded-full transition-colors cursor-pointer"
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
