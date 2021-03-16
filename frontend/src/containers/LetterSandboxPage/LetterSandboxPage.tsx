import React from 'react';

import { CustomContainer } from 'components/CustomContainer/CustomContainer';
import { sharedValues } from 'utils/sharedValues';

import { LetterSandbox } from './components/LetterSandbox/LetterSandbox';
import { Wrapper } from './styled/Wrapper';
import { CanvasWrapper } from './styled/CanvasWrapper';

interface Props {}

export default function LetterSandboxPage(props: Props) {
  const onItemClick = () => {
    console.log('item clicked :D');
  };

  return (
    <>
      <Wrapper>
        <CustomContainer containerSettings={sharedValues.containers.normal}>
          <CanvasWrapper>
            <LetterSandbox onItemClick={onItemClick} />
          </CanvasWrapper>
        </CustomContainer>
      </Wrapper>
    </>
  );
}
