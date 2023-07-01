import { memo } from "react";
import type { ITableColumn } from "shared/types/ITable";
import "./DebtTableGroup.scss";

interface DebtTableGroupProps {
  items: Record<string, any>[],
  name: string,
  columns: ITableColumn[],
}

export const DebtTableGroup = memo<DebtTableGroupProps>(({ columns, name }) => {

  return <tr
    className="debt-table-group">
    <td
      className="debt-table-group__property"
      colSpan={columns.length + 1}
    >
      {
        name ? "Должен я" : "Должны мне"
      }
    </td>
  </tr>
})