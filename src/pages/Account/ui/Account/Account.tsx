import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCurrentUser, getUserData, userActions } from "entities/User";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { Button } from "shared/ui/Button/Button";
import { useForm } from "react-hook-form";
import { Input } from "shared/ui/Input/Input";
import { $api } from "shared/api/api";
import { useSnackbar } from "notistack";
import { Currency } from "shared/ui/Currency/Currency";

const Account: FC = () => {
  const user = useSelector(getUserData);
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      cash: user?.cash ? Number(user.cash) : 0
    }
  });

  const editClickHandler = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, [])

  const updateUserCash = async (cash: string) => {
    try {
      setUpdateLoading(true);
      await $api.put("/account/cash", { cash });

      enqueueSnackbar({
        variant: "success",
        message: "Вы успешно обновили счет"
      });
      dispatch(userActions.setUserCash(cash));
      editClickHandler();
    } catch (e: any) {
      enqueueSnackbar({
        variant: "error",
        message: e?.response?.data?.message || "У вас не получилось обновить счет, попробуйте снова"
      })
    } finally {
      setUpdateLoading(false);
    }
  }

  const updateUser = useCallback(() => {
    handleSubmit((data) => {
      updateUserCash(String(data.cash))
    })();
  }, [])

  useEffect(() => {
    dispatch(fetchCurrentUser()).then(() => {
      setValue("cash", user?.cash ? Number(user.cash) : 0)
    });
  }, []);

  if (!user) return null;

  return <div className="account">
    <h1 className="account__title">
      Мой счет
    </h1>
    <div className="account__card">
      <h2 className="account__name">{user.username}</h2>
      <dl className="account__descriptions">
        <div className="account__description">
          <dt className="account__description-property">
            Мой счет:
          </dt>
          <dd className="account__description-value">
            {
              isEdit ?
                <Input
                  control={control}
                  name="cash"
                  className="account__cash"
                  rules={{ required: true }}
                  type="currency"
                  disabled={updateLoading}
                />
                :
                <Currency>
                  {Number(user.cash)}
                </Currency> 
            }
          </dd>
        </div>
        <div className="account__description">
          <dt className="account__description-property">
            Дата создания:
          </dt>
          <dd className="account__description-value">
            {user.createdAt}
          </dd>
        </div>
      </dl>
      <div className="account__actions">
        {
          isEdit ?
            <>
              <Button
                mod="tab"
                onClick={editClickHandler}
                disabled={updateLoading}
              >
                Отменить
              </Button>
              <Button
                mod="tab"
                onClick={updateUser}
                disabled={updateLoading}
              >
                Сохранить
              </Button>
            </> :
            <Button
              mod="tab"
              icon="edit"
              title="Редактировать"
              onClick={editClickHandler}
            >
            </Button>
        }
      </div>
    </div>
  </div>
}

export default Account;