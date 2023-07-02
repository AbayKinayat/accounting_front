import { memo, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { Datepicker } from "shared/ui/Datepicker/Datepicker";
import { Input } from "shared/ui/Input/Input";
import { Button } from "shared/ui/Button/Button";
import { $api } from "shared/api/api";
import { IDebtCreateForm } from "../../model/types/IDebtCreateForm";
import { IDebtCreate } from "../../model/types/IDebtCreate";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { fetchDebts } from "entities/Debt";
import { FormCheckbox } from "shared/form-ui/FormCheckbox/FormCheckbox";

interface AddDebtModalProps {
  isOpen: boolean,
  onClose?: () => void
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

export const AddDebtModal = memo<AddDebtModalProps>(({ isOpen, onClose }) => {

  const dispatch = useAppDispatch();
  const [isDebtor, setIsDebtor] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit } = useForm<IDebtCreateForm>({
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

  const onSubmit = useCallback(async (data: IDebtCreateForm) => {
    setLoading(true);

    try {

      const sentData: IDebtCreate = {
        name: data.name,
        description: data.description,
        sum: data.sum,
        amountPaid: data.amountPaid || "0",
        dateTo: Math.trunc(data.dateTo.getTime() / 1000),
        dateFrom: Math.trunc(data.dateFrom.getTime() / 1000),
        isCashChange: data.isCashChange,
        isPaid: data.isPaid,
        isDebtor,
        statusId: 1
      }

      await $api.post("/debt/create", sentData);

      dispatch(fetchDebts());

      enqueueSnackbar({
        variant: 'success',
        message: "Вы успешно добавил долг"
      });

      onClose?.();

    } catch (e: any) {
      enqueueSnackbar({
        variant: 'error',
        message: e?.response?.data?.message || "Не удалось добавить долг, поробуйте снова или обновите старницу"
      });
    } finally {
      setLoading(false);
    }
  }, [isDebtor])

  return <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    appElement={document.body}
    style={modalStyles}
  >
    <div className="add-debt">
      <h3 className="add-debt__title">Добавить долг</h3>
      <div className="add-debt__debtor-change">
        <Button
          className="add-transaction-type__button"
          mod="tab"
          isActive={isDebtor}
          onClick={setToDebtor}
          disabled={loading}
          full
        >
          Взять в долг
        </Button>
        <Button
          className="add-transaction-type__button"
          mod="tab"
          isActive={!isDebtor}
          onClick={setToNoDeptor}
          disabled={loading}
          full
        >
          Дать в долг
        </Button>
      </div>
      <form className="add-debt__form" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="add-transaction__actions">
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