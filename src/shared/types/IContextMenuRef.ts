export interface IContextMenuRef {
  open: (event: React.MouseEvent<HTMLElement>) => void;
  close: () => void;
}