import React from "react";
import {
  CheckCircle2,
  Download,
  RefreshCw,
  Printer,
  FileCheck,
  CalendarCheck,
} from "lucide-react";
import { CropIssueData, FarmLocation, Language, SoilOption } from "../types";
import { getTranslation } from "../data/translations";
import { getLocalizedCropName, getLocalizedIssueName } from "../data/mockCrops";

interface SuccessStepProps {
  language: Language;
  cropData: CropIssueData;
  location: FarmLocation | null;
  soilType: SoilOption | null;
  onScanAgain: () => void;
  onOpenReportModal: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
  language,
  cropData,
  location,
  soilType,
  onScanAgain,
  onOpenReportModal,
}) => {
  const t = getTranslation(language);
  const isHi = language === "hi";

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DCE8DD] shadow-sm text-center relative overflow-hidden">
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#166534]" />

        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-[#F8FAF5] border border-[#DCE8DD] flex items-center justify-center text-[#166534] shadow-xs mb-6">
          <CheckCircle2 className="w-11 h-11 text-[#22C55E] animate-bounce" />
        </div>

        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase bg-[#F8FAF5] text-[#166534] border border-[#DCE8DD] mb-3">
          {t.success.badge}
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-[#163020] tracking-tight mb-2">
          {t.success.title}
        </h1>
        <p className="text-sm text-[#64748B] max-w-md mx-auto mb-8">
          {t.success.subtitle}
        </p>

        {/* 3 Success Checklist Cards */}
        <div className="space-y-3 text-left mb-8">
          {/* Item 1: Resolution completed */}
          <div className="bg-[#F8FAF5] rounded-2xl p-4 border border-[#DCE8DD] flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#166534] text-white flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#163020]">
                ✓ {t.success.item1Title}
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">
                {t.success.item1Desc} ({getLocalizedCropName(cropData, language).split("(")[0]} - {getLocalizedIssueName(cropData, language).split("(")[0]})
              </p>
            </div>
          </div>

          {/* Item 2: Save scan report */}
          <div className="bg-[#F8FAF5] rounded-2xl p-4 border border-[#DCE8DD] flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#22C55E] text-[#163020] flex items-center justify-center shrink-0 mt-0.5">
              <FileCheck className="w-5 h-5 text-[#163020]" />
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-bold text-sm text-[#163020]">
                  ✓ {t.success.item2Title}
                </h4>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {t.success.item2Desc}
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenReportModal}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 bg-white hover:bg-[#F8FAF5] text-[#166534] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#DCE8DD] transition-colors shadow-2xs cursor-pointer"
                id="btn-open-report-modal"
              >
                <Printer className="w-3.5 h-3.5 text-[#166534]" />
                <span>{isHi ? "रिपोर्ट देखें" : "View Report"}</span>
              </button>
            </div>
          </div>

          {/* Item 3: Monitor crop again */}
          <div className="bg-[#F8FAF5] rounded-2xl p-4 border border-[#DCE8DD] flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#163020] text-white flex items-center justify-center shrink-0 mt-0.5">
              <CalendarCheck className="w-5 h-5 text-[#22C55E]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#163020]">
                ✓ {t.success.item3Title}
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">
                {t.success.item3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={onOpenReportModal}
            className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-white hover:bg-[#F8FAF5] text-[#163020] font-bold py-3.5 px-6 rounded-2xl border-2 border-[#DCE8DD] transition-all cursor-pointer text-sm"
            id="btn-download-report-success"
          >
            <Download className="w-4 h-4 text-[#166534]" />
            <span>{t.success.downloadReportButton}</span>
          </button>

          <button
            type="button"
            onClick={onScanAgain}
            className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-sm transition-all active:scale-98 cursor-pointer text-sm"
            id="btn-scan-again-success"
          >
            <RefreshCw className="w-4 h-4" />
            <span>[ {t.success.scanAgainButton} ]</span>
          </button>
        </div>
      </div>
    </div>
  );
};

