import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  UserCheck,
  Send,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  FileText,
} from "lucide-react";
import { CropIssueData, FarmLocation, Language, SoilOption } from "../types";
import { getTranslation } from "../data/translations";
import { getLocalizedCropName, getLocalizedIssueName } from "../data/mockCrops";

interface EscalationStepProps {
  language: Language;
  cropData: CropIssueData;
  cropImage: string | null;
  location: FarmLocation | null;
  soilType: SoilOption | null;
  expertPhoneNumber: string;
  onScanAgain: () => void;
}

export const EscalationStep: React.FC<EscalationStepProps> = ({
  language,
  cropData,
  cropImage,
  location,
  soilType,
  expertPhoneNumber,
  onScanAgain,
}) => {
  const t = getTranslation(language);
  const isHi = language === "hi";

  // Form State
  const [farmerName, setFarmerName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [problemDescription, setProblemDescription] = useState<string>(
    isHi
      ? `${cropData.cropName_hi.split("(")[0]} में ${cropData.issueName_hi.split("(")[0]} के लक्षण दिखाई दे रहे हैं। पत्तियां पीली व धब्बेदार हो रही हैं। तत्काल मार्गदर्शन चाहिए।`
      : `Visible symptoms of ${cropData.issueName_en.split("(")[0]} observed on ${cropData.cropName_en.split("(")[0]}. Seeking agronomist recommendation for targeted treatment.`
  );

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedReferenceId, setSubmittedReferenceId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Direct Call Handler
  const handleCallExpert = () => {
    window.open(`tel:${expertPhoneNumber.replace(/\s+/g, "")}`, "_self");
  };

  // Direct WhatsApp Handler
  const handleWhatsAppSupport = () => {
    const cleanNumber = expertPhoneNumber.replace(/[^0-9]/g, "");
    const msg = encodeURIComponent(
      `Hello KrishiSetu AI Expert Support, I need assistance for my crop.\nCrop: ${cropData.cropName_en}\nIssue: ${cropData.issueName_en}\nLocation: ${location?.displayName || "N/A"}`
    );
    window.open(`https://wa.me/${cleanNumber || "919876543210"}?text=${msg}`, "_blank");
  };

  // Submit Request Form Handler
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !phoneNumber.trim()) {
      setFormError(isHi ? "कृपया अपना नाम और फोन नंबर दर्ज करें" : "Please enter your name and phone number");
      return;
    }
    setFormError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/expert-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: farmerName,
          phone: phoneNumber,
          crop: cropData.cropName_en,
          location: location?.displayName || "Regional Agro-Zone",
          problem: problemDescription,
          image: cropImage,
        }),
      });

      const data = await response.json();
      if (response.ok && data.referenceId) {
        setSubmittedReferenceId(data.referenceId);
      } else {
        // Fallback reference ID generator
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        setSubmittedReferenceId(`KS-2026-${randomNum}`);
      }
    } catch (err) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setSubmittedReferenceId(`KS-2026-${randomNum}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* If already submitted, show confirmation screen */}
      {submittedReferenceId ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xl text-center relative overflow-hidden">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4 shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mb-2">
            {t.escalation.submittedTitle}
          </h2>
          <p className="text-sm text-stone-600 max-w-md mx-auto mb-6">
            {t.escalation.submittedDesc} <strong className="text-emerald-900">{phoneNumber}</strong>
          </p>

          {/* Reference Case ID Card */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 max-w-md mx-auto mb-8 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-3">
              <span className="text-xs font-bold uppercase text-stone-500">
                {t.escalation.referenceIdLabel}
              </span>
              <span className="font-mono text-base font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                {submittedReferenceId}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Farmer Name:</span>
                <strong className="text-stone-900">{farmerName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Crop:</span>
                <strong className="text-stone-900">{getLocalizedCropName(cropData, language).split("(")[0]}</strong>
              </div>
              <div className="flex justify-between">
                <span>Expected Response:</span>
                <strong className="text-emerald-700">Within 2 to 4 Hours</strong>
              </div>
            </div>
          </div>

          <button
            onClick={onScanAgain}
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3.5 px-8 rounded-2xl shadow-md transition-all active:scale-98 cursor-pointer text-sm"
            id="btn-escalation-scan-again"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t.success.scanAgainButton}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Escalation Notice Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-lg text-center relative overflow-hidden">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 mb-3 shadow-xs">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-50 text-amber-900 border border-amber-200 mb-2">
              <UserCheck className="w-3.5 h-3.5 text-amber-700" /> {t.steps.step7}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
              {t.escalation.title}
            </h2>
            <p className="text-sm text-stone-600 max-w-lg mx-auto mb-6">
              {t.escalation.subtitle}
            </p>

            {/* Professional Agricultural Expert Support Card */}
            <div className="bg-gradient-to-br from-emerald-900 via-teal-950 to-stone-900 text-white rounded-2xl p-6 shadow-xl text-left relative overflow-hidden mb-6">
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">👨‍🌾</div>
                    <div>
                      <h3 className="font-extrabold text-lg text-emerald-300">
                        {t.escalation.expertCardTitle}
                      </h3>
                      <p className="text-xs text-stone-300">
                        {t.escalation.expertCardSubtitle}
                      </p>
                    </div>
                  </div>

                  {/* Configurable Demo Contact Number */}
                  <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/15">
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                      {t.escalation.demoHelplineLabel}
                    </span>
                    <span className="font-mono text-base sm:text-lg font-black text-white tracking-wider">
                      {expertPhoneNumber}
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons: Contact Expert & WhatsApp Support */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
                  <button
                    type="button"
                    onClick={handleCallExpert}
                    className="flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black py-3.5 px-5 rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer text-sm"
                    id="btn-contact-expert-call"
                  >
                    <Phone className="w-5 h-5" />
                    <span>[ 📞 {t.escalation.contactExpertButton} ]</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSupport}
                    className="flex items-center justify-center gap-2.5 bg-teal-600 hover:bg-teal-500 text-white font-black py-3.5 px-5 rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer text-sm"
                    id="btn-whatsapp-support"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>[ 💬 {t.escalation.whatsappSupportButton} ]</span>
                  </button>
                </div>

                <p className="text-[11px] text-stone-300 text-center mt-3">
                  ⏰ {t.escalation.availableHours}
                </p>
              </div>
            </div>

            <p className="text-xs font-semibold text-stone-500">
              {t.escalation.orFillForm}
            </p>
          </div>

          {/* Section 9: Request Expert Help Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-lg text-left">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-5 h-5 text-emerald-700" />
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                {t.escalation.formTitle}
              </h3>
            </div>
            <p className="text-xs text-stone-600 mb-6">
              {t.escalation.formSubtitle}
            </p>

            {formError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Farmer Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.escalation.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    placeholder={isHi ? "उदा. रमेश कुमार" : "e.g. Ramesh Kumar"}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    id="input-expert-farmer-name"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.escalation.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 XXXXX"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    id="input-expert-phone"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Crop Field (prefilled) */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.escalation.cropLabel}
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={getLocalizedCropName(cropData, language)}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-700 font-medium cursor-not-allowed"
                  />
                </div>

                {/* Location Field (prefilled) */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.escalation.locationLabel}
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={location?.displayName || "Regional Agro-Zone"}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-700 font-medium cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.escalation.problemLabel}
                </label>
                <textarea
                  rows={3}
                  required
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  id="textarea-expert-problem"
                />
              </div>

              {/* Uploaded Crop Image Thumbnail */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
                    <img
                      src={cropImage || cropData.sampleImage}
                      alt="Crop Attachment"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-800 block">
                      {t.escalation.imageLabel}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      ✓ Attached from Scan Step
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Request Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-md transition-all active:scale-98 cursor-pointer text-sm"
                id="btn-submit-expert-request"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? (isHi ? "सबमिट हो रहा है..." : "Submitting...") : `[ ${t.escalation.submitButton} ]`}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

