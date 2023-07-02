import { FC, useCallback, useEffect, useState } from "react";
import { AuthForm } from "../AuthForm/AuthForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { Button } from "shared/ui/Button/Button";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { refreshUser } from "entities/User";

const Welcome: FC = () => {
  const [step, setStep] = useState<"auth" | "register">("auth");
  const dispatch = useAppDispatch();

  const toggleStep = useCallback(() => {
    setStep(prev => prev === "auth" ? "register" : "auth");
  }, [])

  useEffect(() => {
      dispatch(refreshUser())
  }, [dispatch]);

  return <div className="welcome">
    {
      step === "auth"
        ? <AuthForm className="welcome__form" />
        : <RegisterForm className="welcome__form" />
    }
    <Button className="welcome__change-step" onClick={toggleStep}>
      {
        step === "auth"
          ? "Перейти к регистрации"
          : "Перейти к авторизации"
      }
    </Button>
  </div>
}

export default Welcome;