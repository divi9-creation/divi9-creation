import mixpanel from 'mixpanel-browser';
import type { AnalyticsTypes } from '../../types';

interface InitProps {
  organizationId: string;
  projectId: string;
  projectToken: string;
}

const initPartial =
  ({
    organizationId,
    projectId,
    projectToken,
  }: InitProps): AnalyticsTypes.Init =>
  () => {
    mixpanel.init(projectToken);
    mixpanel.identify(organizationId);

    mixpanel.people.set_once({
      $name: 'Divi9 Yoni',
    });

    mixpanel.register({
      project_id: projectId,
    });
  };

interface Props {
  organizationId: string;
  projectId: string;
  projectToken: string;
}

export const Mixpanel = (props: Props): AnalyticsTypes.Integration => {
  const { organizationId, projectId, projectToken } = props;

  return {
    init: initPartial({ organizationId, projectId, projectToken }),
  };
};
