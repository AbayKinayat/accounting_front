import { Table } from "shared/ui/Table/Table";
import "./Debt.scss";
import { ITableColumn } from "shared/types/ITable";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { IDebt, fetchDebts, getDebtsData, getDebtsError, getDebtsLoading } from "entities/Debt";
import { useSelector } from "react-redux";
import { IContextMenuRef } from "shared/types/IContextMenuRef";
import { AddDebtModal } from "features/AddDebtModal";
import { DebtTableGroup } from "./DebtTableGroup/DebtTableGroup";
import { EditDebtModal } from "features/EditDebtModal";
import { ITableContextMenuItem } from "shared/types/ITableContextMenuItem";

const columns: ITableColumn[] = [
  {
    field: "name",
    name: 'Наименование',
    width: 200
  },
  {
    field: "sum",
    name: "Сумма",
    dataType: "number",
    width: 50
  },
  {
    field: "amountPaid",
    name: "Выплачено",
    dataType: "number",
    width: 50
  },
  {
    field: "dateFrom",
    name: "C",
    dataType: "date",
    width: 200
  },
  {
    field: "dateTo",
    name: "По",
    dataType: "date",
    width: 200,
  }
]

const Debt = () => {
  const dispatch = useAppDispatch();

  const debts = useSelector(getDebtsData);
  const loading = useSelector(getDebtsLoading);
  const error = useSelector(getDebtsError);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentDebt, setCurrentDebt] = useState<null | IDebt>(null);

  const openCreateDebt = useCallback(() => {
    setIsCreateOpen(true);
  }, []);

  const closeEditDebt = useCallback(() => {
    setIsEditOpen(false);
  }, []);

  const closeCreateDebt = useCallback(() => {
    setIsCreateOpen(false);
  }, []);

  const contextMenuHandler = useCallback((event: React.MouseEvent<HTMLElement>, item: any) => {
    const debt = item as IDebt;
    setCurrentDebt(debt);
  }, [setCurrentDebt]);

  const contextMenuItems = useMemo<ITableContextMenuItem[]>(() => {
    return [
      {
        key: 1,
        label: "Добавить",
        command: openCreateDebt
      },
      {
        key: 2,
        label: "Редактировать",
        command: () => {
          setIsEditOpen(true);
        }
      }
    ]
  }, [openCreateDebt])

  const selectDebtHandler = useCallback((debt: IDebt) => {
    setCurrentDebt(debt)
    setIsEditOpen(true);
  }, [])

  useEffect(() => {
    dispatch(fetchDebts())
  }, []);

  return <div className="debt">
    <h1 className="debt__title">
      Долги
    </h1>
    <Table
      className="debt__table"
      columns={columns}
      data={debts}
      keyName="id"
      title="Что бы добавить, нажмите правой кнопкой мыши"
      groupBy="isDebtor"
      GroupComponent={DebtTableGroup}
      menuItems={contextMenuItems}
      onContextMenu={contextMenuHandler}
      onSelect={selectDebtHandler}
    />
    <AddDebtModal isOpen={isCreateOpen} onClose={closeCreateDebt} />
    <EditDebtModal isOpen={isEditOpen} onClose={closeEditDebt} debt={currentDebt} />
  </div>
}

export default Debt;