import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import Modal from "react-modal";
import { IDebt, fetchDebts } from "entities/Debt";
import { $api } from "shared/api/api";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { Button } from "shared/ui/Button/Button";
import { FormCheckbox } from "shared/form-ui/FormCheckbox/FormCheckbox";
import { Input } from "shared/ui/Input/Input";
import { Datepicker } from "shared/ui/Datepicker/Datepicker";
import "./EditDebtModal.scss";

interface EditDebtModalProps {
  isOpen: boolean,
  onClose?: () => void,
  debt: IDebt | null
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

export const EditDebtModal = memo<EditDebtModalProps>(({ isOpen, onClose, debt }) => {

  const dispatch = useAppDispatch();
  const [isDebtor, setIsDebtor] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit, setValue } = useForm<{
    name: string,
    description: string,
    isPaid: boolean,
    isCashChange: boolean,
    dateTo: Date,
    dateFrom: Date,
    sum: number,
    amountPaid: number
  }>({
    defaultValues: {
      name: "",
      description: "",
      isPaid: false,
      isCashChange: true
    }
  });
  const [loading, setLoading] = useState(false);

  const setToDebtor = useCallback(() => {
    setIsDebtor(true);
  }, [])

  const setToNoDeptor = useCallback(() => {
    setIsDebtor(false);
  }, [])

  const onSubmit = useCallback(async (data: any) => {
    setLoading(true);

    try {
      const sentData: any = {
        name: data.name,
        description: data.description,
        sum: data.sum,
        amountPaid: data.amountPaid,
        dateTo: Math.trunc(data.dateTo.getTime() / 1000),
        dateFrom: Math.trunc(data.dateFrom.getTime() / 1000),
        isCashChange: data.isCashChange,
        isPaid: data.isPaid,
        isDebtor,
        statusId: 1
      }

      await $api.put(`/debt/${debt?.id}`, sentData);

      enqueueSnackbar({
        variant: 'success',
        message: "Вы успешно добавил долг"
      });

      dispatch(fetchDebts());

      onClose?.();

    } catch (e: any) {
      enqueueSnackbar({
        variant: 'error',
        message: e?.response?.data?.message || "Не удалось добавить долг, поробуйте снова или обновите старницу"
      });
    } finally {
      setLoading(false);
    }
  }, [isDebtor, debt])

  const deleteDebt = useCallback(async () => {
    const isDelete = confirm("Вы действительно хотите удалить долг");
    const isCashChange = confirm("Снять с счета?");

    if (isDelete) {
      setLoading(true);

      try {

        await $api.delete(`/debt/${debt?.id}`, {
          params: { isCashChange }
        })

        enqueueSnackbar({
          variant: "success",
          message: "Вы успешно удалили долг",
        });

        dispatch(fetchDebts());

        onClose?.();

      } catch (e: any) {
        enqueueSnackbar({
          variant: "error",
          message: e?.response?.data?.message || "Не удалось удалить долг, попробуйте еще раз",
        });
      } finally {
        setLoading(false);
      }
    }
  }, [debt])

  useEffect(() => {
    if (isOpen && debt) {
      setValue("amountPaid", debt.amountPaid);
      setValue("dateFrom", new Date(debt.dateFrom * 1000));
      setValue("dateTo", new Date(debt.dateTo * 1000));
      setValue("description", debt.description);
      setValue("name", debt.name);
      setValue("isPaid", debt.isPaid);
      setValue("sum", debt.sum);
      setIsDebtor(debt.isDebtor)
    }
  }, [isOpen, debt]);

  return <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    appElement={document.body}
    style={modalStyles}
  >
    <div className="edit-debt">
      <h3 className="edit-debt__title">Редактировать долг</h3>
      <div className="edit-debt__debtor-change">
        <Button
          className="edit-transaction-type__button"
          mod="tab"
          isActive={isDebtor}
          onClick={setToDebtor}
          disabled={loading}
          full
        >
          Взять в долг
        </Button>
        <Button
          className="edit-transaction-type__button"
          mod="tab"
          isActive={!isDebtor}
          onClick={setToNoDeptor}
          disabled={loading}
          full
        >
          Дать в долг
        </Button>
      </div>
      <form className="edit-debt__form" onSubmit={handleSubmit(onSubmit)}>
        <FormCheckbox
          control={control}
          name="isPaid"
          label="Выплачено"
          direction="row"
          disabled={loading}
        />
        <FormCheckbox
          control={control}
          name="isCashChange"
          label="Списать с счета"
          direction="row"
          disabled={loading}
        />
        <Input
          label="Название"
          control={control}
          name="name"
          rules={requiredRule}
          disabled={loading}
        />
        <Input
          label="Сумма"
          control={control}
          name="sum"
          rules={requiredRule}
          type="currency"
          disabled={loading}
        />
        <Input
          label="Выплачено"
          name="amountPaid"
          control={control}
          type="currency"
          disabled={loading}
        />
        <Datepicker
          label="Дата"
          control={control}
          name="dateFrom"
          rules={requiredRule}
          disabled={loading}
        />
        <Datepicker
          label="Дата выплаты"
          control={control}
          name="dateTo"
          rules={requiredRule}
          disabled={loading}
        />
        <Input
          label="Описание"
          control={control}
          name="description"
          type="text"
          disabled={loading}
        />
        <div className="edit-debt__actions">
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
          <Button
            mod="action"
            onClick={deleteDebt}
            type="button"
            disabled={loading}
          >
            Удалить
          </Button>
        </div>
      </form>
    </div>
  </Modal>
})