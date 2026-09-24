import React, { useState, useEffect } from "react";
import {
  MapPin,
  Compass,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building,
  Navigation,
  Globe2,
  RefreshCw,
} from "lucide-react";
import { FarmLocation, Language } from "../types";
import { getTranslation } from "../data/translations";
import {
  INDIAN_STATES_DATA,
  approximateLocationFromCoordinates,
  buildManualFarmLocation,
} from "../data/locations";
import { CropRecommendationsSection } from "./CropRecommendationsSection";

interface LocationStepProps {
  language: Language;
  onLocationSelected: (location: FarmLocation) => void;
  savedLocation: FarmLocation | null;
  onAskAiQuery?: (queryText: string) => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({
  language,
  onLocationSelected,
  savedLocation,
  onAskAiQuery,
}) => {
  const t = getTranslation(language);
  const isHi = language === "hi";

  const [locationMode, setLocationMode] = useState<"choose" | "auto" | "manual" | "viewing">(
    savedLocation ? "viewing" : "choose"
  );
  const [selectedState, setSelectedState] = useState<string>(
    savedLocation?.state || INDIAN_STATES_DATA[0].state
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    savedLocation?.district || INDIAN_STATES_DATA[0].districts[0].name_en
  );
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [activeLocation, setActiveLocation] = useState<FarmLocation | null>(
    savedLocation || null
  );

  // Get current state object for manual dropdown
  const currentStateObj =
    INDIAN_STATES_DATA.find((s) => s.state === selectedState) || INDIAN_STATES_DATA[0];

  // Trigger GPS Geolocation
  const handleUseMyLocation = () => {
    setIsDetecting(true);
    setPermissionError(null);

    if (!navigator.geolocation) {
      setIsDetecting(false);
      setPermissionError(t.location.permissionDenied);
      setLocationMode("manual");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        try {
          const farmLoc = await approximateLocationFromCoordinates(latitude, longitude);
          farmLoc.accuracyMeters = Math.round(accuracy);
          setActiveLocation(farmLoc);
          setLocationMode("viewing");
          onLocationSelected(farmLoc);
        } catch (err) {
          console.error("Geocoding resolution error:", err);
          // Fallback to default enriched location
          const fallback = buildManualFarmLocation(selectedState, selectedDistrict);
          setActiveLocation(fallback);
          setLocationMode("viewing");
          onLocationSelected(fallback);
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        console.warn("Geolocation permission error:", error);
        setIsDetecting(false);
        setPermissionError(t.location.permissionDenied);
        setLocationMode("manual");
      },
      { timeout: 9000, enableHighAccuracy: true }
    );
  };

  // Handle Manual Selection
  const handleSaveManualLocation = () => {
    const enrichedLocation = buildManualFarmLocation(selectedState, selectedDistrict);
    setActiveLocation(enrichedLocation);
    setLocationMode("viewing");
    onLocationSelected(enrichedLocation);
  };

  const handleConfirmAndContinue = () => {
    if (activeLocation) {
      onLocationSelected(activeLocation);
    } else {
      handleSaveManualLocation();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 px-3 sm:px-4" id="location-step-container">
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#DCE8DD] shadow-sm relative overflow-hidden">
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#F8FAF5] text-[#166534] border border-[#DCE8DD] mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#22C55E]" /> {t.steps.step3}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#163020] tracking-tight mb-1.5">
            {t.location.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            {t.location.subtitle}
          </p>
        </div>

        {/* Primary Choice Buttons (when in choose or manual mode) */}
        {(locationMode === "choose" || locationMode === "manual" || !activeLocation) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* 1. Use My Location Button */}
            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={isDetecting}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                isDetecting
                  ? "border-[#166534] bg-[#F8FAF5] text-[#163020]"
                  : "border-[#DCE8DD] hover:border-[#166534] bg-[#F8FAF5] hover:bg-white text-[#163020]"
              }`}
              id="btn-use-my-location"
            >
              <div className="w-12 h-12 rounded-xl bg-[#166534] text-white flex items-center justify-center shadow-xs mb-2.5">
                <Navigation className={`w-6 h-6 text-[#22C55E] ${isDetecting ? "animate-spin" : ""}`} />
              </div>
              <span className="font-extrabold text-sm sm:text-base text-[#163020]">
                [ 📍 {t.location.useMyLocation} ]
              </span>
              <span className="text-[11px] text-[#64748B] mt-1 text-center">
                {isHi
                  ? "ब्राउज़र जीपीएस से स्वचालित पहचान करें व उपयुक्त फसलें देखें"
                  : "Detect GPS location and explore suitable crops"}
              </span>
            </button>

            {/* 2. Select Location Manually Button */}
            <button
              type="button"
              onClick={() => {
                setLocationMode("manual");
                setPermissionError(null);
              }}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                locationMode === "manual"
                  ? "border-[#166534] bg-[#F8FAF5] text-[#163020] shadow-xs ring-2 ring-[#166534]/20"
                  : "border-[#DCE8DD] hover:border-[#166534] bg-white hover:bg-[#F8FAF5] text-[#163020]"
              }`}
              id="btn-select-location-manually"
            >
              <div className="w-12 h-12 rounded-xl bg-[#163020] text-white flex items-center justify-center shadow-xs mb-2.5">
                <Building className="w-6 h-6 text-[#DCE8DD]" />
              </div>
              <span className="font-extrabold text-sm sm:text-base text-[#163020]">
                [ {t.location.selectManually} ]
              </span>
              <span className="text-[11px] text-[#64748B] mt-1 text-center">
                {isHi
                  ? "राज्य और जिला सूची में से चुनें"
                  : "Select state & district from dropdown list"}
              </span>
            </button>
          </div>
        )}

        {/* Permission Denied Alert (non-blocking fallback) */}
        {permissionError && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">{isHi ? "स्थान अनुमति सूचना" : "Location Permission Notice"}</p>
              <p className="mt-0.5 text-[#64748B] leading-relaxed">{permissionError}</p>
            </div>
          </div>
        )}

        {/* Detecting State Animation */}
        {isDetecting && (
          <div className="p-6 rounded-2xl bg-[#F8FAF5] border border-[#DCE8DD] text-center mb-6">
            <div className="inline-block animate-spin text-[#166534] mb-2">
              <Compass className="w-8 h-8 text-[#22C55E]" />
            </div>
            <p className="text-sm font-bold text-[#163020]">{t.location.detectingLocation}</p>
            <p className="text-xs text-[#64748B] mt-1">
              {isHi
                ? "कृषि-जलवायु क्षेत्र व उपयुक्त फसलों का विश्लेषण हो रहा है..."
                : "Fetching regional agro-climatic data & crop recommendations..."}
            </p>
          </div>
        )}

        {/* Manual State & District Dropdowns Selector */}
        {locationMode === "manual" && !isDetecting && (
          <div className="bg-[#F8FAF5] rounded-2xl p-5 border border-[#DCE8DD] mb-6">
            <h3 className="text-sm font-bold text-[#163020] mb-3.5 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#166534]" />
              <span>{isHi ? "राज्य एवं जिला चुनें" : "Select State & District"}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* State select */}
              <div>
                <label className="block text-xs font-bold text-[#163020] mb-1.5">
                  {t.location.selectState}
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    const newState = e.target.value;
                    setSelectedState(newState);
                    const found = INDIAN_STATES_DATA.find((s) => s.state === newState);
                    if (found && found.districts.length > 0) {
                      setSelectedDistrict(found.districts[0].name_en);
                    }
                  }}
                  className="w-full bg-white border border-[#DCE8DD] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#163020] focus:outline-none focus:ring-2 focus:ring-[#166534]"
                  id="select-state-dropdown"
                >
                  {INDIAN_STATES_DATA.map((st) => (
                    <option key={st.state} value={st.state}>
                      {isHi ? `${st.state_hi} (${st.state})` : st.state}
                    </option>
                  ))}
                </select>
              </div>

              {/* District select */}
              <div>
                <label className="block text-xs font-bold text-[#163020] mb-1.5">
                  {t.location.selectDistrict}
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-white border border-[#DCE8DD] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#163020] focus:outline-none focus:ring-2 focus:ring-[#166534]"
                  id="select-district-dropdown"
                >
                  {currentStateObj.districts.map((dist) => (
                    <option key={dist.name_en} value={dist.name_en}>
                      {isHi ? dist.name_hi : dist.name_en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveManualLocation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#166534] hover:bg-[#14532d] text-white shadow-xs transition-all cursor-pointer"
              id="btn-apply-manual-location"
            >
              <CheckCircle className="w-4 h-4 text-[#22C55E]" />
              <span>{isHi ? "स्थान लागू करें एवं फसलें देखें" : "Apply Location & View Suitable Crops"}</span>
            </button>
          </div>
        )}

        {/* Full Location & Crop Recommendations Feature View */}
        {activeLocation && !isDetecting && (
          <div className="mb-6">
            <CropRecommendationsSection
              location={activeLocation}
              language={language}
              onUseLocationAgain={handleUseMyLocation}
              onChangeLocationManually={() => setLocationMode("manual")}
              onAskAiQuery={onAskAiQuery}
              isDetecting={isDetecting}
            />
          </div>
        )}

        {/* Step 3 -> Step 4 Continue Button */}
        <div className="pt-4 border-t border-[#DCE8DD] flex items-center justify-between gap-4">
          <div className="text-xs text-[#64748B] hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span>{t.location.privacyNote}</span>
          </div>

          <button
            type="button"
            onClick={handleConfirmAndContinue}
            className="w-full sm:w-auto ml-auto flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white font-bold py-3.5 px-8 rounded-2xl shadow-sm transition-all active:scale-98 cursor-pointer"
            id="btn-location-confirm-continue"
          >
            <span>{t.location.confirmAndContinue}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
