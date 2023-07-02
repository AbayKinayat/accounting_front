import { FC, Fragment, memo, useCallback, useMemo, useState, forwardRef, useRef } from "react";
import { TableColumn } from "./TableColumn/TableColumn";
import { TableItem } from "./TableItem/TableItem";
import { ITableColumn } from "../../types/ITable";
import { ISort } from "../../types/ISort";
import { TableService } from "./TableService";
import classNames from "classnames";
import { checkTypesAndSort } from "shared/lib/checkTypesAndSort/checkTypesAndSort";
import { ContextMenuItem } from "../ContextMenuItem/ContextMenuItem";
import { IContextMenuRef } from "shared/types/IContextMenuRef";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import { ITableContextMenuItem } from "shared/types/ITableContextMenuItem";

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
  title?: string,
  menuItems?: ITableContextMenuItem[],
  onSort?: (field: string, order: number) => void,
  onSelect?: (item: any) => void,
  onContextMenu?: (event: React.MouseEvent<HTMLElement>, item?: Record<string, any>) => void
}

interface ITableGroup {
  name: string,
  items: Record<string, any>[],
}

export const Table = memo(forwardRef<HTMLTableElement, TableProps>(({
  columns,
  data,
  keyName,
  sortField,
  sortOrder,
  groupType,
  groupBy,
  GroupComponent,
  className,
  title,
  menuItems,
  onSort,
  onSelect,
  onContextMenu,
}, ref) => {
  const [lastSortField, setLastSortField] = useState(sortField);
  const [lastSortOrder, setLastSortOrder] = useState(sortOrder);
  const contextMenuRef = useRef<null | IContextMenuRef>(null);

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
    const groups: ITableGroup[] = [];

    if (sortField) {
      const column = columns.find(column => column.field === sortField);
      // column?.isCustomSort
    }

    data.forEach(item => {
      const groupName = tableService.formatGroup(item[groupBy], groupType);

      if (groupName !== undefined && !groupsMap[groupName]) {
        const group = {
          name: groupName,
          items: []
        };
        groupsMap[groupName] = group;
        groups.push(group);
      }
    })

    sortedData.forEach(item => {
      const groupName = tableService.formatGroup(item[groupBy], groupType);
      const group = groupsMap[groupName];
      if (group) group.items.push(item);
    })

    return groups;
  }, [groupBy, sortedData, data]);

  const contextItem = useMemo(() => {
    return menuItems?.map(item => (
      <ContextMenuItem
        key={item.key}
        onClick={item.command}
      >
        {item.label}
      </ContextMenuItem>
    ))
  }, [menuItems])

  const openContextMenu = useCallback((event: React.MouseEvent<HTMLElement>, item?: Record<string, any>) => {
    event.preventDefault()
    contextMenuRef.current?.open(event);
    onContextMenu?.(event, item);
  }, [onContextMenu])

  return <>
    <table title={title} ref={ref} className={classNames("table", className)} onContextMenu={openContextMenu}>
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
          <td className="table__property"></td>
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
                    onSelect={onSelect}
                    onContextMenu={openContextMenu}
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
                onContextMenu={openContextMenu}
              />
            ))
        }
        <tr className="table__row table__row_empty">
          <td className="table__property" colSpan={columns.length + 1}></td>
        </tr>
      </tbody>
    </table>
    {
      menuItems &&
      <ContextMenu className="table__context-menu" ref={contextMenuRef}>
        {
          contextItem
        }
      </ContextMenu>
    }
  </>
})) 