import { either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import type { z, ZodError } from 'zod';

export type ValidationErrorListItem = {
  field: string;
  message: string;
};

export type ValidationErrorsObject = { [key: string]: string };

export const parseSchema = <T>(
  schema: z.ZodType<T>,
  data: any,
  useValidationErrorArray = false
) => {
  return pipe(
    either.tryCatch(
      () => schema.parse(data),
      (error) => error as ZodError
    ),
    either.mapLeft(mapZodErrorToValidationError(useValidationErrorArray)),
    either.map((data): T => data)
  );
};

const mapZodErrorToValidationError =
  (useValidationErrorArray = false) =>
  (error: ZodError) => {
    if (useValidationErrorArray) {
      const errors: ValidationErrorListItem[] = error.errors.map((e) => {
        const field = e.path.join('.');
        const message = e.message;

        return { field, message };
      });

      return errors;
    }

    let errors: ValidationErrorsObject = {};

    error.errors.forEach((e) => {
      const field = e.path.join('.');
      const message = e.message;

      errors[field] = message;
    });

    return errors;
  };
