import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import type { EventInput, DatesSetArg, EventChangeArg, EventClickArg, EventContentArg, DayCellContentArg } from "@fullcalendar/core"
import { ITransaction, fetchTransactions, getTransactionsData, transactionsActions } from 'entities/Transaction';
import ruLocale from '@fullcalendar/core/locales/ru';
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { editTransaction } from "features/EditTransactionModal";
import { Currency } from "shared/ui/Currency/Currency";

const plugins = [dayGridPlugin, interactionPlugin];

function EventContent({ event, backgroundColor }: EventContentArg) {
  return <div className="transactions-calendar__event">
    <div className="transactions-calendar__event-circle" style={{ background: backgroundColor }}>
    </div>
    <div className="transactions-calendar__event-title">
      {event.title}
    </div>
    <Currency className="transactions-calendar__event-amount">
      {Number(event.extendedProps.amount)}
    </Currency>
  </div>
}

const TransactionsCalendar = () => {
  const [start, setStart] = useState<Date | undefined>()
  const [end, setEnd] = useState<Date | undefined>()
  const calendarRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const transactions = useSelector(getTransactionsData);

  const eventsAmounts = useMemo(() => {
    const map: Record<string, number> = {};

    transactions.forEach(transaction => {
      const date = new Date(transaction.date * 1000);
      if (!map[date.toISOString()]) map[date.toISOString()] = 0;
      map[date.toISOString()] += Number(transaction.amount);
    })

    return map;
  }, [transactions]);

  const eventDataTransform = useCallback((transaction: ITransaction): EventInput => {
    const transactionDate = new Date(transaction.date * 1000);

    return {
      title: transaction.name,
      start: transactionDate.toISOString(),
      backgroundColor: transaction?.Category?.color,
      extendedProps: transaction
    }
  }, [])

  const datesSet = useCallback(({ start, end }: DatesSetArg) => {
    setStart(start);
    setEnd(end)
  }, []);

  const fetchCalendarTransactions = () => {
    if (start && end) {
      const startUt = Math.trunc(start.getTime() / 1000);
      const endUt = Math.trunc(end.getTime() / 1000);

      dispatch(transactionsActions.setStartUt(startUt));
      dispatch(transactionsActions.setEndUt(endUt));
      dispatch(fetchTransactions())
    }
  }

  const eventChangeHandler = useCallback(async (eventChangeArg: EventChangeArg) => {
    const date = Math.trunc(Number(eventChangeArg.event.start?.getTime()) / 1000);
    const transaction = eventChangeArg.event.extendedProps as ITransaction;

    await dispatch(editTransaction({
      id: transaction.id,
      amount: transaction.amount,
      categoryId: transaction.categoryId,
      name: transaction.name,
      typeId: transaction.typeId,
      date
    }))

    fetchCalendarTransactions()
  }, [start, end])

  const eventClickHandler = useCallback((event: EventClickArg) => {
    const transaction = event.event.extendedProps as ITransaction;
    dispatch(transactionsActions.setEditId(transaction.id));
    dispatch(transactionsActions.setEditIsOpen(true));
  }, [])

  const dateClickHandler = useCallback(({ date }: DateClickArg) => {
    dispatch(transactionsActions.setCreateInitialDate(date));
    dispatch(transactionsActions.setIsOpen(true));
  }, [])

  const dayCellContent = useCallback(({ dayNumberText, date }: DayCellContentArg) => {
    const amount = eventsAmounts[date.toISOString()];

    console.log("dayCellContent")

    return <div className="transactions-calendar__date-cell">
      <Currency>
        {amount}
      </Currency>
      <div className="transactions-calendar__date-text">{dayNumberText}</div>
    </div>
  }, [eventsAmounts, transactions])

  useEffect(() => {
    dispatch(transactionsActions.setIsPagination(false));
    fetchCalendarTransactions();
  }, [start, end])

  useEffect(() => {
    dispatch(transactionsActions.setGetTransactionsWhenCreate(true));
    return () => {
      dispatch(transactionsActions.setGetTransactionsWhenCreate(false));
    }
  }, [])

  useEffect(() => {
    console.log("transactions change", transactions)
  }, [transactions]);

  return <div className="transactions-calendar">
    <FullCalendar
      plugins={plugins}
      events={transactions as any}
      eventDataTransform={eventDataTransform as any}
      datesSet={datesSet}
      locale={ruLocale}
      height="100%"
      editable
      selectable
      droppable
      ref={calendarRef}
      eventChange={eventChangeHandler}
      eventClick={eventClickHandler}
      dateClick={dateClickHandler}
      dayMaxEventRows={4}
      eventContent={EventContent}
      dayCellContent={dayCellContent}
    />
  </div>
}

export default TransactionsCalendar;