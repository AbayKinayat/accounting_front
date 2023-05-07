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

export const TransactionGroup = memo<ITransactionGroup>(({ columns, items, name }) => {

  const amountSum = useMemo(() => {
    return formatNumber(items.reduce((acc, val) => acc + val.amount, 0));
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
            column.field === "name" ? name : column.field === "amount" ? amountSum : ""
          }
        </td>
      ))
    }
  </tr>
})