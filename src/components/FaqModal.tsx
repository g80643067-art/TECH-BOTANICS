import React from "react";
import { X, HelpCircle, Phone, MessageSquare, ShieldCheck, ExternalLink } from "lucide-react";
import { Language } from "../types";
import { getTranslation } from "../data/translations";

interface FaqModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  onAskAi: () => void;
  expertPhoneNumber: string;
}

export const FaqModal: React.FC<FaqModalProps> = ({
  isOpen,
  language,
  onClose,
  onAskAi,
  expertPhoneNumber,
}) => {
  const t = getTranslation(language);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/70 backdrop-blur-sm animate-fade-in">
      <div
        id="faq-modal-dialog"
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-stone-800 flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-100 dark:border-stone-800 bg-emerald-50/70 dark:bg-stone-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                {t.faq.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                {t.faq.subtitle}
              </p>
            </div>
          </div>
          <button
            id="close-faq-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FAQ Items */}
        <div className="p-6 overflow-y-auto space-y-4">
          {t.faq.items.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-850"
            >
              <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                  {idx + 1}
                </span>
                <span>{item.question}</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 pl-7 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}

          {/* Quick Support Card */}
          <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-200 dark:border-emerald-900/50">
            <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200 mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {t.kisanHelpline}
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 mb-4">
              Need immediate assistance? Speak directly with a certified agronomist or chat with AI.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${expertPhoneNumber.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {expertPhoneNumber}</span>
              </a>
              <button
                onClick={() => {
                  onClose();
                  onAskAi();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-800 font-semibold text-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.aiAgent.buttonText}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
