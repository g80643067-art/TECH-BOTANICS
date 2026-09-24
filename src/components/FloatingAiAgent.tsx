import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Sprout,
  X,
  Send,
  Volume2,
  Minimize2,
  Maximize2,
  MapPin,
  Leaf,
} from "lucide-react";
import { ChatMessage, CropIssueData, FarmLocation, Language, SoilOption, VisionAnalysisResult } from "../types";
import { getTranslation } from "../data/translations";
import { getLocalizedCropName, getLocalizedIssueName } from "../data/mockCrops";
import { getLocalizedSoilName } from "../data/soilTypes";

interface FloatingAiAgentProps {
  language: Language;
  isOpen: boolean;
  onToggle: () => void;
  cropData: CropIssueData | null;
  cropImage: string | null;
  location: FarmLocation | null;
  soilType: SoilOption | null;
  visionResult?: VisionAnalysisResult | null;
  externalQuery?: string | null;
  onClearExternalQuery?: () => void;
}

export const FloatingAiAgent: React.FC<FloatingAiAgentProps> = ({
  language,
  isOpen,
  onToggle,
  cropData,
  cropImage,
  location,
  soilType,
  visionResult,
  externalQuery,
  onClearExternalQuery,
}) => {
  const t = getTranslation(language);
  const isHi = language === "hi";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize greeting on first session or language switch
  useEffect(() => {
    const cropDisplayName = cropData ? getLocalizedCropName(cropData, language).split("(")[0].trim() : "";
    const issueDisplayName = cropData ? getLocalizedIssueName(cropData, language).split("(")[0].trim() : "";
    const locName = location?.displayName || (isHi ? "आपके क्षेत्र" : "your area");

    const greetingText = isHi
      ? `नमस्ते किसान भाई! मैं कृषिसेतु एआई (KrishiSetu AI) सलाहकार हूँ।\n${
          cropData
            ? `• फसल: ${cropDisplayName} ('${issueDisplayName}')\n• स्थान: ${locName}\n\nआप फसल उपचार या "यहाँ कौन सी फसल उगानी चाहिए?" जैसे सवाल पूछ सकते हैं।`
            : `• स्थान: ${locName}\n\nआप अपनी फसल, मिट्टी या उपयुक्त फसलों के बारे में कोई भी प्रश्न पूछ सकते हैं।`
        }`
      : `Hello! I am your KrishiSetu AI Agro-Advisor.\n${
          cropData
            ? `• Active Crop: ${cropDisplayName} (${issueDisplayName})\n• Location: ${locName}\n\nAsk me about treatment protocols or "Which crops are suitable to grow here?".`
            : `• Location: ${locName}\n\nAsk me anything about crop diseases, soil nutrients, or regional crop recommendations.`
        }`;

    setMessages([
      {
        id: "msg-welcome",
        sender: "ai",
        text: greetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, [language, cropData?.id, location?.displayName]);

  // Handle external query triggers (e.g. from location cards)
  useEffect(() => {
    if (externalQuery && isOpen) {
      handleSendMessage(externalQuery);
      if (onClearExternalQuery) {
        onClearExternalQuery();
      }
    }
  }, [externalQuery, isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const sessionContext = {
        cropName: cropData?.cropName_en,
        cropName_hi: cropData?.cropName_hi,
        issueName: cropData?.issueName_en,
        issueName_hi: cropData?.issueName_hi,
        severity: cropData?.severity,
        possibleCause: cropData?.possibleCause_en,
        possibleCause_hi: cropData?.possibleCause_hi,
        steps: cropData?.steps,
        location: location,
        soilType: soilType ? getLocalizedSoilName(soilType, language) : undefined,
        visionAnalysis: visionResult
          ? {
              cropIdentified: visionResult.cropData.cropName_en,
              confidence: visionResult.confidence,
              confidenceScore: visionResult.confidenceScore,
              visualFeatures: visionResult.visualFeatures,
              healthSummary: visionResult.healthSummary,
            }
          : undefined,
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          language,
          sessionContext,
        }),
      });

      const data = await res.json();
      const aiReply = data.reply || (isHi ? "क्षमा करें, मैं आपका अनुरोध संसाधित नहीं कर सका।" : "Sorry, I could not process your query.");

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const fallbackAiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: isHi
          ? "वर्तमान में सर्वर संपर्क धीमा है। कृपया अनुशंसित उपचार योजना का पालन करें या विशेषज्ञ सहायता विकल्प चुनें।"
          : "Network connectivity is delayed. Please review the 4-step resolution plan or use the expert helpline.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isHi ? "hi-IN" : "en-IN";
      window.speechSynthesis.speak(utterance);
    }
  };

  // Localized quick query chips
  const dynamicSuggestedQuestions = isHi
    ? [
        "यहाँ कौन सी फसल उगानी चाहिए?",
        "फसल में क्या समस्या है?",
        "मुझे सबसे पहले क्या उपाय करना चाहिए?",
        "क्या यह रोग गंभीर है?",
      ]
    : [
        "Which crops are suitable to grow here?",
        "What is wrong with my crop?",
        "What should I do first?",
        "Is this disease severe?",
      ];

  return (
    <>
      {/* Floating Trigger Button on Bottom-Right */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 bg-[#166534] hover:bg-[#14532d] text-white font-extrabold px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl border border-[#22C55E]/40 transition-all duration-200 hover:scale-105 active:scale-95 group cursor-pointer"
          id="btn-floating-ai-agent"
          title={t.aiAgent.buttonText}
        >
          <div className="w-8 h-8 rounded-full bg-white text-[#166534] flex items-center justify-center shadow-xs">
            <MessageSquare className="w-5 h-5 text-[#166534]" />
          </div>
          <span className="text-xs sm:text-sm font-black tracking-wide">
            {t.aiAgent.buttonText}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-ping" />
        </button>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-200 shadow-xl flex flex-col overflow-hidden bg-white border border-[#DCE8DD] ${
            isExpanded
              ? "inset-4 sm:inset-10 rounded-3xl"
              : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[410px] h-[580px] max-h-[88vh] rounded-3xl"
          }`}
          id="ai-agent-chat-modal"
        >
          {/* Header */}
          <div className="bg-[#166534] text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-[#DCE8DD] shadow-inner">
                <Sprout className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>{t.aiAgent.title}</span>
                  <span className="text-[10px] bg-white/20 text-[#DCE8DD] px-1.5 py-0.2 rounded-sm font-mono">
                    Agro-AI
                  </span>
                </h3>
                <p className="text-[11px] text-[#DCE8DD] line-clamp-1">
                  {location?.displayName ? `📍 ${location.displayName}` : t.aiAgent.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4 text-white" />}
              </button>
              <button
                onClick={onToggle}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Context Quick Pills Indicator */}
          <div className="bg-[#F8FAF5] px-4 py-2 border-b border-[#DCE8DD] flex items-center gap-2 overflow-x-auto text-[10px] text-[#166534] font-semibold no-scrollbar shrink-0">
            {location && (
              <span className="bg-white px-2 py-0.5 rounded-md border border-[#DCE8DD] shrink-0 flex items-center gap-1 text-[#163020]">
                <MapPin className="w-3 h-3 text-[#166534]" />
                <span>{location.villageOrArea || location.district.split("(")[0]}</span>
              </span>
            )}
            {cropData && (
              <span className="bg-white px-2 py-0.5 rounded-md border border-[#DCE8DD] shrink-0 flex items-center gap-1 text-[#163020]">
                <Leaf className="w-3 h-3 text-[#22C55E]" />
                <span>{getLocalizedCropName(cropData, language).split("(")[0]}</span>
              </span>
            )}
            {visionResult && (
              <span className="bg-[#F8FAF5] text-[#166534] px-2 py-0.5 rounded-md border border-[#DCE8DD] shrink-0 flex items-center gap-1 font-mono text-[9px]">
                <span>AI Vision: {visionResult.confidence} ({visionResult.confidenceScore}%)</span>
              </span>
            )}
            {location?.agroClimate && (
              <span className="bg-white text-[#166534] px-2 py-0.5 rounded-md border border-[#DCE8DD] shrink-0">
                {isHi ? location.agroClimate.climateZone_hi : location.agroClimate.climateZone_en}
              </span>
            )}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#F8FAF5] text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-2xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#166534] text-white rounded-br-none"
                      : "bg-white text-[#163020] border border-[#DCE8DD] rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-[#64748B]">
                  <span>{msg.timestamp}</span>
                  {msg.sender === "ai" && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="hover:text-[#166534] transition-colors p-0.5 cursor-pointer"
                      title="Read aloud"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-[#64748B] text-xs p-2.5 bg-white rounded-xl border border-[#DCE8DD] w-fit">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#22C55E] border-t-transparent animate-spin" />
                <span>{isHi ? "कृषिसेतु एआई विश्लेषण कर रहा है..." : "KrishiSetu AI is analyzing..."}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompt Chips */}
          <div className="px-3 pt-2 pb-1 bg-white border-t border-[#DCE8DD] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {dynamicSuggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-[11px] font-semibold bg-[#F8FAF5] hover:bg-white text-[#163020] hover:text-[#166534] px-2.5 py-1 rounded-full border border-[#DCE8DD] hover:border-[#22C55E] whitespace-nowrap transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-[#DCE8DD] flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={t.aiAgent.inputPlaceholder}
              className="flex-1 bg-[#F8FAF5] border border-[#DCE8DD] rounded-xl px-3.5 py-2 text-xs text-[#163020] focus:outline-none focus:ring-2 focus:ring-[#166534]"
              id="input-ai-chat-prompt"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-xl bg-[#166534] hover:bg-[#14532d] disabled:opacity-50 text-white transition-colors cursor-pointer"
              id="btn-send-ai-chat"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
