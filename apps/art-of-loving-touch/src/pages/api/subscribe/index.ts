import { env } from '$server/config';
import { MailerLite } from '$server/email-marketing';
import { xata } from '$server/shared';
import { Response } from '$server/shared/utils';
import type { APIContext, APIRoute } from 'astro';
import { either, option } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { parseSchema } from 'validation';
import { z } from 'zod';

type MailerliteCreateSubscriberRequest = {
  email: string;
  fields: {
    city?: string;
    country?: string;
    state?: string;
    zip?: string;
  };
  groups: string[];
  ip_address?: string;
  optin_ip?: string;
};

const GROUP_ID = env.MAILERLITE_GROUP_ID;

export const geolocationSchema = z.object({
  city: z.string({ required_error: 'city is required' }),
  country: z.string({ required_error: 'country is required' }),
  ip: z.string(),
  state: z.string({ required_error: 'state is required' }),
  zip: z.string({ required_error: 'zip is required' }),
});

export const subscribeSchema = z.object({
  email: z
    .string({ required_error: 'email is required' })
    .email('email is invalid'),
  geolocation: geolocationSchema.optional(),
});

const log = (error: any) => console.log(error);

const mapEmail = (email: string) => email.toLowerCase().trim();

const createSubscriber = (request: MailerliteCreateSubscriberRequest) => {
  const options: RequestInit = {
    method: 'POST',
    body: Response.serialize(request),
  };

  return pipe(MailerLite.request('/subscribers', options));
};

const getLeadOption = async (email: string) => {
  const leadOrNull = await xata.db.leads.getFirst({ filter: { email } });
  return option.fromNullable(leadOrNull);
};

export const post: APIRoute = async ({ request }: APIContext) => {
  const data = await request.json();

  const validationResult = parseSchema(subscribeSchema, data);

  if (either.isLeft(validationResult)) {
    const errors = validationResult.left;
    log(errors);
    return Response.invalidRequest(errors);
  }

  const validatedRequest = validationResult.right;
  const { email, geolocation } = validatedRequest;
  const mappedEmail = mapEmail(email);

  const createSubscriberRequest: MailerliteCreateSubscriberRequest = {
    email: mappedEmail,
    fields: {
      city: geolocation?.city,
      country: geolocation?.country,
      state: geolocation?.state,
      zip: geolocation?.zip,
    },
    groups: [GROUP_ID],
    ip_address: geolocation?.ip,
    optin_ip: geolocation?.ip,
  };

  const createSubscriberResult = await createSubscriber(
    createSubscriberRequest
  )();

  if (either.isRight(createSubscriberResult)) {
    const data = createSubscriberResult.right;
    const options: ResponseInit = { status: 201 };

    const leadOption = await getLeadOption(mappedEmail);

    if (option.isNone(leadOption)) {
      await xata.db.leads.create({
        email: mappedEmail,
        city: geolocation?.city,
        country: geolocation?.country,
        state: geolocation?.state,
        zip: geolocation?.zip,
        created_at: new Date(),
      });
    }

    return Response.json(data, options);
  }

  const error = createSubscriberResult.left;

  log(error);

  return Response.internalError();
};
