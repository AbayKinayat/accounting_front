import { FC, memo } from "react"
import { Button } from "shared/ui/Button/Button"
import { Input } from "shared/ui/Input/Input"
import "./AuthForm.scss";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { IUserCreate, authByUsername, getUserError, getUserLoading } from "entities/User";
import { Alert } from "shared/ui/Alert/Alert";
import { useSelector } from "react-redux";
import classNames from "classnames"

interface AuthFormProps {
  className?: string
}

export const AuthForm = memo<AuthFormProps>(({ className }) => {

  const { register, handleSubmit } = useForm<IUserCreate>();
  const dispatch = useAppDispatch();
  const authError = useSelector(getUserError);
  const loading = useSelector(getUserLoading);

  const onSubmit = (user: IUserCreate) => {
    dispatch(authByUsername(user));
  };

  return <form className={classNames("auth-form", className)} onSubmit={handleSubmit(onSubmit)}>
    <h1 className="auth-form__title">
      Авторизация
    </h1>
    <Input
      className="auth-form__login"
      label="Логин"
      {...register("username", { required: true })}
      disabled={loading}
    />
    <Input
      className="auth-form__password"
      label="Пароль"
      type="password"
      {...register("password", { required: true })}
      disabled={loading}
    />
    {
      authError &&
      <Alert className="auth-form__alert-error" type="error">
        {authError}
      </Alert>
    }
    <Button
      className="auth-form__action"
      mod="action"
      loading={loading}
      disabled={loading}
    >
      Авторизоваться
    </Button>
  </form>
})