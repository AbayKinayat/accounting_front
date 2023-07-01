import { TransactionsPage } from 'pages/Transactions';
import { createBrowserRouter } from "react-router-dom";
import { App } from 'app/App';
import { Statistics } from 'pages/Statistics';
import { Categories } from 'pages/Categories';
import { Account } from 'pages/Account';
import TransactionsCalendar from 'pages/TransactionsCalendar/TransactionsCalendar';
import { Debt } from 'pages/Debt';
import { Budget } from 'pages/Budget';

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
      },
      {
        path: "account",
        element: <Account />
      },
      {
        path: "calendar",
        element: <TransactionsCalendar />
      },
      {
        path: "debt",
        element: <Debt />
      },
      {
        path: "budget",
        element: <Budget />
      }
    ]
  }
])