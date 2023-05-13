import { memo, useCallback } from "react";
import Modal from "react-modal";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getTransactionsIsOpen } from "entities/Transaction/model/selectors/getTransactionsIsOpen";
import { useForm } from "react-hook-form";
import { Button } from "shared/ui/Button/Button";
import "./AddTransactionModal.scss";
import { transactionsActions } from "entities/Transaction";
import { Input } from "shared/ui/Input/Input";
import { Datepicker } from "shared/ui/Datepicker/Datepicker";
import { TransactionCategorySelect } from "entities/TransactionCategory";
import { addTransaction } from "features/AddTransactionModal/model/services/addTransaction";
import { ITransactionCreateForm } from "./types";
import { ITransactionCreate } from "features/AddTransactionModal/model/types/ITransactionCreate";
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
  const { handleSubmit, register, control, setValue, watch } = useForm<ITransactionCreateForm>({
    defaultValues: {
      amount: 0,
      name: "",
      date: undefined,
      typeId: 1,
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
      categoryId: requiredData.categoryId.id,
      typeId: requiredData.typeId,
      date: dateToUt(requiredData.date)
    }

    dispatch(addTransaction(actualData));
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
            {...register("name", requiredRule)}
          />
          <Input
            label="Сумма"
            type="currency"
            {...register("amount", { required: true, min: 1 })}
          />
          <Datepicker
            label="Дата"
            control={control}
            name="date"
            rules={requiredRule}
          />
          <TransactionCategorySelect
            control={control}
            name="categoryId"
            rules={requiredRule}
          />
          <div className="add-transaction__actions">
            <Button mod="action">
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