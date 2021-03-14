import React, { memo, forwardRef } from 'react';

import { Wrapper } from './styled/Wrapper';

interface CarouselFarmerProps {
  num: number;
}

export const CarouselFarmer = memo(
  forwardRef((props: CarouselFarmerProps, ref: React.Ref<HTMLDivElement>) => {
    const { num } = props;
    return (
      <>
        <Wrapper
          ref={ref}
          style={{ height: `${num * 150}px`, backgroundColor: 'darkgreen' }}
        >
          <p>Number :{num}</p>
        </Wrapper>
      </>
    );
  }),
);

CarouselFarmer.displayName = 'CarouselFarmer';
