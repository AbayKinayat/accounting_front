import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "shared/ui/Table/Table";
import { Paginator } from "shared/ui/Paginator/Paginator";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { fetchTransactions, getTransactionsData, getTransactionsPage, getTransactionsTotal, transactionsActions } from "entities/Transaction";

import { TransactionGroup } from "./TransactionGroup";
import "./TransactionsPage.scss";
import { useSearchParams } from "react-router-dom";

const TransactionsPage: FC = () => {
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState(1);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const transactionsData = useSelector(getTransactionsData);
  const transactionsPage = useSelector(getTransactionsPage);
  const transactionsTotal = useSelector(getTransactionsTotal);

  const getTransactions = () => {
    dispatch(fetchTransactions({
      sortField,
      sortOrder
    }))
  }

  const changeTransactionsPage = useCallback((page: number) => {
    dispatch(transactionsActions.setPage(page));

    setSearchParams({
      page: String(page)
    })

    getTransactions();
  }, [dispatch])

  useEffect(() => {
    if (searchParams.get("page"))
      dispatch(transactionsActions.setPage(
        Number(searchParams.get("page"))
      ));

    getTransactions();

    return () => {
      dispatch(transactionsActions.setPage(1));
    }
  }, [dispatch]);

  return <div className="transactions-page">
    <Table
      className="transactions-page__table"
      sortField={sortField}
      sortOrder={sortOrder}
      setSortField={setSortField}
      setSortOrder={setSortOrder}
      groupBy="date"
      groupType="date"
      columns={[
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
          dataType: "date"
        },
        {
          field: "amount",
          name: "Сумма",
          width: 100,
          dataType: "number"
        }
      ]}
      GroupComponent={TransactionGroup}
      data={transactionsData}
      keyName="id"
    />
    <Paginator
      page={transactionsPage}
      onChange={changeTransactionsPage}
      total={transactionsTotal}
    />
  </div>
}

export default TransactionsPage;