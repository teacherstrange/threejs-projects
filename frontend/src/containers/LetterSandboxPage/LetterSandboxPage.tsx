import React from 'react';

import { CustomContainer } from 'components/CustomContainer/CustomContainer';
import { sharedValues } from 'utils/sharedValues';

import { Wrapper } from './styled/Wrapper';

interface Props {}

export default function LetterSandboxPage(props: Props) {
  return (
    <>
      <Wrapper>
        <CustomContainer containerSettings={sharedValues.containers.normal}>
          <h1>adasdoid</h1>
          <p>Privacy policy</p>
        </CustomContainer>
      </Wrapper>
    </>
  );
}
