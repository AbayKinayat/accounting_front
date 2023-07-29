import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Welcome } from "pages/Welcome"
import { useSelector } from "react-redux";
import { getUserData } from "entities/User/model/selectors/getUserData";
import { Header } from "widgets/Header";
import { AddTransactionModal } from "features/AddTransactionModal";
import { EditTransactionModal } from "features/EditTransactionModal";
import { updateTheme } from "shared/lib/updateTheme/updateTheme";
import { ITheme } from "shared/types/ITheme";

export const App = () => {

  const user = useSelector(getUserData);

  useEffect(() => {
    let actualTheme = localStorage.getItem("theme");

    if (!actualTheme) actualTheme = "light";

    updateTheme(actualTheme as ITheme);
  }, [])

  return <div className="app">
    <Suspense fallback="loading">
      {
        user ?
          <>
            <Header />
            <Outlet />
          </>
          : <Welcome />
      }
    </Suspense>
    <AddTransactionModal />
    <EditTransactionModal />
  </div>
}