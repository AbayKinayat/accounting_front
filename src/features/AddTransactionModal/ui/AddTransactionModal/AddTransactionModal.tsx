import { memo, useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useSnackbar } from "notistack";
import { ITransactionCreate, ITransactionCreateForm, getTransactionsCreateInitialDate, getTransactionsIsOpen, transactionsActions } from "entities/Transaction";
import { addTransaction } from "../../model/services/addTransaction";
import { TransactionCategorySelect } from "entities/TransactionCategory";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Datepicker } from "shared/ui/Datepicker/Datepicker";
import { dateToUt } from "shared/lib/dateToUt/dateToUt";

const modalStyles: Modal.Styles = {
  content: {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 500,
    height: "60vh"
  }
}

const requiredRule = { required: true }

export const AddTransactionModal = memo(() => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector(getTransactionsIsOpen);
  const createInitialDate = useSelector(getTransactionsCreateInitialDate);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, control, setValue, watch } = useForm<ITransactionCreateForm>({
    defaultValues: {
      amount: 0,
      name: "",
      date: undefined,
      typeId: 2,
      categoryId: undefined
    }
  });

  const onSubmit = useCallback((data: ITransactionCreateForm) => {
    const requiredData = Object.assign({}, data) as Required<ITransactionCreateForm>;

    if (String(requiredData.amount).includes(",")) {
      requiredData.amount = Number(String(data.amount).split(",").join(""));
    } else {
      requiredData.amount = Number(data.amount);
    }

    if (requiredData.typeId === 2) {
      requiredData.amount = -Math.abs(requiredData.amount);
    }

    const actualData: ITransactionCreate = {
      amount: requiredData.amount,
      name: requiredData.name,
      categoryId: requiredData.categoryId?.id,
      typeId: requiredData.typeId,
      date: dateToUt(requiredData.date)
    }

    setLoading(true);
    dispatch(addTransaction(actualData)).then((action) => {
      setLoading(false);
      if (action.meta.requestStatus === "fulfilled") {
        enqueueSnackbar({
          message: "Вы усппешно создали транзакцию",
          variant: "success",
        })
        closeModal();
      } else {
        enqueueSnackbar({
          message: "Не удалось создать транзакцию",
          variant: "error",
        })
      }
    });
  }, []);

  const closeModal = useCallback(() => {
    dispatch(transactionsActions.setIsOpen(false));
  }, [dispatch])

  const expenseClickHandler = useCallback(() => {
    setValue("typeId", 2);
  }, [])

  const incomeClickHandler = useCallback(() => {
    setValue("typeId", 1);
  }, [])

  const typeId = watch('typeId');

  useEffect(() => {
    setValue("date", createInitialDate)
  }, [createInitialDate])

  useEffect(() => {
    return () => {
      dispatch(transactionsActions.setCreateInitialDate(undefined))
    }
  }, [])

  return <div className="add">

    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      appElement={document.body}
      style={modalStyles}
    >
      <div className="add-transaction">
        <div className="add-transaction__type">
          <Button
            className="add-transaction-type__button"
            mod="tab"
            isActive={typeId === 2}
            onClick={expenseClickHandler}
            full
          >
            Расход
          </Button>
          <Button
            className="add-transaction-type__button"
            mod="tab"
            isActive={typeId === 1}
            onClick={incomeClickHandler}
            full
          >
            Доход
          </Button>
        </div>
        <form className="add-transaction__form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Описание"
            name="name"
            control={control}
            rules={requiredRule}
            disabled={loading}
          />
          <Input
            label="Сумма"
            type="currency"
            name="amount"
            control={control}
            rules={{ required: true, min: 1 }}
            disabled={loading}
          />
          <Datepicker
            label="Дата"
            control={control}
            name="date"
            rules={requiredRule}
            disabled={loading}
          />
          <TransactionCategorySelect
            control={control}
            name="categoryId"
            disabled={loading}
          />
          <div className="add-transaction__actions">
            <Button
              mod="action"
              loading={loading}
              disabled={loading}
            >
              Сохранить
            </Button>
            <Button mod="action" onClick={closeModal}>
              Отменить
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  </div>
}); 