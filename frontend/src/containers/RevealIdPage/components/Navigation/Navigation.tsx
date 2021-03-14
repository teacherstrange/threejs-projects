import React, { memo } from 'react';

import { RevealAnimationWithKey } from 'components/Animations/RevealAnimationWithKey/RevealAnimationWithKey';

import { Wrapper } from './styled/Wrapper';
import { NavigationNumber } from './styled/NavigationNumber';
import { NavigationWrapper } from './styled/NavigationWrapper';
import { Divider } from './styled/Divider';

interface NavigationProps {
  currentNumber: number;
}

export const Navigation = memo<NavigationProps>(props => {
  const { children, currentNumber, ...rest } = props;
  return (
    <>
      <Wrapper {...rest}>
        <NavigationWrapper>
          <RevealAnimationWithKey itemKey={currentNumber}>
            <NavigationNumber>{currentNumber}</NavigationNumber>
          </RevealAnimationWithKey>

          <Divider />
          <NavigationNumber>45</NavigationNumber>
        </NavigationWrapper>
      </Wrapper>
    </>
  );
});

Navigation.displayName = 'Navigation';
