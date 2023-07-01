import { memo, useCallback } from "react";
import { ITableColumn } from "shared/types/ITable";
import classNames from "classnames";
import { TableService } from "../TableService";
import { Icon } from "shared/ui/Icon/Icon";

interface TableItemProps {
  item: Record<string, any>,
  columns: ITableColumn[],
  onSelect?: (item: Record<string, any>) => void,
  onContextMenu: (event: React.MouseEvent<HTMLElement>, item?: Record<string, any>) => void
}

const tableService = new TableService();

export const TableItem = memo<TableItemProps>(({ item, columns, onSelect, onContextMenu }) => {

  const clickHandler = useCallback(() => {
    onSelect?.(item)
  }, [])

  const contextMenuHandler = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onContextMenu(event, item);
  }, [])

  return <tr
    className="table__row"
    onClick={clickHandler}
    onContextMenu={contextMenuHandler}
  >
    {
      columns.map(column =>
        <td
          key={column.field}
          className={
            classNames("table__property", {
              table__property_number: column.dataType === "number",
              table__property_percent: column.dataType === "percent",
            })
          }
          style={{ width: column.width }}
        >
          <div className="table__container">
            {
              column.iconField && <Icon
                name={tableService.getField(item, column.iconField)}
              />
            }
            {tableService.formatText(
              tableService.getField(item, column.field),
              column.dataType
            )}
          </div>
        </td>
      )
    }
    <td className="table__property"></td>
  </tr>
})