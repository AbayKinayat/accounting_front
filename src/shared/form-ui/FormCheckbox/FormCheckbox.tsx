import { memo, useCallback } from "react";
import { Control, Controller } from "react-hook-form";
import { FormRenderComponent } from "shared/types/FormRenderComponent";
import { Checkbox } from "shared/ui/Checkbox/Checkbox";

interface FormCheckboxProps {
  control: Control<any>,
  name: string,
  label?: string,
  direction?: "column" | "row",
  disabled?: boolean
}

export const FormCheckbox = memo<FormCheckboxProps>(({
  control,
  name,
  label,
  direction,
  disabled,
}) => {
  const RenderComponent = useCallback<FormRenderComponent>(({ field }) => <Checkbox
    ref={field.ref}
    name={field.name}
    label={label}
    checked={field.value}
    direction={direction}
    disabled={disabled}
    onChange={(event) => field.onChange(event.target.checked)}
    onBlur={field.onBlur}
  />, [control, label, direction])

  return <Controller
    name={name}
    control={control}
    render={RenderComponent}
  />
})