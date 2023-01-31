import { config } from '$client/constants';
import mixpanel from 'mixpanel-browser';
import { onMount } from 'svelte';

export const useMixpanel = () => {
  onMount(() => {
    mixpanel.init(config.PUBLIC_MIXPANEL_PROJECT_TOKEN);
    mixpanel.identify(config.PUBLIC_ORGANIZATION_ID);

    mixpanel.people.set_once({
      $name: 'Divi9 Yoni',
    });

    mixpanel.register({
      project_id: config.PUBLIC_PROJECT_ID,
    });
  });
};
