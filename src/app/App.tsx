import { Welcome } from "pages/Welcome"
import { useSelector } from "react-redux";
import "./styles/index.scss";
import { getUserData } from "entities/User/model/selectors/getUserData";
import { Outlet } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { Header } from "widgets/Header";

export const App = () => {

  const user = useSelector(getUserData);

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
  </div>
}