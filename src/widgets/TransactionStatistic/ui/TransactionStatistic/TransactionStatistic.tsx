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
import { DateFilter } from "../DateFilter/DateFilter";
import { Select } from "shared/ui/Select/Select";
import { useForm } from "react-hook-form";
import { DateFilterType } from "../../types/DateFilterType";
import { getFirstWeekUt } from "widgets/TransactionStatistic/lib/getFirstWeekUt";
import { getLastWeekUt } from "widgets/TransactionStatistic/lib/getLastWeekUt";
import { Datepicker } from "shared/ui/Datepicker/Datepicker";

const dateTypes: {
  name: string,
  value: DateFilterType
}[] = [
    {
      name: "Месяц",
      value: "month"
    },
    {
      name: "Неделя",
      value: "week"
    },
    {
      name: "Год",
      value: "year"
    },
    {
      name: "В ручную",
      value: "custom"
    }
  ]

export const TransactionStatistic = memo(() => {
  const [data, setData] = useState<ITransactionStatistic[]>([]);
  const [startUt, setStartUt] = useState(0);
  const [endUt, setEndUt] = useState(0);
  const [categoriesStates, setCategoriesStates] = useState<Record<string, boolean>>({});
  const categories = useSelector(getTransactionCategoryData);

  const { control, watch } = useForm({ defaultValues: { dateType: { value: "year" } } });
  const [dateType, setDateType] = useState<DateFilterType>("year")

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

  const dateTypeChangeHandler = useCallback(({ value }: { value: DateFilterType }) => {
    if (value === "year") {
      setStartUt(getFirstYearUt(new Date()));
      setEndUt(getLastYearUt(new Date()));
    } else if (value === "week") {
      setStartUt(getFirstWeekUt(new Date()));
      setEndUt(getLastWeekUt(new Date()));
    } else if (value === "month") {
      setStartUt(new Date().setDate(1) / 1000);
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1, 0);
      setEndUt(endDate.getTime() / 1000);
    }
    setDateType(value)
  }, [startUt, endUt])

  if (!categories.length || !data.length) return null

  return <div className="transactions-statistic">
    <div className="transactions-statistic__filter">
      <DateFilter
        type={dateType}
        startUt={startUt}
        endUt={endUt}
        setStartUt={setStartUt}
        setEndUt={setEndUt}
      />
      <Select
        options={dateTypes}
        optionLabel="name"
        optionValue="value"
        control={control}
        name="dateType"
        onChange={dateTypeChangeHandler}
      />
      {
        dateType === "custom" &&
        <>
          <Datepicker
            label="c"
            control={control}
            name="startUt"
          />
          <Datepicker
            label="по"
            control={control}
            name="endUt"
          />
        </>

      }

    </div>
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