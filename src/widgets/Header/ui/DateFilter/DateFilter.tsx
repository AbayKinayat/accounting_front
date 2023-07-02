import { memo, useCallback, useMemo, useState, useEffect, useRef } from "react";
import { Button } from "shared/ui/Button/Button";
import { dateFormatter } from "shared/lib/dateFormatter/dateFormatter";
import { dateToUt } from "shared/lib/dateToUt/dateToUt";
import { DateFilterType } from "../../model/types/DateFilterType";
import { useSelector } from "react-redux";
import { getTransactionsDateType, getTransactionsEndUt, getTransactionsStartUt, transactionsActions } from "entities/Transaction";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { ContextMenu } from "shared/ui/ContextMenu/ContextMenu";
import { ContextMenuItem } from "shared/ui/ContextMenuItem/ContextMenuItem";
import { getFirstYearUt } from "shared/lib/getFirstYearUt/getFirstYearUt";
import { getLastYearUt } from "shared/lib/getLastYeareUt/getLastYearUt";
import { getFirstWeekUt } from "widgets/TransactionStatistic/lib/getFirstWeekUt";
import { getLastWeekUt } from "widgets/TransactionStatistic/lib/getLastWeekUt";
import { Datepicker } from "shared/ui/Datepicker/Datepicker";
import { useForm } from "react-hook-form";
import { IContextMenuRef } from "shared/types/IContextMenuRef";

const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июль", "Июнь", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

export const DateFilter = memo(() => {
  const startUt = useSelector(getTransactionsStartUt);
  const endUt = useSelector(getTransactionsEndUt);
  const dateType = useSelector(getTransactionsDateType);
  const dispatch = useAppDispatch();
  const [referenceElement, setReferenseElement] = useState<HTMLButtonElement | null>(null);
  const contextMenuRef = useRef<null | IContextMenuRef>(null);

  const { control, setValue } = useForm<{ startDate: Date, endDate: Date }>();

  const setStartUt = useCallback((ut: number) => {
    dispatch(transactionsActions.setStartUt(ut))
  }, [])

  const setEndUt = useCallback((ut: number) => {
    dispatch(transactionsActions.setEndUt(ut))
  }, [])

  const text = useMemo(() => {
    const date = new Date(startUt * 1000);

    switch (dateType) {
      case "month":
        return months[date.getMonth()]
      case "year":
        return date.getFullYear();
      default:
        return `${dateFormatter(startUt, 'D.M.Y')} - ${dateFormatter(endUt, "D.M.Y")}`
    }
  }, [startUt, endUt, dateType])

  const prevClickHandler = useCallback(() => {
    const startDate = new Date(startUt * 1000);
    const endDate = new Date(startUt * 1000);

    switch (dateType) {
      case "year":
        startDate.setFullYear(startDate.getFullYear() - 1, 0, 1);
        setStartUt(dateToUt(startDate));
        endDate.setFullYear(endDate.getFullYear() - 1, 11, 31);
        setEndUt(dateToUt(endDate));
        break;
      case "month":
        startDate.setMonth(startDate.getMonth() - 1, 1);
        setStartUt(dateToUt(startDate));
        endDate.setMonth(endDate.getMonth(), 0);
        setEndUt(dateToUt(endDate));
        break;
      case "week":
        startDate.setDate(startDate.getDate() - 7);
        startDate.setHours(0, 1, 0);
        setStartUt(dateToUt(startDate));
        endDate.setDate(endDate.getDate() - 1);
        endDate.setHours(0, 1, 0);
        setEndUt(dateToUt(endDate));
        break;
      default:
        const result = startUt - endUt;
        setStartUt(startUt + result);
        setEndUt(endUt + result);
    }
  }, [startUt, endUt, dateType])

  const nextClickHandler = useCallback(() => {
    const startDate = new Date(startUt * 1000);
    const endDate = new Date(startUt * 1000);

    switch (dateType) {
      case "year":
        startDate.setFullYear(startDate.getFullYear() + 1, 0, 1);
        setStartUt(dateToUt(startDate));
        endDate.setFullYear(endDate.getFullYear() + 1, 11, 31);
        setEndUt(dateToUt(endDate));
        break;
      case "month":
        startDate.setMonth(startDate.getMonth() + 1, 1);
        setStartUt(dateToUt(startDate));
        endDate.setMonth(endDate.getMonth() + 2, 0);
        setEndUt(dateToUt(endDate));
        break;
      case "week":
        startDate.setDate(startDate.getDate() + 7);
        startDate.setHours(0, 1, 0);
        setStartUt(dateToUt(startDate));
        endDate.setDate(endDate.getDate() + 13);
        endDate.setHours(0, 1, 0);
        setEndUt(dateToUt(endDate));
        break;
      default:
        const result = startUt - endUt;
        setStartUt(startUt - result);
        setEndUt(endUt - result);
    }
  }, [startUt, endUt, dateType])

  const contextMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    contextMenuRef.current?.open(event);
  }, [])

  const selectDateType = (dateType: DateFilterType) => {
    switch (dateType) {
      case "year":
        setStartUt(getFirstYearUt(new Date()));
        setEndUt(getLastYearUt(new Date()));
        break
      case "month":
        setStartUt(new Date().setDate(1) / 1000);
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1, 0);
        setEndUt(endDate.getTime() / 1000);
        break
      case "week":
        setStartUt(getFirstWeekUt(new Date()));
        setEndUt(getLastWeekUt(new Date()));
        break;
      default:
        setValue("startDate", new Date(startUt * 1000));
        setValue("endDate", new Date(endUt * 1000));
    }
    dispatch(transactionsActions.setDateType(dateType));
  }

  const startDateChangeHandler = useCallback((date: Date | null) => {
    if (date) {
      setStartUt(date.getTime() / 1000)
    }
  }, [])

  const endDateChangeHandler = useCallback((date: Date | null) => {
    if (date) {
      setEndUt(date.getTime() / 1000);
    }
  }, []);

  useEffect(() => {
    selectDateType("year")
  }, [])

  return <div className="date-filter">
    <Button mod="tab" onClick={prevClickHandler}>
      Пред
    </Button>
    <Button
      mod="tab"
      ref={setReferenseElement}
      onClick={contextMenuOpen}
    >
      {text}
    </Button>
    <Button mod="tab" onClick={nextClickHandler}>
      След
    </Button>
    <ContextMenu
      ref={contextMenuRef}
    >
      <ContextMenuItem onClick={selectDateType.bind(null, "year")}>
        Год
      </ContextMenuItem>
      <ContextMenuItem onClick={selectDateType.bind(null, "month")}>
        Месяц
      </ContextMenuItem>
      <ContextMenuItem onClick={selectDateType.bind(null, "week")}>
        Неделя
      </ContextMenuItem>
      <ContextMenuItem onClick={selectDateType.bind(null, "custom")}>
        Вручную
      </ContextMenuItem>
      {
        dateType === "custom" &&
        <>
          <Datepicker
            label="c"
            control={control}
            name="startDate"
            onChange={startDateChangeHandler}
          />
          <Datepicker
            label="по"
            control={control}
            name="endDate"
            onChange={endDateChangeHandler}
          />
        </>
      }
    </ContextMenu>
  </div>
}) 