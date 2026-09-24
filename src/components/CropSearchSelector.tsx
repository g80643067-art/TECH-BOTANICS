import React, { useState, useRef, useEffect } from "react";
import { Search, X, Check, Leaf, ArrowRight } from "lucide-react";
import {
  CROP_PHOTO_REGISTRY,
  CropVisualData,
  findCropVisual,
  normalizeCropText,
} from "../services/cropPhotoRegistry";

interface CropSearchSelectorProps {
  selectedCropName: string;
  onSelectCrop: (cropName: string, cropVisual?: CropVisualData | null) => void;
  language?: "hi" | "en" | string;
  placeholder?: string;
  className?: string;
  showQuickChips?: boolean;
}

export const CropSearchSelector: React.FC<CropSearchSelectorProps> = ({
  selectedCropName,
  onSelectCrop,
  language = "hi",
  placeholder,
  className = "",
  showQuickChips = true,
}) => {
  const isHi = language === "hi";
  const [query, setQuery] = useState<string>(selectedCropName || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Keep query text updated when selectedCropName changes externally
  useEffect(() => {
    if (selectedCropName && selectedCropName !== query) {
      setQuery(selectedCropName);
    }
  }, [selectedCropName]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter registry matching query
  const filteredCrops = React.useMemo(() => {
    if (!query.trim()) {
      return CROP_PHOTO_REGISTRY.slice(0, 10);
    }
    const norm = normalizeCropText(query);
    return CROP_PHOTO_REGISTRY.filter((item) => {
      if (normalizeCropText(item.primaryName_en).includes(norm)) return true;
      if (item.primaryName_hi.includes(query.trim())) return true;
      return item.aliases.some((alias) => normalizeCropText(alias).includes(norm));
    }).slice(0, 8);
  }, [query]);

  // Handle direct text submission
  const handleSubmitInput = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    const res = findCropVisual(query);
    if (res.crop) {
      onSelectCrop(res.displayName_hi || res.displayName_en, res.crop);
    } else {
      // Passes the user query as is; SynchronizedCropPhoto will safely display neutral placeholder
      onSelectCrop(query.trim(), null);
    }
    setIsOpen(false);
  };

  const handlePickCrop = (crop: CropVisualData) => {
    const nameToDisplay = isHi ? crop.primaryName_hi : crop.primaryName_en;
    setQuery(nameToDisplay);
    onSelectCrop(nameToDisplay, crop);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    onSelectCrop("", null);
    setIsOpen(false);
  };

  // Quick prominent Indian crops
  const quickPills = [
    { label_hi: "गेहूं", label_en: "Wheat", id: "wheat" },
    { label_hi: "सरसों", label_en: "Mustard", id: "mustard" },
    { label_hi: "धान", label_en: "Rice", id: "rice" },
    { label_hi: "मक्का", label_en: "Maize", id: "maize" },
    { label_hi: "टमाटर", label_en: "Tomato", id: "tomato" },
    { label_hi: "आम", label_en: "Mango", id: "mango" },
    { label_hi: "आलू", label_en: "Potato", id: "potato" },
    { label_hi: "मिर्च", label_en: "Chilli", id: "chilli" },
  ];

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {/* Search Input Bar */}
      <form onSubmit={handleSubmitInput} className="relative flex items-center">
        <div className="absolute left-3.5 text-[#166534] pointer-events-none">
          <Search className="w-4 h-4" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            // Immediately resolve and synchronize photo while typing
            const res = findCropVisual(e.target.value);
            if (res.crop) {
              onSelectCrop(isHi ? res.crop.primaryName_hi : res.crop.primaryName_en, res.crop);
            } else if (e.target.value.trim().length > 0) {
              onSelectCrop(e.target.value.trim(), null);
            }
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={
            placeholder ||
            (isHi
              ? "फसल या पौधे का नाम दर्ज करें (उदा. गेहूं, सरसों, धान, मक्का, टमाटर, आम)..."
              : "Enter crop, plant, leaf or fruit name (e.g. Wheat, Mustard, Rice, Maize, Tomato, Mango)...")
          }
          className="w-full pl-10 pr-20 py-2.5 sm:py-3 bg-white border-2 border-[#DCE8DD] focus:border-[#166534] rounded-2xl text-xs sm:text-sm font-medium text-[#163020] placeholder:text-[#64748B] outline-none shadow-xs transition-all"
          id="input-crop-search-selector"
        />

        <div className="absolute right-2.5 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-[#64748B] hover:text-[#163020] hover:bg-[#F8FAF5] transition-colors cursor-pointer"
              title="साफ करें"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="submit"
            className="px-2.5 py-1 bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>{isHi ? "खोजें" : "Sync"}</span>
            <ArrowRight className="w-3 h-3 text-[#22C55E]" />
          </button>
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-[#DCE8DD] shadow-lg overflow-hidden z-30 max-h-72 overflow-y-auto">
          <div className="p-2 bg-[#F8FAF5] border-b border-[#DCE8DD] flex items-center justify-between text-[11px] font-bold text-[#64748B]">
            <span className="flex items-center gap-1">
              <Leaf className="w-3 h-3 text-[#22C55E]" />
              {isHi ? "सत्यापित कृषि फोटो लाइब्रेरी" : "Verified Agricultural Photo Registry"}
            </span>
            <span>{filteredCrops.length} {isHi ? "फसलें उपलब्ध" : "matches"}</span>
          </div>

          <div className="divide-y divide-[#DCE8DD]/40">
            {filteredCrops.map((crop) => (
              <button
                key={crop.id}
                type="button"
                onClick={() => handlePickCrop(crop)}
                className="w-full flex items-center justify-between p-2.5 hover:bg-[#F8FAF5] transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#163020]/10 shrink-0 border border-[#DCE8DD]">
                    <img
                      src={crop.photoUrl}
                      alt={isHi ? crop.primaryName_hi : crop.primaryName_en}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.fallback) {
                          target.dataset.fallback = "true";
                          target.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80";
                        }
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-extrabold text-[#163020] group-hover:text-[#166534]">
                        {isHi ? crop.primaryName_hi : crop.primaryName_en}
                      </span>
                      <span className="text-xs">{crop.emoji}</span>
                    </div>
                    <p className="text-[11px] text-[#64748B]">
                      {isHi ? crop.primaryName_en : crop.primaryName_hi} • {crop.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-[#166534] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{isHi ? "फोटो सिंक करें" : "Select"}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#22C55E]" />
                </div>
              </button>
            ))}

            {filteredCrops.length === 0 && (
              <div className="p-4 text-center text-xs text-[#64748B] space-y-1">
                <p className="font-bold text-[#163020]">
                  '{query}' {isHi ? "का सत्यापित फोटो उपलब्ध नहीं है" : "not found in verified catalog"}
                </p>
                <p className="text-[11px]">
                  {isHi
                    ? "गलत फोटो से बचने के लिए तटस्थ प्रतिरूप (Neutral Placeholder) प्रदर्शित किया जाएगा।"
                    : "Neutral placeholder will be used to avoid showing mismatched crop imagery."}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Selection Pills */}
      {showQuickChips && (
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          <span className="text-[11px] font-bold text-[#64748B] shrink-0 mr-1">
            {isHi ? "त्वरित चयन:" : "Quick Select:"}
          </span>
          {quickPills.map((pill) => {
            const cropItem = CROP_PHOTO_REGISTRY.find((c) => c.id === pill.id);
            const isSelected =
              normalizeCropText(query).includes(pill.id) ||
              query.includes(pill.label_hi) ||
              normalizeCropText(query).includes(pill.label_en.toLowerCase());

            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => {
                  if (cropItem) {
                    handlePickCrop(cropItem);
                  }
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#166534] text-white shadow-xs"
                    : "bg-white hover:bg-[#F8FAF5] text-[#163020] border border-[#DCE8DD] hover:border-[#166534]"
                }`}
              >
                <span>{cropItem?.emoji || "🌱"}</span>
                <span>{isHi ? pill.label_hi : pill.label_en}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
