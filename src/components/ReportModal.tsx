import React from "react";
import { X, Printer, Sprout, ShieldCheck } from "lucide-react";
import { CropIssueData, FarmLocation, Language, SoilOption } from "../types";
import { getTranslation } from "../data/translations";
import { getLocalizedCropName, getLocalizedIssueName, getLocalizedStepTitle, getLocalizedStepDesc } from "../data/mockCrops";
import { getLocalizedSoilName } from "../data/soilTypes";
import { SynchronizedCropPhoto } from "./SynchronizedCropPhoto";

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
    <div className="fixed inset-0 z-50 bg-[#163020]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-xl border border-[#DCE8DD] relative my-8 print:p-0 print:border-none print:shadow-none">
        {/* Close and Print Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#DCE8DD] print:hidden">
          <div className="flex items-center gap-2 text-[#163020]">
            <Printer className="w-4 h-4 text-[#166534]" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {isHi ? "डिजिटल फसल स्वास्थ्य रिपोर्ट" : "Digital Crop Health Report"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-[#166534] hover:bg-[#14532d] text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isHi ? "प्रिंट / PDF सहेजें" : "Print / Save PDF"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#64748B] hover:text-[#163020] rounded-full hover:bg-[#F8FAF5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Printable Certificate Content */}
        <div className="bg-[#F8FAF5] p-6 rounded-2xl border border-[#DCE8DD]" id="printable-crop-report">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE8DD]">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#166534] text-white flex items-center justify-center">
                <Sprout className="w-6 h-6 text-[#22C55E]" />
              </div>
              <div>
                <h2 className="font-black text-lg text-[#163020]">KRISHISETU AI</h2>
                <p className="text-[11px] text-[#64748B] font-semibold">
                  Official AI-Assisted Advisory Document
                </p>
              </div>
            </div>

            <div className="text-right text-xs text-[#64748B]">
              <span className="font-mono text-[10px] text-[#64748B] block">REPORT ID</span>
              <span className="font-mono font-bold text-[#163020]">
                KS-REP-{Math.floor(100000 + Math.random() * 900000)}
              </span>
              <span className="text-[10px] text-[#64748B] block mt-0.5">{todayStr}</span>
            </div>
          </div>

          {/* Synchronized Verified Crop Photo & Farm Details */}
          <div className="my-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-4 max-w-[200px]">
              <SynchronizedCropPhoto
                cropName={cropData.cropName_hi || cropData.cropName_en}
                directImageUrl={cropImage || cropData.sampleImage}
                aspectRatio="aspect-4/3"
                showBadge={true}
                showSyncIndicator={false}
                language={language}
              />
            </div>
            <div className="sm:col-span-8 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-[#DCE8DD]">
                <span className="text-[10px] text-[#64748B] font-bold block uppercase">Crop</span>
                <span className="font-extrabold text-[#163020]">
                  {getLocalizedCropName(cropData, language).split("(")[0]}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#DCE8DD]">
                <span className="text-[10px] text-[#64748B] font-bold block uppercase">Issue</span>
                <span className="font-extrabold text-rose-700">
                  {getLocalizedIssueName(cropData, language).split("(")[0]}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#DCE8DD]">
                <span className="text-[10px] text-[#64748B] font-bold block uppercase">Severity</span>
                <span className="font-extrabold text-[#163020] bg-[#FACC15]/20 px-1.5 py-0.5 rounded text-[11px]">{cropData.severity}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#DCE8DD]">
                <span className="text-[10px] text-[#64748B] font-bold block uppercase">Soil</span>
                <span className="font-extrabold text-[#163020]">
                  {soilType ? getLocalizedSoilName(soilType, language) : (isHi ? "दोमट मिट्टी" : "Loamy Soil")}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Steps Checklist in Report */}
          <div className="my-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#163020] mb-2">
              {isHi ? "अनुशंसित 4-चरणीय कार्ययोजना" : "4-Step Recommended Action Plan"}
            </h4>
            <div className="space-y-2">
              {cropData.steps.map((s) => (
                <div key={s.stepNumber} className="bg-white p-3 rounded-xl border border-[#DCE8DD] text-xs">
                  <div className="font-bold text-[#163020] flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#166534] text-white text-[10px] flex items-center justify-center font-mono">
                      {s.stepNumber}
                    </span>
                    <span>{getLocalizedStepTitle(s, language)}</span>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-1 pl-5">
                    {getLocalizedStepDesc(s, language)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="pt-3 border-t border-[#DCE8DD] flex items-center justify-between text-[10px] text-[#64748B]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#166534]" />
              Verified Farmer Advisory Protocol
            </span>
            <span>KRISHISETU AI • www.krishisetu.ai</span>
          </div>
        </div>
      </div>
    </div>
  );
};

