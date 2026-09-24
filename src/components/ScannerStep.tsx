import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  Upload,
  AlertCircle,
  CheckCircle2,
  X,
  Activity,
  MessageSquare,
  RefreshCw,
  ArrowRight,
  HelpCircle,
  Layers,
  Info,
} from "lucide-react";
import {
  CropCandidateOption,
  CropIssueData,
  FarmLocation,
  Language,
  SoilOption,
  VisionAnalysisResult,
} from "../types";
import { getTranslation } from "../data/translations";
import {
  SAMPLE_CROPS,
  getLocalizedCropName,
  getLocalizedIssueName,
  getLocalizedPossibleCause,
  resolveCropIssueData,
} from "../data/mockCrops";
import { analyzeCropImage } from "../services/visionAnalysisService";
import { SynchronizedCropPhoto } from "./SynchronizedCropPhoto";
import { CropSearchSelector } from "./CropSearchSelector";

interface ScannerStepProps {
  language: Language;
  onScanComplete: (
    image: string,
    detectedCrop: CropIssueData,
    visionResult?: VisionAnalysisResult
  ) => void;
  savedImage: string | null;
  savedCrop: CropIssueData | null;
  location?: FarmLocation | null;
  soilType?: SoilOption | null;
  onAskAiQuery?: (queryText: string) => void;
  onOpenAiAgent?: () => void;
}

