import { Welcome } from "pages/Welcome"
import { useSelector } from "react-redux";
import { getUserData } from "entities/User/model/selectors/getUserData";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Header } from "widgets/Header";
import { AddTransactionModal } from "features/AddTransactionModal";
import { EditTransactionModal } from "features/EditTransactionModal";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/index.scss";

export const App = () => {

  const user = useSelector(getUserData);

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