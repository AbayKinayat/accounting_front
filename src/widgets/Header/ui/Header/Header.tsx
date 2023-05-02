import classNames from "classnames";
import "./Header.scss";
import { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "shared/ui/Icon/Icon";
import { Button } from "shared/ui/Button/Button";

interface HeaderProps {
  className?: string
}

export const Header = memo<HeaderProps>(({ className }) => {

  return <div className={classNames("header", className)}>

    <NavLink className="header-menu-item" to="/">
      <Button className="header__button" icon="transactions" mod="icon">
        Транзакции
      </Button>
    </NavLink>
    <NavLink className="header-menu-item" to="/categories" >
      <Button className="header__button" icon="double-check" mod="icon">
        Категорий
      </Button>
    </NavLink>
  </div>
})