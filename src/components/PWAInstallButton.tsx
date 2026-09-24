import React, { useState } from "react";
import { Download, Smartphone, X, Check, Share, PlusSquare, ArrowRight, ShieldCheck } from "lucide-react";
import { usePWAInstall } from "../hooks/usePWAInstall";

interface PWAInstallButtonProps {
  isHindi?: boolean;
  variant?: "header" | "floating-banner" | "modal";
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  isHindi = false,
  variant = "header",
  className = "",
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(() => {
    try {
      return sessionStorage.getItem("pwa_banner_dismissed") === "true";
    } catch {
      return false;
    }
  });

  // If already running in standalone mode (already installed), do not show install triggers
  if (isInstalled) {
    if (variant === "header") {
      return (
        <span
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#166534]/10 text-[#166534] text-xs font-bold border border-[#22C55E]/30"
          title={isHindi ? "ऐप इंस्टॉल है" : "App Installed"}
        >
          <Check className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>{isHindi ? "इंस्टॉल है" : "Installed"}</span>
        </span>
      );
    }
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const installed = await install();
      if (!installed && isIOS) {
        setShowGuideModal(true);
      }
    } else {
      // If browser hasn't fired beforeinstallprompt or on iOS/Safari, show manual instructions
      setShowGuideModal(true);
    }
  };

  const handleDismissBanner = () => {
    setIsBannerDismissed(true);
    try {
      sessionStorage.setItem("pwa_banner_dismissed", "true");
    } catch {
      // ignore
    }
  };

  // Header button variant
  if (variant === "header") {
    return (
      <>
        <button
          type="button"
          onClick={handleInstallClick}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#22C55E] hover:bg-[#16a34a] text-[#163020] font-black text-xs transition-all shadow-xs active:scale-95 cursor-pointer border border-[#22C55E] ${className}`}
          title={isHindi ? "फोन में ऐप इंस्टॉल करें" : "Install App on Device"}
          id="btn-header-install-app"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#163020]" />
          <span className="hidden sm:inline">{isHindi ? "ऐप इंस्टॉल करें" : "Install App"}</span>
          <span className="sm:hidden">{isHindi ? "ऐप लें" : "Install"}</span>
        </button>

        {/* Guided Installation Modal */}
        {showGuideModal && (
          <InstallGuideModal
            isHindi={isHindi}
            isIOS={isIOS}
            isInstallable={isInstallable}
            onInstallPrompt={install}
            onClose={() => setShowGuideModal(false)}
          />
        )}
      </>
    );
  }

  // Floating banner variant for mobile/desktop
  if (variant === "floating-banner") {
    if (isBannerDismissed) return null;

    return (
      <>
        <div
          className={`fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 z-40 max-w-md bg-white border-2 border-[#166534] rounded-3xl p-4 shadow-xl text-left animate-slide-up backdrop-blur-md ${className}`}
          id="pwa-install-floating-banner"
        >
          <button
            onClick={handleDismissBanner}
            className="absolute top-3 right-3 p-1.5 text-[#64748B] hover:text-[#163020] rounded-full hover:bg-[#F8FAF5] transition-colors cursor-pointer"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3.5 pr-6">
            <div className="w-12 h-12 rounded-2xl bg-[#166534] p-2 flex items-center justify-center shrink-0 shadow-md">
              <img src="/icon.svg" alt="KrishiSetu" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-sm sm:text-base text-[#163020]">
                  {isHindi ? "कृषिसितु ऐप इंस्टॉल करें" : "Install KrishiSetu App"}
                </h4>
                <span className="text-[10px] font-bold bg-[#22C55E]/15 text-[#166534] px-2 py-0.5 rounded-full border border-[#22C55E]/30">
                  PWA
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5 line-clamp-2">
                {isHindi
                  ? "सीधे फोन की होम स्क्रीन पर जोड़ें। तेज़ स्कैनिंग और बिना रुकावट उपयोग।"
                  : "Add directly to your device home screen for instant access and offline crop diagnostics."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3.5 pt-2 border-t border-[#DCE8DD]">
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex-1 flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-xs transition-transform active:scale-98 cursor-pointer"
              id="btn-banner-install-now"
            >
              <Download className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>{isHindi ? "फोन में इंस्टॉल करें" : "Install on Device"}</span>
            </button>
            <button
              type="button"
              onClick={handleDismissBanner}
              className="px-3 py-2.5 text-xs text-[#64748B] hover:text-[#163020] font-semibold cursor-pointer"
            >
              {isHindi ? "बाद में" : "Later"}
            </button>
          </div>
        </div>

        {/* Guided Installation Modal */}
        {showGuideModal && (
          <InstallGuideModal
            isHindi={isHindi}
            isIOS={isIOS}
            isInstallable={isInstallable}
            onInstallPrompt={install}
            onClose={() => setShowGuideModal(false)}
          />
        )}
      </>
    );
  }

  return null;
};

interface InstallGuideModalProps {
  isHindi: boolean;
  isIOS: boolean;
  isInstallable: boolean;
  onInstallPrompt: () => Promise<boolean>;
  onClose: () => void;
}

const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isHindi,
  isIOS,
  isInstallable,
  onInstallPrompt,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#163020]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#DCE8DD] text-left relative my-8 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#64748B] hover:text-[#163020] rounded-full hover:bg-[#F8FAF5] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* App Icon & Title */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#166534] p-2 flex items-center justify-center shadow-md shrink-0">
            <img src="/icon.svg" alt="KrishiSetu AI" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#163020]">
              {isHindi ? "कृषिसितु ऐप इंस्टॉल करें" : "Install KrishiSetu AI"}
            </h3>
            <p className="text-xs text-[#64748B] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#166534]" />
              <span>{isHindi ? "प्रमाणित सुरक्षित PWA एप्लिकेशन" : "Secure Progressive Web App"}</span>
            </p>
          </div>
        </div>

        {/* One-tap install if available */}
        {isInstallable && (
          <div className="mb-4">
            <button
              type="button"
              onClick={async () => {
                const res = await onInstallPrompt();
                if (res) onClose();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white font-extrabold py-3.5 px-5 rounded-2xl shadow-sm transition-transform active:scale-98 cursor-pointer text-sm"
              id="btn-modal-direct-install"
            >
              <Download className="w-4 h-4 text-[#22C55E]" />
              <span>{isHindi ? "तुरंत इंस्टॉल करें" : "Install Directly Now"}</span>
            </button>
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#DCE8DD]"></div>
              </div>
              <span className="relative bg-white px-3 text-xs text-[#64748B] uppercase font-bold">
                {isHindi ? "या मैन्युअल तरीका" : "Or manual steps"}
              </span>
            </div>
          </div>
        )}

        {/* Instructions by Platform */}
        {isIOS ? (
          /* iOS Safari Guide */
          <div className="space-y-3 bg-[#F8FAF5] p-4 rounded-2xl border border-[#DCE8DD]">
            <h4 className="font-bold text-xs uppercase text-[#166534] tracking-wider">
              {isHindi ? "iPhone / iPad पर इंस्टॉल करें:" : "Steps for iPhone / iPad (Safari):"}
            </h4>
            <ol className="space-y-2.5 text-xs text-[#163020]">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#166534] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  {isHindi ? (
                    <>सफ़ारी ब्राउज़र के नीचे स्थित <strong>शेयर (Share)</strong> बटन <Share className="inline w-3.5 h-3.5 text-[#166534]" /> पर टैप करें।</>
                  ) : (
                    <>Tap the <strong>Share</strong> button <Share className="inline w-3.5 h-3.5 text-[#166534]" /> in the Safari toolbar.</>
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#166534] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  {isHindi ? (
                    <>नीचे स्क्रॉल करें और <strong>"होम स्क्रीन पर जोड़ें" (Add to Home Screen)</strong> <PlusSquare className="inline w-3.5 h-3.5 text-[#166534]" /> चुनें।</>
                  ) : (
                    <>Scroll down and tap <strong>"Add to Home Screen"</strong> <PlusSquare className="inline w-3.5 h-3.5 text-[#166534]" />.</>
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#166534] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  {isHindi ? (
                    <>ऊपरी दाएं कोने में <strong>"जोड़ें" (Add)</strong> दबाएं। ऐप आपकी होम स्क्रीन पर तैयार हो जाएगी!</>
                  ) : (
                    <>Tap <strong>"Add"</strong> in the top right corner. The app icon will appear on your phone home screen!</>
                  )}
                </span>
              </li>
            </ol>
          </div>
        ) : (
          /* Android / Chrome / Edge Guide */
          <div className="space-y-3 bg-[#F8FAF5] p-4 rounded-2xl border border-[#DCE8DD]">
            <h4 className="font-bold text-xs uppercase text-[#166534] tracking-wider">
              {isHindi ? "Android फोन / Chrome ब्राउज़र पर:" : "Steps for Android / Chrome / Edge:"}
            </h4>
            <ol className="space-y-2.5 text-xs text-[#163020]">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#166534] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  {isHindi ? (
                    <>ब्राउज़र के ऊपरी दाएं कोने में <strong>तीन बिंदु (⋮)</strong> मेनू पर टैप करें।</>
                  ) : (
                    <>Tap the <strong>three dots (⋮)</strong> menu in the top right of your browser.</>
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#166534] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  {isHindi ? (
                    <><strong>"ऐप इंस्टॉल करें" (Install app)</strong> या <strong>"होम स्क्रीन पर जोड़ें"</strong> चुनें।</>
                  ) : (
                    <>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</>
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#166534] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  {isHindi ? (
                    <><strong>"इंस्टॉल करें"</strong> पर पुष्टि करें। कृषिसितु ऐप आपके फोन के ऐप्स में जुड़ जाएगी!</>
                  ) : (
                    <>Confirm <strong>"Install"</strong>. KrishiSetu will install as a native standalone app!</>
                  )}
                </span>
              </li>
            </ol>
          </div>
        )}

        {/* Benefits list */}
        <div className="mt-4 pt-4 border-t border-[#DCE8DD] space-y-1.5 text-[11px] text-[#64748B]">
          <div className="flex items-center gap-2">
            <span className="text-[#22C55E]">✓</span>
            <span>{isHindi ? "फुलस्क्रीन ऐप अनुभव बिना एड्रेस बार के" : "Standalone fullscreen experience without browser URL bars"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#22C55E]">✓</span>
            <span>{isHindi ? "खेत में कम नेटवर्क पर भी तेज गति से लोड" : "Instant loading in rural areas with poor connectivity"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#22C55E]">✓</span>
            <span>{isHindi ? "स्टोरेज केवल 1 MB से भी कम" : "Ultra-lightweight storage (under 2 MB)"}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-[#F8FAF5] hover:bg-[#DCE8DD]/50 text-[#163020] font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
        >
          {isHindi ? "समझ गया / बंद करें" : "Got it / Close"}
        </button>
      </div>
    </div>
  );
};
