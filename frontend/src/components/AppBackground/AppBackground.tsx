import React, { memo } from 'react';

import { Wrapper } from './styled/Wrapper';
import { Background } from './styled/Background';

interface AppBackgroundProps {}

export const AppBackground = memo<AppBackgroundProps>(props => {
  return (
    <>
      <Wrapper>
        <Background />
      </Wrapper>
    </>
  );
});

AppBackground.displayName = 'AppBackground';
