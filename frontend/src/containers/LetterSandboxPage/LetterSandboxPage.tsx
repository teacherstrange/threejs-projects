import React from 'react';

import { CustomContainer } from 'components/CustomContainer/CustomContainer';
import { sharedValues } from 'utils/sharedValues';

import { LetterSandbox } from './components/LetterSandbox/LetterSandbox';
import { Wrapper } from './styled/Wrapper';
import { CanvasWrapper } from './styled/CanvasWrapper';

interface Props {}

export default function LetterSandboxPage(props: Props) {
  return (
    <>
      <Wrapper>
        <CustomContainer containerSettings={sharedValues.containers.normal}>
          <CanvasWrapper>
            <LetterSandbox />
          </CanvasWrapper>
        </CustomContainer>
      </Wrapper>
    </>
  );
}
