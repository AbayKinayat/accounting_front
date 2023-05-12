import { memo, useRef, useCallback, CSSProperties } from "react";
import classNames from "classnames";
import { generateUid } from "shared/lib/generatedUid/genearateUid";
import { Icon } from "shared/ui/Icon/Icon";
import SelectBase, { components, type OptionProps, type GroupBase, type CSSObjectWithLabel } from "react-select";
import "./Select.scss";

interface SelectProps {
  label?: string,
  className?: string,
  id?: string,
  options: Record<string, any>[],
  optionLabel: string,
  optionValue: string,
  iconName?: string
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
  iconName
}) => {
  const generatedId = useRef(generateUid());
  const actualId = id || generatedId.current;

  const getOptionLabel = useCallback((option: Record<string, any>) => option[optionLabel], [optionLabel]);
  const getOptionValue = useCallback((option: Record<string, any>) => option[optionValue], [optionValue]);

  return <div className={classNames("select", className)}>
    {
      label &&
      <label className="select__label" htmlFor={actualId} >
        {label}
      </label>
    }
    <SelectBase
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
    />
  </div>
})