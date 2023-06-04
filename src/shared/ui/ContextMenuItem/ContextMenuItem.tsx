import React, { memo, type ReactNode } from "react";
import "./ContextMenuItem.scss";

interface ContextMenuItemProps {
  children: ReactNode,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const ContextMenuItem = memo<ContextMenuItemProps>(({ children, onClick }) => {

  return <button className="context-menu-item" onClick={onClick}>
    {children}
  </button>  
})