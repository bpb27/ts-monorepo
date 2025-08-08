import { useState } from 'react';
import { z } from 'zod';

type FormField = {
  error: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
};

export const useForm = <T extends z.ZodObject>(
  schema: T,
  initialValues: Partial<z.infer<T>> = {}
) => {
  const keys = Object.keys(schema.shape) as Array<keyof z.infer<T>>;

  const [values, setValues] = useState(() =>
    keys.reduce(
      (acc, key) => {
        acc[key] = key in initialValues ? String(initialValues[key]) : '';
        return acc;
      },
      {} as Record<keyof z.infer<T>, string>
    )
  );

  const parsed = schema.safeParse(values);

  const fields = keys.reduce(
    (acc, key) => {
      acc[key] = {
        name: String(key),
        value: values[key],
        error: parsed.success
          ? undefined
          : z.treeifyError(parsed.error).properties?.[key]?.errors?.[0],
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setValues((prev) => ({ ...prev, [key]: e.target.value }));
        },
      };
      return acc;
    },
    {} as Record<keyof z.infer<T>, FormField>
  );

  return parsed.success
    ? {
        isValid: true as const,
        values: parsed.data,
        fields,
      }
    : {
        isValid: false as const,
        values: undefined,
        fields,
      };
};
