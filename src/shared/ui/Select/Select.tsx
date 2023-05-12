import { memo, useRef, useCallback, ReactElement } from "react";
import classNames from "classnames";
import { generateUid } from "shared/lib/generatedUid/genearateUid";
import { Icon } from "shared/ui/Icon/Icon";
import SelectBase, { components, type OptionProps, type GroupBase, type CSSObjectWithLabel } from "react-select";
import "./Select.scss";
import { Control, Controller, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

interface SelectProps {
  label?: string,
  className?: string,
  id?: string,
  options: Record<string, any>[],
  optionLabel: string,
  optionValue: string,
  iconName?: string,
  name: string,
  control: Control<any>
}

type ObjectType = Record<string, any>;
const SelectOption = memo<OptionProps<ObjectType, false, GroupBase<ObjectType>>>((props) => {

  console.log(props.selectProps)

  return <components.Option {...props} className="select__option">
    {
      props.selectProps.className &&
      <Icon
        name={props.data[props.selectProps.className]}
      />
    }
    {props.label}
  </components.Option>
})

const getSelectOptionStyle = (base: CSSObjectWithLabel) => ({
  ...base,
  display: "flex",
  gap: "10px",
  alignItems: "center"
})

const getControlStyle = (base: CSSObjectWithLabel) => ({
  ...base,
  border: "1px solid var(--gray-dark)",
  borderRadius: "5px",
})

const getInputStyle = () => ({
  fontSize: "16px"
})

const getValueContainerStyle = () => ({
  display: "flex",
  alignItems: "center",
  padding: "0 8px",
})

export const Select = memo<SelectProps>(({
  options,
  className,
  id,
  label,
  optionLabel,
  optionValue,
  iconName,
  name,
  control
}) => {
  const generatedId = useRef(generateUid());
  const actualId = id || generatedId.current;

  const getOptionLabel = useCallback((option: Record<string, any>) => option[optionLabel], [optionLabel]);
  const getOptionValue = useCallback((option: Record<string, any>) => option[optionValue], [optionValue]);

  const RenderComponent = useCallback<(arg: {
    field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;
  }) => ReactElement>(({ field }) => {
    return <SelectBase
      ref={field.ref}
      value={field.value}
      name={field.name}
      onBlur={field.onBlur}
      inputId={actualId}
      className={iconName}
      options={options}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      isClearable
      styles={{
        option: getSelectOptionStyle,
        control: getControlStyle,
        input: getInputStyle,
        valueContainer: getValueContainerStyle
      }}
      components={{
        Option: SelectOption,
      }}
      menuPortalTarget={document.body}
      onChange={(value) => {
        field.onChange(value);
      }}
    />
  }, [iconName, options, getOptionLabel, getOptionValue, ])

  return <div className={classNames("select", className)}>
    {
      label &&
      <label className="select__label" htmlFor={actualId} >
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