export const isFeatureEnabled = (
  flags: App.FeatureFlag[],
  flagName: string
) => {
  return flags
    .filter((flag) => flag.name === flagName)
    .some((flag) => flag.enabled);
};
