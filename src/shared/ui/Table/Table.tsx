import { FC, Fragment, memo, useCallback, useMemo } from "react";
import { TableColumn } from "./TableColumn/TableColumn";
import { TableItem } from "./TableItem/TableItem";
import { ITableColumn } from "../../types/ITable";
import { ISort } from "../../types/ISort";
import { TableService } from "./TableService";
import "./Table.scss";
import classNames from "classnames";

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
  setSortField?: (field: string) => void,
  setSortOrder?: (order: number) => void
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
  setSortField,
  setSortOrder,
  GroupComponent,
  className
}) => {

  const sortHandler = useCallback((sort: ISort) => {
    setSortField?.(sort.field);
    setSortOrder?.(sort.order);
  }, []);

  const groups = useMemo<ITableGroup[]>(() => {
    if (!groupBy) return [];

    const groupsMap: Record<string, ITableGroup> = {};

    data.forEach(item => {
      const groupName = tableService.formatGroup(item[groupBy], groupType);

      if (groupName && !groupsMap[groupName]) {
        groupsMap[groupName] = {
          name: groupName,
          items: []
        };
      }
    })

    data.forEach(item => {
      const groupName = tableService.formatGroup(item[groupBy], groupType);
      const group = groupsMap[groupName];
      if (group) group.items.push(item);
    })

    return Object.values(groupsMap);
  }, [groupBy, data]);

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
                  name={group.name}
                  items={group.items}
                  columns={columns}
                /> :
                <tr className="table__row">
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
                />
              ))
            }
          </Fragment>)
          )
          :
          data.map(item => (
            <TableItem
              key={item[keyName]}
              item={item}
              columns={columns}
            />
          ))
      }
    </tbody>
  </table>
})