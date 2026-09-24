import React, { useState } from "react";
import {
  CloudSun,
  Wind,
  Droplets,
  Thermometer,
  Sparkles,
  ScanLine,
  Mic,
  Sprout,
  TrendingUp,
  PhoneCall,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { CropIssueData, FarmLocation, Language, SoilOption } from "../types";
import { SAMPLE_CROPS } from "../data/mockCrops";
import { REAL_MANDI_PRICES } from "../data/mandiData";
import { DashboardTab } from "./DashboardNav";

interface DashboardOverviewProps {
  language: Language;
  onNavigateTab: (tab: DashboardTab) => void;
  onStartScan: () => void;
  onSelectCropIssue: (crop: CropIssueData) => void;
  detectedCrop: CropIssueData | null;
  location: FarmLocation | null;
  soilType: SoilOption | null;
  onOpenReportModal: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  language,
  onNavigateTab,
  onStartScan,
  onSelectCropIssue,
  detectedCrop,
  location,
  soilType,
  onOpenReportModal,
}) => {
  const isHi = language === "hi";

  // Simulated weather data for the farmer's region
  const [weather] = useState({
    temp: "24°C",
    condition_hi: "धूप व आंशिक बादल",
    condition_en: "Partly Cloudy & Sunny",
    humidity: "58%",
    wind: "7 km/h उत्तर-पश्चिम",
    rainChance: "10%",
    spraySuitability_hi: "छिड़काव के लिए अनुकूल समय: आज सुबह 8:00 से 11:30 बजे तक",
    spraySuitability_en: "Optimal spray window: Today 8:00 AM - 11:30 AM",
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Farm Intelligence & Spray Advisory Banner */}
      <div className="bg-gradient-to-br from-[#166534] via-[#14532d] to-[#0f291e] rounded-3xl p-5 sm:p-7 text-white shadow-md relative overflow-hidden border border-[#22C55E]/30">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          {/* Farm Greeting & Location Status */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs text-[#86EFAC] font-medium">
              <span>{isHi ? "कृषि संभाग" : "Agro-Climatic Zone"}</span>
              <span aria-hidden="true">·</span>
              <span>{location?.state || "National Farming Grid"}</span>
              <span aria-hidden="true">·</span>
              <span>{location?.district || "Rabi Season 2026"}</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {isHi
                ? "कृषिसितु स्मार्ट फार्मिंग डैशबोर्ड"
                : "KrishiSetu Smart Agriculture Dashboard"}
            </h1>

            <p className="text-xs sm:text-sm text-[#DCE8DD] max-w-xl leading-relaxed">
              {isHi
                ? "फसल रोग पहचान, मृदा उर्वरक गणना, मंडी भाव व त्वरित वैज्ञानिक सलाह एक ही स्थान पर।"
                : "Real-time AI crop diagnosis, N-P-K soil recommendations, APMC commodity rates, and direct agronomic helpline."}
            </p>

            {/* Weather & Spray Alert Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/20 flex items-center justify-center shrink-0">
                  <CloudSun className="w-6 h-6 text-[#FACC15]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <span className="font-mono tabular-nums">{weather.temp}</span>
                    <span aria-hidden="true">·</span>
                    <span>{isHi ? weather.condition_hi : weather.condition_en}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-[#DCE8DD] mt-0.5">
                    <span className="flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-[#86EFAC]" />
                      <span className="font-mono tabular-nums">{weather.humidity}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Wind className="w-3 h-3 text-[#86EFAC]" />
                      <span>{weather.wind}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t sm:border-t-0 sm:border-l border-white/15 pt-2 sm:pt-0 sm:pl-3">
                <p className="text-[11px] text-[#86EFAC] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>{isHi ? weather.spraySuitability_hi : weather.spraySuitability_en}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action CTAs */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <button
              type="button"
              onClick={onStartScan}
              className="flex items-center justify-between gap-3 bg-[#22C55E] hover:bg-[#16a34a] text-[#163020] font-black p-4 rounded-2xl shadow-sm transition-transform active:scale-98 cursor-pointer"
              id="dash-cta-scan-now"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#166534] text-[#22C55E] flex items-center justify-center shrink-0">
                  <ScanLine className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black">
                    {isHi ? "फसल फोटो स्कैन करें" : "Scan Crop Photo"}
                  </span>
                  <span className="block text-[11px] font-semibold text-[#163020]/80">
                    {isHi ? "रोग का तुरंत AI निदान व उपचार" : "Instant AI Disease Diagnosis"}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#163020]" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab("voice-doctor")}
              className="flex items-center justify-between gap-3 bg-white/15 hover:bg-white/25 text-white font-bold p-4 rounded-2xl border border-white/20 transition-transform active:scale-98 cursor-pointer"
              id="dash-cta-voice-advisor"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/20 text-[#86EFAC] flex items-center justify-center shrink-0">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-bold">
                    {isHi ? "वॉइस डॉक्टर से बात करें" : "Speak to Voice Doctor"}
                  </span>
                  <span className="block text-[11px] text-[#DCE8DD]">
                    {isHi ? "बोलकर फसल समस्या का हल पाएं" : "Natural voice guidance in Hindi"}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#86EFAC]" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metric Indicators Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white border border-[#DCE8DD] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs text-[#64748B] font-medium">
            {isHi ? "किसान फसल सुरक्षा" : "Crops Protected"}
          </p>
          <p className="text-xl sm:text-2xl font-black text-[#166534] font-mono tabular-nums mt-1">
            18,420+
          </p>
          <p className="text-[11px] text-[#163020]/70 mt-0.5">
            {isHi ? "सक्रिय किसान नेटवर्क" : "Active Farm Diagnoses"}
          </p>
        </div>

        <div className="bg-white border border-[#DCE8DD] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs text-[#64748B] font-medium">
            {isHi ? "निदान सटीकता" : "Diagnostic Precision"}
          </p>
          <p className="text-xl sm:text-2xl font-black text-[#166534] font-mono tabular-nums mt-1">
            96.4%
          </p>
          <p className="text-[11px] text-[#163020]/70 mt-0.5">
            {isHi ? "ICAR / PAU प्रमाणित डेटा" : "Verified Agri Knowledge"}
          </p>
        </div>

        <div className="bg-white border border-[#DCE8DD] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs text-[#64748B] font-medium">
            {isHi ? "कृषि विज्ञान केंद्र" : "KVK Network"}
          </p>
          <p className="text-xl sm:text-2xl font-black text-[#166534] font-mono tabular-nums mt-1">
            731 KVKs
          </p>
          <p className="text-[11px] text-[#163020]/70 mt-0.5">
            {isHi ? "अखिल भारतीय कवरेज" : "Pan-India Agri Stations"}
          </p>
        </div>

        <div className="bg-white border border-[#DCE8DD] rounded-2xl p-4 shadow-2xs">
          <p className="text-xs text-[#64748B] font-medium">
            {isHi ? "दैनिक मंडी कवरेज" : "Mandi APMCs Live"}
          </p>
          <p className="text-xl sm:text-2xl font-black text-[#166534] font-mono tabular-nums mt-1">
            140+ APMC
          </p>
          <p className="text-[11px] text-[#163020]/70 mt-0.5">
            {isHi ? "रियल-टाइम बाजार दरें" : "Daily Commodity Prices"}
          </p>
        </div>
      </div>

      {/* Grid: Main Sections Quick Access & Regional Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Interactive Module Cards & Alerts */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Module Navigation Grid */}
          <div className="bg-white border border-[#DCE8DD] rounded-3xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-base text-[#163020]">
                  {isHi ? "कृषि प्रबंधन टूल्स" : "Farm Management Tools"}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {isHi ? "जरूरत के अनुसार सही टूल चुनें" : "Select a service for immediate guidance"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => onNavigateTab("soil-health")}
                className="bg-[#F8FAF5] hover:bg-white border border-[#DCE8DD] hover:border-[#22C55E] rounded-2xl p-4 transition-all cursor-pointer group select-none shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#166534]/10 text-[#166534] flex items-center justify-center group-hover:scale-105 transition-transform mb-3">
                  <Sprout className="w-5 h-5 text-[#166534]" />
                </div>
                <h4 className="font-bold text-sm text-[#163020]">
                  {isHi ? "मृदा व खाद गणना" : "Soil & N-P-K Planner"}
                </h4>
                <p className="text-xs text-[#64748B] mt-1 leading-snug">
                  {isHi
                    ? "यूरिया, डीएपी व पोटाश की सही मात्रा एकड़ अनुसार निकालें"
                    : "Calculate fertilizer dosage and organic amendments per acre"}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#166534] mt-3 group-hover:translate-x-0.5 transition-transform">
                  <span>{isHi ? "गणना करें" : "Open Planner"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div
                onClick={() => onNavigateTab("mandi-rates")}
                className="bg-[#F8FAF5] hover:bg-white border border-[#DCE8DD] hover:border-[#22C55E] rounded-2xl p-4 transition-all cursor-pointer group select-none shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#166534]/10 text-[#166534] flex items-center justify-center group-hover:scale-105 transition-transform mb-3">
                  <TrendingUp className="w-5 h-5 text-[#166534]" />
                </div>
                <h4 className="font-bold text-sm text-[#163020]">
                  {isHi ? "दैनिक मंडी भाव" : "Live Mandi Rates"}
                </h4>
                <p className="text-xs text-[#64748B] mt-1 leading-snug">
                  {isHi
                    ? "सरसों, गेहूं, धान, कपास व आलू के न्यूनतम व उच्चतम भाव"
                    : "Check daily arrival prices and MSP benchmarks across APMCs"}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#166534] mt-3 group-hover:translate-x-0.5 transition-transform">
                  <span>{isHi ? "भाव देखें" : "View Rates"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div
                onClick={() => onNavigateTab("kisan-helpline")}
                className="bg-[#F8FAF5] hover:bg-white border border-[#DCE8DD] hover:border-[#22C55E] rounded-2xl p-4 transition-all cursor-pointer group select-none shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#166534]/10 text-[#166534] flex items-center justify-center group-hover:scale-105 transition-transform mb-3">
                  <PhoneCall className="w-5 h-5 text-[#166534]" />
                </div>
                <h4 className="font-bold text-sm text-[#163020]">
                  {isHi ? "किसान कॉल सेंटर" : "Helpline & Support"}
                </h4>
                <p className="text-xs text-[#64748B] mt-1 leading-snug">
                  {isHi
                    ? "टोल-फ्री 1800-180-1551 व कृषि वैज्ञानिक से कॉलबैक"
                    : "Direct toll-free connect and agricultural officer callback"}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#166534] mt-3 group-hover:translate-x-0.5 transition-transform">
                  <span>{isHi ? "सहायता लें" : "Get Support"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Seasonal Disease Alerts Feed */}
          <div className="bg-white border border-[#DCE8DD] rounded-3xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3 className="font-extrabold text-base text-[#163020]">
                  {isHi ? "वर्तमान मौसम में मुख्य फसल रोग अलर्ट" : "Seasonal Crop Disease Alerts"}
                </h3>
              </div>
              <span className="text-xs text-[#64748B]">
                {isHi ? "रबी / जायद सीजन" : "Current Season"}
              </span>
            </div>

            <div className="space-y-3">
              {SAMPLE_CROPS.slice(0, 3).map((crop) => (
                <div
                  key={crop.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#F8FAF5] hover:bg-white border border-[#DCE8DD] hover:border-[#22C55E] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={crop.sampleImage}
                      alt={crop.cropName_en}
                      className="w-12 h-12 rounded-xl object-cover border border-[#DCE8DD] shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-[#163020]">
                          {isHi ? crop.cropName_hi : crop.cropName_en}
                        </h4>
                        <span className="text-xs text-[#64748B]">·</span>
                        <span className="text-xs text-amber-700 font-medium">
                          {crop.severity} Risk
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">
                        {isHi ? crop.issueName_hi : crop.issueName_en}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCropIssue(crop);
                        onNavigateTab("scanner");
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold transition-transform active:scale-95 cursor-pointer"
                    >
                      {isHi ? "निदान देखें" : "Diagnose"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCropIssue(crop);
                        onNavigateTab("voice-doctor");
                      }}
                      className="p-1.5 rounded-xl bg-white hover:bg-[#F8FAF5] border border-[#DCE8DD] text-[#166534] transition-colors cursor-pointer"
                      title={isHi ? "वॉइस डॉक्टर से सुनें" : "Listen to Advice"}
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Live Mandi Snapshot & Active Diagnosis */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Diagnostic Status Box */}
          <div className="bg-white border border-[#DCE8DD] rounded-3xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-sm text-[#163020]">
                {isHi ? "सक्रिय फसल निदान" : "Active Diagnosis"}
              </h3>
              {detectedCrop && (
                <button
                  type="button"
                  onClick={onOpenReportModal}
                  className="text-xs text-[#166534] font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>{isHi ? "पर्ची देखें" : "View Rx"}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>

            {detectedCrop ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={detectedCrop.sampleImage}
                    alt={detectedCrop.cropName_en}
                    className="w-14 h-14 rounded-2xl object-cover border border-[#DCE8DD] shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#163020]">
                      {isHi ? detectedCrop.cropName_hi : detectedCrop.cropName_en}
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">
                      {isHi ? detectedCrop.issueName_hi : detectedCrop.issueName_en}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-[#64748B] mt-1 font-mono tabular-nums">
                      <span>Conf: {detectedCrop.confidenceScore}%</span>
                      <span>·</span>
                      <span className="text-[#166534] font-semibold">Active Prescription</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DCE8DD] flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">
                    {isHi ? "उपचार चरण:" : "Steps:"}{" "}
                    <strong className="text-[#163020]">{detectedCrop.steps.length} Actions</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigateTab("scanner")}
                    className="text-xs font-bold text-[#166534] hover:text-[#14532d] flex items-center gap-1"
                  >
                    <span>{isHi ? "उपचार देखें" : "View Steps"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-[#64748B]">
                <p>{isHi ? "अभी कोई फसल स्कैन नहीं है" : "No active diagnosis scanned yet"}</p>
                <button
                  type="button"
                  onClick={onStartScan}
                  className="mt-2 text-xs font-bold text-[#166534] underline"
                >
                  {isHi ? "पहला स्कैन शुरू करें" : "Start your first scan"}
                </button>
              </div>
            )}
          </div>

          {/* Live Mandi Rate Ticker Preview */}
          <div className="bg-white border border-[#DCE8DD] rounded-3xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#166534]" />
                <h3 className="font-extrabold text-sm text-[#163020]">
                  {isHi ? "आज के प्रमुख मंडी भाव" : "Today's Mandi Bhav"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab("mandi-rates")}
                className="text-xs text-[#166534] font-bold hover:underline cursor-pointer"
              >
                {isHi ? "सभी देखें" : "View all"}
              </button>
            </div>

            <div className="divide-y divide-[#DCE8DD] text-xs">
              {REAL_MANDI_PRICES.slice(0, 4).map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#163020] block">
                      {isHi ? item.commodity_hi : item.commodity_en}
                    </span>
                    <span className="text-[11px] text-[#64748B] block">{item.market_hi}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-[#166534] font-mono tabular-nums block">
                      ₹{item.modalPrice.toLocaleString("en-IN")}/क्विं.
                    </span>
                    <span
                      className={`text-[10px] font-semibold font-mono tabular-nums ${
                        item.trend === "up"
                          ? "text-emerald-700"
                          : item.trend === "down"
                          ? "text-rose-700"
                          : "text-slate-600"
                      }`}
                    >
                      {item.priceChange > 0 ? `+₹${item.priceChange}` : item.priceChange < 0 ? `-₹${Math.abs(item.priceChange)}` : "स्थिर"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
