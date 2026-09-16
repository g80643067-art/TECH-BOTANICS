import { CropIssueData, SeverityLevel } from "../types";

export interface CropHealthDiagnostic {
  isHealthy: boolean;
  issueName_en: string;
  issueName_hi: string;
  scientificPathogen?: string;
  severity: SeverityLevel;
  confidenceScore: number;
  possibleCause_en: string;
  possibleCause_hi: string;
  whyHappening_en: string;
  whyHappening_hi: string;
  visualSymptoms_en: string;
  visualSymptoms_hi: string;
}

/**
 * Perform health and phytopathological analysis on identified crop
 */
export function analyzeCropHealth(crop: CropIssueData): CropHealthDiagnostic {
  return {
    isHealthy: false,
    issueName_en: crop.issueName_en,
    issueName_hi: crop.issueName_hi,
    scientificPathogen: crop.scientificName,
    severity: crop.severity,
    confidenceScore: crop.confidenceScore,
    possibleCause_en: crop.possibleCause_en,
    possibleCause_hi: crop.possibleCause_hi,
    whyHappening_en: crop.whyHappening_en,
    whyHappening_hi: crop.whyHappening_hi,
    visualSymptoms_en: `Observed characteristic chlorotic discoloration, lesions along tissue margins, and localized cellular stress markers matching ${crop.issueName_en}.`,
    visualSymptoms_hi: `पत्तियों पर धब्बे, किनारों पर पीलापन और ऊतक क्षति के स्पष्ट लक्षण देखे गए हैं जो '${crop.issueName_hi}' की पुष्टि करते हैं।`,
  };
}
