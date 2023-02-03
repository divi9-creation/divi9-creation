import { config } from '$client/constants';
import type { AnalyticsTypes } from '../../types';
import { ScriptLoader } from '../../utils';

const getScriptUrl = (measurementId: string) =>
  `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

const initPartial =
  (measurementId: string): AnalyticsTypes.Init =>
  () => {
    window.dataLayer = window.dataLayer || [];

    window.gtag = function gtag() {
      dataLayer.push(arguments);
    };

    // @ts-ignore
    gtag('js', new Date());

    // @ts-ignore
    gtag('config', measurementId, {
      debug_mode: !config.PROD,
      send_page_view: false,
    });

    const scriptUrl = getScriptUrl(measurementId);

    ScriptLoader.load(scriptUrl, {
      id: 'google-analytics-integration',
    });
  };

interface Props {
  measurementId: string;
}

export const GoogleAnalytics = (props: Props): AnalyticsTypes.Integration => {
  const { measurementId } = props;

  return {
    init: initPartial(measurementId),
  };
};
