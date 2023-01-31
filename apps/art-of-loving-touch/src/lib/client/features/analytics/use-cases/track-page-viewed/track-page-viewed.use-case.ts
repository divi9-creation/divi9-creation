import { config } from '$client/constants';
import mixpanel from 'mixpanel-browser';

const META_PIXEL_EVENT_NAME = 'PageView';
const MIXPANEL_EVENT_NAME = 'page_viewed';
const PLAUSIBLE_EVENT_NAME = 'page_view';

const trackMetaEvent = () => {
  fbq('track', META_PIXEL_EVENT_NAME);
};

const trackMixpanelEvent = () => {
  mixpanel.track(MIXPANEL_EVENT_NAME);
};

const trackPlausibleEvent = () => {
  plausible(PLAUSIBLE_EVENT_NAME);
};

const PROVIDERS = [
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
  PROVIDERS.filter((p) => p.enabled).forEach(({ handler }) => handler());
};
