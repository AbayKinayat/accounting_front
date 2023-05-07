export interface ITableColumn {
  field: string;
  name: string;
  width?: string | number,
  dataType?: "text" | "number",
}