import { CropHealthVoiceAnalysis } from "../types";

/**
 * Service to call the AI Crop Health Voice Assistant endpoint.
 */
export async function analyzeCropForVoiceAssistant(params: {
  image?: string;
  sampleId?: string;
  preferredCropId?: string;
}): Promise<CropHealthVoiceAnalysis> {
  const res = await fetch("/api/crop-health-voice-assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.details || err.error || "Crop health analysis failed");
  }

  return await res.json();
}

/**
 * Check if Web Speech API is supported in the current browser.
 */
export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance !== "undefined";
}

/**
 * Get available Hindi or Indian English voices with female preference.
 */
export function getHindiFemaleVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSynthesisSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  
  // 1. Check for specific known high-quality female Hindi voices
  const preferredNames = ["swara", "lekha", "heera", "neerja", "kalpana", "female", "google हिन्दी"];
  
  const hiFemale = voices.find((v) => {
    const isHi = v.lang.startsWith("hi") || v.lang.includes("hi-IN") || v.name.toLowerCase().includes("hindi");
    const isNamedFemale = preferredNames.some((n) => v.name.toLowerCase().includes(n));
    return isHi && isNamedFemale;
  });
  if (hiFemale) return hiFemale;

  // 2. Any Hindi voice
  const anyHi = voices.find((v) => v.lang.startsWith("hi") || v.lang.includes("hi-IN") || v.name.toLowerCase().includes("hindi"));
  if (anyHi) return anyHi;

  // 3. Indian English female voice as smooth fallback
  const inFemale = voices.find((v) => {
    const isIndian = v.lang.includes("IN");
    const isFemale = preferredNames.some((n) => v.name.toLowerCase().includes(n));
    return isIndian && isFemale;
  });
  if (inFemale) return inFemale;

  // 4. Any Indian voice
  const anyIndian = voices.find((v) => v.lang.includes("IN"));
  if (anyIndian) return anyIndian;

  return null;
}

/**
 * Speaks the explanation in natural, friendly Hindi.
 * Designed to sound like a helpful Krishi Assistant rather than a robotic announcement.
 */
export function speakCropHealthVoice(
  text: string,
  callbacks?: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
    rate?: number;
  }
): () => void {
  if (!isSpeechSynthesisSupported()) {
    console.warn("Speech synthesis not supported in this browser.");
    callbacks?.onEnd?.();
    return () => {};
  }

  // Stop any active utterance before starting
  window.speechSynthesis.cancel();

  // Clean text of non-spoken formatting
  const speechText = text
    .replace(/\(.*?\)/g, "") // clean out English taxonomic parentheticals if in Hindi speech
    .replace(/[#*`_~]/g, "")
    .trim();

  const utterance = new SpeechSynthesisUtterance(speechText);
  const voice = getHindiFemaleVoice();

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = "hi-IN";
  }

  // Female Krishi Sakhi parameters:
  // Steady, natural cadence for farmers
  utterance.pitch = 1.06;
  utterance.rate = callbacks?.rate ?? 0.92;

  let hasEnded = false;

  utterance.onstart = () => {
    callbacks?.onStart?.();
  };

  utterance.onend = () => {
    if (!hasEnded) {
      hasEnded = true;
      callbacks?.onEnd?.();
    }
  };

  utterance.onerror = (e) => {
    console.warn("Speech synthesis notice:", e);
    if (!hasEnded) {
      hasEnded = true;
      callbacks?.onError ? callbacks.onError() : callbacks?.onEnd?.();
    }
  };

  try {
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn("Error starting speech synthesis:", err);
    callbacks?.onEnd?.();
  }

  // Return cancel function
  return () => {
    hasEnded = true;
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  };
}

export function stopCropHealthVoice(): void {
  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}
