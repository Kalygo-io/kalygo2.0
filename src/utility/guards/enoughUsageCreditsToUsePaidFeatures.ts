import model_pricing from "@/config/model_pricing";

export function enoughUsageCreditsToUsePaidFeatures(
  usageCredits: number,
  model: "gpt-3.5-turbo" | "gpt-4" = "gpt-3.5-turbo"
) {
  // in pennies
  if (usageCredits / 100 > model_pricing.models[model].minimumCreditsRequired) {
    return true;
  }
  {
    return false;
  }
}
