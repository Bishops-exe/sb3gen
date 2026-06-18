export type VariableValue = number | boolean | string;

export type VariableInfo =
  | [string, VariableValue]
  | [string, VariableValue, true];
