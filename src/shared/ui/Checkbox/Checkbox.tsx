import { forwardRef, memo, useEffect, useState } from "react";
import { generateUid } from "shared/lib/generatedUid/genearateUid";
import "./Checkbox.scss";
import classNames from "classnames";

interface CheckboxProps {
  id?: string,
  label?: string,
  checked?: boolean,
  name?: string,
  direction?: "row" | "column",
  disabled?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export const Checkbox = memo(forwardRef<HTMLInputElement, CheckboxProps>(({
  checked,
  label,
  id,
  name,
  onChange,
  direction = "column",
  disabled,
  onBlur,
}) => {

  const [actualId, setActualId] = useState(id);

  useEffect(() => {
    if (!actualId) setActualId(generateUid());
  }, [])

  return <div className={classNames("checkbox", {
    checkbox_column: direction === "column",
    checkbox_row: direction === "row",
  })}>
    {
      label &&
      <label htmlFor={actualId} className="checkbox__label">
        {label}
      </label>
    }
    <input
      id={actualId}
      className="checkbox__control"
      type="checkbox"
      name={name}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
    />
  </div>
}))