import { memo, useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useSnackbar } from "notistack";
import { ITransaction, ITransactionCreate, ITransactionCreateForm, getTransactionsEditId, getTransactionsEditIsOpen, getTransactionsIsOpen, transactionsActions } from "entities/Transaction";
import { TransactionCategorySelect } from "entities/TransactionCategory";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Datepicker } from "shared/ui/Datepicker/Datepicker";
import { dateToUt } from "shared/lib/dateToUt/dateToUt";
import { $api } from "shared/api/api";
import { editTransaction } from "../../model/services/editTransaction";
import { removeTransaction } from "../../model/services/removeTransaction";

import "./EditTranscationModal.scss";

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

export const EditTransactionModal = memo(() => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector(getTransactionsEditIsOpen);
  const id = useSelector(getTransactionsEditId);
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
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
    dispatch(editTransaction(actualData)).then((action) => {
      setLoading(false);
      if (action.meta.requestStatus === "fulfilled") {
        enqueueSnackbar({
          message: "Вы успешно отредактировали транзакцию",
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
    dispatch(transactionsActions.setEditIsOpen(false));
  }, [dispatch])

  const expenseClickHandler = useCallback(() => {
    setValue("typeId", 2);
  }, [])

  const incomeClickHandler = useCallback(() => {
    setValue("typeId", 1);
  }, [])

  const typeId = watch('typeId');
  useEffect(() => {
    if (id) {
      setGetLoading(true);
      $api.post<ITransaction>(`/transactions/${id}`)
        .then(response => {
          const transaction = response.data;
          setValue("amount", Math.abs(transaction.amount));
          setValue("categoryId", transaction.Category || undefined);
          setValue("name", transaction.name);
          setValue("typeId", transaction.typeId);
          setValue("date", new Date(transaction.date * 1000))
        })
        .catch(() => {
          enqueueSnackbar({
            message: "Не удалось получить транзакцию",
            variant: 'error'
          });
          closeModal();
        })
        .finally(() => {
          setGetLoading(false);
        })
    }
  }, [id])

  const removeTransactionHandler = useCallback(() => {
    const approve = confirm("Вы действительно хотите удалить транзакцию");
    if (id && approve) {
      setRemoveLoading(true);
      dispatch(removeTransaction(id)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          closeModal();
          enqueueSnackbar({
            message: "Вы успешно удалили транзакцию",
            variant: "success"
          })
        } else if (action.payload) {
          enqueueSnackbar({
            message: action.payload,
            variant: "error"
          })
        }
        setRemoveLoading(false);
      });
    }
  }, [id])

  // const amountRegisterregister = register("amount", { required: true, min: 1 })

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
            disabled={loading || removeLoading}
          />
          <Input
            label="Сумма"
            type="currency"
            name="amount"
            control={control}
            rules={{ required: true, min: 1 }}
            disabled={loading || removeLoading}
          />
          <Datepicker
            label="Дата"
            control={control}
            name="date"
            rules={requiredRule}
            disabled={loading || removeLoading}
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
              disabled={loading || removeLoading}
            >
              Сохранить
            </Button>
            <Button mod="action" onClick={closeModal}>
              Закрыть
            </Button>
            <Button
              mod="action"
              onClick={removeTransactionHandler}
              loading={removeLoading}
              disabled={loading || removeLoading}
            >
              Удалить
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  </div>
}); 