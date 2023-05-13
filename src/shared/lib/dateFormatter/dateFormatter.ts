export type DateFormat =
  | "D.M.Y"
  | "D.M.y"
  | "d.m.y"
  | "D/M/Y"
  | "D/M/y"
  | "d/m/y"
  | "M.D.Y"
  | "M.D.y"
  | "m.d.y"
  | "D-M-Y"
  | "D-M-y"
  | "Y-M-D";

export function dateFormatter(ut: number, key: DateFormat): string {
  type OptionType = {
    year: "numeric" | "2-digit";
    month: "numeric" | "2-digit";
    day: "numeric" | "2-digit";
  };
  const longYearOption: OptionType = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const regularOption: OptionType = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  };
  const shortOption: OptionType = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  };

  const formats = {
    "D.M.Y": { locale: "ru", option: longYearOption },
    "D.M.y": { locale: "ru", option: regularOption },
    "d.m.y": { locale: "mk", option: shortOption },
    "D/M/Y": { locale: "ta", option: longYearOption },
    "D/M/y": { locale: "ta", option: regularOption },
    "d/m/y": { locale: "ta", option: shortOption },
    "M.D.Y": { locale: "en", option: longYearOption },
    "M.D.y": { locale: "en", option: regularOption },
    "m.d.y": { locale: "en", option: shortOption },
    "D-M-Y": { locale: "nl", option: longYearOption },
    "D-M-y": { locale: "nl", option: regularOption },
    "Y-M-D": { locale: "ug", option: longYearOption },
  };

  return new Date(ut * 1000).toLocaleDateString(formats[key]?.locale, formats[key].option);
}
