import { memo, useMemo } from "react";
import "./TransactionGroup.scss";
import { ITableColumn } from "shared/types/ITable";
import classNames from "classnames";
import { formatNumber } from "shared/lib/formatNumber/formatNumber";

interface ITransactionGroup {
  items: Record<string, any>[],
  name: string,
  columns: ITableColumn[]
}


const days = ["Вс", "Пон", "Вт", "Ср", "Чт", "Пт", "Сб"];

export const TransactionGroup = memo<ITransactionGroup>(({ columns, items, name }) => {

  const amountSum = useMemo(() => {
    return formatNumber(items.reduce((acc, val) => acc + Number(val.amount), 0));
  }, [])
  
  const formattedDate = useMemo(() => {
    console.log("name", name)
    const date = new Date(Number(name) * 1000);
    const month = date.toLocaleDateString("ru-Ru", { month: "short",  });
    const day = days[date.getDay()]; 
    const dayNum = date.getDate()

    return `${day}, ${dayNum} ${month}`
  }, [])

  return <tr
    className="transaction-group">
    {
      columns.map((column) => (
        <td
          className={
            classNames(
              "transaction-group__property",
              {
                "transaction-group__property_sum": column.field === "amount"
              }
            )
          }
          key={column.field}
        >
          {
            column.field === "name" ? formattedDate : column.field === "amount" ? amountSum : ""
          }
        </td>
      ))
    }
  </tr>
})