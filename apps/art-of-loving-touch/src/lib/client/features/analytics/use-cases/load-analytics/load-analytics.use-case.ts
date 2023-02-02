import integrations from './integrations';

export const loadAnalyticsUseCase = () => {
  integrations.forEach((integration) => {
    integration.init();
  });
};
