/////////////////////////////////////////////////
// Paste Databricks Endpoint URL here
export const DATABRICKS_ENDPOINT_URL =
  "https://dbc-2c438c6e-c070.cloud.databricks.com/serving-endpoints/lgbm_online_shoppers_model/invocations";

/////////////////////////////////////////////////
// Paste Personal Access Token here
export const DATABRICKS_TOKEN =
  "PASTE_YOUR_DATABRICKS_TOKEN_HERE";
/////////////////////////////////////////////////

/**
 * Sends online session data to Databricks Model Serving Endpoint or runs a fallback mock prediction.
 * 
 * @param {Object} rawInputs - Raw user inputs
 * @param {Object} engineeredFeatures - Calculated features
 * @returns {Promise<Object>} API Prediction result details
 */
export async function predictPurchaseIntent(rawInputs, engineeredFeatures) {
  // Convert month to one-hot columns
  const months = ["Aug", "Dec", "Feb", "Jul", "June", "Mar", "May", "Nov", "Oct", "Sep"];
  const monthOneHot = {};
  months.forEach(m => {
    monthOneHot[`Month_${m}`] = rawInputs.Month === m ? 1 : 0;
  });

  // Convert VisitorType to one-hot columns
  const visitorTypes = ["New Visitor", "Other", "Returning Visitor"];
  const visitorOneHot = {};
  visitorTypes.forEach(v => {
    // Column format in ML: VisitorType_New_Visitor, VisitorType_Other, VisitorType_Returning_Visitor
    const colName = `VisitorType_${v.replace(" ", "_")}`;
    visitorOneHot[colName] = rawInputs.VisitorType === v ? 1 : 0;
  });

  // Convert weekend to 1 or 0
  const weekendVal = rawInputs.Weekend ? 1 : 0;

  // Structure the data row exactly as required by the model
  const columns = [
    "Administrative",
    "Administrative_Duration",
    "Informational",
    "Informational_Duration",
    "ProductRelated",
    "ProductRelated_Duration",
    "BounceRates",
    "ExitRates",
    "PageValues",
    "SpecialDay",
    "OperatingSystems",
    "Browser",
    "Region",
    "TrafficType",
    "Weekend",
    "TotalPages",
    "TotalDuration",
    "ValuePerProduct",
    "ProductFocusRatio",
    "ProductTimeRatio",
    "BounceExitDiff",
    // Months
    "Month_Aug",
    "Month_Dec",
    "Month_Feb",
    "Month_Jul",
    "Month_June",
    "Month_Mar",
    "Month_May",
    "Month_Nov",
    "Month_Oct",
    "Month_Sep",
    // Visitor types
    "VisitorType_New_Visitor",
    "VisitorType_Other",
    "VisitorType_Returning_Visitor"
  ];

  const dataRow = [
    parseInt(rawInputs.Administrative) || 0,
    parseFloat(rawInputs.Administrative_Duration) || 0,
    parseInt(rawInputs.Informational) || 0,
    parseFloat(rawInputs.Informational_Duration) || 0,
    parseInt(rawInputs.ProductRelated) || 0,
    parseFloat(rawInputs.ProductRelated_Duration) || 0,
    parseFloat(rawInputs.BounceRates) || 0,
    parseFloat(rawInputs.ExitRates) || 0,
    parseFloat(rawInputs.PageValues) || 0,
    parseFloat(rawInputs.SpecialDay) || 0,
    parseInt(rawInputs.OperatingSystems) || 1,
    parseInt(rawInputs.Browser) || 1,
    parseInt(rawInputs.Region) || 1,
    parseInt(rawInputs.TrafficType) || 1,
    weekendVal,
    engineeredFeatures.TotalPages,
    engineeredFeatures.TotalDuration,
    engineeredFeatures.ValuePerProduct,
    engineeredFeatures.ProductFocusRatio,
    engineeredFeatures.ProductTimeRatio,
    engineeredFeatures.BounceExitDiff,
    // Months
    monthOneHot["Month_Aug"],
    monthOneHot["Month_Dec"],
    monthOneHot["Month_Feb"],
    monthOneHot["Month_Jul"],
    monthOneHot["Month_June"],
    monthOneHot["Month_Mar"],
    monthOneHot["Month_May"],
    monthOneHot["Month_Nov"],
    monthOneHot["Month_Oct"],
    monthOneHot["Month_Sep"],
    // Visitor Types
    visitorOneHot["VisitorType_New_Visitor"],
    visitorOneHot["VisitorType_Other"],
    visitorOneHot["VisitorType_Returning_Visitor"]
  ];

  const payload = {
    dataframe_split: {
      columns: columns,
      data: [dataRow]
    }
  };

  // Check if URL is placeholder or empty
  const isMockMode = 
    !DATABRICKS_ENDPOINT_URL || 
    DATABRICKS_ENDPOINT_URL.includes("PASTE_YOUR_DATABRICKS_MODEL_SERVING_ENDPOINT_URL_HERE");

  if (isMockMode) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Heuristic prediction for simulation:
    // PageValues is the single most predictive feature in Online Shoppers Intention
    const pageVal = parseFloat(rawInputs.PageValues) || 0;
    const prodCount = parseInt(rawInputs.ProductRelated) || 0;
    const prodTime = parseFloat(rawInputs.ProductRelated_Duration) || 0;
    const bounce = parseFloat(rawInputs.BounceRates) || 0;
    const exit = parseFloat(rawInputs.ExitRates) || 0;

    let prediction = 0;
    // Standard heuristic representing the decision boundary
    if (pageVal > 10 && bounce < 3) {
      prediction = 1;
    } else if (pageVal > 2 && prodCount > 15 && exit < 4) {
      prediction = 1;
    } else if (prodTime > 600 && pageVal > 0 && bounce < 1) {
      prediction = 1;
    }

    return {
      prediction,
      isMock: true,
      timestamp: new Date().toISOString()
    };
  }

  // Real Databricks Serving Endpoint Call
  try {
    const response = await fetch(DATABRICKS_ENDPOINT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DATABRICKS_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Databricks Model Serving Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    // Parse prediction outcome from standard Databricks JSON response structure
    // Databricks responses usually wrap inside a "predictions" array
    // standard output structure can be e.g. { "predictions": [1] } or similar
    let prediction = 0;
    if (result.predictions && result.predictions.length > 0) {
      prediction = result.predictions[0];
    } else if (result.dataframe_records && result.dataframe_records.length > 0) {
      prediction = result.dataframe_records[0];
    } else if (Array.isArray(result)) {
      prediction = result[0];
    } else {
      // In case format is predictions object
      prediction = result.prediction !== undefined ? result.prediction : 0;
    }

    return {
      prediction: Number(prediction) === 1 ? 1 : 0,
      isMock: false,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.warn("Databricks Serving Endpoint call failed (likely CORS or network issues). Falling back to local simulation.", error);
    
    // Fallback heuristic prediction for simulation
    const pageVal = parseFloat(rawInputs.PageValues) || 0;
    const prodCount = parseInt(rawInputs.ProductRelated) || 0;
    const prodTime = parseFloat(rawInputs.ProductRelated_Duration) || 0;
    const bounce = parseFloat(rawInputs.BounceRates) || 0;
    const exit = parseFloat(rawInputs.ExitRates) || 0;

    let prediction = 0;
    if (pageVal > 10 && bounce < 3) {
      prediction = 1;
    } else if (pageVal > 2 && prodCount > 15 && exit < 4) {
      prediction = 1;
    } else if (prodTime > 600 && pageVal > 0 && bounce < 1) {
      prediction = 1;
    }

    return {
      prediction,
      isMock: true,
      corsFallback: true,
      timestamp: new Date().toISOString()
    };
  }
}
