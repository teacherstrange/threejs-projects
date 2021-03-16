import React from 'react';

import { CustomContainer } from 'components/CustomContainer/CustomContainer';
import { sharedValues } from 'utils/sharedValues';
import { RevealString } from 'components/Animations/RevealString/RevealString';

import { LetterSandbox } from './components/LetterSandbox/LetterSandbox';
import { Wrapper } from './styled/Wrapper';
import { CanvasWrapper } from './styled/CanvasWrapper';
import { Label } from './styled/Label';

interface Props {}

export default function LetterSandboxPage(props: Props) {
  const onItemClick = () => {
    console.log('item clicked :D');
  };

  return (
    <>
      <Wrapper>
        <Label>
          <RevealString text={'smash your keyboard'} />
        </Label>
        {/* <CustomContainer containerSettings={sharedValues.containers.normal}> */}
        <CanvasWrapper>
          <LetterSandbox onItemClick={onItemClick} />
        </CanvasWrapper>
        {/* </CustomContainer> */}
      </Wrapper>
    </>
  );
}
