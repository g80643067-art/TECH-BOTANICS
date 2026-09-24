import React from "react";
import {
  LayoutDashboard,
  ScanLine,
  Mic,
  Sprout,
  TrendingUp,
  PhoneCall,
  FileText,
} from "lucide-react";
import { Language } from "../types";

export type DashboardTab =
  | "overview"
  | "scanner"
  | "voice-doctor"
  | "soil-health"
  | "mandi-rates"
  | "kisan-helpline"
  | "reports";

interface DashboardNavProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  language: Language;
}

export const DashboardNav: React.FC<DashboardNavProps> = ({
  activeTab,
  onSelectTab,
  language,
}) => {
  const isHi = language === "hi";

  const tabs: { id: DashboardTab; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: "overview",
      label: isHi ? "समग्र डैशबोर्ड" : "Overview",
      icon: <LayoutDashboard className="w-4 h-4" />,
      desc: isHi ? "मौसम व सारांश" : "Summary & Feed",
    },
    {
      id: "scanner",
      label: isHi ? "फसल रोग स्कैनर" : "Crop Scanner",
      icon: <ScanLine className="w-4 h-4" />,
      desc: isHi ? "7-चरणीय निदान" : "7-Step AI Diagnostic",
    },
    {
      id: "voice-doctor",
      label: isHi ? "वॉइस डॉक्टर" : "Voice Doctor",
      icon: <Mic className="w-4 h-4" />,
      desc: isHi ? "बोलकर सलाह लें" : "Speech Advisor",
    },
    {
      id: "soil-health",
      label: isHi ? "मृदा व खाद प्रबंधन" : "Soil & Nutrients",
      icon: <Sprout className="w-4 h-4" />,
      desc: isHi ? "खाद मात्रा कैलकुलेटर" : "N-P-K Calculator",
    },
    {
      id: "mandi-rates",
      label: isHi ? "मंडी भाव" : "Mandi Rates",
      icon: <TrendingUp className="w-4 h-4" />,
      desc: isHi ? "दैनिक बाजार दरें" : "APMC Live Prices",
    },
    {
      id: "kisan-helpline",
      label: isHi ? "किसान सहायता" : "Helpline & KVK",
      icon: <PhoneCall className="w-4 h-4" />,
      desc: isHi ? "1800-180-1551" : "Expert Callback",
    },
    {
      id: "reports",
      label: isHi ? "निदान पर्ची" : "Prescriptions",
      icon: <FileText className="w-4 h-4" />,
      desc: isHi ? "डॉक्टर रिपोर्ट" : "Certificates & PDF",
    },
  ];

  return (
    <nav
      aria-label="Dashboard navigation"
      className="bg-white border-b border-[#DCE8DD] sticky top-[57px] z-30 shadow-2xs"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 no-scrollbar scroll-smooth">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`group shrink-0 inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer select-none ${
                  isActive
                    ? "bg-[#166534] text-white shadow-xs font-bold"
                    : "text-[#163020] hover:text-[#166534] hover:bg-[#F8FAF5] border border-transparent"
                }`}
                id={`dashboard-tab-${tab.id}`}
              >
                <span
                  className={`${
                    isActive ? "text-[#22C55E]" : "text-[#64748B] group-hover:text-[#166534]"
                  }`}
                >
                  {tab.icon}
                </span>
                <div className="text-left leading-tight">
                  <span className="block">{tab.label}</span>
                  <span
                    className={`hidden lg:block text-[10px] font-normal leading-none mt-0.5 ${
                      isActive ? "text-[#86EFAC]" : "text-[#64748B]"
                    }`}
                  >
                    {tab.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
