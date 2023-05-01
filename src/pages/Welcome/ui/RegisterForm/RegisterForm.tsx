import { memo, useCallback } from "react"
import { Input } from "shared/ui/Input/Input"
import { Button } from "shared/ui/Button/Button"
import { useForm } from "react-hook-form";
import "./RegisterForm.scss"
import { IUserCreate, getUserError, getUserLoading, registerByUsername } from "entities/User";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux"
import { Alert } from "shared/ui/Alert/Alert";
import classNames from "classnames"

interface RegisterFormProps {
  className?: string
}

export const RegisterForm = memo<RegisterFormProps>(({ className }) => {

  const { register, handleSubmit } = useForm<IUserCreate>({
    defaultValues: {
      username: "",
      password: ""
    }
  });
  const dispatch = useAppDispatch();
  const authError = useSelector(getUserError);
  const authLoading = useSelector(getUserLoading);

  const onSubmit = useCallback((data: IUserCreate) => {
    dispatch(registerByUsername(data));
  }, []);

  return <form className={classNames("register-form", className)} onSubmit={handleSubmit(onSubmit)}>
    <h1 className="register-form__title">
      Регистрация
    </h1>
    <Input
      className="register-form__login"
      label="Логин"
      {...register("username", { required: true })}
      disabled={authLoading}
    />
    <Input
      className="register-form__password"
      label="Пароль"
      type="password"
      {...register("password", { required: true })}
      disabled={authLoading}
    />
    {
      authError && <Alert className="register-form__alert-error" type="error">
        {authError}
      </Alert>
    }
    <Button
      className="register-form__action"
      mod="action"
      loading={authLoading}
      disabled={authLoading}
    >
      Регистрация
    </Button>
  </form>
})