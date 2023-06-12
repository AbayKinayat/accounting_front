import { memo, useState, useEffect, useCallback, type ChangeEvent, useMemo } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell } from "recharts"
import { getTransactionsStatistic } from "../../lib/getTransactionsStatistic";
import { ITransactionStatistic } from "../../types/ITransactionStatistic";
import { useSelector } from "react-redux";
import { getTransactionCategoryData } from "entities/TransactionCategory";
import "./TransactionStatistic.scss";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";
import { Select } from "shared/ui/Select/Select";
import { useForm } from "react-hook-form";
import { DateFilterType } from "../../types/DateFilterType";
import { ExpenseIncome } from "../ExpenseIncome/ExpenseIncome";
import { getTransactionsCreatedCount, getTransactionsDateType, getTransactionsEndUt, getTransactionsStartUt, transactionsActions } from "entities/Transaction";
import { getFirstYearUt } from "shared/lib/getFirstYearUt/getFirstYearUt";
import { getLastYearUt } from "shared/lib/getLastYeareUt/getLastYearUt";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { ChartType } from "../../types/ChartType";
import { ReviewTooltip } from "../ReviewTooltip/ReviewTooltip";

const chartTypes: { name: string, value: ChartType }[] = [
  {
    name: "Динамик",
    value: "dynamic"
  },
  {
    name: "Обзор",
    value: "review"
  }
]

export const TransactionStatistic = memo(() => {
  const [data, setData] = useState<ITransactionStatistic[]>([]);
  const [chartType, setChartType] = useState<ChartType>("dynamic");
  const startUt = useSelector(getTransactionsStartUt);
  const endUt = useSelector(getTransactionsEndUt);
  const [categoriesStates, setCategoriesStates] = useState<Record<string, boolean>>({});
  const [typeId, setTypeId] = useState(2);
  const categories = useSelector(getTransactionCategoryData);
  const transactionsCreatedCount = useSelector(getTransactionsCreatedCount);
  const dispatch = useAppDispatch();

  const { control } = useForm();

  const filteredCategoriesLines = useMemo(() => {

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

  const reviewChartFilteredData = useMemo(() => {
    if (chartType === "dynamic") return []
    return data.filter(data => categoriesStates[data.name])
  }, [data, chartType, categoriesStates]);

  const filteredCategories = useMemo(() => {
    if (chartType === "dynamic") return []
    return categories.filter(category => categoriesStates[category.name])
  }, [categories, categoriesStates, chartType])

  const categoryFilter = useCallback((event: ChangeEvent<HTMLInputElement>, name: string) => {
    setCategoriesStates({
      ...categoriesStates,
      [name]: event.target.checked,
    });
  }, [categoriesStates]);

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
      endUt: endUtValue,
      typeId,
      chartType
    }).then(res => {
      setData(res.data);
    });
  }, [startUt, endUt, typeId, transactionsCreatedCount, chartType]);

  useEffect(() => {
    const categoryStatesMap: Record<string, boolean> = {}
    categories.forEach(category => {
      categoryStatesMap[category.name] = true;
    })
    setCategoriesStates(categoryStatesMap);
  }, [categories]);

  const setStartUt = useCallback((ut: number) => {
    dispatch(transactionsActions.setStartUt(ut))
  }, [])

  const setEndUt = useCallback((ut: number) => {
    dispatch(transactionsActions.setEndUt(ut))
  }, [])

  const chartTypeChangeHandler = useCallback((chartType: { name: string, value: ChartType }) => {
    setChartType(chartType.value);
  }, [])

  if (!categories.length || !data.length) return null

  return <div className="transactions-statistic">
    <div className="transactions-statistic__filter">
      <ExpenseIncome
        typeId={typeId}
        onChange={setTypeId}
      />
      <Select
        options={chartTypes}
        optionLabel="name"
        optionValue="value"
        control={control}
        name="chartType"
        onChange={chartTypeChangeHandler}
      />
    </div>
    <div className="transactions-statistic__graphic">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="transactions-statistic"
      >
        {
          chartType === "dynamic" ?
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
                filteredCategoriesLines
              }
            </LineChart> : <PieChart>
              <Pie
                data={reviewChartFilteredData}
                nameKey="name"
                dataKey="value"
                outerRadius="100%"
                label
              >

                {
                  filteredCategories.map(category => (
                    <Cell
                      key={category.name}
                      name={category.name}
                      fill={category.color}
                      color={category.color}
                      scale={10}
                    />
                  ))
                }
              </Pie>
              <Tooltip
                content={ReviewTooltip}
              />
            </PieChart>
        }
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