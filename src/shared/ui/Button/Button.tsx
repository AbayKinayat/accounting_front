import { ButtonHTMLAttributes, ReactNode, forwardRef, memo } from "react";
import classNames from "classnames";
import { Icon } from "../Icon/Icon";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode,
  mod?: "action" | "icon" | "tab",
  icon?: string,
  loading?: boolean,
  isActive?: boolean,
  full?: boolean,
}

export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  mod,
  className,
  loading,
  icon,
  isActive = false,
  full,
  ...otherProps
}, ref) => {

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
    ref={ref}
  >
    {
      icon && <Icon
        name={icon}
      />
    }
    {loading && mod === "action" ? "Загрузка..." : children}
  </button>
}))