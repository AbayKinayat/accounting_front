export function checkTypesAndSort(aField: any, bField: any): number {
  const isStringValues = typeof aField === "string" && typeof bField === "string";
  const isNumberValues = typeof aField === "number" && typeof bField === "number";
  const isBooleanValues = typeof aField === "boolean" && typeof bField === "boolean";
  const isOneString = typeof aField === "string" || typeof bField === "string";
  const isOneNumber = typeof aField === "number" || typeof bField === "number";
  const isOneBoolean = typeof aField === "boolean" || typeof bField === "boolean";
  const isOneNull = aField === null || bField === null;

  if (isStringValues || (isOneString && isOneNull)) return (aField || "").localeCompare(bField || "");

  if (isNumberValues || (isOneNumber && isOneNull) || isBooleanValues || (isOneBoolean && isOneNull))
    return Number(aField) - Number(bField);

  // TODO There maybe situation when "aField" and "bField" are differanr types.
  // @example string vs null or undefined vs number
  return 0;
}
