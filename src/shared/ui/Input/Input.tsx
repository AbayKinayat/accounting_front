import { forwardRef, memo, useRef, useMemo, useCallback, type ChangeEvent, useState } from "react";
import { generateUid } from "shared/lib/generatedUid/genearateUid";
import classNames from "classnames";
import "./Input.scss";
import { formatNumber } from "shared/lib/formatNumber/formatNumber";

type InputType = "string" | "password" | "currency"

interface InputProps {
  label?: string,
  id?: string,
  name?: string,
  type?: InputType,
  className?: string,
  disabled?: boolean,
  value?: any,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => {},
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => {}
}

export const Input = memo<InputProps>(
  forwardRef<HTMLInputElement, InputProps>(
    ({
      label,
      id,
      name,
      type,
      className,
      onBlur,
      onChange,
      value,
      disabled
    }, ref) => {
      const generatedId = useRef(generateUid());
      const actualId = id || generatedId.current;
      const [inputValue, setInputValue] = useState("");

      const formattedValue = useMemo(() => {
        const actualValue = value || inputValue;
        if (type === "currency") {
          const num = Number(actualValue);
          if (Number.isNaN(num))
            return 0;
          else
            return formatNumber(num);
        }
        return actualValue;
      }, [value, inputValue]);

      const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (type === "currency") {
          let value = event.target.value;
          if (value.includes(",")) value = value.split(",").join("")

          const num = Number(value);
          if (!Number.isNaN(num)) {
            const stringedNum = String(num);
            setInputValue(stringedNum);
            onChange?.({ ...event, target: { ...event.target, value: stringedNum } })
          }
        } else {
          setInputValue(event.target.value);
          onChange?.(event);
        }
      }, []);

      let htmlType = "text";

      if (type === "password")
        htmlType = "password"

      return <div className={classNames("input", className)}>
        {
          label &&
          <label className="input__label" htmlFor={actualId} >
            {label}
          </label>
        }
        <input
          className="input__control"
          id={actualId}
          name={name}
          type={htmlType}
          onChange={changeHandler}
          onBlur={onBlur}
          ref={ref}
          disabled={disabled}
          value={formattedValue}
        />
      </div>
    }
  )
) 