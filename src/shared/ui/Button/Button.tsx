import { ButtonHTMLAttributes, ReactNode, memo } from "react";
import classNames from "classnames";
import "./Button.scss";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode,
  mod?: "action",
  loading?: boolean
}

export const Button = memo<ButtonProps>(({
  children,
  mod,
  className,
  loading,
  ...otherProps
}) => {

  return <button
    className={
      classNames("button", className, {
        button_action: mod === "action",
        button_loading: loading
      })
    }
    {...otherProps}
  >
    {loading && mod === "action" ? "Загрузка..." : children}
  </button>
}) 