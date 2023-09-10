import model_pricing from "@/config/model_pricing";

export function enoughUsageCreditsToCallEmbeddingModel(
  usageCredits: number,
  model: "text-embedding-ada-002" = "text-embedding-ada-002"
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
