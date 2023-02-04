import { config } from '$client/constants';
import { featureFlagsStore } from '$client/stores';
import { isFeatureEnabled } from '$shared/utils/feature-flags';
import mixpanel from 'mixpanel-browser';
import { get } from 'svelte/store';
import type { AnalyticsTypes } from '../../types';

type TrackLeadCapturedCommand = {
  email: string;
  firstName?: string;
  geolocation?: App.Geolocation;
  offer: { id: string; name: string; type: string };
};

const FORM_TYPE = 'lead_magnet';

const trackGoogleAnalyticsEvent = () => {
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
    address: geolocation
      ? {
          city: geolocation.city,
          country: geolocation.country,
          postalCode: geolocation.zip,
          region: geolocation.state,
        }
      : undefined,
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
  const featureFlags = get(featureFlagsStore);

  if (isFeatureEnabled(featureFlags, 'use_analytics')) {
    const mappedCommand = {
      ...command,
      email: command.email.toLowerCase().trim(),
    };

    PROVIDERS.filter((p) => p.enabled).forEach(({ handler }) =>
      handler(mappedCommand)
    );
  }
};
