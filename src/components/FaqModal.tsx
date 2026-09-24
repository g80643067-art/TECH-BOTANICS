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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163020]/60 backdrop-blur-xs animate-fade-in">
      <div
        id="faq-modal-dialog"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-[#DCE8DD] flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#DCE8DD] bg-[#F8FAF5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#166534] text-white flex items-center justify-center shadow-xs">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#163020]">
                {t.faq.title}
              </h3>
              <p className="text-xs text-[#64748B]">
                {t.faq.subtitle}
              </p>
            </div>
          </div>
          <button
            id="close-faq-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#163020] hover:bg-white transition-colors cursor-pointer"
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
              className="p-4 rounded-2xl border border-[#DCE8DD] bg-[#F8FAF5]"
            >
              <h4 className="text-sm sm:text-base font-bold text-[#163020] mb-2 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-white text-[#166534] border border-[#DCE8DD] flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                  {idx + 1}
                </span>
                <span>{item.question}</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#64748B] pl-7 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}

          {/* Quick Support Card */}
          <div className="mt-6 p-5 rounded-2xl bg-[#F8FAF5] border border-[#DCE8DD]">
            <h4 className="text-sm font-bold text-[#163020] mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#166534]" />
              {t.kisanHelpline}
            </h4>
            <p className="text-xs text-[#64748B] mb-4">
              Need immediate assistance? Speak directly with a certified agronomist or chat with AI.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${expertPhoneNumber.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white font-semibold text-xs transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Call {expertPhoneNumber}</span>
              </a>
              <button
                onClick={() => {
                  onClose();
                  onAskAi();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#DCE8DD] bg-white hover:bg-[#F8FAF5] text-[#163020] font-semibold text-xs transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#166534]" />
                <span>{t.aiAgent.buttonText}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#DCE8DD] bg-[#F8FAF5] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
