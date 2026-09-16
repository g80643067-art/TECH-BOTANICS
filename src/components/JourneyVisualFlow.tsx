import React from "react";
import {
  Globe,
  Camera,
  MapPin,
  Trees,
  Search,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  ArrowDown,
  Sparkles,
} from "lucide-react";
import { Language, StepNumber } from "../types";

interface JourneyVisualFlowProps {
  language: Language;
  currentStep: StepNumber;
  onSelectStep?: (step: StepNumber) => void;
}

export const JourneyVisualFlow: React.FC<JourneyVisualFlowProps> = ({
  language,
  currentStep,
  onSelectStep,
}) => {
  const isHi = language === "hi";

  const nodes = [
    {
      step: 1 as StepNumber,
      icon: <Globe className="w-4 h-4" />,
      label_en: "LANGUAGE",
      label_hi: "भाषा चयन",
      desc_en: "Hindi / English",
      desc_hi: "हिन्दी / अंग्रेज़ी",
      color: "from-blue-600 to-indigo-700",
    },
    {
      step: 2 as StepNumber,
      icon: <Camera className="w-4 h-4" />,
      label_en: "SCAN CROP",
      label_hi: "फसल स्कैन",
      desc_en: "Photo / Upload",
      desc_hi: "कैमरा / फोटो",
      color: "from-emerald-600 to-teal-700",
    },
    {
      step: 3 as StepNumber,
      icon: <MapPin className="w-4 h-4" />,
      label_en: "LOCATION",
      label_hi: "खेत का स्थान",
      desc_en: "Agro-climatic zone",
      desc_hi: "जलवायु क्षेत्र",
      color: "from-amber-600 to-orange-700",
    },
    {
      step: 4 as StepNumber,
      icon: <Trees className="w-4 h-4" />,
      label_en: "SOIL TYPE",
      label_hi: "मिट्टी का प्रकार",
      desc_en: "6 Soils or AI Quiz",
      desc_hi: "6 मिट्टी व पहचान",
      color: "from-yellow-700 to-amber-900",
    },
    {
      step: 5 as StepNumber,
      icon: <Search className="w-4 h-4" />,
      label_en: "ISSUE DETECTION",
      label_hi: "रोग पहचान",
      desc_en: "Severity & Cause",
      desc_hi: "गंभीरता व कारण",
      color: "from-rose-600 to-red-700",
    },
    {
      step: 6 as StepNumber,
      icon: <CheckCircle2 className="w-4 h-4" />,
      label_en: "RESOLUTION",
      label_hi: "उपचार समाधान",
      desc_en: "4-Step Action Plan",
      desc_hi: "4-चरणीय कार्ययोजना",
      color: "from-emerald-600 to-green-700",
    },
    {
      step: 7 as StepNumber,
      icon: <PhoneCall className="w-4 h-4" />,
      label_en: "EXPERT HELP",
      label_hi: "विशेषज्ञ सहायता",
      desc_en: "Call & WhatsApp",
      desc_hi: "कॉल व व्हाट्सएप",
      color: "from-indigo-600 to-purple-800",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 text-white rounded-2xl p-4 sm:p-6 shadow-md border border-emerald-800/40 relative overflow-hidden my-4">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold tracking-wide uppercase text-emerald-300">
                {isHi ? "कृषिसेतु एआई पारदर्शी कार्यप्रवाह" : "KRISHISETU AI End-to-End Visual Flow"}
              </h3>
            </div>
            <p className="text-xs text-stone-300">
              {isHi
                ? "सरल 1-पथ निर्देशित किसान अनुभव — बिना किसी जटिल डैशबोर्ड के"
                : "One simple guided journey from leaf scan to tailored resolution or expert escalation"}
            </p>
          </div>
          <span className="text-[11px] font-semibold bg-white/10 text-emerald-200 px-2.5 py-1 rounded-full border border-white/10 self-start sm:self-auto">
            {isHi ? "7 सरल चरण" : "7 Guided Steps"}
          </span>
        </div>

        {/* Responsive Pipeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {nodes.map((node, index) => {
            const isActive = currentStep === node.step;
            const isCompleted = currentStep > node.step;

            return (
              <div
                key={node.step}
                onClick={() => onSelectStep && node.step <= currentStep && onSelectStep(node.step)}
                className={`relative flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-200 ${
                  isActive
                    ? "bg-white text-stone-900 border-emerald-400 ring-2 ring-emerald-400/80 shadow-lg scale-102"
                    : isCompleted
                    ? "bg-white/10 text-emerald-100 border-emerald-500/30 hover:bg-white/15 cursor-pointer"
                    : "bg-white/5 text-stone-400 border-white/5 opacity-60"
                }`}
                id={`visual-flow-node-${node.step}`}
              >
                {/* Step badge */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 font-bold text-xs ${
                    isActive
                      ? "bg-emerald-700 text-white shadow-xs"
                      : isCompleted
                      ? "bg-emerald-400/20 text-emerald-300"
                      : "bg-white/10 text-stone-300"
                  }`}
                >
                  {node.icon}
                </div>

                <div className="text-[11px] font-extrabold tracking-tight">
                  {isHi ? node.label_hi : node.label_en}
                </div>
                <div className={`text-[10px] mt-0.5 line-clamp-1 ${isActive ? "text-stone-600" : "text-stone-300"}`}>
                  {isHi ? node.desc_hi : node.desc_en}
                </div>

                {/* Arrow connector on mobile/desktop */}
                {index < nodes.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-emerald-400/60 text-xs">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
