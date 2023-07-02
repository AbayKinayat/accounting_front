import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import Modal from "react-modal";
import { $api } from "shared/api/api";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { ITransactionCategory, fetchTransactionCategories } from "entities/TransactionCategory";
import ProgressBar from "shared/ui/ProgressBar/ProgressBar";
import { Icon } from "shared/ui/Icon/Icon";

interface EditBudgetModalProps {
  isOpen: boolean,
  onClose?: () => void,
  category: ITransactionCategory | null
}

const modalStyles: Modal.Styles = {
  content: {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 500,
    height: "71vh"
  }
}

const requiredRule = { required: true }

export const EditBudgetModal = memo<EditBudgetModalProps>(({ isOpen, onClose, category }) => {

  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit, setValue, watch } = useForm<{
    amount: number
  }>({
    defaultValues: {
      amount: 0
    }
  });
  const [loading, setLoading] = useState(false);

  const amount = watch("amount");

  const onSubmit = useCallback(async (data: any) => {
    setLoading(true);

    try {
      const sentData: any = {
        amount: data.amount,
        categoryId: category?.id
      }

      await $api.put("/budget", sentData);

      enqueueSnackbar({
        variant: 'success',
        message: "Вы обновили бюджет"
      });

      dispatch(fetchTransactionCategories());

      onClose?.();

    } catch (e: any) {
      enqueueSnackbar({
        variant: 'error',
        message: e?.response?.data?.message || "Не удалось обновить долг, поробуйте снова или обновите страницу"
      });
    } finally {
      setLoading(false);
    }
  }, [category])

  useEffect(() => {
    if (isOpen && category) {
      setValue("amount", category.budget);

    }
  }, [isOpen, category]);

  return <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    appElement={document.body}
    style={modalStyles}
  >
    <div className="edit-budget">
      {category &&

        <h3 className="edit-budget__title">Бюджет {category?.name}  <Icon
          size="large"
          name={category.iconId}
        /></h3>}

      <form className="edit-budget__form" onSubmit={handleSubmit(onSubmit)}>

        {
          category &&
          <ProgressBar
            value={category.budgetProgress[0]}
            maxValue={amount}
          />
        }
        <Input
          label="Бюджет"
          control={control}
          name="amount"
          rules={requiredRule}
          type="currency"
          disabled={loading}
        />
        <div className="edit-budget__actions">
          <Button
            mod="action"
            loading={loading}
            disabled={loading}
            type="submit"
          >
            Сохранить
          </Button>
          <Button
            mod="action"
            onClick={onClose}
            type="button"
            disabled={loading}
          >
            Отменить
          </Button>
        </div>
      </form>
    </div>
  </Modal>
})