import { config } from '$client/constants';
import mixpanel from 'mixpanel-browser';

const GOOGLE_ANALYTICS_EVENT_NAME = 'page_view';
const META_PIXEL_EVENT_NAME = 'PageView';
const MIXPANEL_EVENT_NAME = 'page_viewed';
const PLAUSIBLE_EVENT_NAME = 'pageView';

const trackGoogleAnalyticsEvent = () => {
  gtag('event', GOOGLE_ANALYTICS_EVENT_NAME);
};

const trackMetaEvent = () => {
  fbq('track', META_PIXEL_EVENT_NAME);
};

const trackMixpanelEvent = () => {
  mixpanel.track(MIXPANEL_EVENT_NAME);
};

const trackPlausibleEvent = () => {
  plausible(PLAUSIBLE_EVENT_NAME);
};

const INTEGRATIONS = [
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

export const trackPageViewedUseCase = () => {
  INTEGRATIONS.filter((p) => p.enabled).forEach(({ handler }) => handler());
};
