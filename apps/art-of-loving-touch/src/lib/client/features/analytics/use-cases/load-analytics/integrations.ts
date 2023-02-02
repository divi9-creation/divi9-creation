import { config } from '$client/constants';
import { MetaPixel, PlausibleAnalytics } from '../../integrations';
import { Mixpanel } from '../../integrations/mixpanel';
import type { AnalyticsTypes } from '../../types';

let integrations: AnalyticsTypes.Integration[] = [];

// Meta Pixel Integration
if (config.PUBLIC_META_PIXEL_ID) {
  const provider = MetaPixel({
    pixelId: config.PUBLIC_META_PIXEL_ID,
  });

  integrations = [...integrations, provider];
}

// Mixpanel Integration
if (config.PUBLIC_MIXPANEL_PROJECT_TOKEN) {
  const provider = Mixpanel({
    organizationId: config.PUBLIC_ORGANIZATION_ID,
    projectId: config.PUBLIC_PROJECT_ID,
    projectToken: config.PUBLIC_MIXPANEL_PROJECT_TOKEN,
  });

  integrations = [...integrations, provider];
}

// Plausible Analytics Integration
if (config.PUBLIC_PLAUSIBLE_DOMAIN) {
  const provider = PlausibleAnalytics({
    domain: config.PUBLIC_PLAUSIBLE_DOMAIN,
  });

  integrations = [...integrations, provider];
}

export default integrations;
