import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  Upload,
  Volume2,
  VolumeX,
  RotateCcw,
  Leaf,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Phone,
  ArrowRight,
  Maximize2,
  X,
  FileQuestion,
  RefreshCw,
} from "lucide-react";
import { CropHealthVoiceAnalysis } from "../types";
import {
  analyzeCropForVoiceAssistant,
  speakCropHealthVoice,
  stopCropHealthVoice,
} from "../services/voiceAssistantService";
import { SAMPLE_CROPS } from "../data/mockCrops";
import { SynchronizedCropPhoto } from "./SynchronizedCropPhoto";
import { CropSearchSelector } from "./CropSearchSelector";

interface CropHealthVoiceAssistantProps {
  onContinueToFullAdvisory?: (cropId: string, image: string) => void;
  expertPhoneNumber?: string;
}

export const CropHealthVoiceAssistant: React.FC<CropHealthVoiceAssistantProps> = ({
  onContinueToFullAdvisory,
  expertPhoneNumber = "1800-180-1551",
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<CropHealthVoiceAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Audio Voice State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showVoiceScript, setShowVoiceScript] = useState<boolean>(false);
  const [showEnlargedImage, setShowEnlargedImage] = useState<boolean>(false);

  // Camera capture modal state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop voice on unmount
  useEffect(() => {
    return () => {
      stopCropHealthVoice();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // Handle Photo Analysis & Trigger Automatic Hindi Voice
  const handleAnalyzeImage = async (
    imageData: string,
    sampleId?: string,
    preferredCropId?: string
  ) => {
    stopCropHealthVoice();
    setIsSpeaking(false);
    setSelectedImage(imageData);
    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeCropForVoiceAssistant({
        image: imageData,
        sampleId,
        preferredCropId,
      });

      setAnalysisResult(result);
      setIsAnalyzing(false);

      // Automatically speak the explanation in natural, friendly Hindi
      const textToSpeak = result.status === "uncertain"
        ? result.uncertainMessage_hi || result.voiceScript_hi
        : result.voiceScript_hi;

      if (textToSpeak) {
        // Small 300ms pause for smoother UX after UI render
        setTimeout(() => {
          speakCropHealthVoice(textToSpeak, {
            onStart: () => setIsSpeaking(true),
            onEnd: () => setIsSpeaking(false),
            onError: () => setIsSpeaking(false),
          });
        }, 300);
      }
    } catch (err: any) {
      console.error("Analysis failed:", err);
      setIsAnalyzing(false);
      setErrorMessage(
        "विश्लेषण में कुछ समस्या आई। कृपया दोबारा प्रयास करें या एक स्पष्ट फोटो लें।"
      );
    }
  };

  // Replay voice ("Listen Again")
  const handleListenAgain = () => {
    if (!analysisResult) return;
    const textToSpeak = analysisResult.status === "uncertain"
      ? analysisResult.uncertainMessage_hi || analysisResult.voiceScript_hi
      : analysisResult.voiceScript_hi;

    if (textToSpeak) {
      stopCropHealthVoice();
      speakCropHealthVoice(textToSpeak, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  const handleStopVoice = () => {
    stopCropHealthVoice();
    setIsSpeaking(false);
  };

  // File picker handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        handleAnalyzeImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
    // Reset file input
    e.target.value = "";
  };

  // Search/Select handler for synchronized crop visual selection
  const handleSelectCropFromSelector = (cropName: string, resolvedUrl: string, sampleCropId?: string) => {
    if (sampleCropId) {
      const sample = SAMPLE_CROPS.find((c) => c.id === sampleCropId);
      if (sample) {
        handleAnalyzeImage(resolvedUrl || sample.sampleImage, sample.id, sample.id);
        return;
      }
    }
    handleAnalyzeImage(resolvedUrl, undefined, cropName);
  };

  // Live Camera handlers
  const handleStartCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.warn("Camera access failed:", err);
      setIsCameraActive(false);
      alert("कैमरा एक्सेस नहीं हो सका। कृपया फ़ाइल अपलोड विकल्प का उपयोग करें।");
    }
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.88);

    // Stop camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);

    handleAnalyzeImage(dataUrl);
  };

  const handleCloseCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Reset scanner
  const handleReset = () => {
    stopCropHealthVoice();
    setIsSpeaking(false);
    setSelectedImage(null);
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6" id="crop-health-voice-assistant-section">
      {/* 1. Header & Title Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8DD] shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#166534]/10 text-[#166534] text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span>🎙️ AI Crop Health Voice Assistant</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#163020] tracking-tight">
              फसल स्वास्थ्य जांच व वॉइस असिस्टेंट
            </h1>
            <p className="text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
              अपनी फसल की पत्ती या पौधे की फोटो लें। हमारी एआई कृषि सहायिका तुरंत बीमारी, लक्षण और सुरक्षित उपचार की सरल हिंदी में बोलकर जानकारी देगी।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${expertPhoneNumber.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#166534] bg-[#F8FAF5] hover:bg-[#DCE8DD]/40 border border-[#DCE8DD] px-3.5 py-2 rounded-xl transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>किसान हेल्पलाइन: {expertPhoneNumber}</span>
            </a>
          </div>
        </div>

        {/* REQUIRED PHOTO GUIDANCE BANNER */}
        <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-[#F8FAF5] border border-[#22C55E]/40 flex items-start gap-3">
          <div className="w-7 h-7 rounded-xl bg-[#22C55E]/20 text-[#166534] flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
            💡
          </div>
          <div className="text-xs sm:text-sm text-[#163020] leading-relaxed">
            <strong className="text-[#166534] font-bold">फोटो निर्देश: </strong>
            Clear photo lein — affected leaf ke paas se aur poore paudhe ki ek photo bhejna behtar rahega.
          </div>
        </div>
      </div>

      {/* 2. Upload / Photo Capture State (When no image or after reset) */}
      {!analysisResult && !isAnalyzing && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8DD] shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Take Photo Button */}
            <button
              onClick={handleStartCamera}
              className="flex flex-col items-center justify-center p-8 sm:p-10 rounded-2xl border-2 border-[#166534] bg-[#F8FAF5] hover:bg-white text-[#163020] hover:shadow-md transition-all group cursor-pointer"
              id="voice-btn-take-photo"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#166534] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform mb-3">
                <Camera className="w-8 h-8 text-[#22C55E]" />
              </div>
              <span className="text-lg font-bold text-[#166534]">
                📷 फोटो खींचें (Take Photo)
              </span>
              <span className="text-xs text-[#64748B] mt-1 text-center">
                कैमरे से पौधे या प्रभावित पत्ती की सीधी फोटो लें
              </span>
            </button>

            {/* Upload from Gallery Button */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center p-8 sm:p-10 rounded-2xl border-2 border-dashed border-[#DCE8DD] hover:border-[#166534] bg-white hover:bg-[#F8FAF5] text-[#163020] hover:shadow-md transition-all group cursor-pointer"
              id="voice-btn-upload-photo"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-2xl bg-[#163020] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform mb-3">
                <Upload className="w-8 h-8 text-[#22C55E]" />
              </div>
              <span className="text-lg font-bold text-[#163020]">
                🖼️ फोटो अपलोड करें (Upload Image)
              </span>
              <span className="text-xs text-[#64748B] mt-1 text-center">
                फ़ोन गैलरी से साफ फोटो चुनें या यहाँ खींच कर छोड़ें
              </span>
            </div>
          </div>

          {/* Synchronized Crop Visual Search & Auto-Update Selector */}
          <div className="mb-6">
            <CropSearchSelector
              language="hi"
              onSelectCrop={handleSelectCropFromSelector}
              showPhotoPreview={true}
              actionButtonLabel="इस फसल की स्वास्थ्य जांच व आवाज सलाह शुरू करें"
            />
          </div>

          {/* Quick Test Samples */}
          <div className="pt-6 border-t border-[#DCE8DD]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                या त्वरित परीक्षण के लिए फसल चुनें (Quick Test):
              </span>
              <button
                onClick={() =>
                  handleAnalyzeImage(
                    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=40",
                    "unclear-blurry"
                  )
                }
                className="inline-flex items-center gap-1.5 text-xs bg-[#FACC15]/20 hover:bg-[#FACC15]/30 text-[#163020] border border-[#FACC15]/60 px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer"
                title="कम स्पष्टता / धुंधली फोटो की सटीकता जांचें"
              >
                <FileQuestion className="w-3.5 h-3.5 text-[#166534]" />
                <span>🌫️ धुंधली फोटो टेस्ट (Unclear Accuracy Test)</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SAMPLE_CROPS.slice(0, 8).map((sample) => (
                <button
                  key={sample.id}
                  onClick={() =>
                    handleAnalyzeImage(
                      sample.sampleImage,
                      sample.id,
                      sample.id
                    )
                  }
                  className="flex flex-col items-center text-center p-2.5 rounded-2xl border border-[#DCE8DD] bg-white hover:bg-[#F8FAF5] hover:border-[#22C55E] hover:shadow-2xs transition-all group cursor-pointer"
                  id={`voice-sample-${sample.id}`}
                >
                  <div className="w-full aspect-4/3 rounded-xl overflow-hidden bg-[#F8FAF5] mb-2 relative border border-[#DCE8DD]">
                    <img
                      src={sample.sampleImage}
                      alt={sample.cropName_hi.split("(")[0].trim() || sample.cropName_hi}
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
                      {sample.cropName_hi.split("(")[0].trim()}
                    </p>
                    <p className="text-[11px] text-[#166534] font-medium truncate">
                      {sample.issueName_hi.split("(")[0].trim()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Analyzing State */}
      {isAnalyzing && (
        <div className="bg-white rounded-3xl p-10 sm:p-12 border border-[#DCE8DD] shadow-xs text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-[#DCE8DD] border-t-[#166534] animate-spin"></div>
            <div className="absolute inset-2 rounded-full bg-[#F8FAF5] flex items-center justify-center">
              <Leaf className="w-8 h-8 text-[#22C55E] animate-pulse" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#163020]">
              फसल व पत्तियों का विज़न विश्लेषण हो रहा है...
            </h3>
            <p className="text-xs text-[#64748B]">
              पौधे की पहचान, पत्ती के धब्बे व संभावित कारणों की जांच की जा रही है।
            </p>
          </div>
        </div>
      )}

      {/* Error Notice */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={handleReset}
            className="text-xs font-bold underline hover:text-red-950 cursor-pointer"
          >
            दोबारा प्रयास करें
          </button>
        </div>
      )}

      {/* 4. RESULT STATE: AI ANALYSIS CARD + ANIMATED FEMALE VOICE AGENT AVATAR */}
      {analysisResult && !isAnalyzing && (
        <div className="space-y-6">
          {/* Main Results Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8DD] shadow-sm space-y-6">
            
            {/* Top Bar: Voice Assistant Avatar & Voice Controls */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAF5] border border-[#DCE8DD] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* Animated AI Voice Avatar */}
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all ${
                      isSpeaking
                        ? "bg-[#166534] text-white ring-4 ring-[#22C55E]/30 scale-105"
                        : "bg-white text-[#166534] border border-[#DCE8DD]"
                    }`}
                  >
                    {/* Friendly female Krishi Assistant Avatar */}
                    <span className="text-2xl select-none">👩‍🌾</span>
                  </div>
                  {isSpeaking && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-[#22C55E]"></span>
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#163020]">
                      कृषि सहायिका (AI Voice)
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSpeaking
                          ? "bg-[#22C55E] text-white animate-pulse"
                          : "bg-white text-[#64748B] border border-[#DCE8DD]"
                      }`}
                    >
                      {isSpeaking ? "बोल रही हैं... 🔊" : "तैयार (Ready)"}
                    </span>
                  </div>

                  <p className="text-xs text-[#64748B] mt-0.5">
                    {isSpeaking
                      ? "कृषि सलाह स्पष्ट हिंदी में सुनाई जा रही है..."
                      : "प्राकृतिक और सरल हिंदी में सलाह सुनने के लिए उपलब्ध"}
                  </p>
                </div>
              </div>

              {/* Voice Action Buttons: "Listen Again" & "Stop" */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleListenAgain}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                  id="btn-listen-again"
                  title="सलाह को दोबारा हिंदी में सुनें"
                >
                  <Volume2 className="w-4 h-4 text-[#22C55E]" />
                  <span>दोबारा सुनें (Listen Again)</span>
                </button>

                {isSpeaking && (
                  <button
                    onClick={handleStopVoice}
                    className="p-2.5 rounded-xl bg-white hover:bg-gray-100 text-[#163020] border border-[#DCE8DD] transition-all cursor-pointer"
                    title="आवाज रोकें"
                  >
                    <VolumeX className="w-4 h-4 text-red-600" />
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl bg-white hover:bg-gray-100 text-[#64748B] hover:text-[#163020] border border-[#DCE8DD] transition-all cursor-pointer"
                  title="नया स्कैन करें"
                  id="btn-voice-reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Voice Soundwaves Animation when Speaking */}
            {isSpeaking && (
              <div className="flex items-center justify-center gap-1.5 py-2 bg-[#F8FAF5] rounded-xl border border-[#22C55E]/30">
                <span className="text-[11px] font-bold text-[#166534] mr-2">
                  बोल रही हैं:
                </span>
                <span className="w-1 h-3 bg-[#22C55E] rounded-full animate-bounce [animation-delay:0ms]"></span>
                <span className="w-1 h-5 bg-[#166534] rounded-full animate-bounce [animation-delay:150ms]"></span>
                <span className="w-1 h-6 bg-[#22C55E] rounded-full animate-bounce [animation-delay:300ms]"></span>
                <span className="w-1 h-4 bg-[#166534] rounded-full animate-bounce [animation-delay:450ms]"></span>
                <span className="w-1 h-2 bg-[#22C55E] rounded-full animate-bounce [animation-delay:200ms]"></span>
              </div>
            )}

            {/* CASE A: UNCERTAIN CROP / LOW CONFIDENCE STATE */}
            {analysisResult.status === "uncertain" && (
              <div className="p-6 rounded-2xl bg-[#F8FAF5] border-2 border-[#FACC15] space-y-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#FACC15]/30 text-[#163020] flex items-center justify-center mx-auto shadow-xs">
                  <HelpCircle className="w-6 h-6 text-[#166534]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#163020]">
                    पहचान स्पष्ट नहीं हो पा रही है
                  </h3>
                  <div className="mt-2 p-3.5 bg-white rounded-xl border border-[#DCE8DD] text-xs sm:text-sm text-[#163020] font-medium leading-relaxed max-w-xl mx-auto shadow-2xs">
                    "Photo se pakka identify nahi ho pa raha hai. Kripya fasal ki ek aur clear photo bhejiye, jisme poora paudha aur affected leaf clearly dikhe."
                  </div>
                </div>

                <p className="text-xs text-[#64748B] max-w-md mx-auto">
                  हम अनुमान के आधार पर गलत सलाह नहीं देते। सटीक पहचान के लिए कृपया अच्छी रोशनी में पौधे की दूसरी फोटो लें।
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleStartCamera}
                    className="inline-flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-[#22C55E]" />
                    <span>📷 नई फोटो लें</span>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 bg-[#163020] hover:bg-[#163020]/90 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>🖼️ दूसरी फोटो अपलोड करें</span>
                  </button>
                </div>
              </div>
            )}

            {/* CASE B: IDENTIFIED CROP ANALYSIS */}
            {analysisResult.status === "identified" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Uploaded / Synchronized Crop Image Card */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="relative">
                    <SynchronizedCropPhoto
                      cropName={analysisResult.cropIdentified_hi || analysisResult.cropIdentified_en}
                      directImageUrl={selectedImage}
                      aspectRatio="aspect-4/3"
                      showBadge={true}
                      showSyncIndicator={false}
                      language="hi"
                      onEnlarge={() => setShowEnlargedImage(true)}
                    />
                  </div>

                  {/* Quick Notice */}
                  <div className="p-3 bg-[#F8FAF5] rounded-xl border border-[#DCE8DD] text-[11px] text-[#64748B] space-y-1">
                    <p className="font-semibold text-[#163020]">💡 एआई सटीकता टिप्पणी:</p>
                    <p>
                      यह विश्लेषण केवल फोटो में दिखने वाले लक्षणों पर आधारित है। कभी भी किसी रोग को 100% निश्चित न मानकर खेत की वास्तविक स्थिति भी जांचें।
                    </p>
                  </div>
                </div>

                {/* Right Column: Compact AI Analysis Breakdown Card */}
                <div className="lg:col-span-8 space-y-4">
                  
                  {/* 1. Crop Identified & Problem Summary */}
                  <div className="p-4 rounded-2xl bg-white border border-[#DCE8DD] shadow-2xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE8DD] pb-3">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-bold text-[#64748B]">
                          पहचानी गई फसल (Likely Crop)
                        </span>
                        <h4 className="text-base sm:text-lg font-extrabold text-[#166534]">
                          🌾 {analysisResult.cropIdentified_hi}
                        </h4>
                      </div>

                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F8FAF5] text-[#163020] border border-[#DCE8DD]">
                        विश्वास स्कोर: {analysisResult.confidenceScore || 90}%
                      </span>
                    </div>

                    {/* What Problem May Be Occurring */}
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-[#64748B]">
                        क्या समस्या हो सकती है (Possible Issue)
                      </span>
                      <p className="text-sm font-bold text-[#163020] mt-0.5">
                        ⚠️ {analysisResult.problem_hi}
                      </p>
                    </div>
                  </div>

                  {/* 2. Two-Column Symptoms & Causes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Visible Symptoms */}
                    <div className="p-3.5 rounded-2xl bg-[#F8FAF5] border border-[#DCE8DD] space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#166534]">
                        <span>🔍 दिखने वाले लक्षण:</span>
                      </div>
                      <p className="text-xs text-[#163020] leading-relaxed">
                        {analysisResult.symptoms_hi}
                      </p>
                    </div>

                    {/* Possible Causes */}
                    <div className="p-3.5 rounded-2xl bg-[#F8FAF5] border border-[#DCE8DD] space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#166534]">
                        <span>🧪 संभावित कारण:</span>
                      </div>
                      <p className="text-xs text-[#163020] leading-relaxed">
                        {analysisResult.causes_hi}
                      </p>
                    </div>
                  </div>

                  {/* 3. What Farmer Should Check Next */}
                  <div className="p-3.5 rounded-2xl bg-[#FACC15]/10 border border-[#FACC15]/40 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#163020]">
                      <span>📋 किसान भाई आगे क्या जांचें (Check Next):</span>
                    </div>
                    <p className="text-xs text-[#163020] leading-relaxed">
                      {analysisResult.checkNext_hi}
                    </p>
                  </div>

                  {/* 4. Safe / General Management Steps */}
                  <div className="p-4 rounded-2xl bg-white border border-[#DCE8DD] shadow-2xs space-y-2">
                    <div className="text-xs font-bold text-[#166534]">
                      🌱 सुरक्षित सामान्य प्रबंधन कदम (Safe Management):
                    </div>
                    <ul className="space-y-1.5">
                      {(analysisResult.managementSteps_hi || []).map((step, idx) => (
                        <li key={idx} className="text-xs text-[#163020] flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#166534] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 5. When to Consult Local Expert */}
                  <div className="p-3.5 rounded-2xl bg-[#166534] text-white space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#FACC15]">
                      <Phone className="w-3.5 h-3.5 text-[#FACC15]" />
                      <span>स्थानीय कृषि विशेषज्ञ से कब संपर्क करें:</span>
                    </div>
                    <p className="text-xs text-white/95 leading-relaxed">
                      {analysisResult.consultExpert_hi}
                    </p>
                  </div>

                  {/* Collapsible Spoken Hindi Voice Script for Reading Along */}
                  <div className="pt-1">
                    <button
                      onClick={() => setShowVoiceScript(!showVoiceScript)}
                      className="text-xs font-semibold text-[#64748B] hover:text-[#166534] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>📜 {showVoiceScript ? "वॉइस स्क्रिप्ट छिपाएं" : "सहायिका की पूरी वॉइस स्क्रिप्ट पढ़ें"}</span>
                    </button>

                    {showVoiceScript && (
                      <div className="mt-2 p-3.5 bg-[#F8FAF5] rounded-xl border border-[#DCE8DD] text-xs space-y-2">
                        <div>
                          <span className="font-bold text-[#166534] block mb-0.5">हिंदी में:</span>
                          <p className="text-[#163020] leading-relaxed">{analysisResult.voiceScript_hi}</p>
                        </div>
                        {analysisResult.voiceScript_roman && (
                          <div className="pt-2 border-t border-[#DCE8DD]">
                            <span className="font-bold text-[#64748B] block mb-0.5">Hinglish / Roman:</span>
                            <p className="text-[#64748B] italic leading-relaxed">{analysisResult.voiceScript_roman}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Bar: Continue to 7-Step Farm Advisory OR Scan Another */}
                  <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                    {onContinueToFullAdvisory && (
                      <button
                        onClick={() =>
                          onContinueToFullAdvisory(
                            analysisResult.cropIdentified_en || "mustard",
                            selectedImage || ""
                          )
                        }
                        className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-sm transition-all cursor-pointer"
                        id="btn-continue-to-farm-advisory"
                      >
                        <span>संपूर्ण कृषि सलाह व खेत योजना देखें</span>
                        <ArrowRight className="w-4 h-4 text-[#22C55E]" />
                      </button>
                    )}

                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F8FAF5] text-[#163020] border border-[#DCE8DD] text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl transition-all cursor-pointer"
                      id="btn-scan-another"
                    >
                      <RefreshCw className="w-4 h-4 text-[#64748B]" />
                      <span>दूसरी फसल जांचें</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Live Camera Capture Modal */}
      {isCameraActive && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl border border-[#DCE8DD]">
            <div className="p-4 bg-[#166534] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#22C55E]" />
                <span className="font-bold text-sm">पौधे या पत्ती की फोटो लें</span>
              </div>
              <button
                onClick={handleCloseCamera}
                className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-black aspect-4/3 flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-8 border-2 border-dashed border-[#22C55E]/70 rounded-2xl pointer-events-none flex items-center justify-center">
                <span className="text-[11px] text-white/90 bg-black/60 px-2.5 py-1 rounded-full font-medium">
                  पत्ती या पौधे को बीच में रखें
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAF5] flex items-center justify-between gap-3">
              <button
                onClick={handleCloseCamera}
                className="px-4 py-2.5 text-xs font-semibold text-[#64748B] hover:text-[#163020] cursor-pointer"
              >
                रद्द करें
              </button>
              <button
                onClick={handleCapturePhoto}
                className="flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#22C55E]" />
                <span>फोटो खींचें (Capture)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Enlarged Image Modal */}
      {showEnlargedImage && selectedImage && (
        <div
          onClick={() => setShowEnlargedImage(false)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-xs cursor-pointer"
        >
          <div className="relative max-w-2xl w-full">
            <img
              src={selectedImage}
              alt="Enlarged crop"
              className="w-full rounded-2xl shadow-2xl object-contain max-h-[85vh] mx-auto border border-white/20"
            />
            <button
              onClick={() => setShowEnlargedImage(false)}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
