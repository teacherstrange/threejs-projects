import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

import { Image } from './styled/Image';
import { ImageWrapper } from './styled/ImageWrapper';

interface PreloadImageProps {
  imageSrc: string;
  children: React.ReactNode;
}

export const PreloadImage = React.memo<PreloadImageProps>(props => {
  const { children, imageSrc } = props;
  const imgEl = React.useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const onImageLoaded = () => {
    setIsLoaded(true);
  };

  React.useEffect(() => {
    const imgElCurrent = imgEl.current;

    if (imgElCurrent.complete) {
      onImageLoaded();
    }

    imgElCurrent.addEventListener('load', onImageLoaded);
    return () => imgElCurrent.removeEventListener('load', onImageLoaded);
  }, []);

  return (
    <>
      <Image ref={imgEl} src={imageSrc} />
      <AnimatePresence>
        {isLoaded && (
          <ImageWrapper>{React.Children.toArray(children)}</ImageWrapper>
        )}
      </AnimatePresence>
    </>
  );
});

PreloadImage.displayName = 'PreloadImage';
