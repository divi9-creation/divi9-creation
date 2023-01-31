import type { APIContext } from 'astro';
import { either } from 'fp-ts';
import { parseSchema } from 'validation';
import { z } from 'zod';
import {
  CreateSubscriberCommand,
  createSubscriberUsecase,
} from './create-subscriber.use-case';

const responseHeaders = {
  'Content-Type': 'application/json',
};

const requestSchema = z.object({
  email: z
    .string({ required_error: 'email is required' })
    .email('email is invalid'),
  ip: z.string().optional(),
});

const invalidRequest = (errors: any) => {
  return new Response(JSON.stringify({ errors }), {
    status: 400,
    headers: responseHeaders,
  });
};

export const createSubscriberApi = async ({ request }: APIContext) => {
  try {
    const data = await request.json();

    const validationResult = parseSchema(requestSchema, data, true);

    if (either.isLeft(validationResult)) {
      const errors = validationResult.left;

      return invalidRequest(errors);
    }

    const validatedRequest = validationResult.right;
    const { email, ip } = validatedRequest;

    const command: CreateSubscriberCommand = {
      email,
      ip,
    };

    const result = await createSubscriberUsecase(command);

    if (either.isRight(result)) {
      const data = result.right;

      return new Response(JSON.stringify(data), {
        status: 201,
        headers: responseHeaders,
      });
    }

    const error = result.left;

    console.log(error);

    return new Response(null, {
      status: 500,
      headers: responseHeaders,
    });
  } catch (e: unknown) {
    const error = e as Error;

    if (error instanceof SyntaxError) {
      const errors = { message: `Invalid request. Missing request body` };

      return invalidRequest(errors);
    }

    return new Response(JSON.stringify({ message: `Internal error` }), {
      status: 500,
      headers: responseHeaders,
    });
  }
};
