import { validator } from '@felte/validator-zod';
import { createForm } from 'felte';
import { either as E, taskEither as TE } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { writable } from 'svelte/store';
import { z } from 'zod';
import confetti from 'canvas-confetti';
import { trackLeadCapturedUseCase } from '../analytics';
import { config } from '$client/constants';
import { fetchJSON } from 'fetch';
import { mapStateToCode } from '$shared/utils/geolocation';

type IPInfoGeolocationResponse = {
  ip: string;
  city: string;
  region: string;
  country: string;
  postal: string;
};

const getGeolocationUseCase = () => {
  return pipe(
    fetchJSON<IPInfoGeolocationResponse>(
      `https://ipinfo.io?token=${config.PUBLIC_IPINFO_API_KEY}`
    ),
    TE.map((data): App.Geolocation => {
      const { city, country, ip, region, postal } = data;
      const stateCode = mapStateToCode(region);

      return {
        city: city,
        country: country,
        ip: ip,
        state: stateCode,
        zip: postal,
      };
    })
  );
};

const formSchema = z.object({
  email: z.string().email('Enter a valid email'),
});

type FormValues = z.infer<typeof formSchema>;

type CaptureLeadCommand = {
  email: string;
  firstName?: string;
  geolocation?: App.Geolocation;
  ip?: string;
  offer: { id: string; name: string; type: string; url: string };
};

const captureLeadUseCase = (command: CaptureLeadCommand) => {
  const email = command.email.toLowerCase().trim();
  const firstName = command.firstName;
  const geolocation = command.geolocation;
  const offer = command.offer;

  return pipe(
    TE.Do,
    TE.bind('response', () => {
      const request: SubscribeRequest = {
        email,
        geolocation,
      };

      return pipe(
        fetchJSON('/api/subscribe', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(request),
        }),
        TE.map(() => {
          const trackLeadCommand = {
            email,
            firstName,
            geolocation,
            offer,
          };

          trackLeadCapturedUseCase(trackLeadCommand);
        })
      );
    })
  );
};

type EmailCaptureFormProps = {
  offer: { id: string; name: string; type: string; url: string };
};

export const useEmailCaptureForm = (props: EmailCaptureFormProps) => {
  const state = writable<'error' | 'loading' | 'normal' | 'success'>('normal');
  const errorMessage = writable<string>();

  const { data, errors, form } = createForm<FormValues>({
    extend: validator({ schema: formSchema }),
    initialValues: {},
    onSubmit: async (values) => {
      state.set('loading');

      const geolocationResult = await getGeolocationUseCase()();

      const geolocation = pipe(
        geolocationResult,
        E.fold(
          () => undefined,
          (data) => data
        )
      );

      const captureLeadCommand: CaptureLeadCommand = {
        ...values,
        geolocation,
        offer: props.offer,
      };

      const result = await captureLeadUseCase(captureLeadCommand)();

      if (E.isRight(result)) {
        state.set('success');

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        return;
      }

      const error = result.left;

      switch (error.type) {
        case 'request_error':
          errorMessage.set(error.data.message);
          break;
        default:
          errorMessage.set(
            `An unexpected error has occured. Please try again later`
          );
      }

      state.set('normal');
    },
  });

  return {
    data,
    errorMessage,
    errors,
    state,
    form,
  };
};
