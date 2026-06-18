export type FieldsOf<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

export type PartialFieldsOf<T> = Partial<FieldsOf<T>>;
