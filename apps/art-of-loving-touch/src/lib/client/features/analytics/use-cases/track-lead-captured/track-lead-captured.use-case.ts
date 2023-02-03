import { config } from '$client/constants';
import mixpanel from 'mixpanel-browser';
import type { AnalyticsTypes } from '../../types';

type TrackLeadCapturedCommand = {
  email: string;
  firstName?: string;
  geolocation: any;
  offer: { id: string; name: string; type: string };
};

const FORM_TYPE = 'lead_magnet';

const trackGoogleAnalyticsEvent = (command: TrackLeadCapturedCommand) => {
  gtag('event', 'generate_lead', {
    currency: 'USD',
    value: 0,
  });
};

const mapMetaPixelTraits = (traits: AnalyticsTypes.Traits) => {
  return traits
    ? {
        em: traits.email,
        fn: traits.firstName,
        country: traits.address?.country,
        ct: traits.address?.city,
        st: traits.address?.region,
        zp: traits.address?.postalCode,
      }
    : {};
};

const trackMetaEvent = (command: TrackLeadCapturedCommand) => {
  const { email, firstName, geolocation } = command;

  const traits: AnalyticsTypes.Traits = {
    address: {
      city: geolocation?.city,
      country: geolocation?.country,
      postalCode: geolocation?.postal,
      region: geolocation?.region,
    },
    email,
    firstName,
  };

  const mappedTraits = mapMetaPixelTraits(traits);

  fbq('init', config.PUBLIC_META_PIXEL_ID, mappedTraits);
  fbq('track', 'Lead');
};

const trackMixpanelEvent = (command: TrackLeadCapturedCommand) => {
  mixpanel.track('lead_captured', {
    form_type: FORM_TYPE,
    offer_id: command.offer.id,
    offer_name: command.offer.name,
    offer_type: command.offer.type,
  });
};

const trackPlausibleEvent = (command: TrackLeadCapturedCommand) => {
  plausible('Lead Captured', {
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
    name: 'Google Analytics',
    enabled: !!config.PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID,
    handler: trackGoogleAnalyticsEvent,
  },
  {
    name: 'Meta Pixel',
    enabled: !!config.PUBLIC_META_PIXEL_ID,
    handler: trackMetaEvent,
  },
  {
    name: 'Mixpanel',
    enabled: !!config.PUBLIC_MIXPANEL_PROJECT_TOKEN,
    handler: trackMixpanelEvent,
  },
  {
    name: 'Plausible Analytics',
    enabled: !!config.PUBLIC_PLAUSIBLE_DOMAIN,
    handler: trackPlausibleEvent,
  },
];

export const trackLeadCapturedUseCase = (command: TrackLeadCapturedCommand) => {
  const mappedCommand = {
    ...command,
    email: command.email.toLowerCase().trim(),
  };

  PROVIDERS.filter((p) => p.enabled).forEach(({ handler }) =>
    handler(mappedCommand)
  );
};
