import { ReactNode, memo } from "react";
import classNames from "classnames";

interface AlertProps {
  type?: "error" | "info" | "warning",
  children?: ReactNode,
  className?: string
}

export const Alert = memo<AlertProps>(({ type = "info", className, children }) => {
  return <div
    className={
      classNames("alert", className, `alert__${type}`)
    }>
    {children}
  </div>
})