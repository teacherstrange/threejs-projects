import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

import { sliceSlash } from 'utils/functions/sliceSlash';

const uri =
  process.env.NODE_ENV === 'development'
    ? sliceSlash(process.env.NEXT_PUBLIC_CMS_GRAPHQL_URL_LOCAL)
    : sliceSlash(process.env.NEXT_PUBLIC_CMS_GRAPHQL_URL_PROD);

export const cmsApiClient = new ApolloClient({
  uri,
  fetch,
});
