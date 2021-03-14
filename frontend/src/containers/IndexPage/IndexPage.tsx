import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { CustomContainer } from 'components/CustomContainer/CustomContainer';
import { sharedValues } from 'utils/sharedValues';
import { Footer } from 'components/Footer/Footer';
import { Head, HeadProps } from 'utils/seo/Head';
import { PreloadImage } from 'components/PreloadImage/PreloadImage';
import { LanguageSelector } from 'components/LanguageSelector/LanguageSelector';
import { ThemeSelector } from 'components/ThemeSelector/ThemeSelector';
import { SlideIn } from 'components/Animations/SlideIn/SlideIn';
import { ParallaxScroll } from 'components/Animations/ParallaxScroll/ParallaxScroll';
import { Parallax } from 'components/Animations/Parallax/Parallax';
import { RevealString } from 'components/Animations/RevealString/RevealString';
import { ButterflyString } from 'components/Animations/ButterflyString/ButterflyString';
import { RevealButterflyString } from 'components/Animations/RevealButterflyString/RevealButterflyString';

import { Wrapper } from './styled/Wrapper';
import { InfoParagraph } from './styled/InfoParagraph';
import { RevealButton } from './styled/RevealButton';
import { ImageWrapper } from './styled/ImageWrapper';
import { SelectorWrapper } from './styled/SelectorWrapper';

interface Props {
  head: HeadProps;
  name: string;
  heading: string;
  infoParagraph: string;
}

