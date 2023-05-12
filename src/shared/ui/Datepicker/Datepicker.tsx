import { ReactElement, memo, useCallback, useRef } from "react";
import { Control, Controller, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import DatepickerBase from "react-datepicker";
import "./Datepicker.scss";
import { generateUid } from "shared/lib/generatedUid/genearateUid";

interface DatepickerProps {
  control: Control<any>,
  name: string,
  label?: string,
  id?: string,
  className?: string,
  disabled?: boolean,
}

export const Datepicker = memo<DatepickerProps>(({
  control,
  name,
  className,
  disabled,
  id,
  label
}) => {
  const generatedId = useRef(generateUid());
  const actualId = id || generatedId.current;

  const RenderComponent = useCallback<(arg: {
    field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;
  }) => ReactElement>((
    { field }
  ) => (
    <DatepickerBase
      className={className}
      id={actualId}
      ref={field.ref}
      selected={field.value}
      onChange={(date, event) => {
        console.log(field.value);
        console.log("date", date);
        console.log("event", event)
        const target = event?.target as HTMLInputElement;
        field.onChange({ ...event, target: { ...target, value: date } })
      }}
      name={field.name}
      onBlur={field.onBlur}
      autoComplete="off"
      disabled={disabled}
    />
  ), []);

  return <div className="datepicker">
    {
      label &&
      <label className="datepicker__label" htmlFor={actualId} >
        {label}
      </label>
    }
    <Controller
      name={name}
      control={control}
      render={RenderComponent}
    />
  </div>
})