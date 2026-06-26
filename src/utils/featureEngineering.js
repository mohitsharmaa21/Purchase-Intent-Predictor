/**
 * Computes engineered features based on raw inputs.
 * These match the formulas used during the ML model training.
 * 
 * @param {Object} rawInputs - Raw user inputs from the form
 * @returns {Object} Engineered features
 */
export function calculateFeatures(rawInputs) {
  const admin = parseFloat(rawInputs.Administrative) || 0;
  const adminDur = parseFloat(rawInputs.Administrative_Duration) || 0;
  const info = parseFloat(rawInputs.Informational) || 0;
  const infoDur = parseFloat(rawInputs.Informational_Duration) || 0;
  const prod = parseFloat(rawInputs.ProductRelated) || 0;
  const prodDur = parseFloat(rawInputs.ProductRelated_Duration) || 0;
  
  const pageValues = parseFloat(rawInputs.PageValues) || 0;
  const bounceRates = parseFloat(rawInputs.BounceRates) || 0;
  const exitRates = parseFloat(rawInputs.ExitRates) || 0;

  // 1. TotalPages = Administrative + Informational + ProductRelated
  const TotalPages = admin + info + prod;

  // 2. TotalDuration = Administrative_Duration + Informational_Duration + ProductRelated_Duration
  const TotalDuration = adminDur + infoDur + prodDur;

  // 3. ValuePerProduct = PageValues / (ProductRelated + 1)
  const ValuePerProduct = pageValues / (prod + 1);

  // 4. ProductFocusRatio = ProductRelated / (TotalPages + 1)
  const ProductFocusRatio = prod / (TotalPages + 1);

  // 5. ProductTimeRatio = ProductRelated_Duration / (TotalDuration + 1)
  const ProductTimeRatio = prodDur / (TotalDuration + 1);

  // 6. BounceExitDiff = ExitRates - BounceRates
  const BounceExitDiff = exitRates - bounceRates;

  return {
    TotalPages,
    TotalDuration,
    ValuePerProduct,
    ProductFocusRatio,
    ProductTimeRatio,
    BounceExitDiff
  };
}