export default function IndexPage(props: Props) {
  const { head, name, heading, infoParagraph } = props;

  const themeContainerRef = React.useRef(null);
  // console.log(scrollYProgress);
  return (
    <>
      <Head {...head} />
      <Wrapper>
        <CustomContainer containerSettings={sharedValues.containers.indexPage}>
          <SelectorWrapper ref={themeContainerRef}>
            <Parallax
              refElement={themeContainerRef}
              offsetXMultiplier={0.08}
              offsetYMultiplier={0.08}
              shouldResetPosition
            >
              <ThemeSelector />
            </Parallax>
          </SelectorWrapper>

          <div
            style={{
              display: 'flex',
              fontSize: 65,
              fontWeight: 800,
            }}
          >
            <RevealButterflyString
              text={
                'Prosty temu zachowamy strukturę ciasta i po upieczeniu będzie ładnie wyrośnięte.'
              }
            />
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 25,
              fontWeight: 800,
            }}
          >
            <RevealString
              text={
                'i po i po strukturę cest computer of Times, and the best Arithmetician that euer [sic] breathed, and he reduceth thy dayes into a short number." This usage of the term referred'
              }
            />
          </div>

          <div
            style={{
              marginTop: 40,
              justifyContent: 'center',
              display: 'flex',
              fontSize: 90,
              fontWeight: 800,
            }}
          >
            <ButterflyString text={'Butterfly str'} />
          </div>

          <div style={{ height: 40 }}></div>

          <SlideIn dontUseObserver>
            <ImageWrapper>
              <PreloadImage imageSrc={head.ogImage.url}>
                <img
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src={head.ogImage.url}
                  alt=""
                />
              </PreloadImage>
            </ImageWrapper>
          </SlideIn>

          <SlideIn dontUseObserver reverse slideDirection="x">
            <Link href="/infinite-timeline" passHref>
              <RevealButton renderAs="a">infinite-timeline</RevealButton>
            </Link>
          </SlideIn>

          <LanguageSelector />

          <SlideIn reverse slideDirection="x">
            <Link href="/timeline" passHref>
              <RevealButton renderAs="a">timeline</RevealButton>
            </Link>
          </SlideIn>

          <p style={{ fontSize: 20 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
            dicta ducimus neque libero nostrum maiores quaerat dolore ut
            repudiandae, numquam hic recusandae unde, aliquam consectetur earum
            quam molestiae perspiciatis odio? Commodi deserunt, explicabo ipsa
            eaque, dicta ex voluptatum eligendi unde nisi dolorum quis ratione
            pariatur aperiam nostrum suscipit inventore repellendus a delectus
            possimus odit. Eligendi illo nihil at tempora eum dolorum odio
            officiis, inventore molestias quidem asperiores libero accusantium
            quaerat fugiat ratione sit error ducimus iure eos consectetur amet
            nemo! Beatae corrupti animi architecto neque labore repudiandae
            quisquam, quidem ab possimus sequi optio ipsam iure laudantium sed
            doloribus, molestias mollitia!
          </p>

          <ParallaxScroll speed={-0.5}>
            <motion.p
              style={{
                fontSize: 15,
                color: 'white',
                backgroundColor: 'red',
              }}
            >
              siemaLorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reiciendis dicta dundis dicta ducimus neque libero nostrum maiores
              quaerat dolore ut repudiandae, numquam hic recusandae unde,
              aliquam consectetur earum quam molestiae perspiciatis odio?
              Commodindis dicta ducimus neque libero nostrum maiores quaerat
              dolore ut repudiandae, numquam hic recusandae unde, aliquam
              consectetur earum quam molestiae perspiciatis odio? Commodindis
              dicta ducimus neque libero nostrum maiores quaerat dolore ut
              repudiandae, numquam hic recusandae unde, aliquam consectetur
              earum quam molestiae perspiciatis odio? Commodindis dicta ducimus
              neque libero nostrum maiores quaerat dolore ut repudiandae,
              numquam hic recusandae unde, aliquam consectetur earum quam
              molestiae perspiciatis odio? Commodindis dicta ducimus neque
              libero nostrum maiores quaerat dolore ut repudiandae, numquam hic
              recusandae unde, aliquam consectetur earum quam molestiae
              perspiciatis odio? Commodicimus neque libero nostrum maiores
              quaerat dolore ut repudiandae, numquam hic recusandae unde,
              aliquam consectetur earum quam molestiae perspiciatis odio?
              Commodi
            </motion.p>
          </ParallaxScroll>

          <Parallax shouldResetPosition>
            <p style={{ fontSize: 20 }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reiciendis dicta ducimus neque libero nostrum maiores quaerat
              dolore ut repudiandae, numquam hic recusandae unde, aliquam
              consectetur earum quam molestiae perspiciatis odio? Commodi
              deserunt, explicabo ipsa eaque, dicta ex voluptatum eligendi unde
              nisi dolorum quis ratione pariatur aperiam nostrum suscipit
              inventore repellendus a delectus possimus odit. Eligendi illo
              nihil at tempora eum dolorum odio officiis, inventore molestias
              quidem asperiores libero accusantium quaerat fugiat ratione sit
              error ducimus iure eos consectetur amet nemo! Beatae corrupti
              animi architecto neque labore repudiandae quisquam, quidem ab
              possimus sequi optio ipsam iure laudantium sed doloribus,
              molestias mollitia!
            </p>
          </Parallax>
          <ParallaxScroll speed={-0.2}>
            <Link href="/reveal/10" passHref>
              <RevealButton renderAs="a">panel</RevealButton>
            </Link>
          </ParallaxScroll>

          <div
            style={{
              width: '100%',
              height: 300,
              backgroundColor: 'red',
              position: 'relative',
            }}
          >
            <ParallaxScroll>
              <SlideIn slideSize="-40vh">
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 2.2,
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    width: 100,
                    height: 100,
                    backgroundColor: 'yellow',
                  }}
                ></div>
              </SlideIn>
            </ParallaxScroll>
          </div>

          <p style={{ fontSize: 20 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
            dicta ducimus neque libero nostrum maiores quaerat dolore ut
            repudiandae, numquam hic recusandae unde, aliquam consectetur earum
            quam molestiae perspiciatis odio? Commodi deserunt, explicabo ipsa
            eaque, dicta ex voluptatum eligendi unde nisi dolorum quis ratione
            pariatur aperiam nostrum suscipit inventore repellendus a delectus
            possimus odit. Eligendi illo nihil at tempora eum dolorum odio
            officiis, inventore molestias quidem asperiores libero accusantium
            quaerat fugiat ratione sit error ducimus iure eos consectetur amet
            nemo! Beatae corrupti animi architecto neque labore repudiandae
            quisquam, quidem ab possimus sequi optio ipsam iure laudantium sed
            doloribus, molestias mollitia!
          </p>

          <p style={{ fontSize: 20 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
            dicta ducimus neque libero nostrum maiores quaerat dolore ut
            repudiandae, numquam hic recusandae unde, aliquam consectetur earum
            quam molestiae perspiciatis odio? Commodi deserunt, explicabo ipsa
            eaque, dicta ex voluptatum eligendi unde nisi dolorum quis ratione
            pariatur aperiam nostrum suscipit inventore repellendus a delectus
            possimus odit. Eligendi illo nihil at tempora eum dolorum odio
            officiis, inventore molestias quidem asperiores libero accusantium
            quaerat fugiat ratione sit error ducimus iure eos consectetur amet
            nemo! Beatae corrupti animi architecto neque labore repudiandae
            quisquam, quidem ab possimus sequi optio ipsam iure laudantium sed
            doloribus, molestias mollitia!
          </p>

          <Link href="/reveal/10" passHref>
            <RevealButton renderAs="a">panel</RevealButton>
          </Link>

          <p style={{ fontSize: 20 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
            dicta ducimus neque libero nostrum maiores quaerat dolore ut
            repudiandae, numquam hic recusandae unde, aliquam consectetur earum
            quam molestiae perspiciatis odio? Commodi deserunt, explicabo ipsa
            eaque, dicta ex voluptatum eligendi unde nisi dolorum quis ratione
            pariatur aperiam nostrum suscipit inventore repellendus a delectus
            possimus odit. Eligendi illo nihil at tempora eum dolorum odio
            officiis, inventore molestias quidem asperiores libero accusantium
            quaerat fugiat ratione sit error ducimus iure eos consectetur amet
            nemo! Beatae corrupti animi architecto neque labore repudiandae
            quisquam, quidem ab possimus sequi optio ipsam iure laudantium sed
            doloribus, molestias mollitia!
          </p>

          <Link href="/reveal/10" passHref>
            <RevealButton renderAs="a">panel</RevealButton>
          </Link>

          <p style={{ fontSize: 20 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
            dicta ducimus neque libero nostrum maiores quaerat dolore ut
            repudiandae, numquam hic recusandae unde, aliquam consectetur earum
            quam molestiae perspiciatis odio? Commodi deserunt, explicabo ipsa
            eaque, dicta ex voluptatum eligendi unde nisi dolorum quis ratione
            pariatur aperiam nostrum suscipit inventore repellendus a delectus
            possimus odit. Eligendi illo nihil at tempora eum dolorum odio
            officiis, inventore molestias quidem asperiores libero accusantium
            quaerat fugiat ratione sit error ducimus iure eos consectetur amet
            nemo! Beatae corrupti animi architecto neque labore repudiandae
            quisquam, quidem ab possimus sequi optio ipsam iure laudantium sed
            doloribus, molestias mollitia!
          </p>

          <Link href="/reveal/10" passHref>
            <RevealButton renderAs="a">panel</RevealButton>
          </Link>

          <InfoParagraph text={infoParagraph} />
        </CustomContainer>
        <Footer></Footer>
      </Wrapper>
    </>
  );
}
