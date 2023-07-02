import { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table } from "shared/ui/Table/Table";
import { Paginator } from "shared/ui/Paginator/Paginator";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { ITransaction, fetchTransactions, getTransactionsData, getTransactionsEndUt, getTransactionsPage, getTransactionsSortField, getTransactionsSortOrder, getTransactionsStartUt, getTransactionsTotal, transactionsActions } from "entities/Transaction";

import { TransactionGroup } from "./TransactionGroup";
import { useSearchParams } from "react-router-dom";
import { ITableColumn } from "shared/types/ITable";
import { fetchTransactionCategories } from "entities/TransactionCategory";

const columns: ITableColumn[] = [
  {
    field: "name",
    name: "Описание",
    width: 200,
  },
  {
    field: "Category.name",
    iconField: "Category.iconId",
    name: "Категория",
    width: 100,
  },
  {
    field: "date",
    name: "Дата",
    width: 100,
    dataType: "date",
    isCustomSort: true
  },
  {
    field: "amount",
    name: "Сумма",
    width: 100,
    dataType: "number"
  }
]

const TransactionsPage: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const transactionsData = useSelector(getTransactionsData);
  const transactionsPage = useSelector(getTransactionsPage);
  const transactionsTotal = useSelector(getTransactionsTotal);
  const sortField = useSelector(getTransactionsSortField);
  const sortOrder = useSelector(getTransactionsSortOrder);
  const startUt = useSelector(getTransactionsStartUt);
  const endUt = useSelector(getTransactionsEndUt);

  const getTransactions = () => {
    dispatch(fetchTransactions());
  }

  const sortChange = useCallback((field: string, order: number) => {
    dispatch(transactionsActions.setSortField(field));
    dispatch(transactionsActions.setSortOrder(order));
    if (field === "date")
      dispatch(fetchTransactions());
  }, [dispatch])

  const changeTransactionsPage = useCallback((page: number) => {
    dispatch(transactionsActions.setPage(page));

    setSearchParams({
      page: String(page)
    })

    getTransactions();
  }, [dispatch, sortOrder, sortField])

  const selectHandler = useCallback((item: ITransaction) => {
    dispatch(transactionsActions.setEditId(item.id));
    dispatch(transactionsActions.setEditIsOpen(true));
  }, []);

  useEffect(() => {
    if (searchParams.get("page"))
      dispatch(transactionsActions.setPage(
        Number(searchParams.get("page"))
      ));

    dispatch(transactionsActions.setIsPagination(true));

    getTransactions();

    dispatch(transactionsActions.setGetTransactionsWhenCreate(true));

    return () => {
      dispatch(transactionsActions.setPage(1));
      dispatch(transactionsActions.setGetTransactionsWhenCreate(false));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchTransactionCategories());
  }, [])

  return <div className="transactions-page">
    <h1 className="transactions-page__title">
      Транзакции
    </h1>
    <Table
      className="transactions-page__table"
      groupBy="date"
      groupType="date"
      keyName="id"
      columns={columns}
      sortOrder={sortOrder}
      sortField={sortField}
      GroupComponent={TransactionGroup}
      data={transactionsData}
      onSort={sortChange}
      onSelect={selectHandler}
    />
    <Paginator
      page={transactionsPage}
      onChange={changeTransactionsPage}
      total={transactionsTotal}
    />
  </div>
}

export default TransactionsPage;