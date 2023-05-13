export type TimeFormat = "H:K:S" | "H:K" | "h:K" | "H-K-S" | "H-K" | "h-K" | "H.K.S" | "H.K" | "h.K";

function getSeparator(_key: TimeFormat) {
  if (_key.includes(":")) return ":";
  if (_key.includes("-")) return "-";
  return ".";
}

export function timeFormatter(ut: number, key: TimeFormat): string {
  const time = ut * 1000;

  const date = new Date(time);
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const hoursLong = String(date.getUTCHours()).padStart(2, "0");
  const hoursRegular = date.getUTCHours();
  const separator = getSeparator(key);

  if (key.length === 3 && key[0] === "h") return `${hoursRegular}${separator}${minutes}`;
  if (key.length === 5) return `${hoursLong}${separator}${minutes}${separator}${seconds}`;

  return `${hoursLong}${separator}${minutes}`;
}
