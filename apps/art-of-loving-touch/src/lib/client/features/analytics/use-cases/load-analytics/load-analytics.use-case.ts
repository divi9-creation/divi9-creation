import { config } from '$client/constants';
import {
  GoogleAnalytics,
  MetaPixel,
  Mixpanel,
  PlausibleAnalytics,
} from '../../integrations';
import type { AnalyticsTypes } from '../../types';

let integrations: AnalyticsTypes.Integration[] = [];

const {
  PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID,
  PUBLIC_META_PIXEL_ID,
  PUBLIC_MIXPANEL_PROJECT_TOKEN,
  PUBLIC_PLAUSIBLE_DOMAIN,
} = config;

// Google Analytics Integration
if (PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID) {
  const provider = GoogleAnalytics({
    measurementId: PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID,
  });

  integrations = [...integrations, provider];
}

// Meta Pixel Integration
if (PUBLIC_META_PIXEL_ID) {
  const provider = MetaPixel({
    pixelId: PUBLIC_META_PIXEL_ID,
  });

  integrations = [...integrations, provider];
}

// Mixpanel Integration
if (PUBLIC_MIXPANEL_PROJECT_TOKEN) {
  const provider = Mixpanel({
    organizationId: config.PUBLIC_ORGANIZATION_ID,
    projectId: config.PUBLIC_PROJECT_ID,
    projectToken: PUBLIC_MIXPANEL_PROJECT_TOKEN,
  });

  integrations = [...integrations, provider];
}

// Plausible Analytics Integration
if (PUBLIC_PLAUSIBLE_DOMAIN) {
  const provider = PlausibleAnalytics({
    domain: PUBLIC_PLAUSIBLE_DOMAIN,
  });

  integrations = [...integrations, provider];
}
export const loadAnalyticsUseCase = () => {
  integrations.forEach((integration) => {
    integration.init();
  });
};
