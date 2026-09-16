import React from "react";
import { X, Printer, Sprout, ShieldCheck } from "lucide-react";
import { CropIssueData, FarmLocation, Language, SoilOption } from "../types";
import { getTranslation } from "../data/translations";
import { getLocalizedCropName, getLocalizedIssueName, getLocalizedStepTitle, getLocalizedStepDesc } from "../data/mockCrops";
import { getLocalizedSoilName } from "../data/soilTypes";

interface ReportModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  cropData: CropIssueData;
  cropImage: string | null;
  location: FarmLocation | null;
  soilType: SoilOption | null;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  language,
  isOpen,
  onClose,
  cropData,
  cropImage,
  location,
  soilType,
}) => {
  const t = getTranslation(language);
  const isHi = language === "hi";

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString(isHi ? "hi-IN" : "en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8 print:p-0 print:border-none print:shadow-none">
        {/* Close and Print Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200 print:hidden">
          <div className="flex items-center gap-2 text-stone-700">
            <Printer className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {isHi ? "डिजिटल फसल स्वास्थ्य रिपोर्ट" : "Digital Crop Health Report"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isHi ? "प्रिंट / PDF सहेजें" : "Print / Save PDF"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Printable Certificate Content */}
        <div className="bg-stone-50/50 p-6 rounded-2xl border border-stone-200" id="printable-crop-report">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-300">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
                <Sprout className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <h2 className="font-black text-lg text-emerald-950">KRISHISETU AI</h2>
                <p className="text-[11px] text-stone-500 font-semibold">
                  Official AI-Assisted Advisory Document
                </p>
              </div>
            </div>

            <div className="text-right text-xs text-stone-600">
              <span className="font-mono text-[10px] text-stone-400 block">REPORT ID</span>
              <span className="font-mono font-bold text-stone-900">
                KS-REP-{Math.floor(100000 + Math.random() * 900000)}
              </span>
              <span className="text-[10px] text-stone-500 block mt-0.5">{todayStr}</span>
            </div>
          </div>

          {/* Farm & Crop Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold block uppercase">Crop</span>
              <span className="font-extrabold text-stone-900">
                {getLocalizedCropName(cropData, language).split("(")[0]}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold block uppercase">Issue</span>
              <span className="font-extrabold text-rose-800">
                {getLocalizedIssueName(cropData, language).split("(")[0]}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold block uppercase">Severity</span>
              <span className="font-extrabold text-amber-800">{cropData.severity}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold block uppercase">Soil</span>
              <span className="font-extrabold text-stone-900">
                {soilType ? getLocalizedSoilName(soilType, language) : (isHi ? "दोमट मिट्टी" : "Loamy Soil")}
              </span>
            </div>
          </div>

          {/* 4 Steps Checklist in Report */}
          <div className="my-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              {isHi ? "अनुशंसित 4-चरणीय कार्ययोजना" : "4-Step Recommended Action Plan"}
            </h4>
            <div className="space-y-2">
              {cropData.steps.map((s) => (
                <div key={s.stepNumber} className="bg-white p-3 rounded-xl border border-stone-200 text-xs">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] flex items-center justify-center font-mono">
                      {s.stepNumber}
                    </span>
                    <span>{getLocalizedStepTitle(s, language)}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1 pl-5">
                    {getLocalizedStepDesc(s, language)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Farmer Advisory Protocol
            </span>
            <span>KRISHISETU AI • www.krishisetu.ai</span>
          </div>
        </div>
      </div>
    </div>
  );
};

