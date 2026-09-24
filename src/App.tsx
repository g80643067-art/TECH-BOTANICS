/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { JourneyIndicator } from "./components/JourneyIndicator";
import { JourneyVisualFlow } from "./components/JourneyVisualFlow";
import { LanguageStep } from "./components/LanguageStep";
import { ScannerStep } from "./components/ScannerStep";
import { LocationStep } from "./components/LocationStep";
import { SoilStep } from "./components/SoilStep";
import { DetectionStep } from "./components/DetectionStep";
import { ResolutionStep } from "./components/ResolutionStep";
import { SuccessStep } from "./components/SuccessStep";
import { EscalationStep } from "./components/EscalationStep";
import { FloatingAiAgent } from "./components/FloatingAiAgent";
import { ConfigModal } from "./components/ConfigModal";
import { ReportModal } from "./components/ReportModal";
import { CropHealthVoiceAssistant } from "./components/CropHealthVoiceAssistant";
import { PWAInstallButton } from "./components/PWAInstallButton";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { CropIssueData, FarmLocation, Language, SoilOption, StepNumber, VisionAnalysisResult } from "./types";
import { SAMPLE_CROPS } from "./data/mockCrops";
import { SOIL_OPTIONS } from "./data/soilTypes";
import { INDIAN_STATES_DATA, buildManualFarmLocation } from "./data/locations";

