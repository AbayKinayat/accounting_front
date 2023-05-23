import { $api } from "shared/api/api";

interface ITransactionsStatisticOptions {
  startUt: number,
  endUt: number,
  typeId: number
} 

type GetTransactionsStatisticResponse =  {
  name: string,
  value: any,
  [key: string]: any
}[]

export function getTransactionsStatistic(options: ITransactionsStatisticOptions) {
  return $api.post<GetTransactionsStatisticResponse>("transactions/statistic", options);
}