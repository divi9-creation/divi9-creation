import { env } from '$server/constants';
import { MailerLite } from '$server/email-marketing';
import type { APIContext, APIRoute } from 'astro';
import { either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { parseSchema } from 'validation';
import { z } from 'zod';

type MailerliteCreateSubscriberRequest = {
  email: string;
  groups: string[];
  ip_address?: string;
  optin_ip?: string;
};

const ERROR_MESSAGE = 'An unexpected error has occured. Please try again later';

const DEFAULT_RESPONSE_OPTIONS: ResponseInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const GROUP_ID = env.MAILERLITE_GROUP_ID;

const subscriberSchema = z.object({
  email: z
    .string({ required_error: 'email is required' })
    .email('email is invalid'),
  ip: z.string().optional(),
});

const json = (body?: any, options?: ResponseInit) => {
  const newOptions = Object.assign({}, DEFAULT_RESPONSE_OPTIONS, options);
  return new Response(body, newOptions);
};

const invalidRequest = (errors: any) => {
  const dto = { errors };
  const serializedDto = serialize(dto);
  const options: ResponseInit = { status: 400 };

  return json(serializedDto, options);
};

const internalError = () => {
  const dto = { message: ERROR_MESSAGE };
  const serializedDto = serialize(dto);
  const options: ResponseInit = { status: 500 };

  return json(serializedDto, options);
};

const log = (error: any) => console.log(error);

const mapEmail = (email: string) => email.toLowerCase().trim();

const serialize = (dto: any) => JSON.stringify(dto);

const createSubscriber = (request: MailerliteCreateSubscriberRequest) => {
  const options: RequestInit = {
    method: 'POST',
    body: serialize(request),
  };

  return pipe(MailerLite.request('/subscribers', options));
};

export const post: APIRoute = async ({ request }: APIContext) => {
  const data = await request.json();

  const validationResult = parseSchema(subscriberSchema, data);

  if (either.isLeft(validationResult)) {
    const errors = validationResult.left;
    log(errors);
    return invalidRequest(errors);
  }

  const validatedRequest = validationResult.right;
  const { email, ip } = validatedRequest;
  const newEmail = mapEmail(email);

  const createSubscriberRequest: MailerliteCreateSubscriberRequest = {
    email: newEmail,
    groups: [GROUP_ID],
    ip_address: ip,
    optin_ip: ip,
  };

  const createSubscriberResult = await createSubscriber(
    createSubscriberRequest
  )();

  if (either.isRight(createSubscriberResult)) {
    const data = createSubscriberResult.right;
    const serialized = serialize(data);
    const options: ResponseInit = { status: 201 };

    return json(serialized, options);
  }

  const error = createSubscriberResult.left;

  log(error);

  return internalError();
};
