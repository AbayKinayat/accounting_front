import { memo, useRef, useCallback } from "react";
import classNames from "classnames";
import { generateUid } from "shared/lib/generatedUid/genearateUid";
import { Icon } from "shared/ui/Icon/Icon";
import SelectBase, { components, type OptionProps, type GroupBase, type CSSObjectWithLabel } from "react-select";
import { type Control, Controller } from "react-hook-form";
import { FormRenderComponent } from "shared/types/FormRenderComponent";
import { Rules } from "shared/types/Rules";

interface SelectProps {
  label?: string,
  className?: string,
  id?: string,
  options: Record<string, any>[],
  optionLabel: string,
  optionValue: string,
  iconName?: string,
  name: string,
  control: Control<any>,
  rules?: Rules,
  disabled?: boolean,
  onChange?: (value: any) => void
}

type ObjectType = Record<string, any>;
const SelectOption = memo<OptionProps<ObjectType, false, GroupBase<ObjectType>>>((props) => {

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

const getMenuPortalClassName = () => "select__menu-portal";
const getMenuListClassName = () => "select__menu-list";
const getSelectOptionClassName = ({ isFocused, isSelected }: { isFocused: boolean, isSelected: boolean }) => classNames("select__option", {
  "select__option_focus": isFocused,
  "select__option_selected": isSelected,
});
const getSelectInputControlClassName = () => "select__input-control";
const getSelectControlClassName = ({ isFocused }: { isFocused: boolean }) => classNames("select__control", {
  'select__control_focused': isFocused
}) ;
const getSelectSingleValueClassName = () => "select__single-value"

export const Select = memo<SelectProps>(({
  options,
  className,
  id,
  label,
  optionLabel,
  optionValue,
  iconName,
  name,
  control,
  rules,
  disabled,
  onChange
}) => {
  const generatedId = useRef(generateUid());
  const actualId = id || generatedId.current;

  const getOptionLabel = useCallback((option: Record<string, any>) => option[optionLabel], [optionLabel]);
  const getOptionValue = useCallback((option: Record<string, any>) => {

    return option[optionValue]
  }, [optionValue]);

  const RenderComponent = useCallback<FormRenderComponent>(({ field }) => {
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
      classNames={{
        menuPortal: getMenuPortalClassName,
        menuList: getMenuListClassName,
        option: getSelectOptionClassName,
        input: getSelectInputControlClassName,
        control: getSelectControlClassName,
        singleValue: getSelectSingleValueClassName
      }}
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
        onChange?.(value);
      }}
      isDisabled={disabled}
    />
  }, [iconName, options, getOptionLabel, getOptionValue, onChange])

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
      rules={rules}
    />

  </div>
})