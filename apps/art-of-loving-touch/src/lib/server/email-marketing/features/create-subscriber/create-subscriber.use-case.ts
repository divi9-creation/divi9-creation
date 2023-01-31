import { MailerLite } from '$server/email-marketing';
import { pipe } from 'fp-ts/lib/function';

type MailerliteCreateSubscriberRequest = {
  email: string;
  groups: string[];
  ip_address?: string;
  optin_ip?: string;
};

const createSubscriber = (request: MailerliteCreateSubscriberRequest) => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(request),
  };

  return pipe(MailerLite.request('/subscribers', options));
};

const mapEmail = (email: string) => email.toLowerCase().trim();

export type CreateSubscriberCommand = {
  email: string;
  ip?: string;
};

export const createSubscriberUsecase = async (
  command: CreateSubscriberCommand
) => {
  const email = mapEmail(command.email);
  const ip = command.ip;

  const request: MailerliteCreateSubscriberRequest = {
    email,
    ip_address: ip,
    groups: [],
    optin_ip: ip,
  };

  return await pipe(createSubscriber(request))();
};
