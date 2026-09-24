import React from "react";
import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

interface OfflineIndicatorProps {
  isHindi?: boolean;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isHindi = false }) => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 flex items-center gap-3 bg-[#163020] text-white px-4 py-2.5 rounded-2xl shadow-lg border border-[#22C55E]/40 backdrop-blur-md animate-fade-in"
    >
      <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
        <WifiOff className="w-4 h-4 text-amber-400" />
      </div>
      <div className="text-xs">
        <p className="font-bold text-white">
          {isHindi ? "ऑफ़लाइन मोड सक्रिय" : "Offline Mode Active"}
        </p>
        <p className="text-[#DCE8DD] text-[11px]">
          {isHindi
            ? "कैश डेटा का उपयोग हो रहा है। इंटरनेट आने पर स्वतः सिंक होगा।"
            : "Cached advisory & scans available. Auto-syncs when online."}
        </p>
      </div>
    </div>
  );
};
