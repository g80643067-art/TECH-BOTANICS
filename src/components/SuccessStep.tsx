import React from "react";
import {
  CheckCircle2,
  Download,
  RefreshCw,
  Sparkles,
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
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xl shadow-stone-200/40 text-center relative overflow-hidden">
        {/* Decorative celebration accent */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600" />

        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 shadow-md shadow-emerald-900/10 mb-6">
          <CheckCircle2 className="w-11 h-11 text-emerald-600 animate-bounce" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase bg-emerald-100 text-emerald-900 border border-emerald-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> {t.success.badge}
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-2">
          {t.success.title}
        </h1>
        <p className="text-sm text-stone-600 max-w-md mx-auto mb-8">
          {t.success.subtitle}
        </p>

        {/* 3 Success Checklist Cards */}
        <div className="space-y-3 text-left mb-8">
          {/* Item 1: Resolution completed */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900">
                ✓ {t.success.item1Title}
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                {t.success.item1Desc} ({getLocalizedCropName(cropData, language).split("(")[0]} - {getLocalizedIssueName(cropData, language).split("(")[0]})
              </p>
            </div>
          </div>

          {/* Item 2: Save scan report */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <FileCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-bold text-sm text-stone-900">
                  ✓ {t.success.item2Title}
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  {t.success.item2Desc}
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenReportModal}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-300 transition-colors shadow-2xs"
                id="btn-open-report-modal"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isHi ? "रिपोर्ट देखें" : "View Report"}</span>
              </button>
            </div>
          </div>

          {/* Item 3: Monitor crop again */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-stone-900">
                ✓ {t.success.item3Title}
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
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
            className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-800 font-bold py-3.5 px-6 rounded-2xl border-2 border-stone-200 transition-all cursor-pointer text-sm"
            id="btn-download-report-success"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>{t.success.downloadReportButton}</span>
          </button>

          <button
            type="button"
            onClick={onScanAgain}
            className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-md transition-all active:scale-98 cursor-pointer text-sm"
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

