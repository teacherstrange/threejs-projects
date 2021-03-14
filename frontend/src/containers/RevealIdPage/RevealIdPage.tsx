import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { CustomContainer } from 'components/CustomContainer/CustomContainer';
import { sharedValues } from 'utils/sharedValues';
import { RevealAnimationWithKey } from 'components/Animations/RevealAnimationWithKey/RevealAnimationWithKey';
import { LanguageSelector } from 'components/LanguageSelector/LanguageSelector';
import { Carousel } from 'components/Carousel/Carousel';

import { Wrapper } from './styled/Wrapper';
import { Button } from './styled/Button';
import { Spacer } from './styled/Spacer';
import { InfoParagraph } from './styled/InfoParagraph';
import { StoryNavigation } from './styled/StoryNavigation';
import { FarmerCarousel } from './styled/FarmerCarousel';

interface Props {}

export default function RevealIdPage(props: Props) {
  const router = useRouter();
  const [currentId, setCurrentId] = useState<number>(null);
  const [oldId, setOldId] = useState<number>(null);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const id = parseInt(router.query.id as string);
    setCurrentId(id);
  }, [router]);
  const navigateToNext = () => {
    setIsInit(true);
    setOldId(currentId - 1);
    router.push(`/reveal/${currentId + 1}`);
  };
  const navigateToPrevious = () => {
    setIsInit(true);
    setOldId(currentId + 1);
    router.push(`/reveal/${currentId - 1}`);
  };

  return (
    <>
      <Wrapper>
        <CustomContainer containerSettings={sharedValues.containers.normal}>
          <Spacer />
          <FarmerCarousel />
          <Spacer />
          <LanguageSelector />
          <Button onClick={navigateToPrevious}>navigate to previous</Button>
          <Button onClick={navigateToNext}>navigate to next</Button>

          {/* <StoryNavigation currentNumber={currentId} /> */}

          <RevealAnimationWithKey
            isInit={isInit}
            reverseAnimation={oldId > currentId}
            itemKey={currentId}
          >
            <InfoParagraph
              text="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus laboriosam ipsum, autem voluptate impedit qui
              exercitationem repellat, a saepe velit corporis numquam,
              consectetur quidem placeat debitis possimus. Dolore consectetur
              asperiores sed animi tempore repudiandae perspiciatis neque
              mollitia, id provident similique soluta cum nulla quisquam. A
              explicabo id molestias minima! Hic."
            />
          </RevealAnimationWithKey>
          <div style={{ width: '50%' }}>
            <RevealAnimationWithKey
              isInit={isInit}
              reverseAnimation={oldId > currentId}
              itemKey={currentId}
            >
              {currentId % 2 === 0 ? (
                <InfoParagraph text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, ea? Molestiae mollitia aliquam deleniti velit" />
              ) : (
                <InfoParagraph
                  text="Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptate odio ad quasi laborum incidunt cupiditate dolore earum
              praesentium umque!Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Porro, ea? Molestiae mollitia aliquam deleniti
              velit reprehenderit labore quae, libero facilis.Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Porro, ea?"
                />
              )}
            </RevealAnimationWithKey>
          </div>

          <Link href="/">go to main</Link>
        </CustomContainer>
      </Wrapper>
    </>
  );
}
