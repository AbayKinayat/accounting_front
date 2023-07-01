import { memo, useRef, useMemo, useCallback, type ChangeEvent, useState, FocusEvent } from "react";
import { generateUid } from "shared/lib/generatedUid/genearateUid";
import classNames from "classnames";
import { formatNumber } from "shared/lib/formatNumber/formatNumber";
import { Control, Controller } from "react-hook-form";
import { Rules } from "shared/types/Rules";
import type { FormRenderComponent } from "shared/types/FormRenderComponent";
import type { FormRenderField } from "shared/types/FormRenderField";
import "./Input.scss";

type InputType = "string" | "password" | "currency" | "text"

interface InputProps {
  label?: string,
  id?: string,
  name: string,
  type?: InputType,
  className?: string,
  disabled?: boolean,
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {},
  control: Control<any>,
  rules?: Rules
}

const inputComponentTypes = ["string", "password", "currency"];

export const Input = memo<InputProps>(
  ({
    label,
    id,
    name,
    type = "string",
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
        if (Number.isNaN(num))
          return 0;
        else
          return formatNumber(num);
      }
      return actualValue;
    }, [inputValue]);

    const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: FormRenderField) => {
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
        field.onChange(value);
        setInputValue(value);
      }
    }

    const blurHandler = useCallback((event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>, field: FormRenderField) => {
      onBlur?.(event);
      field.onBlur();
    }, [])

    const RenderComponent = useCallback<FormRenderComponent>(({ field }) => {
      let htmlType = "text";

      if (type === "password")
        htmlType = "password"

      if (field.value !== formattedValue) setInputValue(field.value)

      function componentChangeHandler(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        changeHandler(event, field)
      }

      function componentBlurHandler(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
        blurHandler(event, field)
      }

      return inputComponentTypes.includes(type) ? <input
        {...field}
        className="input__control"
        id={actualId}
        type={htmlType}
        onChange={componentChangeHandler}
        onBlur={componentBlurHandler}
        disabled={disabled}
        value={formattedValue}
      /> :
        <textarea
          {...field}
          className="input__control"
          id={actualId}
          onChange={componentChangeHandler}
          onBlur={componentBlurHandler}
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