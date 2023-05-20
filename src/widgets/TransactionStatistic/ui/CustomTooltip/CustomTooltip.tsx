import { TooltipProps } from "recharts";
import "./CustomTooltip.scss";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import {  useMemo } from "react";
import { formatNumber } from "shared/lib/formatNumber/formatNumber";
import { checkTypesAndSort } from "shared/lib/checkTypesAndSort/checkTypesAndSort";

export const CustomTooltip = ((props: TooltipProps<ValueType, string | number>) => {
  const { active, payload, label } = props;

  const sortedPayload = useMemo(() => {
    if (!payload) return [];

    return [...payload].sort((a, b) => {
      if (Number(a.value) === 0 && Number(b.value) !== 0) {
        return 1;
      } else if (Number(b.value) === 0 && Number(a.value) !== 0) {
        return -1;
      }
      return checkTypesAndSort(b.value, a.value);
    }).map(item => (
      <div
        key={item.dataKey}
        className="custom-tooltip__data-item"
      >
        <div className="custom-tooltip__data-item-name">
          <div
            className="custom-tooltip__data-item-prefix"
            style={{ backgroundColor: item.color }}
          >
          </div>
          {item.name}:
        </div>
        <div className="custom-tooltip__data-item-value">
          {item.value && formatNumber(Number(item.value))}
        </div>
      </div>
    ))
  }, [payload])

  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="custom-tooltip__label">{label}</p>

        <div className="custom-tooltip__data-list">
          {
            sortedPayload
          }
        </div>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
}) 