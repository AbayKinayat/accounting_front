import { memo, useState, useEffect, useCallback, type ChangeEvent, useMemo } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts"
import { getFirstYearUt } from "../../lib/getFirstYearUt";
import { getLastYearUt } from "../../lib/getLastYearUt";
import { getTransactionsStatistic } from "../../lib/getTransactionsStatistic";
import { ITransactionStatistic } from "../../types/ITransactionStatistic";
import { useSelector } from "react-redux";
import { getTransactionCategoryData } from "entities/TransactionCategory";
import "./TransactionStatistic.scss";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";

export const TransactionStatistic = memo(() => {
  const [data, setData] = useState<ITransactionStatistic[]>([]);
  const [startUt, setStartUt] = useState(0);
  const [endUt, setEndUt] = useState(0);
  const [categoriesStates, setCategoriesStates] = useState<Record<string, boolean>>({});
  const categories = useSelector(getTransactionCategoryData);

  const filteredCategories = useMemo(() => {
    return categories
      .map(category => (
        <Line
          key={category.id}
          type="linear"
          dataKey={category.id}
          name={category.name}
          stroke={category.color}
          opacity={categoriesStates[category.name] ? 1 : 0}
          activeDot
        />
      ))
  }, [categories, categoriesStates]);

  useEffect(() => {
    let startUtValue = startUt;
    let endUtValue = endUt;
    if (!startUtValue) {
      startUtValue = getFirstYearUt(new Date());
      setStartUt(startUtValue);
    }
    if (!endUtValue) {
      endUtValue = getLastYearUt(new Date());
      setEndUt(endUtValue);
    }

    getTransactionsStatistic({
      startUt: startUtValue,
      endUt: endUtValue
    }).then(res => {
      setData(res.data);
    });
  }, [startUt, endUt]);

  useEffect(() => {
    const categoryStatesMap: Record<string, boolean> = {}
    categories.forEach(category => {
      categoryStatesMap[category.name] = true;
    })
    setCategoriesStates(categoryStatesMap);
  }, [categories]);

  const categoryFilter = useCallback((event: ChangeEvent<HTMLInputElement>, name: string) => {
    setCategoriesStates({
      ...categoriesStates,
      [name]: event.target.checked,
    });
  }, [categoriesStates]);

  if (!categories.length || !data.length) return null

  return <div className="transactions-statistic">
    <div className="transactions-statistic__graphic">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="transactions-statistic"
      >
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={CustomTooltip} />
          {
            filteredCategories
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="transactions-statistic__legends">
      {
        categories.map((category) => (
          <div key={category.name} className="transactions-statistic__legend">
            <input
              id={category.name}
              checked={categoriesStates[category.name]}
              type="checkbox"
              onChange={event => categoryFilter(event, category.name)}
            />
            <div
              className="transactions-statistic__legend-prefix"
              style={{ backgroundColor: category.color }}
            >
            </div>
            <label htmlFor={category.name}>{category.name}</label>
          </div>
        ))
      }
    </div>

  </div>
})