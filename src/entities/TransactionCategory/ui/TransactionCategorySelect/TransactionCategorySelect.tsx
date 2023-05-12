import { memo } from "react";
import { useSelector } from "react-redux";
import { Select } from "shared/ui/Select/Select";
import { getTransactionCategoryData } from "../../model/selectors/getTransactionCategoryData";
import { Control } from "react-hook-form";

interface TransactionCategorySelectProps {
  control: Control<any>,
  name: string
}

export const TransactionCategorySelect = memo<TransactionCategorySelectProps>(({
  control,
  name
}) => {
  const transactionCategories = useSelector(getTransactionCategoryData);

  return <Select
    label="Категория"
    options={transactionCategories}
    optionLabel="name"
    optionValue="id"
    iconName="iconId"
    control={control}
    name={name}
  />
})