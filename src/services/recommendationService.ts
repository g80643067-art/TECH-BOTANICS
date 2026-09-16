import {
  CropAndFarmAnalysisInsight,
  CropIssueData,
  FarmLocation,
  Language,
  ResolutionStep,
  SoilOption,
} from "../types";
import { getLocalizedSoilName } from "../data/soilTypes";

export interface IntegratedFarmRecommendation {
  cropAndFarmAnalysis: CropAndFarmAnalysisInsight;
  resolutionSteps: ResolutionStep[];
}

/**
 * Combine Crop Identified + Location + Soil Type + Season into a unified farm diagnosis
 */
export function buildCropAndFarmRecommendation(
  crop: CropIssueData,
  location: FarmLocation | null,
  soil: SoilOption | null,
  lang: Language = "en"
): IntegratedFarmRecommendation {
  const locName = location?.displayName || (lang === "hi" ? "आपका जिला व राज्य" : "Regional Agro-Zone");
  const soilName = soil
    ? getLocalizedSoilName(soil, lang)
    : (lang === "hi" ? "दोमट मिट्टी (Loamy)" : "Loamy Soil");
  const seasonName = location?.agroClimate?.currentSeason_en || "Rabi / Current Season";
  const seasonName_hi = location?.agroClimate?.currentSeason_hi || "रबी / वर्तमान ऋतु";

  const cropName_en = crop.cropName_en.split("(")[0].trim();
  const cropName_hi = crop.cropName_hi.split("(")[0].trim();

  const combinedInsight_en = `Agricultural synergy for ${cropName_en} in ${locName} with ${soilName} during ${seasonName}: Given the local temperature (${location?.agroClimate?.temperatureRange || "moderate"}) and moisture levels, proper drainage in ${soilName} and balanced micronutrient management are critical to arrest ${crop.issueName_en.split("(")[0].trim()}.`;

  const combinedInsight_hi = `${locName} क्षेत्र में ${soilName} और ${seasonName_hi} ऋतु के दौरान ${cropName_hi} की स्थिति का एकीकृत विश्लेषण: स्थानीय जलवायु (${location?.agroClimate?.climateZone_hi || "उपोष्णकटिबंधीय"}) में जल निकासी और पोटाश संतुलन बनाए रखना '${crop.issueName_hi.split("(")[0].trim()}' के फैलाव को रोकने के लिए सबसे प्रभावी है।`;

  return {
    cropAndFarmAnalysis: {
      locationDisplay: locName,
      soilTypeDisplay: soilName,
      seasonDisplay: lang === "hi" ? seasonName_hi : seasonName,
      combinedInsight_en,
      combinedInsight_hi,
      potentialRiskFactors_en: [
        `High humidity microclimate in canopy`,
        `Water retention in ${soilName}`,
        `Cool morning dew accelerating spore multiplication`,
      ],
      potentialRiskFactors_hi: [
        `पौधों के बीच घनी पत्तियां और अत्यधिक नमी`,
        `${soilName} में पानी का जमाव`,
        `सुबह की ओस से रोग के जीवाणुओं का तेज फैलाव`,
      ],
    },
    resolutionSteps: crop.steps,
  };
}
