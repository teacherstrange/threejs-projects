import React from 'react';
import Link from 'next/link';

import { CustomContainer } from 'components/CustomContainer/CustomContainer';
import { sharedValues } from 'utils/sharedValues';
import { Head, HeadProps } from 'utils/seo/Head';

import { Wrapper } from './styled/Wrapper';
interface Props {
  head: HeadProps;
  name: string;
}

export default function IndexPage(props: Props) {
  const { head, name } = props;

  return (
    <>
      <Head {...head} />
      <Wrapper>
        <CustomContainer containerSettings={sharedValues.containers.normal}>
          <p>{name}</p>
          <Link passHref href="/letter-sandbox">
            <a>Go to letter sandbox</a>
          </Link>
        </CustomContainer>
      </Wrapper>
    </>
  );
}
