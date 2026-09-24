import React, { useState } from "react";
import {
  FileText,
  Printer,
  Download,
  ShieldCheck,
  QrCode,
  Calendar,
  CheckCircle2,
  Sprout,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { CropIssueData, FarmLocation, Language, SoilOption } from "../types";
import { SAMPLE_CROPS } from "../data/mockCrops";

interface PrescriptionReportsSectionProps {
  language: Language;
  detectedCrop: CropIssueData | null;
  location: FarmLocation | null;
  soilType: SoilOption | null;
  cropImage: string | null;
  onOpenReportModal: () => void;
  onNavigateToScanner: () => void;
}

export const PrescriptionReportsSection: React.FC<PrescriptionReportsSectionProps> = ({
  language,
  detectedCrop,
  location,
  soilType,
  cropImage,
  onOpenReportModal,
  onNavigateToScanner,
}) => {
  const isHi = language === "hi";
  const activeCrop = detectedCrop || SAMPLE_CROPS[0];

  const [refId] = useState(
    () => `KS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  );
  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white border border-[#DCE8DD] rounded-3xl p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#166534] font-semibold mb-1">
              <FileText className="w-4 h-4 text-[#22C55E]" />
              <span>{isHi ? "डिजिटल फसल स्वास्थ्य पर्ची व रिपोर्ट" : "Digital Crop Health Prescription"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#163020]">
              {isHi ? "प्रमाणित पादप रोग निदान पर्ची (Rx)" : "Certified Plant Pathology Prescription"}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl">
              {isHi
                ? "कृषिसितु एआई व कृषि वैज्ञानिकों द्वारा अनुमोदित उपचार व छिड़काव सारणी।"
                : "Official agronomic prescription with verified dosages, spray timing, and safety precautions."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F8FAF5] hover:bg-[#DCE8DD]/40 border border-[#DCE8DD] text-[#163020] text-xs font-bold transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#166534]" />
              <span>{isHi ? "सर्टिफिकेट व्यू" : "Certificate Modal"}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              id="btn-print-rx"
            >
              <Printer className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>{isHi ? "पर्ची प्रिंट / PDF" : "Print Rx / PDF"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Prescription Paper Document */}
      <div className="bg-white border-2 border-[#DCE8DD] rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden max-w-4xl mx-auto">
        {/* Prescription Header */}
        <div className="border-b-2 border-[#166534] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#166534] flex items-center justify-center text-white shadow-sm shrink-0">
              <Sprout className="w-7 h-7 text-[#22C55E]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#166534] tracking-tight">
                KRISHISETU AI
              </h3>
              <p className="text-xs text-[#64748B]">
                {isHi ? "राष्ट्रीय डिजिटल कृषि निदान केंद्र" : "National Digital Plant Health Advisory"}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs">
            <p className="font-mono text-[#166534] font-bold text-sm">{refId}</p>
            <p className="text-[#64748B] flex items-center gap-1 sm:justify-end mt-0.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDate}</span>
            </p>
          </div>
        </div>

        {/* Farm & Crop Diagnostic Snapshot */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-[#DCE8DD] text-xs">
          <div>
            <span className="text-[#64748B] block text-[11px]">{isHi ? "फसल का नाम" : "Crop"}</span>
            <strong className="text-[#163020] text-sm block">
              {isHi ? activeCrop.cropName_hi : activeCrop.cropName_en}
            </strong>
          </div>

          <div>
            <span className="text-[#64748B] block text-[11px]">{isHi ? "पहचाना गया रोग" : "Diagnosis"}</span>
            <strong className="text-[#163020] text-sm block">
              {isHi ? activeCrop.issueName_hi : activeCrop.issueName_en}
            </strong>
          </div>

          <div>
            <span className="text-[#64748B] block text-[11px]">{isHi ? "क्षेत्र व मृदा" : "Location & Soil"}</span>
            <strong className="text-[#163020] block">
              {location ? `${location.district}, ${location.state}` : "National Network"}
            </strong>
            <span className="text-[10px] text-[#64748B]">
              {soilType ? (isHi ? soilType.name_hi : soilType.name_en) : "Alluvial Soil"}
            </span>
          </div>

          <div>
            <span className="text-[#64748B] block text-[11px]">{isHi ? "सटीकता व गंभीरता" : "Severity & AI Match"}</span>
            <strong className="text-amber-700 block">{activeCrop.severity} Risk</strong>
            <span className="text-[10px] font-mono text-[#166534]">
              Confidence: {activeCrop.confidenceScore}%
            </span>
          </div>
        </div>

        {/* Prescription Treatment Plan */}
        <div className="py-5 space-y-4">
          <h4 className="font-extrabold text-sm text-[#163020] uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#166534] text-base">℞</span>
            <span>{isHi ? "उपचार व छिड़काव निर्देश (Prescribed Remedies)" : "Prescribed Remedies & Dosage"}</span>
          </h4>

          <div className="space-y-3">
            {activeCrop.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#F8FAF5] border border-[#DCE8DD] flex items-start gap-3.5"
              >
                <span className="w-6 h-6 rounded-full bg-[#166534] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {step.stepNumber}
                </span>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-[#163020] text-sm">
                      {isHi ? step.title_hi : step.title_en}
                    </h5>
                    <span className="text-[#64748B]">·</span>
                    <span className="text-[#166534] font-semibold text-[11px]">
                      {isHi ? step.tag_hi : step.tag_en}
                    </span>
                  </div>
                  <p className="text-[#163020] leading-relaxed">
                    {isHi ? step.description_hi : step.description_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Precaution Notice */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-xs text-[#163020] space-y-1">
          <p className="font-bold text-amber-800 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            <span>{isHi ? "सावधानी व सुरक्षा दिशा-निर्देश:" : "Safety & Environmental Precautions:"}</span>
          </p>
          <p className="text-[11px] text-[#64748B] leading-relaxed">
            {isHi
              ? "दवा का छिड़काव हमेशा सुबह 8 से 11 बजे या शाम को 4 बजे के बाद करें जब हवा शांत हो। चेहरे पर मास्क और हाथों में दस्ताने अवश्य पहनें।"
              : "Spray chemicals during calm morning or late evening hours. Always wear protective gloves and mask. Keep 7 days pre-harvest interval."}
          </p>
        </div>

        {/* Prescription Footer & Scientist Signature */}
        <div className="mt-6 pt-5 border-t-2 border-[#DCE8DD] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F8FAF5] border border-[#DCE8DD] flex items-center justify-center">
              <QrCode className="w-7 h-7 text-[#166534]" />
            </div>
            <div>
              <p className="font-bold text-[#163020]">{isHi ? "डिजिटल क्यूआर सत्यापन" : "QR Verified Prescription"}</p>
              <p className="text-[10px] text-[#64748B]">
                {isHi ? "सरकारी मान्यता प्राप्त कृषि परामर्श" : "Complies with ICAR Agro-Advisory Guidelines"}
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="font-serif italic text-sm text-[#166534] font-bold">
              Dr. S. K. Sharma, Ph.D.
            </div>
            <p className="text-[10px] text-[#64748B]">
              {isHi ? "वरिष्ठ पादप रोग वैज्ञानिक, ICAR-KVK" : "Senior Agronomist, ICAR-KVK Advisory Board"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
