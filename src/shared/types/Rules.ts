import { FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

export type Rules = Omit<RegisterOptions<FieldValues, FieldPath<FieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>