export const ScannerStep: React.FC<ScannerStepProps> = ({
  language,
  onScanComplete,
  savedImage,
  savedCrop,
  location = null,
  soilType = null,
  onAskAiQuery,
  onOpenAiAgent,
}) => {
  const t = getTranslation(language);
  const isHi = language === "hi";

  const [selectedImage, setSelectedImage] = useState<string | null>(savedImage);
  const [visionResult, setVisionResult] = useState<VisionAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStage, setAnalysisStage] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  // Live Camera stream states
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera stream cleanly
  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  // Handle Take Photo camera trigger
  const handleStartCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError(t.scanner.cameraAccessError);
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      setIsCameraOpen(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.warn("Camera access error:", err);
      setCameraError(t.scanner.cameraAccessError);
    }
  };

  // Capture frame from active camera — do NOT force any preset crop!
  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      stopCameraStream();
      executeVisionAnalysis(dataUrl, null);
    }
  };

  // Handle file upload — do NOT force any preset crop!
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      executeVisionAnalysis(result, null);
    };
    reader.readAsDataURL(file);
  };

  // Handle sample crop quick select
  const handleSelectSample = (sample: CropIssueData) => {
    executeVisionAnalysis(sample.sampleImage, sample);
  };

  // Trigger unclear image simulation for testing
  const handleSelectUnclearTest = () => {
    const darkPlaceholder = "data:image/png;base64,unclear_dark_blur_sample_placeholder";
    executeVisionAnalysis(darkPlaceholder, null);
  };

  // Trigger multiple crops test for polyculture verification
  const handleSelectMultiCropTest = () => {
    const multiPlaceholder = "data:image/png;base64,multi_crop_mixed_field_sample_placeholder";
    executeVisionAnalysis(multiPlaceholder, null);
  };

  // Execute full vision analysis workflow
  const executeVisionAnalysis = async (imgSrc: string, baseCrop: CropIssueData | null) => {
    setSelectedImage(imgSrc);
    setIsAnalyzing(true);
    setVisionResult(null);
    setAnalysisStage(0);
    setProgressPercent(15);

    // Stage 1: Image Processing & Visual feature inspection
    const stageTimer1 = setTimeout(() => {
      setAnalysisStage(1);
      setProgressPercent(40);
    }, 500);

    // Stage 2: Botanical Identification & Confidence check
    const stageTimer2 = setTimeout(() => {
      setAnalysisStage(2);
      setProgressPercent(70);
    }, 1100);

    // Stage 3: Phytopathology & Agro-Climatic Integration
    const stageTimer3 = setTimeout(() => {
      setAnalysisStage(3);
      setProgressPercent(90);
    }, 1700);

    try {
      const result = await analyzeCropImage(imgSrc, baseCrop, location, soilType, language);

      setTimeout(() => {
        setProgressPercent(100);
        setIsAnalyzing(false);
        setVisionResult(result);
      }, 2100);
    } catch (err) {
      console.error("Vision Analysis failed:", err);
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      clearTimeout(stageTimer3);
      setIsAnalyzing(false);
    }
  };

  // When multiple crops are found, allow the farmer to choose which candidate to analyze
  const handleSelectCandidateCrop = (candidate: CropCandidateOption) => {
    const matched = SAMPLE_CROPS.find((c) => c.id === candidate.cropId) || SAMPLE_CROPS[0];
    if (selectedImage) {
      executeVisionAnalysis(selectedImage.replace("multi_crop", "selected_single"), matched);
    } else {
      executeVisionAnalysis(matched.sampleImage, matched);
    }
  };

  // Synchronized crop search and immediate visual photo matching handler
  const handleSelectSearchCrop = (cropName: string, resolvedUrl: string, sampleCropId?: string) => {
    let baseCrop: CropIssueData | null = null;
    if (sampleCropId) {
      baseCrop = SAMPLE_CROPS.find((c) => c.id === sampleCropId) || null;
    }
    if (!baseCrop) {
      baseCrop = resolveCropIssueData(cropName);
    }
    executeVisionAnalysis(resolvedUrl || baseCrop.sampleImage, baseCrop);
  };

  // Reset scanner to scan another crop
  const handleResetScanner = () => {
    setSelectedImage(null);
    setVisionResult(null);
    setIsAnalyzing(false);
  };

  // Continue to the next step (Farm Location)
  const handleContinueNext = () => {
    if (visionResult && visionResult.status === "identified" && visionResult.cropData) {
      onScanComplete(selectedImage || visionResult.cropData.sampleImage, visionResult.cropData, visionResult);
    } else if (savedCrop) {
      onScanComplete(savedImage || savedCrop.sampleImage, savedCrop);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 px-3 sm:px-4">
      {/* Main Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#DCE8DD] shadow-sm relative overflow-hidden">
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#F8FAF5] text-[#166534] border border-[#DCE8DD] mb-2">
            <Camera className="w-3.5 h-3.5 text-[#22C55E]" /> {t.steps.step2} • AI Crop Vision
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163020] tracking-tight mb-2">
            {t.scanner.title}
          </h2>
          <p className="text-sm text-[#64748B]">
            {t.scanner.subtitle}
          </p>
        </div>

        {/* Photo Guidance Banner */}
        <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-[#F8FAF5] border border-[#22C55E]/40 flex items-start gap-3 max-w-2xl mx-auto text-left">
          <div className="w-7 h-7 rounded-xl bg-[#22C55E]/20 text-[#166534] flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
            💡
          </div>
          <div className="text-xs sm:text-sm text-[#163020] leading-relaxed">
            <strong className="text-[#166534] font-bold">फोटो निर्देश: </strong>
            Clear photo lein — affected leaf ke paas se aur poore paudhe ki ek photo bhejna behtar rahega.
          </div>
        </div>

        {/* Live Camera Modal / Overlay */}
        {isCameraOpen && (
          <div className="mb-8 p-4 bg-[#163020] rounded-2xl text-white relative flex flex-col items-center">
            <button
              onClick={stopCameraStream}
              className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors z-20 cursor-pointer"
              title={t.scanner.closeCamera}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full max-w-md aspect-4/3 rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-8 border-2 border-dashed border-[#22C55E]/80 rounded-lg pointer-events-none flex items-center justify-center">
                <div className="text-[11px] bg-[#163020]/90 text-[#DCE8DD] px-3 py-1 rounded-full border border-[#22C55E]/40">
                  {t.scanner.subtitle}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handleCapturePhoto}
                className="flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white font-bold px-6 py-3 rounded-full shadow-md transition-transform active:scale-95 cursor-pointer"
                id="btn-capture-leaf-photo"
              >
                <Camera className="w-5 h-5 text-[#22C55E]" />
                <span>{t.scanner.captureShot}</span>
              </button>
              <button
                onClick={stopCameraStream}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-[#DCE8DD] rounded-full text-sm font-semibold transition-colors cursor-pointer"
              >
                {t.scanner.closeCamera}
              </button>
            </div>
          </div>
        )}

        {/* Camera error notification */}
        {cameraError && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p>{cameraError}</p>
          </div>
        )}

        {/* Scanning Animation Modal Overlay */}
        {isAnalyzing && (
          <div className="mb-8 p-6 sm:p-8 bg-[#163020] rounded-2xl text-white shadow-xl relative overflow-hidden border border-[#166534]/40">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#22C55E] animate-pulse" />

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-36 h-36 rounded-xl overflow-hidden border-2 border-[#22C55E] shadow-md shrink-0 bg-black/40 flex items-center justify-center">
                {selectedImage && selectedImage.startsWith("data:image/") && !selectedImage.includes("unclear") && !selectedImage.includes("placeholder") ? (
                  <img
                    src={selectedImage}
                    alt="Scanning Crop"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-4xl animate-bounce">🌱</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22C55E]/30 to-transparent animate-bounce" />
              </div>

              <div className="flex-1 w-full text-left">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-[#22C55E] border-t-transparent animate-spin" />
                    <h3 className="font-bold text-lg text-white">
                      {t.scanner.analyzingTitle}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FACC15]">
                    {progressPercent}%
                  </span>
                </div>
                <p className="text-xs text-[#DCE8DD]/80 mb-4">
                  {t.scanner.analyzingSubtitle}
                </p>

                <div className="w-full bg-white/10 rounded-full h-2.5 mb-5 overflow-hidden border border-white/10">
                  <div
                    className="bg-[#22C55E] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="space-y-2">
                  {t.scanner.stages.map((stageText, idx) => {
                    const isPassed = analysisStage > idx;
                    const isCurrent = analysisStage === idx;

                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-2.5 text-xs transition-opacity duration-200 ${
                          isPassed
                            ? "text-[#22C55E] font-medium"
                            : isCurrent
                            ? "text-white font-bold"
                            : "text-[#DCE8DD]/40"
                        }`}
                      >
                        {isPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                        ) : isCurrent ? (
                          <Activity className="w-4 h-4 text-[#FACC15] animate-pulse shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                        )}
                        <span>{stageText}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SCANNER RESULT STATE: 1. IDENTIFIED CROP */}
        {/* =================================================================== */}
        {!isAnalyzing && visionResult && visionResult.status === "identified" && visionResult.cropData && (
          <div className="mb-8 space-y-6">
            {/* Top Badge Banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#F8FAF5] border border-[#DCE8DD] rounded-2xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" />
                <span className="text-xs sm:text-sm font-black text-[#163020] uppercase tracking-wide">
                  🌱 {t.scanner.cropIdentified}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {visionResult.analysisSource === "gemini_vision" ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-[#166534] border border-[#DCE8DD] shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                    Vision AI Analysis
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F8FAF5] text-[#163020] border border-[#DCE8DD]">
                    <Info className="w-3 h-3 text-[#64748B]" />
                    {t.scanner.demoAiDiagnosisBadge}
                  </span>
                )}
              </div>
            </div>

            {/* Main Result Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-5 sm:p-6 rounded-2xl border border-[#DCE8DD] bg-white shadow-sm">
              {/* Left Column: Analyzed Image Preview & Botanical Features */}
              <div className="md:col-span-5 space-y-4">
                <div className="relative">
                  <SynchronizedCropPhoto
                    cropName={visionResult.cropData.cropName_hi || visionResult.cropData.cropName_en}
                    directImageUrl={selectedImage || visionResult.cropData.sampleImage}
                    aspectRatio="aspect-4/3"
                    showBadge={true}
                    showSyncIndicator={false}
                    language={language}
                  />
                </div>

                {/* Botanical Visual Traits Detected */}
                <div className="p-3.5 bg-[#F8FAF5] rounded-xl border border-[#DCE8DD] text-xs space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-[#163020] border-b border-[#DCE8DD] pb-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#166534]" />
                    <span>{t.scanner.visualFeaturesLabel}</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-[#163020]/80 leading-relaxed">
                    <p>
                      <strong className="text-[#163020] font-semibold">• {t.scanner.leafShapeLabel}:</strong>{" "}
                      {visionResult.visualFeatures.leafShape}
                    </p>
                    <p>
                      <strong className="text-[#163020] font-semibold">• {t.scanner.leafArrangementLabel}:</strong>{" "}
                      {visionResult.visualFeatures.leafArrangement}
                    </p>
                    <p>
                      <strong className="text-[#163020] font-semibold">• {t.scanner.plantStructureLabel}:</strong>{" "}
                      {visionResult.visualFeatures.plantStructure}
                    </p>
                    {visionResult.visualFeatures.stemCharacteristics && (
                      <p>
                        <strong className="text-[#163020] font-semibold">• {t.scanner.stemCharacteristicsLabel}:</strong>{" "}
                        {visionResult.visualFeatures.stemCharacteristics}
                      </p>
                    )}
                    {visionResult.visualFeatures.reproductiveParts && (
                      <p>
                        <strong className="text-[#163020] font-semibold">• Flowers / Seeds / Pods:</strong>{" "}
                        {visionResult.visualFeatures.reproductiveParts}
                      </p>
                    )}
                    <p>
                      <strong className="text-[#163020] font-semibold">• {t.scanner.overallAppearanceLabel}:</strong>{" "}
                      {visionResult.visualFeatures.overallAppearance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Identification, Health, Severity & Resolution */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  {/* Crop Name & Confidence */}
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#DCE8DD] pb-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#166534]">
                        {t.scanner.cropIdentified}
                      </span>
                      <h3 className="text-2xl font-black text-[#163020] tracking-tight">
                        {getLocalizedCropName(visionResult.cropData, language)}
                      </h3>
                      {visionResult.scientificName && (
                        <p className="text-xs italic text-[#64748B]">
                          {visionResult.scientificName} • {visionResult.category || visionResult.cropData.category}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase block">
                        {t.scanner.confidenceLabel}
                      </span>
                      <span className="inline-block px-3 py-1 bg-[#F8FAF5] text-[#166534] text-xs font-black rounded-lg border border-[#DCE8DD]">
                        {visionResult.confidence} ({visionResult.confidenceScore}%)
                      </span>
                      <p className="text-[9px] text-[#64748B] mt-0.5">
                        {isHi ? "छवि से 100% निश्चितता का दावा नहीं" : "No 100% certainty claimed"}
                      </p>
                    </div>
                  </div>

                  {/* Health Issue & Severity */}
                  <div className="mt-3 p-3.5 bg-white rounded-xl border border-[#DCE8DD] space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#163020]">🔍 {t.scanner.possibleIssue}:</span>
                        <span className="text-sm font-extrabold text-[#163020]">
                          {getLocalizedIssueName(visionResult.cropData, language)}
                        </span>
                      </div>

                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase border ${
                          visionResult.healthSummary.severity === "High"
                            ? "bg-red-50 text-red-800 border-red-200"
                            : visionResult.healthSummary.severity === "Medium"
                            ? "bg-[#FACC15]/20 text-[#163020] border-[#FACC15]/60"
                            : "bg-[#F8FAF5] text-[#166534] border-[#DCE8DD]"
                        }`}
                      >
                        {t.scanner.severityLabel}: {visionResult.healthSummary.severity}
                      </span>
                    </div>

                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {getLocalizedPossibleCause(visionResult.cropData, language)}
                    </p>
                  </div>

                  {/* Recommended Action Preview */}
                  <div className="mt-3 p-3.5 bg-[#166534] text-white rounded-xl shadow-2xs space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#FACC15]">
                      <span>💡 {t.scanner.recommendedAction}</span>
                    </div>
                    <p className="text-xs text-white/90 leading-relaxed">
                      {visionResult.recommendedResolution[0]
                        ? isHi
                          ? visionResult.recommendedResolution[0].title_hi || visionResult.recommendedResolution[0].title_en
                          : visionResult.recommendedResolution[0].title_en
                        : "Follow immediate crop canopy isolation and certified treatment."}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      if (onAskAiQuery) {
                        const cropName = getLocalizedCropName(visionResult.cropData, language).split("(")[0].trim();
                        onAskAiQuery(
                          isHi
                            ? `मेरी ${cropName} की फसल में ${getLocalizedIssueName(visionResult.cropData, language).split("(")[0].trim()} की पुष्टि करें और उपाय बताएं।`
                            : `Please confirm diagnosis for ${cropName} and explain the resolution protocol.`
                        );
                      } else if (onOpenAiAgent) {
                        onOpenAiAgent();
                      }
                    }}
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#163020] hover:bg-[#163020]/90 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
                    id="btn-ask-ai-from-scanner"
                  >
                    <MessageSquare className="w-4 h-4 text-[#22C55E]" />
                    <span>{t.scanner.askAiAgent}</span>
                  </button>

                  <button
                    onClick={handleContinueNext}
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-sm transition-all cursor-pointer"
                    id="btn-continue-from-scanner"
                  >
                    <span>{t.scanner.continueToFarmAnalysis}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleResetScanner}
                    className="p-3 bg-[#F8FAF5] hover:bg-[#DCE8DD]/40 text-[#163020] border border-[#DCE8DD] rounded-xl transition-colors cursor-pointer"
                    title={t.scanner.scanAgain}
                    id="btn-scan-again"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SCANNER RESULT STATE: 2. UNCERTAIN CROP STATE */}
        {/* =================================================================== */}
        {!isAnalyzing && visionResult && visionResult.status === "uncertain" && (
          <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-[#F8FAF5] border border-[#FACC15] text-[#163020] text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FACC15]/20 text-[#163020] flex items-center justify-center mx-auto shadow-inner border border-[#FACC15]/40">
              <HelpCircle className="w-8 h-8 text-[#166534]" />
            </div>
            <div className="max-w-xl mx-auto">
              <h3 className="text-lg sm:text-xl font-black text-[#163020] mb-2">
                {isHi ? "फसल की पहचान अनिश्चित है" : "Crop Identification is Uncertain"}
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4">
                {visionResult.uncertaintyReason
                  ? isHi
                    ? visionResult.uncertaintyReason.reason_hi
                    : visionResult.uncertaintyReason.reason_en
                  : t.scanner.uncertainMessage}
              </p>
              <div className="p-3 bg-white rounded-xl border border-[#DCE8DD] text-xs text-[#163020] text-left mb-6">
                <p className="font-bold text-[#163020] mb-1">💡 {isHi ? "स्पष्ट फोटो लेने के सुझाव:" : "Tips for a clear photo:"}</p>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-[#64748B]">
                  <li>{isHi ? "दिन के प्राकृतिक उजाले में फोटो लें ताकि पत्तियों का असली रंग दिखे।" : "Capture in good natural daylight to reveal true plant colors."}</li>
                  <li>{isHi ? "पत्ती के आकार, फूलों व तने को साफ फोकस में रखें।" : "Ensure leaf shape, veins, and floral parts are sharp and clear."}</li>
                  <li>{isHi ? "कैमरा को स्थिर रखें ताकि फोटो धुंधली न हो।" : "Hold the camera steady to avoid motion blur."}</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleStartCamera}
                className="flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white font-bold px-5 py-2.5 rounded-xl shadow-xs text-xs sm:text-sm cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#22C55E]" />
                <span>{t.scanner.takePhotoButton}</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 bg-[#163020] hover:bg-[#163020]/90 text-white font-bold px-5 py-2.5 rounded-xl shadow-xs text-xs sm:text-sm cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>{t.scanner.uploadButton}</span>
              </button>
              <button
                onClick={handleResetScanner}
                className="px-4 py-2.5 bg-white border border-[#DCE8DD] hover:bg-[#F8FAF5] text-[#163020] font-semibold rounded-xl text-xs cursor-pointer"
              >
                {t.scanner.orChooseSample}
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SCANNER RESULT STATE: 3. MULTIPLE CROPS DETECTED */}
        {/* =================================================================== */}
        {!isAnalyzing && visionResult && visionResult.status === "multiple_crops" && (
          <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-[#F8FAF5] border border-[#DCE8DD] text-[#163020] space-y-5">
            <div className="text-center max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-white text-[#166534] border border-[#DCE8DD] flex items-center justify-center mx-auto mb-2 shadow-2xs">
                <Layers className="w-6 h-6 text-[#22C55E]" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#163020] mb-1">
                {t.scanner.multipleCropsTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B]">
                {t.scanner.selectWhichCrop}
              </p>
            </div>

            {/* Candidate Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(visionResult.multipleCropOptions || []).map((candidate) => (
                <button
                  key={candidate.cropId}
                  onClick={() => handleSelectCandidateCrop(candidate)}
                  className="p-4 bg-white rounded-2xl border border-[#DCE8DD] hover:border-[#22C55E] hover:shadow-sm transition-all text-left group cursor-pointer"
                  id={`btn-select-candidate-${candidate.cropId}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{candidate.emoji}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F8FAF5] text-[#166534] border border-[#DCE8DD]">
                      {candidate.confidence}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-[#163020] group-hover:text-[#166534]">
                    {isHi ? candidate.cropName_hi : candidate.cropName_en}
                  </h4>
                  <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2">
                    {isHi ? candidate.visualClue_hi : candidate.visualClue_en}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#166534]">
                    <span>{isHi ? "इस फसल का विश्लेषण करें" : "Analyze this crop"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#22C55E]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* DEFAULT UPLOAD / CAMERA VIEW (When no result or after reset) */}
        {/* =================================================================== */}
        {!isAnalyzing && !visionResult && (
          <>
            {/* Synchronized Crop Visual Search & Auto-Update Selector */}
            <div className="mb-6">
              <CropSearchSelector
                language={language}
                onSelectCrop={handleSelectSearchCrop}
                showPhotoPreview={true}
                actionButtonLabel={isHi ? "इस फसल का विश्लेषण शुरू करें" : "Analyze this crop"}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* 1. Take Photo Button */}
              <button
                type="button"
                onClick={handleStartCamera}
                className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-[#166534] bg-[#F8FAF5] hover:bg-white text-[#163020] shadow-2xs hover:shadow-md transition-all duration-200 group cursor-pointer"
                id="btn-take-photo-large"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#166534] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-3">
                  <Camera className="w-8 h-8 text-[#22C55E]" />
                </div>
                <span className="text-lg font-bold text-[#166534]">
                  [ 📷 {t.scanner.takePhotoButton} ]
                </span>
                <span className="text-xs text-[#64748B] mt-1">
                  {t.scanner.subtitle}
                </span>
              </button>

              {/* 2. Upload Image Button */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-[#DCE8DD] hover:border-[#166534] bg-white hover:bg-[#F8FAF5] text-[#163020] shadow-2xs hover:shadow-md transition-all duration-200 group cursor-pointer"
                id="btn-upload-image-large"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-16 h-16 rounded-2xl bg-[#163020] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-3">
                  <Upload className="w-8 h-8 text-[#DCE8DD]" />
                </div>
                <span className="text-lg font-bold text-[#163020]">
                  [ 🖼 {t.scanner.uploadButton} ]
                </span>
                <span className="text-xs text-[#64748B] mt-1">
                  {t.scanner.dragDropText}
                </span>
              </div>
            </div>

            {/* Test Samples & Simulation Testers */}
            <div className="pt-6 border-t border-[#DCE8DD]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  {t.scanner.orChooseSample}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSelectUnclearTest}
                    className="text-[10px] bg-[#FACC15]/20 hover:bg-[#FACC15]/30 text-[#163020] border border-[#FACC15]/50 px-2.5 py-1 rounded-full font-semibold transition-colors cursor-pointer"
                    title="Test Unclear/Blurry State"
                  >
                    🌫️ {isHi ? "धुंधली फोटो टेस्ट" : "Test Blur/Unclear"}
                  </button>
                  <button
                    onClick={handleSelectMultiCropTest}
                    className="text-[10px] bg-[#F8FAF5] hover:bg-[#DCE8DD]/40 text-[#166534] border border-[#DCE8DD] px-2.5 py-1 rounded-full font-semibold transition-colors cursor-pointer"
                    title="Test Multiple Crops Detection"
                  >
                    🌾🌱 {isHi ? "मिश्रित फसल टेस्ट" : "Test Multi-Crop"}
                  </button>
                </div>
              </div>

              {/* 8 Curated Agricultural Crop Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SAMPLE_CROPS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className="flex flex-col items-center text-center p-2.5 rounded-xl border border-[#DCE8DD] bg-white hover:bg-[#F8FAF5] hover:border-[#22C55E] hover:shadow-xs transition-all duration-150 group text-left cursor-pointer"
                    id={`sample-crop-${sample.id}`}
                  >
                    <div className="w-full aspect-4/3 rounded-lg overflow-hidden bg-[#F8FAF5] mb-2 relative border border-[#DCE8DD]">
                      <img
                        src={sample.sampleImage}
                        alt={getLocalizedCropName(sample, language).split("(")[0].trim() || sample.cropName_hi || sample.cropName_en}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
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
                    <div className="w-full">
                      <p className="text-xs font-bold text-[#163020] truncate">
                        {getLocalizedCropName(sample, language).split("(")[0]}
                      </p>
                      <p className="text-[10px] text-[#166534] font-medium truncate">
                        {getLocalizedIssueName(sample, language).split("(")[0]}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Clear Demonstration Disclaimer */}
        <div className="mt-6 pt-4 border-t border-[#DCE8DD] flex items-start gap-2.5 text-[#64748B] text-xs">
          <AlertCircle className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t.scanner.demoNotice}
          </p>
        </div>
      </div>
    </div>
  );
};
