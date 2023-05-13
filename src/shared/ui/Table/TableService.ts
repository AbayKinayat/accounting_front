import { dateToUt } from "shared/lib/dateToUt/dateToUt";
import { formatNumber } from "../../lib/formatNumber/formatNumber";
import { dateFormatter } from "shared/lib/dateFormatter/dateFormatter";

export class TableService {
  public formatText(value: any, dataType?: "number" | "text" | "date") {
    switch (dataType) {
      case "number":
        return formatNumber(Number(value));
      case "date":
        return dateFormatter(value, "d.m.y")
      default: return value;
    }
  }

  public getField(item: Record<string, any>, textPath: string) {

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
          value = value?.[path];
          text = value;
        }
      })
    } else {
      text = item[textPath]
    }

    return text;
  }

  public formatGroup(groupName: any, groupType?: "date") {
    switch (groupType) {
      case "date":
        return this.formatGroupDate(groupName);
      default: return groupName;
    }
  }

  private formatGroupDate(groupName: any) {
    const date = new Date(groupName * 1000);
    date.setHours(0, 0, 1, 0);
    return dateToUt(date);
  }
}