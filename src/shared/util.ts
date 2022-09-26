const formatter = new (Intl as any).ListFormat('en', {
  style: 'short',
  type: 'disjunction',
});

/**
 * It takes a property name and an array of values, and returns a string that says "each value in
 * [propertyName] must be [values]"
 * @param {string} propertyName - The name of the property that is being validated.
 * @param {unknown[]} values - The values that the property must be one of.
 * @returns A function that takes two parameters, propertyName and values, and returns a string.
 */

export function generateValidationMessageByValues(
  propertyName: string,
  values: unknown[],
) {
  const isPlural = propertyName.at(-1) === 's' && propertyName !== 'status';
  if (isPlural) {
    return `each value in ${propertyName} must be ${formatter.format(values)}`;
  }
  return `${propertyName} value must be ${formatter.format(values)}`;
}
