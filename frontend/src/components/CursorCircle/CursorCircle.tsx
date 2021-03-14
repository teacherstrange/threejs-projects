import React, { memo } from 'react';

import { Parallax } from 'components/Animations/Parallax/Parallax';

import { Wrapper } from './styled/Wrapper';
import { Circle } from './styled/Circle';

interface CursorCircleProps {}

export const CursorCircle = memo<CursorCircleProps>(props => {
  return (
    <>
      <Wrapper>
        <Parallax offsetXMultiplier={-1} offsetYMultiplier={-1}>
          <Circle />
        </Parallax>
      </Wrapper>
    </>
  );
});

CursorCircle.displayName = 'CursorCircle';
