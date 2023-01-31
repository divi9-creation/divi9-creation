import { config } from '$client/constants';
import mixpanel from 'mixpanel-browser';

type TrackLeadCapturedCommand = {
  email: string;
  firstName?: string;
  geolocation: any;
  offer: { id: string; name: string; type: string };
};

const FORM_TYPE = 'lead_magnet';

const META_PIXEL_EVENT_NAME = 'Lead';
const MIXPANEL_EVENT_NAME = 'lead_captured';
const PLAUSIBLE_EVENT_NAME = 'Lead Captured';

const trackMetaEvent = (command: TrackLeadCapturedCommand) => {
  const email = command.email;
  const firstName = command.firstName;
  const geolocation = command.geolocation;
  const city = geolocation?.city;
  const country = geolocation?.country;
  const region = geolocation?.region;
  const postalCode = geolocation?.postal;

  fbq('init', config.PUBLIC_META_PIXEL_ID, {
    em: email,
    fn: firstName,
    country,
    ct: city,
    st: region,
    zp: postalCode,
  });

  fbq('track', META_PIXEL_EVENT_NAME);
};

const trackMixpanelEvent = (command: TrackLeadCapturedCommand) => {
  mixpanel.track(MIXPANEL_EVENT_NAME, {
    form_type: FORM_TYPE,
    offer_id: command.offer.id,
    offer_name: command.offer.name,
    offer_type: command.offer.type,
  });
};

const trackPlausibleEvent = (command: TrackLeadCapturedCommand) => {
  plausible(PLAUSIBLE_EVENT_NAME, {
    props: {
      form_type: FORM_TYPE,
      offer_id: command.offer.id,
      offer_name: command.offer.name,
      offer_type: command.offer.type,
    },
  });
};

const PROVIDERS = [
  {
    name: 'Meta Pixel',
    enabled: !!config.PUBLIC_META_PIXEL_ID,
    event: META_PIXEL_EVENT_NAME,
    handler: trackMetaEvent,
  },
  {
    name: 'Mixpanel',
    enabled: !!config.PUBLIC_MIXPANEL_PROJECT_TOKEN,
    event: MIXPANEL_EVENT_NAME,
    handler: trackMixpanelEvent,
  },
  {
    name: 'Plausible Analytics',
    enabled: !!config.PUBLIC_PLAUSIBLE_DOMAIN,
    event: PLAUSIBLE_EVENT_NAME,
    handler: trackPlausibleEvent,
  },
];

export const trackLeadCapturedUseCase = (command: TrackLeadCapturedCommand) => {
  PROVIDERS.filter((p) => p.enabled).forEach(({ handler }) => handler(command));
};
