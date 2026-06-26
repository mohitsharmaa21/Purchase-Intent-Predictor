/**
 * Validates the form fields based on design specifications.
 * 
 * @param {Object} inputs - Raw form inputs
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export function validateInputs(inputs) {
  const errors = {};

  // Helper: check if value is positive integer
  const isPositiveInteger = (val) => {
    const num = Number(val);
    return Number.isInteger(num) && num >= 1;
  };

  // Helper: check if non-negative number
  const isNonNegativeNumber = (val) => {
    const num = Number(val);
    return !isNaN(num) && num >= 0;
  };

  // BounceRates
  if (inputs.BounceRates === '' || inputs.BounceRates === undefined) {
    errors.BounceRates = 'Bounce Rate is required.';
  } else {
    const bounce = parseFloat(inputs.BounceRates);
    if (isNaN(bounce)) {
      errors.BounceRates = 'Bounce Rate must be a valid number.';
    } else if (bounce < 0 || bounce > 100) {
      errors.BounceRates = 'Bounce Rate must be between 0 and 100.';
    }
  }

  // ExitRates
  if (inputs.ExitRates === '' || inputs.ExitRates === undefined) {
    errors.ExitRates = 'Exit Rate is required.';
  } else {
    const exit = parseFloat(inputs.ExitRates);
    if (isNaN(exit)) {
      errors.ExitRates = 'Exit Rate must be a valid number.';
    } else if (exit < 0 || exit > 100) {
      errors.ExitRates = 'Exit Rate must be between 0 and 100.';
    }
  }

  // PageValues
  if (inputs.PageValues === '' || inputs.PageValues === undefined) {
    errors.PageValues = 'Page Value is required.';
  } else {
    const pv = parseFloat(inputs.PageValues);
    if (isNaN(pv)) {
      errors.PageValues = 'Page Value must be a valid number.';
    } else if (pv < 0) {
      errors.PageValues = 'Page Value cannot be negative.';
    }
  }

  // SpecialDay
  if (inputs.SpecialDay === '' || inputs.SpecialDay === undefined) {
    errors.SpecialDay = 'Special Day value is required.';
  } else {
    const sd = parseFloat(inputs.SpecialDay);
    if (isNaN(sd)) {
      errors.SpecialDay = 'Special Day must be a valid decimal number.';
    } else if (sd < 0 || sd > 1) {
      errors.SpecialDay = 'Special Day must be between 0 and 1.';
    }
  }

  // Session activity page counts
  const pageFields = ['Administrative', 'Informational', 'ProductRelated'];
  pageFields.forEach(field => {
    const val = inputs[field];
    if (val === '' || val === undefined) {
      errors[field] = `${field} page count is required.`;
    } else {
      const num = Number(val);
      if (!Number.isInteger(num) || num < 0) {
        errors[field] = `${field} must be a non-negative integer.`;
      }
    }
  });

  // Durations
  const durationFields = ['Administrative_Duration', 'Informational_Duration', 'ProductRelated_Duration'];
  durationFields.forEach(field => {
    const val = inputs[field];
    if (val === '' || val === undefined) {
      errors[field] = `${field.replace('_', ' ')} is required.`;
    } else if (!isNonNegativeNumber(val)) {
      errors[field] = `${field.replace('_', ' ')} cannot be negative.`;
    }
  });

  // Technical Details (OperatingSystems, Browser, Region, TrafficType)
  const techFields = [
    { key: 'OperatingSystems', label: 'Operating System ID' },
    { key: 'Browser', label: 'Browser ID' },
    { key: 'Region', label: 'Region ID' },
    { key: 'TrafficType', label: 'Traffic Type ID' }
  ];
  techFields.forEach(field => {
    const val = inputs[field.key];
    if (val === '' || val === undefined) {
      errors[field.key] = `${field.label} is required.`;
    } else if (!isPositiveInteger(val)) {
      errors[field.key] = `${field.label} must be a positive integer (e.g. 1, 2, ...).`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
