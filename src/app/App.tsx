import { Welcome } from "pages/Welcome"
import { useSelector } from "react-redux";
import { getUserData } from "entities/User/model/selectors/getUserData";
import { Outlet } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { Header } from "widgets/Header";
import { AddTransactionModal } from "features/AddTransactionModal";
import { EditTransactionModal } from "features/EditTransactionModal";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/index.scss";
import { $api } from "shared/api/api";

export const App = () => {

  const user = useSelector(getUserData);

  useEffect(() => {
    $api.post("/transactions/statistic", {
      startUt: 1682963750,
      endUt: 1684259750
    })
  }, [])

  return <div className="app">
    <Suspense fallback="loading">
      {
        user ?
          <div>
            <Header />
            <Outlet />
          </div>
          : <Welcome />
      }
    </Suspense>
    <AddTransactionModal />
    <EditTransactionModal />
  </div>
}