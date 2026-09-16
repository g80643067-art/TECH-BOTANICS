import React, { useState } from "react";
import { X, Search, Globe, Check, Sparkles } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/70 backdrop-blur-sm animate-fade-in">
      <div
        id="language-modal-dialog"
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-stone-800 flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-100 dark:border-stone-800 bg-emerald-50/70 dark:bg-stone-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                {t.chooseLanguage}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                {t.allIndianLanguagesSupported}
              </p>
            </div>
          </div>
          <button
            id="close-language-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="p-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id="language-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchLanguagePlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
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
                  className={`relative p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/20 shadow-sm"
                      : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850 hover:border-emerald-400 hover:bg-emerald-50/40 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{lang.flag}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-base font-bold tracking-tight">{lang.nativeName}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                      {lang.name}
                    </p>
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 line-clamp-1">
                      {lang.region}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredLanguages.length === 0 && (
            <div className="text-center py-10 text-stone-500">
              <p className="text-sm font-medium">No languages matching "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Active: {getLanguageInfo(currentLanguage).nativeName} ({getLanguageInfo(currentLanguage).name})</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
