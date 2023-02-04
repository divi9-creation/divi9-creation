import { FeatureFlagsRecord, xata } from '$server/shared';
import { taskEither } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';

const mapFeatureFlags = (records: FeatureFlagsRecord[]): App.FeatureFlag[] => {
  return records.map((record) => {
    return {
      enabled: !!record.enabled,
      name: record.name!,
    };
  });
};

export const listFeatureFlagsUseCase = () => {
  return pipe(
    taskEither.tryCatch(
      () => xata.db.feature_flags.getAll(),
      (error) => new Error(`${error}`)
    ),
    taskEither.map(mapFeatureFlags)
  );
};
