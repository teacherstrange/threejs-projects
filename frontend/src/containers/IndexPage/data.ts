import { GetStaticProps } from 'next';
import { gql } from 'apollo-boost';

import { cmsApiClient } from 'utils/functions/getCmsApiClient';
import { ISR_TIMEOUT } from 'utils/functions/getIsrTimeout';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const response = await cmsApiClient.query({
    query: gql`
      {
        indexPages(where: { language: { code: "${locale}" } }) {
          head {
            title,
            description,
            ogType,
            ogImage {
              url
            },
            shouldIndex
          },
          name
          heading
          infoParagraph
        }
      }
    `,
  });

  return {
    props: {
      ...response.data.indexPages[0],
    },
    revalidate: ISR_TIMEOUT,
  };
};
