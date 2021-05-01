import React from 'react';
import dynamic from 'next/dynamic';

import { Wrapper } from './styled/Wrapper';
import { CanvasWrapper } from './styled/CanvasWrapper';
import { Head } from 'utils/seo/Head';

const GravityObjects = dynamic(
  () => import('./components/StackTower/StackTower'),
  { ssr: false },
);

interface Props {}

export default function StackTowerPage(props: Props) {
  return (
    <>
      <Head
        shouldIndex={true}
        description="Online stack game made with three.js"
        ogImage={{ url: 'https://threejs-projects.vercel.app/888.jpg' }}
        ogType="website"
        title="Stack game"
      />
      <Wrapper>
        <CanvasWrapper>
          <GravityObjects />
        </CanvasWrapper>
      </Wrapper>
    </>
  );
}
