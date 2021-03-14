import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { CustomContainer } from 'components/CustomContainer/CustomContainer';
import { sharedValues } from 'utils/sharedValues';
import { Footer } from 'components/Footer/Footer';
import { Head, HeadProps } from 'utils/seo/Head';

import { Wrapper } from './styled/Wrapper';
import { InfoParagraph } from './styled/InfoParagraph';
import { RevealButton } from './styled/RevealButton';
import { ImageWrapper } from './styled/ImageWrapper';
import { SelectorWrapper } from './styled/SelectorWrapper';

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
        <CustomContainer containerSettings={sharedValues.containers.indexPage}>
          <p>{name}</p>
        </CustomContainer>
        <Footer></Footer>
      </Wrapper>
    </>
  );
}
