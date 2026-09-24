import React, { useState } from "react";
import { X, Search, Globe, Check } from "lucide-react";
import { Language } from "../types";
import { ALL_LANGUAGES, getLanguageInfo } from "../data/languages";
import { getTranslation } from "../data/translations";

interface LanguageModalProps {
  isOpen: boolean;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  currentLanguage,
  onSelectLanguage,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const t = getTranslation(currentLanguage);

  if (!isOpen) return null;

  const filteredLanguages = ALL_LANGUAGES.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163020]/60 backdrop-blur-xs animate-fade-in">
      <div
        id="language-modal-dialog"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-[#DCE8DD] flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#DCE8DD] bg-[#F8FAF5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#166534] text-white flex items-center justify-center shadow-xs">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#163020] flex items-center gap-2">
                {t.chooseLanguage}
              </h3>
              <p className="text-xs text-[#64748B]">
                {t.allIndianLanguagesSupported}
              </p>
            </div>
          </div>
          <button
            id="close-language-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#163020] hover:bg-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="p-4 border-b border-[#DCE8DD] bg-[#F8FAF5]">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              id="language-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchLanguagePlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#DCE8DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#166534] text-[#163020] placeholder:text-[#64748B]"
            />
          </div>
        </div>

        {/* Languages grid */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredLanguages.map((lang) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  id={`modal-lang-card-${lang.code}`}
                  onClick={() => {
                    onSelectLanguage(lang.code);
                    onClose();
                  }}
                  className={`relative p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between group cursor-pointer ${
                    isSelected
                      ? "border-[#166534] bg-[#F8FAF5] text-[#163020] ring-2 ring-[#166534]/20 shadow-xs"
                      : "border-[#DCE8DD] bg-white hover:border-[#22C55E] hover:bg-[#F8FAF5] text-[#163020]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{lang.flag}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#166534] text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-base font-bold tracking-tight text-[#163020]">{lang.nativeName}</p>
                    <p className="text-xs text-[#64748B] font-medium">
                      {lang.name}
                    </p>
                    <p className="text-[10px] text-[#64748B] mt-1 line-clamp-1">
                      {lang.region}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredLanguages.length === 0 && (
            <div className="text-center py-10 text-[#64748B]">
              <p className="text-sm font-medium">No languages matching "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#DCE8DD] bg-[#F8FAF5] flex items-center justify-between text-xs text-[#64748B]">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#166534]" />
            <span>Active: <strong className="text-[#163020]">{getLanguageInfo(currentLanguage).nativeName} ({getLanguageInfo(currentLanguage).name})</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
