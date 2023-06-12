import { TooltipProps } from "recharts";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { formatNumber } from "shared/lib/formatNumber/formatNumber";
import "./ReviewTooltip.scss";

export const ReviewTooltip = ((props: TooltipProps<ValueType, string | number>) => {
  const { active, payload, label } = props;

  if (active && payload && payload.length) {
    return (
      <div className="review-tooltip">
        <span className="review-tooltip__label">{payload[0]?.name}:</span> 
        <span className="review-tooltip__value">{formatNumber(Number(payload[0]?.value))}</span>
      </div>
    );
  }

  return null;
}) 