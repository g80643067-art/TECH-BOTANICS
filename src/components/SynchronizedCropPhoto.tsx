import React, { useState, useEffect, useRef } from "react";
import { Leaf, CheckCircle2, AlertCircle, ImageOff } from "lucide-react";
import { findCropVisual, CropVisualResolution } from "../services/cropPhotoRegistry";

interface SynchronizedCropPhotoProps {
  cropName?: string | null;
  directImageUrl?: string | null;
  alt?: string;
  className?: string;
  aspectRatio?: string;
  showBadge?: boolean;
  showSyncIndicator?: boolean;
  language?: "hi" | "en" | string;
  onClick?: () => void;
  badgePosition?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  isLowConfidenceOrUnclear?: boolean;
}

export const SynchronizedCropPhoto: React.FC<SynchronizedCropPhotoProps> = ({
  cropName,
  directImageUrl,
  alt = "Crop Visual",
  className = "",
  aspectRatio = "aspect-4/3",
  showBadge = true,
  showSyncIndicator = false,
  language = "hi",
  onClick,
  badgePosition = "bottom-left",
  isLowConfidenceOrUnclear = false,
}) => {
  const isHi = language === "hi";

  // Resolve the visual matching
  const resolution: CropVisualResolution = React.useMemo(() => {
    return findCropVisual(cropName);
  }, [cropName]);

  // Target image to display:
  // If user provided a direct camera/upload image, use it, unless it's unclear or user selected a crop
  const targetImageUrl = React.useMemo(() => {
    if (isLowConfidenceOrUnclear) return null;
    if (directImageUrl && !cropName) {
      return directImageUrl;
    }
    // If cropName is matched, use the verified agricultural photograph
    if (resolution.photoUrl) {
      return resolution.photoUrl;
    }
    // If directImageUrl exists and no matched crop, check if direct image is provided
    if (directImageUrl) {
      return directImageUrl;
    }
    return null;
  }, [directImageUrl, cropName, resolution.photoUrl, isLowConfidenceOrUnclear]);

  // Smooth Crossfade Transition States
  const [currentImage, setCurrentImage] = useState<string | null>(targetImageUrl);
  const [displayOpacity, setDisplayOpacity] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const previousTargetRef = useRef<string | null>(targetImageUrl);

  useEffect(() => {
    // If target image changed
    if (targetImageUrl !== previousTargetRef.current) {
      previousTargetRef.current = targetImageUrl;
      setHasError(false);

      if (!targetImageUrl) {
        setCurrentImage(null);
        setDisplayOpacity(1);
        setIsLoaded(true);
        return;
      }

      // 1. Begin smooth fade-out
      setDisplayOpacity(0);
      setIsLoaded(false);

      // Preload the new image in background before fading in
      const img = new Image();
      img.src = targetImageUrl;
      img.onload = () => {
        setCurrentImage(targetImageUrl);
        setHasError(false);
        // Small delay for smooth browser paint, then fade-in
        setTimeout(() => {
          setIsLoaded(true);
          setDisplayOpacity(1);
        }, 50);
      };
      img.onerror = () => {
        setHasError(true);
        setCurrentImage(null);
        setIsLoaded(true);
        setDisplayOpacity(1);
      };
    }
  }, [targetImageUrl]);

  const badgePosClass = {
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
  }[badgePosition];

  // Render Case 1: Neutral Placeholder (When no verified photo or unclear or image error)
  if (!currentImage || hasError || isLowConfidenceOrUnclear || resolution.isNeutralPlaceholder) {
    return (
      <div
        onClick={onClick}
        className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden border border-[#DCE8DD] bg-[#F8FAF5] flex flex-col items-center justify-center p-4 text-center transition-all duration-300 ${
          onClick ? "cursor-pointer hover:border-[#22C55E]" : ""
        } ${className}`}
        id={`crop-photo-placeholder-${resolution.queryCleaned || "neutral"}`}
      >
        <div className="w-12 h-12 rounded-2xl bg-white border border-[#DCE8DD] flex items-center justify-center mb-2.5 shadow-2xs">
          {isLowConfidenceOrUnclear ? (
            <AlertCircle className="w-6 h-6 text-[#166534]" />
          ) : (
            <Leaf className="w-6 h-6 text-[#166534]" />
          )}
        </div>

        <div className="max-w-xs space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white text-[#166534] border border-[#DCE8DD]">
            {isHi ? "तटस्थ प्रतिरूप (Neutral Placeholder)" : "Neutral Agricultural Placeholder"}
          </span>
          <p className="text-xs font-bold text-[#163020] truncate">
            {cropName || (isHi ? "पौधे का नाम दर्ज करें" : "Enter Crop / Plant")}
          </p>
          <p className="text-[10px] text-[#64748B] leading-tight line-clamp-2">
            {isHi
              ? "गलत फोटो प्रदर्शित करने से बचने के लिए तटस्थ रूप दिखाया जा रहा है।"
              : "Strict rule: Neutral placeholder displayed to avoid showing mismatched crop imagery."}
          </p>
        </div>
      </div>
    );
  }

  // Render Case 2: Synchronized Matched Photo with Smooth Fade Transition
  return (
    <div
      onClick={onClick}
      className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden border border-[#DCE8DD] bg-[#163020]/10 group transition-all duration-300 ${
        onClick ? "cursor-pointer hover:border-[#22C55E]" : ""
      } ${className}`}
      id={`crop-photo-display-${resolution.crop?.id || "verified"}`}
    >
      {/* Background Subtle Skeleton / Shimmer during loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#F8FAF5] animate-pulse flex items-center justify-center">
          <Leaf className="w-8 h-8 text-[#22C55E]/40 animate-bounce" />
        </div>
      )}

      {/* Main Photographic Image with Smooth Fade Transition */}
      <img
        src={currentImage}
        alt={alt || (isHi ? resolution.displayName_hi : resolution.displayName_en) || resolution.displayName_en || "Crop photo"}
        style={{
          opacity: displayOpacity,
          transition: "opacity 320ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
      />

      {/* Subtle bottom shadow vignette for contrast */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

      {/* Badges */}
      {showBadge && (
        <div className={`absolute ${badgePosClass} flex flex-col gap-1 max-w-[85%]`}>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#163020]/90 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-lg shadow-sm border border-white/10">
              <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
              <span>
                {resolution.crop
                  ? isHi
                    ? resolution.crop.primaryName_hi
                    : resolution.crop.primaryName_en
                  : cropName}
              </span>
            </span>

            {resolution.partBadge_hi && (
              <span className="inline-flex items-center text-[10px] font-bold bg-[#FACC15] text-[#163020] px-2 py-0.5 rounded-lg shadow-sm">
                {isHi ? resolution.partBadge_hi : resolution.partBadge_en}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
