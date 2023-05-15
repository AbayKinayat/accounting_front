import {  memo, useRef, useMemo, useCallback, type ChangeEvent, useState, FocusEvent } from "react";
import { generateUid } from "shared/lib/generatedUid/genearateUid";
import classNames from "classnames";
import { formatNumber } from "shared/lib/formatNumber/formatNumber";
import { Control, Controller } from "react-hook-form";
import { Rules } from "shared/types/Rules";
import type { FormRenderComponent } from "shared/types/FormRenderComponent";
import type { FormRenderField } from "shared/types/FormRenderField";
import "./Input.scss";

type InputType = "string" | "password" | "currency"

interface InputProps {
  label?: string,
  id?: string,
  name: string,
  type?: InputType,
  className?: string,
  disabled?: boolean,
  onBlur?: (event: FocusEvent<HTMLInputElement>) => {},
  control: Control<any>,
  rules?: Rules
}

export const Input = memo<InputProps>(

  ({
    label,
    id,
    name,
    type,
    className,
    onBlur,
    disabled,
    control,
    rules
  }, ref) => {
    const generatedId = useRef(generateUid());
    const actualId = id || generatedId.current;
    const [inputValue, setInputValue] = useState("");

    const formattedValue = useMemo(() => {
      let actualValue = String(inputValue);
      if (type === "currency") {
        if (actualValue.includes(",")) actualValue = actualValue.split(",").join("")

        const num = Number(actualValue);
        console.log(num)
        if (Number.isNaN(num))
          return 0;
        else
          return formatNumber(num);
      }
      return actualValue;
    }, [inputValue]);

    const changeHandler = (event: ChangeEvent<HTMLInputElement>, field: FormRenderField) => {
      let value = event.target.value;
      if (type === "currency") {
        if (value.includes(",")) value = value.split(",").join("")

        const num = Number(value);
        if (!Number.isNaN(num)) {
          const stringedNum = String(num);
          field.onChange(stringedNum);
          setInputValue(stringedNum);
        }
      } else {
        console.log("CHANGE")
        field.onChange(value);
        setInputValue(value);
      }
    }

    const blurHandler = useCallback((event: FocusEvent<HTMLInputElement>, field: FormRenderField) => {
      onBlur?.(event);
      field.onBlur();
    }, [])

    const RenderComponent = useCallback<FormRenderComponent>(({ field }) => {
      let htmlType = "text";

      if (type === "password")
        htmlType = "password"

      if (field.value !== formattedValue) setInputValue(field.value)
        
      return <input
        {...field}
        className="input__control"
        id={actualId}
        type={htmlType}
        onChange={(event) => changeHandler(event, field)}
        onBlur={(event) => blurHandler(event, field)}
        disabled={disabled}
        value={formattedValue}
      />
    }, [id, type, disabled, formattedValue])



    return <div className={classNames("input", className)}>
      {
        label &&
        <label className="input__label" htmlFor={actualId} >
          {label}
        </label>
      }
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={RenderComponent}
      />

    </div>
  }
) 