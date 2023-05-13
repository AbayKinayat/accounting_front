import { memo } from "react";
import { useSelector } from "react-redux";
import { Select } from "shared/ui/Select/Select";
import { getTransactionCategoryData } from "../../model/selectors/getTransactionCategoryData";
import { Control, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

interface TransactionCategorySelectProps {
  control: Control<any>,
  name: string,
  rules?: Omit<RegisterOptions<FieldValues, FieldPath<FieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>,
  disabled?: boolean
}

export const TransactionCategorySelect = memo<TransactionCategorySelectProps>(({
  control,
  name,
  rules,
  disabled
}) => {
  const transactionCategories = useSelector(getTransactionCategoryData);

  return <>
    <Select
      label="Категория"
      options={transactionCategories}
      optionLabel="name"
      optionValue="id"
      iconName="iconId"
      control={control}
      name={name}
      rules={rules}
      disabled={disabled}
    />
  </>

})