import { forwardRef, memo, useRef } from "react";
import { generateUid } from "shared/lib/generatedUid/genearateUid";
import classNames from "classnames";
import "./Input.scss";

interface InputProps {
  label?: string,
  id?: string,
  name?: string,
  type?: string,
  className?: string,
  disabled?: boolean,
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
      disabled
    }, ref) => {
      const generatedId = useRef(generateUid());
      const actualId = id || generatedId.current;

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
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          disabled={disabled}
        />
      </div>
    }
  )
) 