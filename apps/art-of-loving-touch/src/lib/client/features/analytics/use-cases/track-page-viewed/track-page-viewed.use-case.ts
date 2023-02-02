import { config } from '$client/constants';
import mixpanel from 'mixpanel-browser';

const META_PIXEL_EVENT_NAME = 'PageView';
const MIXPANEL_EVENT_NAME = 'page_viewed';
const PLAUSIBLE_EVENT_NAME = 'pageView';

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

export const trackPageViewedUseCase = () => {
  INTEGRATIONS.filter((p) => p.enabled).forEach(({ handler }) => handler());
};
