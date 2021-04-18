import React from 'react';

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

        <CanvasWrapper>
          <LetterSandbox onItemClick={onItemClick} />
        </CanvasWrapper>
      </Wrapper>
    </>
  );
}
