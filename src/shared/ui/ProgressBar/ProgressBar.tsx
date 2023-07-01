import { memo } from "react";
import "./ProgressBar.scss";
import classNames from "classnames";

interface ProgressBarProps {
  value: number,
  maxValue: number
}

const ProgressBar = memo<ProgressBarProps>(({ value, maxValue }) => {

  let progress = Math.trunc((value || 1) / (maxValue || 1) * 100);

  console.log("progress", progress);
  console.log("progress", value);
  console.log("progress", maxValue);

  return (
    <div className="progress-bar" title={maxValue ? `${progress}%` : undefined}>
      {maxValue ? <div className="progress-bar__bar">
        <div
          className={classNames("progress-bar__bar-value", { "progress-bar__bar-value_error": maxValue < value })}
          style={{
            width: `${progress}%`,
          }}
        />
      </div> : null}

      <span className="progress-bar__percent">{value} / {maxValue}</span>
    </div>
  );
})

export default ProgressBar;