import React, { useState } from "react";
import {
  TrendingUp,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Info,
  Calendar,
  Building2,
  BadgePercent,
  CheckCircle,
} from "lucide-react";
import { Language } from "../types";
import { MandiItem, REAL_MANDI_PRICES } from "../data/mandiData";

interface MandiMarketDashboardProps {
  language: Language;
}

export const MandiMarketDashboard: React.FC<MandiMarketDashboardProps> = ({ language }) => {
  const isHi = language === "hi";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const states = [
    { id: "all", name_hi: "सभी राज्य (All India)", name_en: "All States" },
    { id: "Rajasthan", name_hi: "राजस्थान", name_en: "Rajasthan" },
    { id: "Madhya Pradesh", name_hi: "मध्य प्रदेश", name_en: "Madhya Pradesh" },
    { id: "Haryana", name_hi: "हरियाणा", name_en: "Haryana" },
    { id: "Uttar Pradesh", name_hi: "उत्तर प्रदेश", name_en: "Uttar Pradesh" },
    { id: "Gujarat", name_hi: "गुजरात", name_en: "Gujarat" },
    { id: "Maharashtra", name_hi: "महाराष्ट्र", name_en: "Maharashtra" },
    { id: "Bihar", name_hi: "बिहार", name_en: "Bihar" },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const filteredPrices = REAL_MANDI_PRICES.filter((item) => {
    const matchesSearch =
      item.commodity_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.commodity_hi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.market_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.market_hi.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState = selectedState === "all" || item.state === selectedState;

    return matchesSearch && matchesState;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Market Summary Banner */}
      <div className="bg-white border border-[#DCE8DD] rounded-3xl p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#166534] font-semibold mb-1">
              <TrendingUp className="w-4 h-4 text-[#22C55E]" />
              <span>{isHi ? "ई-राष्ट्रीय कृषि बाजार (e-NAM) व APMC लाइव डेटा" : "e-NAM & Live APMC Market Intelligence"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#163020]">
              {isHi ? "दैनिक मंडी भाव व बाजार विश्लेषण" : "Daily APMC Mandi Rates & Market Trends"}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl">
              {isHi
                ? "देशभर की प्रमुख कृषि उपज मंडियों से रबी व खरीफ फसलों के न्यूनतम, उच्चतम व मॉडल भाव।"
                : "Real-time modal, min, and max arrival prices with official MSP benchmark comparisons across Indian APMC markets."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F8FAF5] hover:bg-[#DCE8DD]/40 border border-[#DCE8DD] text-[#163020] text-xs font-bold transition-all cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#166534] ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isHi ? "भाव रीफ्रेश करें" : "Refresh Rates"}</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-5 pt-5 border-t border-[#DCE8DD] flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isHi ? "फसल या मंडी का नाम खोजें (उदा. सरसों, गेहूं, आगरा)..." : "Search crop or mandi (e.g. Mustard, Wheat, Karnal)..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F8FAF5] border border-[#DCE8DD] rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-[#163020] focus:outline-none focus:border-[#166534]"
            />
          </div>

          <div className="w-full sm:w-auto">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full sm:w-48 bg-[#F8FAF5] border border-[#DCE8DD] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163020] focus:outline-none focus:border-[#166534]"
            >
              {states.map((st) => (
                <option key={st.id} value={st.id}>
                  {isHi ? st.name_hi : st.name_en}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mandi Rates Table Card */}
      <div className="bg-white border border-[#DCE8DD] rounded-3xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[#F8FAF5] border-b border-[#DCE8DD] text-[#64748B] font-semibold text-xs">
                <th className="py-3.5 px-4 sm:px-6">{isHi ? "फसल व किस्म" : "Commodity / Variety"}</th>
                <th className="py-3.5 px-4">{isHi ? "मंडी व राज्य" : "Mandi & State"}</th>
                <th className="py-3.5 px-4 text-right">{isHi ? "मॉडल भाव (Modal)" : "Modal Price"}</th>
                <th className="py-3.5 px-4 text-right hidden md:table-cell">{isHi ? "न्यूनतम - अधिकतम" : "Min - Max"}</th>
                <th className="py-3.5 px-4 text-right hidden lg:table-cell">{isHi ? "सरकारी MSP" : "Govt MSP"}</th>
                <th className="py-3.5 px-4 text-right">{isHi ? "दैनिक बदलाव" : "24h Trend"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE8DD]">
              {filteredPrices.length > 0 ? (
                filteredPrices.map((item) => {
                  const isAboveMsp = item.modalPrice >= item.msp;
                  return (
                    <tr key={item.id} className="hover:bg-[#F8FAF5]/70 transition-colors">
                      {/* Commodity Name */}
                      <td className="py-4 px-4 sm:px-6">
                        <span className="font-extrabold text-[#163020] block text-sm">
                          {isHi ? item.commodity_hi : item.commodity_en}
                        </span>
                        <span className="text-xs text-[#64748B] block mt-0.5">
                          {isHi ? item.variety_hi : item.variety_en}
                        </span>
                      </td>

                      {/* Mandi & State */}
                      <td className="py-4 px-4">
                        <span className="font-bold text-[#163020] block">
                          {isHi ? item.market_hi : item.market_en}
                        </span>
                        <span className="text-xs text-[#64748B] block mt-0.5">
                          {item.district}, {item.state}
                        </span>
                      </td>

                      {/* Modal Price */}
                      <td className="py-4 px-4 text-right">
                        <span className="font-black text-sm sm:text-base text-[#166534] font-mono tabular-nums block">
                          ₹{item.modalPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[11px] text-[#64748B] block">प्रति क्विंटल</span>
                      </td>

                      {/* Min - Max */}
                      <td className="py-4 px-4 text-right hidden md:table-cell">
                        <span className="font-medium text-[#163020] font-mono tabular-nums block text-xs">
                          ₹{item.minPrice.toLocaleString("en-IN")} – ₹{item.maxPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[11px] text-[#64748B] block">आवक: {item.arrivalTonnes} टन</span>
                      </td>

                      {/* Govt MSP */}
                      <td className="py-4 px-4 text-right hidden lg:table-cell">
                        <span className="font-mono tabular-nums text-xs text-[#64748B] block">
                          ₹{item.msp.toLocaleString("en-IN")}
                        </span>
                        <span
                          className={`text-[10px] font-semibold block ${
                            isAboveMsp ? "text-emerald-700" : "text-amber-700"
                          }`}
                        >
                          {isAboveMsp ? "MSP से ऊपर" : "MSP के पास"}
                        </span>
                      </td>

                      {/* Price Trend */}
                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex items-center gap-1 font-mono tabular-nums font-bold text-xs">
                          {item.trend === "up" ? (
                            <span className="text-emerald-700 flex items-center">
                              <ArrowUpRight className="w-4 h-4" />
                              +₹{item.priceChange}
                            </span>
                          ) : item.trend === "down" ? (
                            <span className="text-rose-700 flex items-center">
                              <ArrowDownRight className="w-4 h-4" />
                              -₹{Math.abs(item.priceChange)}
                            </span>
                          ) : (
                            <span className="text-slate-600">स्थिर</span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#64748B] block mt-0.5">{item.lastUpdated}</span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-[#64748B]">
                    {isHi ? "कोई मंडी भाव नहीं मिला। कृपया खोज शब्द बदलें।" : "No mandi records matching your search."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agronomic Selling Intelligence Tip */}
      <div className="bg-[#166534]/5 border border-[#166534]/20 rounded-3xl p-5 flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-xl bg-[#166534] text-white flex items-center justify-center shrink-0">
          <Info className="w-4 h-4 text-[#22C55E]" />
        </div>
        <div className="text-xs text-[#163020]">
          <h4 className="font-bold text-sm text-[#166534]">
            {isHi ? "कृषि विपणन सलाह (Market Advisory)" : "Market Advisory & Best Selling Strategy"}
          </h4>
          <p className="mt-1 leading-relaxed text-[#64748B]">
            {isHi
              ? "सरसों व गेहूं की आवक इस सप्ताह तेज रहने की संभावना है। यदि नमी 8% से कम है तो उपज को सुखाकर ग्रेडिंग के साथ बेचें, जिससे 5% से 8% तक अधिक मूल्य प्राप्त होता है।"
              : "Grain and oilseed arrivals are peaking this week. Ensuring moisture is below 8% and grading properly fetches a 5% to 8% premium above standard modal prices."}
          </p>
        </div>
      </div>
    </div>
  );
};
