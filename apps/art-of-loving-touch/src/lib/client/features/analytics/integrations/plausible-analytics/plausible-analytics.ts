import { config } from '$client/constants';
import type { AnalyticsTypes } from '../../types';
import { ScriptLoader } from '../../utils';

const SCRIPT_URL = config.PROD
  ? 'https://plausible.io/js/script.js'
  : 'https://plausible.io/js/script.local.manual.js';

const initPartial =
  (domain: string): AnalyticsTypes.Init =>
  () => {
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };

    ScriptLoader.load(SCRIPT_URL, {
      id: 'plausible-analytics-integration',
      dataset: [{ key: 'domain', value: domain }],
    });
  };

interface Props {
  domain: string;
}

export const PlausibleAnalytics = (
  props: Props
): AnalyticsTypes.Integration => {
  const { domain } = props;

  return {
    init: initPartial(domain),
  };
};
