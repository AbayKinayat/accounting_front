import { FC, useEffect, useState } from "react";
import "./TransactionsPage.scss";
import { Table } from "shared/ui/Table/Table";
import { TransactionGroup } from "./TransactionGroup";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { fetchTransactions, getTransactionsData } from "entities/Transaction";
import { useSelector } from "react-redux";

const data = [
  {
    id: 1,
    name: "Transaction 1",
    category: {
      name: "Category 1"
    },
    createdAt: "12.12.2022",
    amount: 1000
  },
  {
    id: 2,
    name: "Transaction 2",
    category: {
      name: "Category 2"
    },
    createdAt: "12.12.2022",
    amount: 72622
  },
  {
    id: 3,
    name: "Transaction 3",
    category: {
      name: "Category 3"
    },
    createdAt: "12.12.2022",
    amount: 27
  },
  {
    id: 4,
    name: "Transaction 4",
    category: {
      name: "Category 4"
    },
    createdAt: "12.12.2022",
    amount: 923
  },

]

const TransactionsPage: FC = () => {
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState(1);
  const dispatch = useAppDispatch();

  const transactionsData = useSelector(getTransactionsData);

  useEffect(() => {
    dispatch(fetchTransactions({
      sortField,
      sortOrder
    }));
  }, [dispatch]);

  console.log("transactionsData", transactionsData);

  return <div className="transactions-page">
    <Table
      sortField={sortField}
      sortOrder={sortOrder}
      setSortField={setSortField}
      setSortOrder={setSortOrder}
      groupBy="createdAt"
      columns={[
        {
          field: "name",
          name: "Описание",
          width: 200,
        },
        {
          field: "category.name",
          name: "Категория",
          width: 100,
        },
        {
          field: "createdAt",
          name: "Дата",
          width: 100,
        },
        {
          field: "amount",
          name: "Сумма",
          width: 100,
          dataType: "number"
        }
      ]}
      GroupComponent={TransactionGroup}
      data={data}
      keyName="id"
    />
  </div>
}

export default TransactionsPage;