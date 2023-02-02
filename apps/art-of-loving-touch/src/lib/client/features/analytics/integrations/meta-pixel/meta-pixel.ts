import type { AnalyticsTypes } from '../../types';
import { ScriptLoader } from '../../utils';

const initPartial =
  (pixelId: string): AnalyticsTypes.Init =>
  () => {
    if (window.fbq) return;

    window._fbq = function () {
      window.fbq.callMethod
        ? window.fbq.callMethod.apply(window.fbq, arguments)
        : window.fbq.queue.push(arguments);
    };

    window.fbq = window.fbq || window._fbq;
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    window.fbq.queue = [];

    window.fbq('init', pixelId);

    ScriptLoader.load('https://connect.facebook.net/en_US/fbevents.js', {
      id: 'meta-pixel-integration',
    });
  };

interface Props {
  pixelId: string;
}

export const MetaPixel = (props: Props): AnalyticsTypes.Integration => {
  const { pixelId } = props;

  return {
    init: initPartial(pixelId),
  };
};
