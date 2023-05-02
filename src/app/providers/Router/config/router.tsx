import { TransactionsPage } from 'pages/Transactions';
import { createBrowserRouter } from "react-router-dom";
import { App } from 'app/App';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <TransactionsPage />
      }
    ]
  }
])