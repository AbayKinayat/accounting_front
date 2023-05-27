import { TransactionsPage } from 'pages/Transactions';
import { createBrowserRouter } from "react-router-dom";
import { App } from 'app/App';
import { Statistics } from 'pages/Statistics';
import { Categories } from 'pages/Categories';

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
        path: "statistic",
        element: <Statistics />
      },
      {
        path: "categories",
        element: <Categories />
      }
    ]
  }
])