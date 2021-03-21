import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { RevealString } from 'components/Animations/RevealString/RevealString';

// import { GravityObjects } from './components/GravityObjects/GravityObjects';
import { Wrapper } from './styled/Wrapper';
import { CanvasWrapper } from './styled/CanvasWrapper';
import { Label } from './styled/Label';

const GravityObjects = dynamic(
  () => import('./components/GravityObjects/GravityObjects'),
  { ssr: false },
);

interface Props {}

export default function GravityObjectsPage(props: Props) {
  const onItemClick = () => {
    console.log('item clicked :D');
  };

  return (
    <>
      <Wrapper>
        <Label>
          <RevealString text={'drag the objects'} />
        </Label>

        <CanvasWrapper>
          <GravityObjects onItemClick={onItemClick} />
        </CanvasWrapper>

        <Link href="/letter-sandbox">dsaf</Link>
      </Wrapper>
    </>
  );
}