export default function App() {
  // Navigation Mode: "voice-assistant" (Fasal Health Check with AI Female Voice) or "pipeline" (7-Step Journey)
  const [activeSection, setActiveSection] = useState<"voice-assistant" | "pipeline">("voice-assistant");

  // Session State
  const [language, setLanguage] = useState<Language>("hi");
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [resolutionOutcome, setResolutionOutcome] = useState<"resolved" | "unresolved" | null>(null);

  // Core Journey State
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [detectedCrop, setDetectedCrop] = useState<CropIssueData | null>(SAMPLE_CROPS[0]);
  const [visionResult, setVisionResult] = useState<VisionAnalysisResult | null>(null);
  const [location, setLocation] = useState<FarmLocation | null>(() =>
    buildManualFarmLocation(INDIAN_STATES_DATA[0].state, INDIAN_STATES_DATA[0].districts[0].name_en)
  );
  const [soilType, setSoilType] = useState<SoilOption | null>(SOIL_OPTIONS[0]);

  // Modals & Floating Agent state
  const [isAiAgentOpen, setIsAiAgentOpen] = useState<boolean>(false);
  const [externalAiQuery, setExternalAiQuery] = useState<string | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [expertPhoneNumber, setExpertPhoneNumber] = useState<string>("+91 98765 43210");

  const handleAskAiQuery = (queryText: string) => {
    setExternalAiQuery(queryText);
    setIsAiAgentOpen(true);
  };

  // Step 1: Language selection -> Automatically continue to Step 2 (Scanner)
  const handleSelectLanguage = (selectedLang: Language) => {
    setLanguage(selectedLang);
    setCurrentStep(2);
  };

  // Step 2: Crop Scan Completed -> Continue to Step 3 (Location)
  const handleScanComplete = (image: string, crop: CropIssueData, result?: VisionAnalysisResult) => {
    setCropImage(image);
    setDetectedCrop(crop);
    if (result) {
      setVisionResult(result);
    }
    setCurrentStep(3);
  };

  // Step 3: Location Selected -> Continue to Step 4 (Soil)
  const handleLocationSelected = (selectedLoc: FarmLocation) => {
    setLocation(selectedLoc);
    setCurrentStep(4);
  };

  // Step 4: Soil Selected -> Continue to Step 5 (Detection)
  const handleSoilSelected = (selectedSoil: SoilOption) => {
    setSoilType(selectedSoil);
    setCurrentStep(5);
  };

  // Step 5: Issue Detection -> Continue to Step 6 (Resolution)
  const handleContinueToResolution = () => {
    setCurrentStep(6);
  };

  // Step 6 Decision: YES -> Step 7 (Success Screen)
  const handleSelectResolvedYes = () => {
    setResolutionOutcome("resolved");
    setCurrentStep(7);
  };

  // Step 6 Decision: NO -> Step 7 (Contact for Expert Resolution)
  const handleSelectResolvedNo = () => {
    setResolutionOutcome("unresolved");
    setCurrentStep(7);
  };

  // Reset Session
  const handleResetSession = () => {
    setCurrentStep(1);
    setResolutionOutcome(null);
    setCropImage(null);
    setDetectedCrop(SAMPLE_CROPS[0]);
    setVisionResult(null);
  };

  // Step Navigation Jump
  const handleNavigateStep = (step: StepNumber) => {
    setActiveSection("pipeline");
    setCurrentStep(step);
  };

  // Continue from Voice Assistant to Full Advisory
  const handleContinueFromVoiceToAdvisory = (cropIdOrName: string, image: string) => {
    if (image) setCropImage(image);
    const matched = SAMPLE_CROPS.find(
      (c) =>
        c.id === cropIdOrName ||
        c.cropName_en.toLowerCase().includes(cropIdOrName.toLowerCase()) ||
        c.cropName_hi.includes(cropIdOrName)
    );
    if (matched) {
      setDetectedCrop(matched);
    }
    setActiveSection("pipeline");
    setCurrentStep(3); // proceed to location & soil customization
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] text-[#163020] flex flex-col font-sans selection:bg-[#FACC15]/30 selection:text-[#163020]">
      {/* Top Application Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        currentStep={currentStep}
        onNavigateStep={handleNavigateStep}
        expertPhoneNumber={expertPhoneNumber}
        onOpenConfig={() => setIsConfigOpen(true)}
        onReset={handleResetSession}
        onOpenAiAgent={() => setIsAiAgentOpen(true)}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      {/* Mode Selector Pill Bar */}
      <div className="w-full max-w-6xl mx-auto px-4 pt-4 pb-1 flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#DCE8DD] shadow-2xs">
          <button
            onClick={() => setActiveSection("voice-assistant")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeSection === "voice-assistant"
                ? "bg-[#166534] text-white shadow-xs"
                : "text-[#163020] hover:bg-[#F8FAF5]"
            }`}
            id="tab-voice-assistant"
          >
            <span>🎙️ फसल हेल्थ AI (वॉइस असिस्टेंट)</span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] bg-[#22C55E] text-white font-bold">
              NEW
            </span>
          </button>
          <button
            onClick={() => setActiveSection("pipeline")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeSection === "pipeline"
                ? "bg-[#166534] text-white shadow-xs"
                : "text-[#163020] hover:bg-[#F8FAF5]"
            }`}
            id="tab-farm-pipeline"
          >
            <span>🌾 संपूर्ण कृषि यात्रा (7-Step Journey)</span>
          </button>
        </div>
      </div>

      {/* Main Centered Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-6 flex flex-col justify-start">
        {/* SECTION 1: AI-POWERED CROP HEALTH VOICE ASSISTANT */}
        {activeSection === "voice-assistant" && (
          <CropHealthVoiceAssistant
            onContinueToFullAdvisory={handleContinueFromVoiceToAdvisory}
            expertPhoneNumber={expertPhoneNumber}
          />
        )}

        {/* SECTION 2: 7-STEP COMPREHENSIVE ADVISORY PIPELINE */}
        {activeSection === "pipeline" && (
          <>
            {/* 7-Step Interactive Pipeline Breadcrumb Indicator */}
            <JourneyIndicator
              language={language}
              currentStep={currentStep}
              onNavigateStep={handleNavigateStep}
              canNavigateBack={currentStep > 1}
            />

            {/* Visual End-to-End Pipeline Banner shown for Steps 2 to 7 */}
            {currentStep > 1 && (
              <JourneyVisualFlow
                language={language}
                currentStep={currentStep}
                onSelectStep={handleNavigateStep}
              />
            )}

        {/* Step 1: Language Selection */}
        {currentStep === 1 && (
          <LanguageStep
            currentLanguage={language}
            onSelectLanguage={handleSelectLanguage}
          />
        )}

        {/* Step 2: Crop Scanner */}
        {currentStep === 2 && (
          <ScannerStep
            language={language}
            onScanComplete={handleScanComplete}
            savedImage={cropImage}
            savedCrop={detectedCrop}
            location={location}
            soilType={soilType}
            onAskAiQuery={handleAskAiQuery}
            onOpenAiAgent={() => setIsAiAgentOpen(true)}
          />
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <LocationStep
            language={language}
            onLocationSelected={handleLocationSelected}
            savedLocation={location}
            onAskAiQuery={handleAskAiQuery}
          />
        )}

        {/* Step 4: Soil Type */}
        {currentStep === 4 && (
          <SoilStep
            language={language}
            onSoilSelected={handleSoilSelected}
            savedSoil={soilType}
          />
        )}

        {/* Step 5: Issue Detection */}
        {currentStep === 5 && detectedCrop && (
          <DetectionStep
            language={language}
            cropData={detectedCrop}
            cropImage={cropImage}
            location={location}
            soilType={soilType}
            visionResult={visionResult}
            onContinueToResolution={handleContinueToResolution}
          />
        )}

        {/* Step 6: Problem Resolution */}
        {currentStep === 6 && detectedCrop && (
          <ResolutionStep
            language={language}
            cropData={detectedCrop}
            onSelectResolved={handleSelectResolvedYes}
            onSelectNotResolved={handleSelectResolvedNo}
            onOpenAiAgent={() => setIsAiAgentOpen(true)}
          />
        )}

        {/* Step 7: Resolved (Success) OR Unresolved (Contact Expert) */}
        {currentStep === 7 && detectedCrop && (
          <>
            {resolutionOutcome === "unresolved" ? (
              <EscalationStep
                language={language}
                cropData={detectedCrop}
                cropImage={cropImage}
                location={location}
                soilType={soilType}
                expertPhoneNumber={expertPhoneNumber}
                onScanAgain={handleResetSession}
              />
            ) : (
              <SuccessStep
                language={language}
                cropData={detectedCrop}
                location={location}
                soilType={soilType}
                onScanAgain={handleResetSession}
                onOpenReportModal={() => setIsReportOpen(true)}
              />
            )}
          </>
        )}
          </>
        )}
      </main>

      {/* Floating AI Agent Advisor */}
      <FloatingAiAgent
        language={language}
        isOpen={isAiAgentOpen}
        onToggle={() => setIsAiAgentOpen(!isAiAgentOpen)}
        cropData={detectedCrop}
        cropImage={cropImage}
        location={location}
        soilType={soilType}
        visionResult={visionResult}
        externalQuery={externalAiQuery}
        onClearExternalQuery={() => setExternalAiQuery(null)}
      />

      {/* Settings / Config Modal */}
      <ConfigModal
        language={language}
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        expertPhoneNumber={expertPhoneNumber}
        onUpdatePhoneNumber={setExpertPhoneNumber}
        onResetSession={handleResetSession}
      />

      {/* Diagnostic Report Certificate Modal */}
      {detectedCrop && (
        <ReportModal
          language={language}
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          cropData={detectedCrop}
          cropImage={cropImage}
          location={location}
          soilType={soilType}
        />
      )}

      {/* PWA Device Installation Floating Banner */}
      <PWAInstallButton isHindi={language === "hi"} variant="floating-banner" />

      {/* Connectivity & Offline Status Indicator */}
      <OfflineIndicator isHindi={language === "hi"} />

      {/* Minimal Footer */}
      <footer className="bg-[#163020] text-[#DCE8DD]/80 py-6 px-4 text-xs text-center border-t border-[#166534]/40">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white tracking-wide">KRISHISETU AI</span>
            <span className="text-[#22C55E]">•</span>
            <span>{language === "hi" ? "किसान-प्रथम सरल फसल निदान प्रणाली" : "Farmer-First Guided Agricultural Intelligence"}</span>
          </div>
          <div className="flex items-center gap-4 text-[#DCE8DD]/70">
            <span>Kisan Call Center: 1800-180-1551</span>
            <span>•</span>
            <button
              onClick={() => setIsConfigOpen(true)}
              className="text-[#DCE8DD] hover:text-white underline decoration-[#22C55E]/60 hover:decoration-[#22C55E] transition-colors cursor-pointer"
            >
              {language === "hi" ? "हेल्पलाइन सेटिंग्स" : "Helpline Settings"}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

