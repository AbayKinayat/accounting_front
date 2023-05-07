import { memo, useCallback } from "react";
import { ITableColumn } from "../../../types/ITable";
import { ISort } from "../../../types/ISort";
import { Icon } from "../../Icon/Icon";

interface TableColumnProps {
  column: ITableColumn,
  sortField?: string,
  sortOrder?: number,
  onSort: (sort: ISort) => void
}

export const TableColumn = memo<TableColumnProps>(({
  column,
  sortField,
  sortOrder,
  onSort
}) => {

  const sortHandler = useCallback(() => {
    console.log("sortField", sortField);
    console.log("sortOrder", sortOrder);
    console.log("nextSortOrder", sortOrder ? sortOrder * -1 : 1)
    const nextSort: ISort = {
      order: sortOrder ? sortOrder * -1 : 1,
      field: column.field
    }
    onSort(nextSort);
  }, [onSort, sortOrder, column]);

  return <td
    className="table__property"
    style={{ width: column.width }}
    onClick={sortHandler}
  >
    <div className="table__container">
      {column.name}
      {
        sortField === column.field &&
        <Icon
          name={sortOrder === 1 ? 'asc' : 'desc'}
          size="small"
        />
      }
    </div>
  </td>
})