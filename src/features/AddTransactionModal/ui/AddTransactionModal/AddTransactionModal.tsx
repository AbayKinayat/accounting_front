import { memo, useCallback, useState } from "react";
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

export const AddTransactionModal = memo(() => {

  const [isExpense, setIsExpense] = useState(true);

  const dispatch = useAppDispatch();
  const isOpen = useSelector(getTransactionsIsOpen);
  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      amount: 0,
      name: "",
      date: 0
    }
  });


  const onSubmit = useCallback((data: any) => {

  }, []);

  const closeModal = useCallback(() => {
    dispatch(transactionsActions.setIsOpen(false));
  }, [dispatch])

  const expenseClickHandler = useCallback(() => {
    setIsExpense(true);
  }, [])

  const incomeClickHandler = useCallback(() => {
    setIsExpense(false);
  }, [])

  return <div className="add">
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      appElement={document.body}
      style={{
        content: {
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 500,
          height: "60vh"
        }
      }}
    >
      <div className="add-transaction">
        <div className="add-transaction__type">
          <Button
            className="add-transaction-type__button"
            mod="tab"
            isActive={isExpense}
            onClick={expenseClickHandler}
            full
          >
            Доход
          </Button>
          <Button
            className="add-transaction-type__button"
            mod="tab"
            isActive={!isExpense}
            onClick={incomeClickHandler}
            full
          >
            Расход
          </Button>
        </div>
        <form className="add-transaction__form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Описание"
            {...register("name", { required: true })}
          />
          <Input
            label="Сумма"
            type="currency"
            {...register("amount", { required: true })}
          />
          <Datepicker
            label="Дата"
            control={control}
            name="date"
          />
          <TransactionCategorySelect
            control={control}
            name="categoryId"
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