import model_pricing from "@/config/model_pricing";

export function enoughUsageCreditsToUsePaidFeatures(
  usageCredits: number,
  model: "gpt-3.5-turbo" | "gpt-4" | "gpt-3.5-turbo-16k" = "gpt-3.5-turbo"
) {
  console.log("enoughUsageCreditsToUsePaidFeatures", usageCredits);
  console.log(
    "model_pricing.models[model].minimumCreditsRequired",
    model,
    model_pricing.models[model].minimumCreditsRequired
  );
  console.log(
    "---",
    usageCredits > model_pricing.models[model].minimumCreditsRequired,
    "---"
  );

  // in pennies
  if (usageCredits > model_pricing.models[model].minimumCreditsRequired) {
    return true;
  }
  {
    return false;
  }
}
