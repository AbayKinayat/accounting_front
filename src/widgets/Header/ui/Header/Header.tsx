import classNames from "classnames";
import { memo, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "shared/ui/Button/Button";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { logout } from "entities/User";
import { transactionsActions } from "entities/Transaction";
import { DateFilter } from "../DateFilter/DateFilter";
import { Theme } from "shared/ui/Theme/Theme";

interface HeaderProps {
  className?: string
}

export const Header = memo<HeaderProps>(({ className }) => {

  const dispatch = useAppDispatch();

  const logoutClickHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const addTransactionClickHandler = useCallback(() => {
    dispatch(transactionsActions.setIsOpen(true));
  }, [dispatch])

  return <div className={classNames("header", className)}>

    <NavLink className="header-menu-item" to="/">
      <Button
        className="header__button header__button__transactions"
        icon="transactions"
        mod="icon"
      >
        Транзакции
      </Button>
    </NavLink>
    <NavLink className="header-menu-item" to="/statistic" >
      <Button
        className="header__button"
        icon="statistic"
        mod="icon"
      >
        Статистика
      </Button>
    </NavLink>
    <NavLink className="header-menu-item" to="/categories" >
      <Button
        className="header__button"
        icon="category"
        mod="icon"
      >
        Категории
      </Button>
    </NavLink>

    <NavLink className="header-menu-item" to="/account">
      <Button 
        className="header__button"
        icon="user"
        mod="icon"
      >
        Мой счет
      </Button>
    </NavLink>

    <NavLink className="header-menu-item" to="/calendar">
      <Button 
        className="header__button"
        icon="calendar"
        mod="icon"
      >
        Календарь
      </Button>
    </NavLink>
    <NavLink className="header-menu-item" to="/debt">
      <Button 
        className="header__button"
        icon="debts"
        mod="icon"
      >
        Долги
      </Button>
    </NavLink>

    <NavLink className="header-menu-item" to="/budget">
      <Button 
        className="header__button"
        icon="budget"
        mod="icon"
      >
        Бюджет
      </Button>
    </NavLink>

    <Button
      className="header__button header-menu-item"
      mod="icon"
      icon="health"
      onClick={addTransactionClickHandler}
    >
      Добавить транзакцию
    </Button>

    <DateFilter />

    <Theme />

    <Button
      className="header__button header-menu-item"
      icon="logout"
      mod="icon"
      onClick={logoutClickHandler}
    >
      Выйти
    </Button>


  </div>
})