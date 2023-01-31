import { either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { getResourceUseCase } from './get-resource.use-case';

type GetResourceRequest = {
  id: string;
};

export const getResourceApi = async (request: GetResourceRequest) => {
  const query = {
    id: request.id,
  };

  const result = await getResourceUseCase(query)();

  return pipe(
    result,
    either.fold(
      (error) => ({
        status: 500,
        data: error.message,
      }),
      (resources) => ({
        status: 200,
        data: resources,
      })
    )
  );
};
