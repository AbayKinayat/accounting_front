import { useCallback, useEffect, useState } from "react";
import { ITableColumn } from "shared/types/ITable";
import { useSelector } from "react-redux";
import { ITransactionCategory, fetchTransactionCategories, getTransactionCategoryData } from "entities/TransactionCategory";
import { Table } from "shared/ui/Table/Table";
import "./Budget.scss";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { EditBudgetModal } from "features/EditBudgetModal";
import { getTransactionsEndUt, getTransactionsStartUt } from "entities/Transaction";

const columns: ITableColumn[] = [
  {
    field: "name",
    name: "Категория",
    width: 200
  },
  {
    field: "budget",
    name: "Бюджет",
    dataType: "number",
    width: 100
  },
  {
    field: "budgetProgress",
    name: "Прогресс",
    dataType: "progress",
    width: 200
  }
]

const Budget = () => {
  const categoriesData = useSelector(getTransactionCategoryData);
  const startUt = useSelector(getTransactionsStartUt);
  const endUt = useSelector(getTransactionsEndUt);

  const dispatch = useAppDispatch();


  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const [editIsOpen, setEditIsOpen] = useState(false);

  const [currentCategory, setCurrentCategory] = useState<null | ITransactionCategory>(null);

  const sortHandler = useCallback((field: string, order: number) => {
    setSortField(field);
    setSortOrder(order);
  }, [])

  const selectHandler = useCallback((item: ITransactionCategory) => {
    setCurrentCategory(item);
    setEditIsOpen(true);
  }, [])

  const closeEditHandler = useCallback(() => {
    setEditIsOpen(false);
  }, [])

  useEffect(() => {
    dispatch(fetchTransactionCategories())
  }, [startUt, endUt])

  return <div className="budget">
    <h1 className="budget__title">
      Бюджет
    </h1>

    <Table
      columns={columns}
      data={categoriesData}
      keyName="id"
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={sortHandler}
      onSelect={selectHandler}
    />
    <EditBudgetModal 
      isOpen={editIsOpen}
      onClose={closeEditHandler}
      category={currentCategory}
    />
  </div>
}

export default Budget;