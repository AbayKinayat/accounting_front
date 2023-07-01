import { memo } from "react";
import "./ProgressBar.scss";

interface ProgressBarProps {
  value: number,
  maxValue: number
}

const ProgressBar = memo<ProgressBarProps>(({ value, maxValue }) => {
  const progress = (value / maxValue) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-bar__bar">
        <div
          className="progress-bar__bar-value"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <span className="progress-bar__percent">{`${progress}%`}</span>
    </div>
  );
})

export default ProgressBar;