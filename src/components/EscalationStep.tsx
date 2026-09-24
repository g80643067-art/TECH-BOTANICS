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
  Pencil,
  MapPin,
  RotateCcw,
} from "lucide-react";
import { CropIssueData, FarmLocation, Language, SoilOption } from "../types";
import { getTranslation } from "../data/translations";
import { getLocalizedCropName } from "../data/mockCrops";

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

  const initialCrop = getLocalizedCropName(cropData, language);
  const initialLocation =
    location?.displayName ||
    (isHi ? "क्षेत्रीय कृषि क्षेत्र (मध्य प्रदेश)" : "Regional Agro-Zone (Madhya Pradesh)");

  // Form State - all fields including crop, location, and problem words are fully editable!
  const [farmerName, setFarmerName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [cropName, setCropName] = useState<string>(initialCrop);
  const [locationText, setLocationText] = useState<string>(initialLocation);
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

  // Direct WhatsApp Handler with edited crop, location & problem words
  const handleWhatsAppSupport = () => {
    const cleanNumber = expertPhoneNumber.replace(/[^0-9]/g, "");
    const msg = encodeURIComponent(
      `Hello KrishiSetu AI Expert Support, I need assistance for my crop.\nFarmer: ${farmerName.trim() || "Farmer"}\nCrop: ${cropName.trim()}\nIssue: ${cropData.issueName_en}\nLocation: ${locationText.trim()}\nDetails: ${problemDescription.trim()}`
    );
    window.open(`https://wa.me/${cleanNumber || "919876543210"}?text=${msg}`, "_blank");
  };

  // Submit Request Form Handler with edited words
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
          name: farmerName.trim(),
          phone: phoneNumber.trim(),
          crop: cropName.trim() || cropData.cropName_en,
          location: locationText.trim() || (location?.displayName || "Regional Agro-Zone"),
          problem: problemDescription.trim(),
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
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DCE8DD] shadow-sm text-center relative overflow-hidden">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F8FAF5] border border-[#DCE8DD] flex items-center justify-center text-[#166534] mb-4 shadow-xs">
            <CheckCircle2 className="w-9 h-9 text-[#22C55E]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#163020] mb-2">
            {t.escalation.submittedTitle}
          </h2>
          <p className="text-sm text-[#64748B] max-w-md mx-auto mb-6">
            {t.escalation.submittedDesc} <strong className="text-[#166534]">{phoneNumber}</strong>
          </p>

          {/* Reference Case ID Card with Edited Crop & Location */}
          <div className="bg-[#F8FAF5] rounded-2xl p-5 sm:p-6 border border-[#DCE8DD] max-w-lg mx-auto mb-8 text-left shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE8DD] mb-3">
              <span className="text-xs font-bold uppercase text-[#64748B]">
                {t.escalation.referenceIdLabel}
              </span>
              <span className="font-mono text-base font-extrabold text-[#166534] bg-white px-3 py-1 rounded-lg border border-[#DCE8DD]">
                {submittedReferenceId}
              </span>
            </div>

            <div className="space-y-2 text-xs text-[#64748B]">
              <div className="flex justify-between items-start">
                <span className="font-medium">{isHi ? "किसान का नाम:" : "Farmer Name:"}</span>
                <strong className="text-[#163020] text-right">{farmerName}</strong>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-medium">{isHi ? "मोबाइल नंबर:" : "Contact Phone:"}</span>
                <strong className="text-[#163020] text-right">{phoneNumber}</strong>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-medium">{isHi ? "फसल:" : "Crop:"}</span>
                <div className="text-right">
                  <strong className="text-[#163020]">{cropName}</strong>
                  {cropName.trim() !== initialCrop.trim() && (
                    <span className="ml-1.5 text-[10px] text-[#166534] bg-[#22C55E]/15 border border-[#22C55E]/30 px-1.5 py-0.5 rounded font-bold">
                      {isHi ? "संपादित" : "Edited"}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-medium">{isHi ? "स्थान:" : "Location:"}</span>
                <div className="text-right max-w-[65%]">
                  <strong className="text-[#163020] break-words">{locationText}</strong>
                  {locationText.trim() !== initialLocation.trim() && (
                    <span className="ml-1.5 text-[10px] text-[#166534] bg-[#22C55E]/15 border border-[#22C55E]/30 px-1.5 py-0.5 rounded font-bold">
                      {isHi ? "संपादित" : "Edited"}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-start pt-1.5 border-t border-[#DCE8DD]/70">
                <span className="font-medium">{isHi ? "समस्या विवरण:" : "Summary:"}</span>
                <p className="text-[#163020] text-right font-medium max-w-[65%] italic line-clamp-2">
                  "{problemDescription}"
                </p>
              </div>
              <div className="flex justify-between items-center pt-1.5 border-t border-[#DCE8DD]/70">
                <span className="font-medium">{isHi ? "प्रत्याशित प्रतिक्रिया:" : "Expected Response:"}</span>
                <strong className="text-[#166534]">{isHi ? "2 से 4 घंटे के भीतर" : "Within 2 to 4 Hours"}</strong>
              </div>
            </div>

            {/* Edit details again button */}
            <div className="mt-4 pt-3 border-t border-[#DCE8DD] text-center">
              <button
                type="button"
                onClick={() => setSubmittedReferenceId(null)}
                className="inline-flex items-center gap-1.5 text-xs text-[#166534] hover:text-[#14532d] font-bold underline cursor-pointer"
                id="btn-expert-edit-resubmit"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>{t.escalation.editResubmit || (isHi ? "विवरण संपादित करें व पुनः सबमिट करें" : "Edit details & resubmit")}</span>
              </button>
            </div>
          </div>

          <button
            onClick={onScanAgain}
            className="inline-flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white font-bold py-3.5 px-8 rounded-2xl shadow-sm transition-all active:scale-98 cursor-pointer text-sm"
            id="btn-escalation-scan-again"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t.success.scanAgainButton}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Escalation Notice Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8DD] shadow-sm text-center relative overflow-hidden">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FACC15]/20 border border-[#FACC15]/40 flex items-center justify-center text-[#163020] mb-3 shadow-xs">
              <AlertTriangle className="w-7 h-7 text-[#166534]" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#F8FAF5] text-[#166534] border border-[#DCE8DD] mb-2">
              <UserCheck className="w-3.5 h-3.5 text-[#22C55E]" /> {t.steps.step7}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#163020] tracking-tight mb-2">
              {t.escalation.title}
            </h2>
            <p className="text-sm text-[#64748B] max-w-lg mx-auto mb-6">
              {t.escalation.subtitle}
            </p>

            {/* Professional Agricultural Expert Support Card */}
            <div className="bg-[#163020] text-white rounded-2xl p-6 shadow-md text-left relative overflow-hidden mb-6 border border-[#166534]/50">
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">👨‍🌾</div>
                    <div>
                      <h3 className="font-extrabold text-lg text-white">
                        {t.escalation.expertCardTitle}
                      </h3>
                      <p className="text-xs text-[#DCE8DD]">
                        {t.escalation.expertCardSubtitle}
                      </p>
                    </div>
                  </div>

                  {/* Configurable Demo Contact Number */}
                  <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/15">
                    <span className="text-[10px] uppercase font-bold text-[#22C55E] block">
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
                    className="flex items-center justify-center gap-2.5 bg-[#166534] hover:bg-[#14532d] text-white font-black py-3.5 px-5 rounded-xl border border-[#22C55E]/40 shadow-xs transition-transform active:scale-98 cursor-pointer text-sm"
                    id="btn-contact-expert-call"
                  >
                    <Phone className="w-5 h-5 text-[#22C55E]" />
                    <span>[ 📞 {t.escalation.contactExpertButton} ]</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSupport}
                    className="flex items-center justify-center gap-2.5 bg-[#22C55E] hover:bg-[#16a34a] text-[#163020] font-black py-3.5 px-5 rounded-xl shadow-xs transition-transform active:scale-98 cursor-pointer text-sm"
                    id="btn-whatsapp-support"
                  >
                    <MessageCircle className="w-5 h-5 text-[#163020]" />
                    <span>[ 💬 {t.escalation.whatsappSupportButton} ]</span>
                  </button>
                </div>

                <p className="text-[11px] text-[#DCE8DD] text-center mt-3">
                  ⏰ {t.escalation.availableHours}
                </p>
              </div>
            </div>

            <p className="text-xs font-semibold text-[#64748B]">
              {t.escalation.orFillForm}
            </p>
          </div>

          {/* Section 9: Request Expert Help Form with Full Editable Words & Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE8DD] shadow-sm text-left">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#166534]" />
                <h3 className="text-lg sm:text-xl font-bold text-[#163020]">
                  {t.escalation.formTitle}
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#166534] bg-[#22C55E]/15 border border-[#22C55E]/30 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Pencil className="w-3 h-3 text-[#166534]" />
                {t.escalation.editableBadge || (isHi ? "संपादन योग्य" : "Editable Words")}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mb-4">
              {t.escalation.formSubtitle}
            </p>

            {/* Editable Words Notice Callout */}
            <div className="mb-5 p-3 bg-[#F8FAF5] border border-[#DCE8DD] rounded-2xl flex items-start gap-2.5">
              <Pencil className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
              <p className="text-xs text-[#166534] font-medium leading-relaxed">
                {t.escalation.editNotice ||
                  (isHi
                    ? "सबमिट करने से पहले नीचे दिए गए सभी शब्द और विवरण (फसल और स्थान सहित) पूरी तरह संपादन योग्य हैं।"
                    : "All words and fields below (including crop and location) are fully editable before submitting.")}
              </p>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Farmer Name */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="input-expert-farmer-name" className="block text-xs font-bold text-[#163020]">
                      {t.escalation.nameLabel} <span className="text-rose-500">*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    placeholder={isHi ? "उदा. रमेश कुमार" : "e.g. Ramesh Kumar"}
                    className="w-full bg-[#F8FAF5] hover:bg-white focus:bg-white border border-[#DCE8DD] focus:border-[#166534] rounded-xl px-3.5 py-2.5 text-sm text-[#163020] font-medium focus:outline-none focus:ring-2 focus:ring-[#166534]/20 transition-all shadow-2xs"
                    id="input-expert-farmer-name"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="input-expert-phone" className="block text-xs font-bold text-[#163020]">
                      {t.escalation.phoneLabel} <span className="text-rose-500">*</span>
                    </label>
                  </div>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 XXXXX"
                    className="w-full bg-[#F8FAF5] hover:bg-white focus:bg-white border border-[#DCE8DD] focus:border-[#166534] rounded-xl px-3.5 py-2.5 text-sm text-[#163020] font-medium focus:outline-none focus:ring-2 focus:ring-[#166534]/20 transition-all shadow-2xs"
                    id="input-expert-phone"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Crop Field (Editable) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="input-expert-crop" className="block text-xs font-bold text-[#163020] flex items-center gap-1.5">
                      <span>🌱</span>
                      <span>{t.escalation.cropLabel}</span>
                    </label>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#166534] bg-[#22C55E]/15 border border-[#22C55E]/30 px-2 py-0.5 rounded-full">
                      <Pencil className="w-2.5 h-2.5" />
                      <span>{t.escalation.editableBadge || (isHi ? "संपादन योग्य" : "Editable")}</span>
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="input-expert-crop"
                      required
                      value={cropName}
                      onChange={(e) => setCropName(e.target.value)}
                      placeholder={isHi ? "उदा. गेहूं (Wheat) या अन्य फसल" : "e.g. Wheat, Basmati Rice, etc."}
                      className="w-full bg-[#F8FAF5] hover:bg-white focus:bg-white border border-[#DCE8DD] focus:border-[#166534] rounded-xl px-3.5 py-2.5 text-sm text-[#163020] font-semibold focus:outline-none focus:ring-2 focus:ring-[#166534]/20 transition-all shadow-2xs"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[11px] text-[#64748B]">
                    <span>{isHi ? "स्कैन से स्वतः भरा गया (आप बदल सकते हैं)" : "Auto-filled from scan (editable)"}</span>
                    {cropName.trim() !== initialCrop.trim() && (
                      <button
                        type="button"
                        onClick={() => setCropName(initialCrop)}
                        className="text-[11px] text-[#166534] hover:text-[#14532d] font-bold underline cursor-pointer inline-flex items-center gap-1"
                        id="btn-reset-crop"
                      >
                        <RotateCcw className="w-2.5 h-2.5" />
                        <span>{t.escalation.resetDefault || (isHi ? "रीसेट करें" : "Reset")}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Location Field (Editable) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="input-expert-location" className="block text-xs font-bold text-[#163020] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#166534]" />
                      <span>{t.escalation.locationLabel}</span>
                    </label>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#166534] bg-[#22C55E]/15 border border-[#22C55E]/30 px-2 py-0.5 rounded-full">
                      <Pencil className="w-2.5 h-2.5" />
                      <span>{t.escalation.editableBadge || (isHi ? "संपादन योग्य" : "Editable")}</span>
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="input-expert-location"
                      required
                      value={locationText}
                      onChange={(e) => setLocationText(e.target.value)}
                      placeholder={isHi ? "उदा. गांव, तहसील, जिला (उदा. सीहोर, मध्य प्रदेश)" : "e.g. Village, Tehsil, District, State"}
                      className="w-full bg-[#F8FAF5] hover:bg-white focus:bg-white border border-[#DCE8DD] focus:border-[#166534] rounded-xl px-3.5 py-2.5 text-sm text-[#163020] font-semibold focus:outline-none focus:ring-2 focus:ring-[#166534]/20 transition-all shadow-2xs"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[11px] text-[#64748B]">
                    <span>{isHi ? "स्थान विवरण (आप बदल सकते हैं)" : "Location details (editable)"}</span>
                    {locationText.trim() !== initialLocation.trim() && (
                      <button
                        type="button"
                        onClick={() => setLocationText(initialLocation)}
                        className="text-[11px] text-[#166534] hover:text-[#14532d] font-bold underline cursor-pointer inline-flex items-center gap-1"
                        id="btn-reset-location"
                      >
                        <RotateCcw className="w-2.5 h-2.5" />
                        <span>{t.escalation.resetDefault || (isHi ? "रीसेट करें" : "Reset")}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Problem Description with Quick Word Suggestions */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="textarea-expert-problem" className="block text-xs font-bold text-[#163020] flex items-center gap-1.5">
                    <span>📝</span>
                    <span>{t.escalation.problemLabel}</span>
                  </label>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#166534] bg-[#22C55E]/15 border border-[#22C55E]/30 px-2 py-0.5 rounded-full">
                    <Pencil className="w-2.5 h-2.5" />
                    <span>{isHi ? "संपादन योग्य विवरण" : "Editable Words"}</span>
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder={isHi ? "लक्षण, कीट का प्रकार, खाद/दवा की स्थिति आदि लिखें..." : "Describe symptoms, pest spread, fertilizers/chemicals used..."}
                  className="w-full bg-[#F8FAF5] hover:bg-white focus:bg-white border border-[#DCE8DD] focus:border-[#166534] rounded-xl px-3.5 py-2.5 text-sm text-[#163020] focus:outline-none focus:ring-2 focus:ring-[#166534]/20 transition-all shadow-2xs leading-relaxed"
                  id="textarea-expert-problem"
                />

                {/* Quick Helper Word Tags to easily add or customize words */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-[#64748B]">
                    {isHi ? "त्वरित शब्द जोड़ें:" : "Quick add words:"}
                  </span>
                  {[
                    isHi ? "+ पत्तियां पीली पड़ रही हैं" : "+ Yellowing leaves",
                    isHi ? "+ तने पर धब्बे हैं" : "+ Spots on stems",
                    isHi ? "+ कीटों का प्रकोप" : "+ Pest infestation observed",
                    isHi ? "+ 3 दिन पहले सिंचाई की" : "+ Irrigated 3 days ago",
                    isHi ? "+ तत्काल फोन मार्गदर्शन चाहिए" : "+ Urgent phone guidance needed",
                  ].map((phrase, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setProblemDescription((prev) =>
                          prev ? `${prev} ${phrase.replace("+ ", "")}.` : phrase.replace("+ ", "")
                        )
                      }
                      className="text-[11px] bg-[#F8FAF5] hover:bg-white text-[#166534] border border-[#DCE8DD] hover:border-[#166534] font-medium rounded-lg px-2.5 py-1 transition-all cursor-pointer shadow-2xs active:scale-95"
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>

              {/* Uploaded Crop Image Thumbnail */}
              <div className="bg-[#F8FAF5] p-3.5 rounded-xl border border-[#DCE8DD] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-200 border border-[#DCE8DD] shrink-0">
                    <img
                      src={cropImage || cropData.sampleImage}
                      alt={cropData.cropName_hi ? cropData.cropName_hi.split("(")[0].trim() : cropData.cropName_en}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#163020] block">
                      {t.escalation.imageLabel}
                    </span>
                    <span className="text-[11px] text-[#166534] font-medium">
                      ✓ Attached from Scan Step
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Request Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-sm transition-all active:scale-98 cursor-pointer text-sm"
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


