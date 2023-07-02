import { memo, useCallback, useMemo } from "react";
import { Button } from "shared/ui/Button/Button";
import { dateFormatter } from "shared/lib/dateFormatter/dateFormatter";
import { dateToUt } from "shared/lib/dateToUt/dateToUt";
import { DateFilterType } from "../../types/DateFilterType";

interface DateFilterProps {
  type: DateFilterType,
  startUt: number,
  endUt: number,
  setStartUt: (ut: number) => void,
  setEndUt: (ut: number) => void,
}

const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июль", "Июнь", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

export const DateFilter = memo<DateFilterProps>(({
  type,
  endUt,
  startUt,
  setStartUt,
  setEndUt
}) => {
  const text = useMemo(() => {
    const date = new Date(startUt * 1000);

    switch (type) {
      case "month":
        return months[date.getMonth()]
      case "year":
        return date.getFullYear();
      default:
        return `${dateFormatter(startUt, 'D.M.Y')} - ${dateFormatter(endUt, "D.M.Y")}`
    }
  }, [startUt, endUt, type])

  const prevClickHandler = useCallback(() => {
    const startDate = new Date(startUt * 1000);
    const endDate = new Date(startUt * 1000);

    if (type === "year") {
      startDate.setFullYear(startDate.getFullYear() - 1, 0, 1);
      setStartUt(dateToUt(startDate));
      endDate.setFullYear(endDate.getFullYear() - 1, 11, 31);
      setEndUt(dateToUt(endDate));
    } else if (type === "month") {
      startDate.setMonth(startDate.getMonth() - 1, 1);
      setStartUt(dateToUt(startDate));
      endDate.setMonth(endDate.getMonth(), 0);
      setEndUt(dateToUt(endDate));
    } else if (type === "week") {
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 1, 0);
      setStartUt(dateToUt(startDate));
      endDate.setDate(endDate.getDate() - 1);
      endDate.setHours(0, 1, 0);
      setEndUt(dateToUt(endDate));
    } else {
      const result = startUt - endUt;
      setStartUt(startUt + result);
      setEndUt(endUt + result);
    } 
  }, [startUt, endUt, type])

  const nextClickHandler = useCallback(() => {
    const startDate = new Date(startUt * 1000);
    const endDate = new Date(startUt * 1000);

    if (type === "year") {
      startDate.setFullYear(startDate.getFullYear() + 1, 0, 1);
      setStartUt(dateToUt(startDate));
      endDate.setFullYear(endDate.getFullYear() + 1, 11, 31);
      setEndUt(dateToUt(endDate));
    } else if (type === "month") {
      startDate.setMonth(startDate.getMonth() + 1, 1);
      setStartUt(dateToUt(startDate));
      endDate.setMonth(endDate.getMonth() + 2, 0);
      setEndUt(dateToUt(endDate));
    } else if (type === "week") {
      startDate.setDate(startDate.getDate() + 7);
      startDate.setHours(0, 1, 0);
      setStartUt(dateToUt(startDate));
      endDate.setDate(endDate.getDate() + 13);
      endDate.setHours(0, 1, 0);
      setEndUt(dateToUt(endDate));
    } else {
      const result = startUt - endUt;
      setStartUt(startUt - result);
      setEndUt(endUt - result);
    } 
  }, [startUt, endUt, type])

  return <div className="date-filter">
    <Button mod="tab" onClick={prevClickHandler}>
      Пред
    </Button>
    <Button mod="tab">
      {text}
    </Button>
    <Button mod="tab" onClick={nextClickHandler}>
      След
    </Button>
  </div>
}) 