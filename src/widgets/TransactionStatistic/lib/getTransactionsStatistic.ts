import { $api } from "shared/api/api";
import { ChartType } from "../types/ChartType";

interface ITransactionsStatisticOptions {
  startUt: number,
  endUt: number,
  typeId: number,
  chartType: ChartType
} 

type GetTransactionsStatisticResponse =  {
  name: string,
  value: any,
  [key: string]: any
}[]

export function getTransactionsStatistic(options: ITransactionsStatisticOptions) {
  return $api.post<GetTransactionsStatisticResponse>("transactions/statistic", options);
}