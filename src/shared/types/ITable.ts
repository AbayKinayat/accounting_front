export interface ITableColumn {
  field: string;
  iconField?: string;
  name: string;
  width?: string | number,
  dataType?: "text" | "number" | "date",
  isCustomSort?: boolean
}