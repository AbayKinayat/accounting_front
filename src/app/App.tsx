import { Welcome } from "pages/Welcome"
import { useSelector } from "react-redux";
import "./styles/index.scss";
import { getUserData } from "entities/User/model/selectors/getUserData";

export const App = () => {

  const user = useSelector(getUserData);

  return <div className="app">
    {
      user ? <div>
        Hello
      </div> : <Welcome />
    }
  </div>
}