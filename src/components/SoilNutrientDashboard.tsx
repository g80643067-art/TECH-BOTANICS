import React, { useState } from "react";
import {
  Sprout,
  Calculator,
  Droplets,
  Layers,
  Leaf,
  CheckCircle2,
  Info,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Language, SoilOption } from "../types";
import { SOIL_OPTIONS } from "../data/soilTypes";

interface SoilNutrientDashboardProps {
  language: Language;
  selectedSoil: SoilOption | null;
  onSelectSoil: (soil: SoilOption) => void;
  onContinueToScan?: () => void;
}

export const SoilNutrientDashboard: React.FC<SoilNutrientDashboardProps> = ({
  language,
  selectedSoil,
  onSelectSoil,
  onContinueToScan,
}) => {
  const isHi = language === "hi";

  const [activeSoil, setActiveSoil] = useState<SoilOption>(selectedSoil || SOIL_OPTIONS[0]);
  const [cropType, setCropType] = useState<string>("mustard");
  const [acres, setAcres] = useState<number>(2);

  // Nutrient Recommendations based on crop & acre calculation
  const getFertilizerCalculations = (crop: string, area: number) => {
    switch (crop) {
      case "wheat":
        return {
          urea: Math.round(area * 2.5), // 50kg bags
          dap: Math.round(area * 1.0),
          mop: Math.round(area * 0.5),
          zinc: Math.round(area * 5), // kg
          fym: Math.round(area * 4), // Tonnes
          npkRatio: "120:60:40 kg/ha",
          basalDose_hi: "बुवाई के समय: 1 बैग DAP + आधा बैग MOP + 5 किग्रा जिंक सल्फेट प्रति एकड़।",
          basalDose_en: "At Sowing: 1 Bag DAP + 0.5 Bag MOP + 5 kg Zinc Sulphate per acre.",
          topDress_hi: "प्रथम व द्वितीय सिंचाई (21 व 45 दिन) पर 1-1 बैग यूरिया डालें।",
          topDress_en: "At 1st & 2nd Irrigation (21 & 45 days): 1 bag Urea each.",
        };
      case "mustard":
        return {
          urea: Math.round(area * 1.5),
          dap: Math.round(area * 0.8),
          mop: Math.round(area * 0.3),
          zinc: Math.round(area * 4),
          fym: Math.round(area * 3),
          npkRatio: "80:40:20 kg/ha + 20 kg Sulphur",
          basalDose_hi: "बुवाई पर: 35 किग्रा DAP + 15 किग्रा पोटाश + 10 किग्रा सल्फर 90% प्रति एकड़।",
          basalDose_en: "At Sowing: 35 kg DAP + 15 kg Potash + 10 kg Sulphur 90% per acre.",
          topDress_hi: "पहली सिंचाई (फूल आने से पूर्व) पर 35 किग्रा यूरिया प्रति एकड़ छिड़कें।",
          topDress_en: "At 1st Irrigation (pre-flowering): 35 kg Urea per acre.",
        };
      case "paddy":
        return {
          urea: Math.round(area * 3.0),
          dap: Math.round(area * 1.2),
          mop: Math.round(area * 0.8),
          zinc: Math.round(area * 8),
          fym: Math.round(area * 5),
          npkRatio: "120:60:60 kg/ha",
          basalDose_hi: "रोपाई के समय: पूरा DAP + आधा MOP + 8 किग्रा जिंक सल्फेट 33% प्रति एकड़।",
          basalDose_en: "At Transplanting: Full DAP + 0.5 MOP + 8 kg Zinc 33% per acre.",
          topDress_hi: "कल्ले फूटते समय व बाली बनते समय 1-1 बैग यूरिया का भुरकाव करें।",
          topDress_en: "At Tillering & Panicle Initiation: Top-dress 1 bag Urea each.",
        };
      default:
        return {
          urea: Math.round(area * 2.0),
          dap: Math.round(area * 1.0),
          mop: Math.round(area * 0.5),
          zinc: Math.round(area * 5),
          fym: Math.round(area * 4),
          npkRatio: "100:50:50 kg/ha",
          basalDose_hi: "बुवाई के समय संतुलित NPK खाद दें।",
          basalDose_en: "Apply balanced NPK at sowing.",
          topDress_hi: "सिंचाई के साथ यूरिया का भुरकाव करें।",
          topDress_en: "Top-dress nitrogen with scheduled irrigations.",
        };
    }
  };

  const calc = getFertilizerCalculations(cropType, acres);

  const handleSelectSoilOption = (soil: SoilOption) => {
    setActiveSoil(soil);
    onSelectSoil(soil);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white border border-[#DCE8DD] rounded-3xl p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#166534] font-semibold mb-1">
              <Sprout className="w-4 h-4 text-[#22C55E]" />
              <span>{isHi ? "वैज्ञानिक मृदा स्वास्थ्य एवं खाद प्रबंधन" : "Soil Health & Nutrient Management"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#163020]">
              {isHi ? "मृदा प्रकार व उर्वरक कैलकुलेटर" : "Soil Profiler & N-P-K Fertilizer Calculator"}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl">
              {isHi
                ? "अपनी मिट्टी की बनावट चुनें और अपनी फसल व रकबे (एकड़) के अनुसार खाद की सटीक मात्रा जानें।"
                : "Select soil texture and calculate precise fertilizer bag requirements based on crop type and acreage."}
            </p>
          </div>

          {onContinueToScan && (
            <button
              type="button"
              onClick={onContinueToScan}
              className="inline-flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs transition-transform active:scale-98 cursor-pointer shrink-0"
            >
              <span>{isHi ? "फसल स्कैन पर जाएं" : "Go to Crop Scan"}</span>
              <ArrowRight className="w-4 h-4 text-[#22C55E]" />
            </button>
          )}
        </div>
      </div>

      {/* Grid: Soil Selector & Fertilizer Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (5 cols): Soil Type Selector */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#DCE8DD] rounded-3xl p-5 shadow-2xs">
            <h3 className="font-extrabold text-sm text-[#163020] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#166534]" />
              <span>{isHi ? "खेत की मिट्टी का प्रकार चुनें" : "Select Soil Type"}</span>
            </h3>

            <div className="space-y-2.5">
              {SOIL_OPTIONS.map((soil) => {
                const isSelected = activeSoil.id === soil.id;
                return (
                  <div
                    key={soil.id}
                    onClick={() => handleSelectSoilOption(soil)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                      isSelected
                        ? "bg-[#F8FAF5] border-[#166534] shadow-xs"
                        : "bg-white border-[#DCE8DD] hover:border-[#22C55E]/60 hover:bg-[#F8FAF5]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{soil.emoji}</span>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-[#163020]">
                            {isHi ? soil.name_hi : soil.name_en}
                          </h4>
                          <p className="text-[11px] text-[#64748B] line-clamp-1 mt-0.5">
                            {isHi ? soil.description_hi : soil.description_en}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-[#166534] shrink-0" />
                      )}
                    </div>

                    {isSelected && (
                      <div className="mt-3 pt-2.5 border-t border-[#DCE8DD] flex flex-wrap gap-2 text-[10px] text-[#166534] font-medium">
                        {soil.characteristics.map((c, i) => (
                          <span key={i} className="bg-white px-2 py-0.5 rounded-md border border-[#DCE8DD]">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right (7 cols): Fertilizer Calculator & Recommendation Cards */}
        <div className="lg:col-span-7 space-y-6">
          {/* Interactive Calculator Card */}
          <div className="bg-white border border-[#DCE8DD] rounded-3xl p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#166534]" />
                <h3 className="font-extrabold text-base text-[#163020]">
                  {isHi ? "उर्वरक मात्रा कैलकुलेटर" : "Fertilizer Requirement Calculator"}
                </h3>
              </div>
              <span className="text-xs text-[#64748B] font-mono tabular-nums">
                NPK: {calc.npkRatio}
              </span>
            </div>

            {/* Inputs: Crop & Acreage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs font-bold text-[#163020] mb-1.5">
                  {isHi ? "फसल चुनें" : "Select Crop"}
                </label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full bg-[#F8FAF5] border border-[#DCE8DD] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163020] focus:outline-none focus:border-[#166534]"
                >
                  <option value="mustard">सरसों / राई (Mustard)</option>
                  <option value="wheat">गेहूं / कनक (Wheat)</option>
                  <option value="paddy">धान / चावल (Paddy)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#163020] mb-1.5">
                  {isHi ? `खेत का रकबा: ${acres} एकड़` : `Farm Area: ${acres} Acres`}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={acres}
                    onChange={(e) => setAcres(Number(e.target.value))}
                    className="w-full accent-[#166534] cursor-pointer"
                  />
                  <span className="w-12 text-center text-xs font-bold font-mono tabular-nums bg-[#F8FAF5] py-2 rounded-xl border border-[#DCE8DD]">
                    {acres} Ac
                  </span>
                </div>
              </div>
            </div>

            {/* Calculated Fertilizer Bag Badges (Tabular numerals, clean layout) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#DCE8DD]">
              <div className="bg-[#F8FAF5] rounded-2xl p-3 text-center border border-[#DCE8DD]">
                <p className="text-[11px] text-[#64748B] font-semibold">यूरिया (Urea)</p>
                <p className="text-xl font-black text-[#166534] font-mono tabular-nums mt-1">
                  {calc.urea} <span className="text-xs font-normal">बैग</span>
                </p>
                <p className="text-[10px] text-[#64748B] mt-0.5">45 किग्रा बैग</p>
              </div>

              <div className="bg-[#F8FAF5] rounded-2xl p-3 text-center border border-[#DCE8DD]">
                <p className="text-[11px] text-[#64748B] font-semibold">डीएपी (DAP)</p>
                <p className="text-xl font-black text-[#166534] font-mono tabular-nums mt-1">
                  {calc.dap} <span className="text-xs font-normal">बैग</span>
                </p>
                <p className="text-[10px] text-[#64748B] mt-0.5">50 किग्रा बैग</p>
              </div>

              <div className="bg-[#F8FAF5] rounded-2xl p-3 text-center border border-[#DCE8DD]">
                <p className="text-[11px] text-[#64748B] font-semibold">पोटाश (MOP)</p>
                <p className="text-xl font-black text-[#166534] font-mono tabular-nums mt-1">
                  {calc.mop} <span className="text-xs font-normal">बैग</span>
                </p>
                <p className="text-[10px] text-[#64748B] mt-0.5">50 किग्रा बैग</p>
              </div>

              <div className="bg-[#F8FAF5] rounded-2xl p-3 text-center border border-[#DCE8DD]">
                <p className="text-[11px] text-[#64748B] font-semibold">जिंक सल्फेट</p>
                <p className="text-xl font-black text-[#166534] font-mono tabular-nums mt-1">
                  {calc.zinc} <span className="text-xs font-normal">किग्रा</span>
                </p>
                <p className="text-[10px] text-[#64748B] mt-0.5">33% या 21%</p>
              </div>
            </div>

            {/* Application Timetable & Schedule */}
            <div className="mt-5 bg-[#166534]/5 rounded-2xl p-4 border border-[#166534]/15 space-y-2 text-xs">
              <div className="flex items-start gap-2 text-[#163020]">
                <span className="font-bold text-[#166534] shrink-0">1. बेसल डोज:</span>
                <span>{isHi ? calc.basalDose_hi : calc.basalDose_en}</span>
              </div>
              <div className="flex items-start gap-2 text-[#163020]">
                <span className="font-bold text-[#166534] shrink-0">2. टॉप ड्रेसिंग:</span>
                <span>{isHi ? calc.topDress_hi : calc.topDress_en}</span>
              </div>
            </div>
          </div>

          {/* Organic Soil Amendments & Microbial Booster */}
          <div className="bg-white border border-[#DCE8DD] rounded-3xl p-5 shadow-2xs">
            <h3 className="font-extrabold text-sm text-[#163020] mb-3 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#22C55E]" />
              <span>{isHi ? "जैविक सुधारक व सूक्ष्म पोषक तत्व" : "Organic Soil Conditioners"}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F8FAF5] border border-[#DCE8DD]">
                <h4 className="font-bold text-[#163020]">{isHi ? "देसी गोबर खाद (FYM)" : "Well-Rotted Farmyard Manure"}</h4>
                <p className="text-[#64748B] mt-1 font-mono tabular-nums">
                  {calc.fym} {isHi ? "ट्रॉली / टन प्रति" : "Tonnes for"} {acres} {isHi ? "एकड़" : "Acres"}
                </p>
                <p className="text-[11px] text-[#166534] mt-1 font-semibold">
                  {isHi ? "मृदा में जीवांश (Organic Carbon) बढ़ाता है" : "Increases soil organic carbon & water retention"}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAF5] border border-[#DCE8DD]">
                <h4 className="font-bold text-[#163020]">{isHi ? "ट्राइकोडर्मा विरिडी (Trichoderma)" : "Trichoderma Bio-Fungicide"}</h4>
                <p className="text-[#64748B] mt-1 font-mono tabular-nums">
                  {acres * 2} {isHi ? "किग्रा (गोबर खाद में मिलाकर)" : "kg mixed with FYM"}
                </p>
                <p className="text-[11px] text-[#163020] mt-1">
                  {isHi ? "जड़ गलन, उकठा (Wilt) व फंगस से सुरक्षा" : "Prevents soil-borne wilt, collar rot & root nematodes"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
