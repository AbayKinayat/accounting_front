import { TransactionsPage } from 'pages/Transactions';
import { createBrowserRouter } from "react-router-dom";
import { App } from 'app/App';
import { Statistics } from 'pages/Statistics';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <TransactionsPage />
      },
      {
        path: "categories",
        element: <Statistics />
      },
    ]
  }
])