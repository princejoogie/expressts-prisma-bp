import { ObjectShape } from "yup/lib/object";

export type ObjectShapeValues = ObjectShape extends Record<string, infer V>
  ? V
  : never;
export type Shape<T extends Record<any, any>> = Partial<
  Record<keyof T, ObjectShapeValues>
>;
