import { ButtonHTMLAttributes, ReactNode, memo } from "react";
import classNames from "classnames";
import "./Button.scss";
import { Icon } from "../Icon/Icon";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode,
  mod?: "action" | "icon" | "tab",
  icon?: string,
  loading?: boolean,
  isActive?: boolean,
  full?: boolean,
}

export const Button = memo<ButtonProps>(({
  children,
  mod,
  className,
  loading,
  icon,
  isActive = false,
  full,
  ...otherProps
}) => {

  return <button
    className={
      classNames("button", className, {
        button_action: mod === "action",
        button_loading: loading,
        button_icon: mod === "icon",
        button_tab: mod === "tab",
        button_active: isActive,
        button_full: full
      })
    }
    {...otherProps}
  >
    {
      icon && <Icon 
        name={icon}
      />
    }
    {loading && mod === "action" ? "Загрузка..." : children}
  </button>
}) 