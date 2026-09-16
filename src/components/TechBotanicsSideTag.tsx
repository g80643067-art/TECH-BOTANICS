import React, { useState } from "react";
import {
  Leaf,
  Sparkles,
  ShieldCheck,
  Cpu,
  ChevronRight,
  X,
  ExternalLink,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { Language } from "../types";

interface TechBotanicsSideTagProps {
  language?: Language;
}

export const TechBotanicsSideTag: React.FC<TechBotanicsSideTagProps> = ({
  language = "en",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isHi = language === "hi";

  return (
    <>
      {/* Pinned Side Tag on the Viewport Edge */}
      <aside
        aria-label="TechBotanics information"
        className="fixed left-0 top-1/2 -translate-y-1/2 z-35 select-none print:hidden"
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          id="btn-techbotanics-side-tag"
          className={`group flex items-center gap-2.5 bg-gradient-to-r from-stone-900 via-stone-900 to-emerald-950 text-white pl-2.5 pr-3.5 py-2.5 sm:py-3 rounded-r-2xl border-y border-r border-emerald-500/40 shadow-xl shadow-stone-950/25 transition-all duration-300 cursor-pointer ${
            isHovered ? "translate-x-0.5 border-emerald-400 bg-emerald-950" : ""
          } hover:shadow-emerald-900/20`}
          title="Powered by TechBotanics - Click to learn more"
        >
          {/* Glowing Botanical Icon Badge */}
          <div className="relative flex items-center justify-center w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-xs group-hover:scale-110 transition-transform">
            <Leaf className="w-4 h-4 text-emerald-100" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
          </div>

          {/* Text Labels */}
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-emerald-400/90 flex items-center gap-1">
              <span>Powered by</span>
              <Sparkles className="w-2.5 h-2.5 text-emerald-300" />
            </span>
            <span className="text-xs sm:text-sm font-black tracking-tight text-white group-hover:text-emerald-200 transition-colors">
              TechBotanics
            </span>
          </div>

          {/* Right Indicator Arrow */}
          <ChevronRight
            className={`w-3.5 h-3.5 text-emerald-400/70 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </aside>

      {/* Popover / Drawer when side tag is clicked */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-start p-4 sm:p-6 bg-stone-950/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden animate-in slide-in-from-left duration-250"
            id="techbotanics-info-modal"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-stone-950 via-emerald-950 to-stone-900 text-white p-5 sm:p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Cpu className="w-3 h-3 text-emerald-400" /> Botanical AI Suite
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  id="btn-close-techbotanics-modal"
                  className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50 shrink-0">
                  <Leaf className="w-7 h-7 text-emerald-100" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                    TechBotanics
                  </h3>
                  <p className="text-xs text-emerald-300/90 font-medium">
                    {isHi
                      ? "कृषि वानस्पतिक बुद्धिमत्ता एवं पादप रोग निदान प्रणाली"
                      : "Next-Gen Agricultural Intelligence & Phytopathology"}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs text-stone-600">
              <p className="text-stone-700 leading-relaxed">
                {isHi
                  ? "कृषिसेतु एआई (KrishiSetu AI) को TechBotanics के वनस्पति अनुसंधान मॉडल और एआई विज़न एल्गोरिदम द्वारा संचालित किया जाता है। यह फसल की पत्तियों, पुष्प संरचना और लक्षणों का सटीक विश्लेषण करता है।"
                  : "KrishiSetu AI is powered by TechBotanics' botanical intelligence engine. It combines computer vision, phytopathology algorithms, and agro-climatic indexing to help farmers detect crop issues accurately."}
              </p>

              {/* Core Features / Capabilities */}
              <div className="space-y-2.5 pt-2">
                <h4 className="font-extrabold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {isHi ? "मुख्य तकनीकी विशेषताएं" : "Core Agricultural Capabilities"}
                </h4>

                <div className="grid grid-cols-1 gap-2">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-900 block">
                        {isHi ? "वानस्पतिक पत्ती आकार व शिरा विश्लेषण" : "Botanical Leaf & Vein Morphology"}
                      </span>
                      <span className="text-[11px] text-stone-600">
                        {isHi
                          ? "पत्तियों के आकार, शिरा विन्यास और तने की विशेषताओं से फसल की प्रजाति की सही पहचान।"
                          : "Extracts leaf arrangement, venation patterns, and stem architecture to recognize plant species."}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-900 block">
                        {isHi ? "पादप रोग लक्षण विज्ञान (Phytopathology)" : "Phytopathology & Pathogen Detection"}
                      </span>
                      <span className="text-[11px] text-stone-600">
                        {isHi
                          ? "फंगल, बैक्टीरियल व कीट संक्रमण के शुरुआती निशानों का सटीक वर्गीकरण।"
                          : "Differentiates fungal spores, bacterial blights, viral mosaics, and pest damage."}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-900 block">
                        {isHi ? "जलवायु व मिट्टी का समग्र समन्वय" : "Agro-Climatic & Soil Synergy"}
                      </span>
                      <span className="text-[11px] text-stone-600">
                        {isHi
                          ? "स्थानिक मौसम और मिट्टी के प्रकार को जोड़कर सबसे सुरक्षित उपचार की सिफारिश।"
                          : "Correlates regional temperature, humidity, and soil type for localized agronomic advice."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engine Status Banner */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-700" />
                  <span className="font-bold text-xs">
                    {isHi ? "इंजन स्थिति: सक्रिय व सत्यापित" : "Engine Status: Active & Verified"}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-[10px]">
                  v3.8 Flash
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <span className="text-[11px] text-stone-500 font-semibold">
                TechBotanics Agricultural Systems
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {isHi ? "समझ गया" : "Got it"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
