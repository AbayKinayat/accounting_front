import { useCallback, useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import "./TransactionsCalendar.scss";
import type { EventInput, DatesSetArg, EventChangeArg, EventClickArg } from "@fullcalendar/core"
import { useSelector } from 'react-redux';
import { ITransaction, fetchTransactions, getTransactionsData, getTransactionsLoading, transactionsActions } from 'entities/Transaction';
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import ruLocale from '@fullcalendar/core/locales/ru';
import { editTransaction } from "features/EditTransactionModal/model/services/editTransaction";

const plugins = [dayGridPlugin, interactionPlugin];

const TransactionsCalendar = () => {
  const [start, setStart] = useState<Date | undefined>()
  const [end, setEnd] = useState<Date | undefined>()
  const dispatch = useAppDispatch();

  const transactions = useSelector(getTransactionsData);
  const transactionsLosading = useSelector(getTransactionsLoading);

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

      dispatch(fetchTransactions({ startUt, endUt }))
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
  }, [])

  const eventClickHandler = useCallback((event: EventClickArg) => {
    const transaction = event.event.extendedProps as ITransaction;
    dispatch(transactionsActions.setEditId(transaction.id));
    dispatch(transactionsActions.setEditIsOpen(true));
  }, [])

  useEffect(fetchCalendarTransactions, [start, end])

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
      eventChange={eventChangeHandler}
      eventClick={eventClickHandler}
    />
  </div>
}

export default TransactionsCalendar;