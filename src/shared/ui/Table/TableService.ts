import { formatNumber } from "../../lib/formatNumber/formatNumber";

export class TableService {
  public formatText(value: any, dataType?: "number" | "text") {
    switch (dataType) {
      case "number":
        return formatNumber(Number(value));
      default: return value;
    }
  }

  public getText(item: Record<string, any>, textPath: string) {

    let text = "";

    if (textPath.includes(".")) {
      const textPathArr = textPath.split(".");
      let value: any = "";
      textPathArr.forEach((path, index) => {
        if (index - 1 === textPathArr.length && textPath.length > 2) {
          text = value?.[path];
        } else if (index === 0 && item?.[path]) {
          value = item[path]
        } else {
          value = value[path];
          text = value;
        }
      })
    } else {
      text = item[textPath]
    }

    return text;
  }
}