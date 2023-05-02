import { memo } from "react";
import "./Icon.scss";

interface IconProps {
  name: string;
}

export const Icon = memo<IconProps>(({ name }) => {

  return  <svg className="icon">
    <use href={'/icon.svg#' + name} />
  </svg>
}) 