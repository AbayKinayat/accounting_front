import { memo } from "react";
import classNames from "classnames";

interface IconProps {
  name: string;
  size?: "small" | "middle" | "large"
}

export const Icon = memo<IconProps>(({ 
  name,
  size = "middle" 
}) => {

  return  <svg className={classNames("icon", `icon_${size}`)}>
    <use href={'/icon.svg#' + name} />
  </svg>
}) 