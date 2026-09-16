import React, { useState } from "react";
import { X, Settings, Phone, RefreshCw, Check, ShieldCheck, Sparkles } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface ConfigModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  expertPhoneNumber: string;
  onUpdatePhoneNumber: (num: string) => void;
  onResetSession: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  language,
  isOpen,
  onClose,
  expertPhoneNumber,
  onUpdatePhoneNumber,
  onResetSession,
}) => {
  const t = translations[language];
  const isHi = language === "hi";

  const [tempPhone, setTempPhone] = useState<string>(expertPhoneNumber);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePhoneNumber(tempPhone);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-stone-900">
              {t.settings.title}
            </h3>
            <p className="text-xs text-stone-500">{t.settings.subtitle}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.settings.expertPhoneLabel}</span>
            </label>
            <input
              type="text"
              value={tempPhone}
              onChange={(e) => setTempPhone(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              id="input-config-expert-phone"
            />
            <p className="text-[11px] text-stone-500 mt-1">
              {isHi
                ? "यह नंबर सभी हेल्पलाइन बटन और व्हाट्सएप लिंक पर तुरंत अपडेट हो जाता है।"
                : "Easily replace the demo contact number for local KVK testing."}
            </p>
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-semibold">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{isHi ? "सेटिंग्स सुरक्षित कर दी गई!" : "Settings saved successfully!"}</span>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-sm transition-all"
              id="btn-save-config"
            >
              {t.settings.saveSettings}
            </button>

            <button
              type="button"
              onClick={() => {
                onResetSession();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
              id="btn-reset-demo-session"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.settings.resetDemo}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
