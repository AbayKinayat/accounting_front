import { memo } from "react";
import { useSelector } from "react-redux";
import { Select } from "shared/ui/Select/Select";
import { getTransactionCategoryData } from "../../model/selectors/getTransactionCategoryData";

interface TransactionCategorySelectProps {

}

export const TransactionCategorySelect = memo<TransactionCategorySelectProps>(({  }) => {
  const transactionCategories = useSelector(getTransactionCategoryData);

  return <Select 
    label="Категория"
    options={transactionCategories}
    optionLabel="name"
    optionValue="id"
    iconName="iconId"
  />
})