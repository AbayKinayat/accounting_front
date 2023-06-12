import { memo } from "react";
import { Button } from "shared/ui/Button/Button";
import "./ExpenseIncome.scss";

interface ExpenseIncomeProps {
  typeId: number,
  onChange?: (typeId: number) => void
}

export const ExpenseIncome = memo<ExpenseIncomeProps>(({ typeId, onChange }) => {
  const typeChangeHandler = (typeId: number) => {
    onChange?.(typeId);
  }

  return <div className="expense-income">
    <Button
      mod="tab"
      onClick={typeChangeHandler.bind(null, 2)}
      isActive={typeId === 2}
      full
    >
      Расход
    </Button>
    <Button
      mod="tab"
      onClick={typeChangeHandler.bind(null, 1)}
      isActive={typeId === 1}
      full
    >
      Доход
    </Button>
  </div>
})