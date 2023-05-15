import type { ReactElement } from 'react';
import type { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

export type FormRenderComponent = (arg: {
  field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;
}) => ReactElement