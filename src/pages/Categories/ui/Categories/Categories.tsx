import { FC, useEffect, useState, useCallback } from "react";
import "./Categories.scss";
import { fetchTransactionCategories, getTransactionCategoryData } from "entities/TransactionCategory";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { getFirstYearUt } from "shared/lib/getFirstYearUt/getFirstYearUt";
import { getLastYearUt } from "shared/lib/getLastYeareUt/getLastYearUt";
import { Table } from "shared/ui/Table/Table";
import { ITableColumn } from "shared/types/ITable";
import { useSelector } from "react-redux";

const columns: ITableColumn[] = [
  {
    field: "name",
    name: "Описание",
  },
  {
    field: "sum",
    dataType: "number",
    name: "Сумма"
  },
  {
    field: "count",
    name: "Количество"
  }
];

const Categories: FC = () => {

  const [startUt, setStartUt] = useState(0);
  const [endUt, setEndUt] = useState(0);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const dispatch = useAppDispatch();
  const categories = useSelector(getTransactionCategoryData);

  const sortHandler = useCallback((field: string, order: number) => {
    setSortField(field);
    setSortOrder(order);
  }, [])

  useEffect(() => {
    let startUtValue = startUt;
    let endUtValue = endUt;
    if (!startUtValue) {
      startUtValue = getFirstYearUt(new Date());
      setStartUt(startUtValue);
    }
    if (!endUtValue) {
      endUtValue = getLastYearUt(new Date());
      setEndUt(endUtValue);
    }

    dispatch(fetchTransactionCategories({
      startUt: startUtValue,
      endUt: endUtValue
    }))
  }, [startUt, endUt])

  return <div className="categories">
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