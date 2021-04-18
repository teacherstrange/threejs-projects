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
          <h1>{head.title}</h1>
          <h1>{head.title}</h1>
          <Link passHref href="/letter-sandbox">
            <a>Go to letter sandbox</a>
          </Link>
          <div></div>
          <Link passHref href="/gravity-objects">
            <a> gravity-objects</a>
          </Link>
          <div></div>
          <Link passHref href="/stack-tower">
            <a> stack tower</a>
          </Link>
        </CustomContainer>
      </Wrapper>
    </>
  );
}
