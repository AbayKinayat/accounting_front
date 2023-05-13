import { FC, Fragment, memo, useCallback, useMemo } from "react";
import { TableColumn } from "./TableColumn/TableColumn";
import { TableItem } from "./TableItem/TableItem";
import { ITableColumn } from "../../types/ITable";
import { ISort } from "../../types/ISort";

import "./Table.scss";

interface IGroupComponentProps {
  items: Record<string, any>[],
  name: string,
  columns: ITableColumn[]
}

interface TableProps {
  columns: ITableColumn[],
  data: any[],
  sortField?: string,
  sortOrder?: number,
  GroupComponent?: FC<IGroupComponentProps>,
  keyName: string,
  groupBy?: string,
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
  groupBy,
  setSortField,
  setSortOrder,
  GroupComponent
}) => {

  const sortHandler = useCallback((sort: ISort) => {
    setSortField?.(sort.field);
    setSortOrder?.(sort.order);
  }, []);

  const groups = useMemo<ITableGroup[]>(() => {
    if (!groupBy) return [];

    const groupsMap: Record<string, ITableGroup> = {};

    data.forEach(item => {
      const groupName = item[groupBy];
      if (groupName && !groupsMap[groupName]) {
        groupsMap[groupName] = {
          name: groupName,
          items: []
        };
      }
    })

    data.forEach(item => {
      const group = groupsMap[item[groupBy]];
      if (group) group.items.push(item);
    })

    return Object.values(groupsMap);
  }, [groupBy, data]);

  return <table className="table">
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