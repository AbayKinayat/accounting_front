import { FC, useCallback, useState } from "react";
import "./Welcome.scss";
import { AuthForm } from "../AuthForm/AuthForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { Button } from "shared/ui/Button/Button";

const Welcome: FC = () => {

  const [step, setStep] = useState<"auth" | "register">("auth");

  const toggleStep = useCallback(() => {
    setStep(prev => prev === "auth" ? "register" : "auth");
  }, [])

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