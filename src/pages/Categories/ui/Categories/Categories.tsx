import { FC, useEffect, useState, useCallback } from "react";
import "./Categories.scss";
import { fetchTransactionCategories, getTransactionCategoryData } from "entities/TransactionCategory";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { Table } from "shared/ui/Table/Table";
import { ITableColumn } from "shared/types/ITable";
import { useSelector } from "react-redux";
import { getTransactionsEndUt, getTransactionsStartUt } from "entities/Transaction";

const columns: ITableColumn[] = [
  {
    field: "name",
    name: "Описание",
  },
  {
    field: "sum",
    dataType: "number",
    name: "Сумма",
    width: "200px"
  },
  {
    field: "count",
    name: "Количество",
    dataType: "number",
    width: "100px"
  },
  {
    field: "percent", 
    name: "%",
    dataType: "percent",
    width: "100px"
  }
];

const Categories: FC = () => {

  const startUt = useSelector(getTransactionsStartUt);
  const endUt = useSelector(getTransactionsEndUt);
  
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const dispatch = useAppDispatch();
  const categories = useSelector(getTransactionCategoryData);

  const sortHandler = useCallback((field: string, order: number) => {
    setSortField(field);
    setSortOrder(order);
  }, [])

  useEffect(() => {
    dispatch(fetchTransactionCategories({
      startUt: startUt,
      endUt: endUt
    }))
  }, [startUt, endUt])

  return <div className="categories">
    <h1 className="categories__title">
      Категории
    </h1>
    <Table 
      columns={columns}
      data={categories}
      keyName="id"
      className="categories__table"
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={sortHandler}
    />
  </div>
}

export default Categories;