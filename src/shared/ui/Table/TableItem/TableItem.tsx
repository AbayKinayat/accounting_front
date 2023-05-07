import { memo } from "react";
import { ITableColumn } from "shared/types/ITable";
import classNames from "classnames";
import { TableService } from "../TableService";

interface TableItemProps {
  item: Record<string, any>,
  columns: ITableColumn[]
}

const tableService = new TableService();

export const TableItem = memo<TableItemProps>(({ item, columns }) => {
  return <tr
    className="table__row"
  >
    {
      columns.map(column =>
        <td
          key={column.field}
          className={
            classNames("table__property", {
              table__property_number: column.dataType === "number"
            })
          }
          style={{ width: column.width }}
        >
          {tableService.formatText(
            tableService.getText(item, column.field),
            column.dataType
          )}
        </td>
      )
    }
  </tr>
})