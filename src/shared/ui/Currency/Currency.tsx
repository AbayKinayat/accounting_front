import { memo } from "react";
import classNames from "classnames";
import { formatNumber } from "shared/lib/formatNumber/formatNumber";

import "./Currency.scss";

interface CurrencyProps {
  children?: number,
  className?: string
}

export const Currency = memo<CurrencyProps>(({ children, className }) => {

  if (!children) return null;

  const num = Number(children);

  return <span className={classNames("currency", className, {
    currency_expense: num < 0,
    currency_income: num > 0
  })}>
    {formatNumber(num)}
  </span>
}) 