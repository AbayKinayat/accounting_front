import { FC, Fragment, memo, useCallback, useMemo, useState } from "react";
import { TableColumn } from "./TableColumn/TableColumn";
import { TableItem } from "./TableItem/TableItem";
import { ITableColumn } from "../../types/ITable";
import { ISort } from "../../types/ISort";
import { TableService } from "./TableService";
import "./Table.scss";
import classNames from "classnames";
import { checkTypesAndSort } from "shared/lib/checkTypesAndSort/checkTypesAndSort";

const tableService = new TableService();

interface IGroupComponentProps {
  items: Record<string, any>[],
  name: string,
  columns: ITableColumn[]
}

interface TableProps {
  columns: ITableColumn[],
  className?: string,
  data: any[],
  sortField?: string,
  sortOrder?: number,
  GroupComponent?: FC<IGroupComponentProps>,
  keyName: string,
  groupBy?: string,
  groupType?: "date",
  onSort?: (field: string, order: number) => void,
  onSelect?: (item: any) => void
}

interface ITableGroup {
  name: string,
  items: Record<string, any>[],
}

export const Table = memo<TableProps>(({
  columns,
  data,
  keyName,
  sortField,
  sortOrder,
  groupType,
  groupBy,
  GroupComponent,
  className,
  onSort,
  onSelect
}) => {
  const [lastSortField, setLastSortField] = useState(sortField);
  const [lastSortOrder, setLastSortOrder] = useState(sortOrder);

  const sortHandler = useCallback((sort: ISort) => {
    const isCustomSort = Boolean(columns.find(column => column.field === sort.field)?.isCustomSort);

    if (!isCustomSort) {
      setLastSortField(sort.field);
      setLastSortOrder(sort.order);
    }
    onSort?.(sort.field, sort.order)
  }, []);

  const sortedData = useMemo(() => {
    let result = [...data];

    if (lastSortField && lastSortOrder) {
      const isCustomSort = Boolean(columns.find(column => column.field === lastSortField)?.isCustomSort);

      if (!isCustomSort) result = result.sort((a, b) => {
        const aField = tableService.getField(a, lastSortField);
        const bField = tableService.getField(b, lastSortField);
        return lastSortOrder === 1 ?
          checkTypesAndSort(aField, bField) :
          checkTypesAndSort(bField, aField)
      }

      )
    }

    return result;
  }, [data, sortField, sortOrder, columns, lastSortField, lastSortOrder])

  const groups = useMemo<ITableGroup[]>(() => {
    if (!groupBy) return [];

    const groupsMap: Record<string, ITableGroup> = {};

    sortedData.forEach(item => {
      const groupName = tableService.formatGroup(item[groupBy], groupType);

      if (groupName && !groupsMap[groupName]) {
        groupsMap[groupName] = {
          name: groupName,
          items: []
        };
      }
    })

    sortedData.forEach(item => {
      const groupName = tableService.formatGroup(item[groupBy], groupType);
      const group = groupsMap[groupName];
      if (group) group.items.push(item);
    })

    return Object.values(groupsMap);
  }, [groupBy, sortedData]);

  return <table className={classNames("table", className)}>
    <thead className="table__head">
      <tr className="table__row">
        {
          columns.map(column =>
            <TableColumn
              key={column.field}
              column={column}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={sortHandler}
            />
          )
        }
      </tr>
    </thead>
    <tbody className="table__body">
      {
        groupBy ?
          groups.map((group) => (<Fragment key={group.name}>
            {
              GroupComponent ?
                <GroupComponent
                  key={group.name}
                  name={group.name}
                  items={group.items}
                  columns={columns}
                /> :
                <tr key={group.name} className="table__row">
                  <td className="table__property table__group" colSpan={columns.length}>
                    {group.name}
                  </td>
                </tr>
            }
            {
              group.items.map(item => (
                <TableItem
                  key={item[keyName]}
                  item={item}
                  columns={columns}
                  onSelect={onSelect}
                />
              ))
            }
          </Fragment>)
          )
          :
          sortedData.map(item => (
            <TableItem
              key={item[keyName]}
              item={item}
              columns={columns}
              onSelect={onSelect}
            />
          ))
      }
    </tbody>
  </table>
})