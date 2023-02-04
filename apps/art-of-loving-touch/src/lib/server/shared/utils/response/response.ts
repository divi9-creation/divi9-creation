const JSON_RESPONSE_OPTIONS: ResponseInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const SERVER_ERROR_MESSAGE =
  'An unexpected error has occured. Please try again later';

export const serialize = (dto: any) => JSON.stringify(dto);

export const json = (body?: any, options?: ResponseInit) => {
  const newOptions = Object.assign({}, JSON_RESPONSE_OPTIONS, options);
  const serializedData = serialize(body);

  return new Response(serializedData, newOptions);
};

export const invalidRequest = (errors: any) => {
  const dto = { errors };
  const serializedDto = serialize(dto);
  const options: ResponseInit = { status: 400 };

  return json(serializedDto, options);
};

export const internalError = () => {
  const dto = {
    message: SERVER_ERROR_MESSAGE,
  };
  const serializedDto = serialize(dto);
  const options: ResponseInit = { status: 500 };

  return json(serializedDto, options);
};
