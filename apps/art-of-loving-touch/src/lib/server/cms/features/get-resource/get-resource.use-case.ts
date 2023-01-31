import { taskEither as TE } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { gql, GraphQLClient } from 'graphql-request';

const API_KEY = import.meta.env.HYPERGRAPH_API_KEY;
const API_ENDPOINT = import.meta.env.HYPERGRAPH_API_URL;

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

const hypergraph = new GraphQLClient(API_ENDPOINT, options);

const GET_RESOURCE_QUERY = gql`
  query GetResourceById($id: ID!) {
    resource(where: { id: $id }) {
      callToAction
      id
      image {
        altText: fileName
        url
      }
      name
      subheadline
      summary
      slug
      url
      benefits {
        html
      }
    }
  }
`;

type GetResourceQuery = {
  id: string;
};

export const getResourceUseCase = (query: GetResourceQuery) => {
  const variables = {
    id: query.id,
  };

  const result = pipe(
    TE.tryCatch(
      () => hypergraph.request(GET_RESOURCE_QUERY, variables),
      (error) => new Error(`${error}`)
    ),
    TE.map((data) => {
      const { resource } = data;
      const { benefits, image, ...rest } = resource;

      const newBenefits = benefits.html;

      const newImage = {
        altText: image.altText,
        url: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80',
      };

      const newResource = {
        ...rest,
        benefits: newBenefits,
        image: newImage,
      };

      return newResource;
    })
  );

  return result;
};
