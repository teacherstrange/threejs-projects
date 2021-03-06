import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

import { GlobalStyles } from 'utils/styled/GlobalStyles';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import 'utils/styled/fontFace.css';
import 'focus-visible';
import FPSStats from 'react-fps-stats';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    setIsInit(true);
  }, [isInit]);

  return (
    <>
      <GlobalStyles />
      <AnimatePresence exitBeforeEnter={false}>
        <PageWrapper
          router={router}
          isInit={isInit}
          key={router.route + router.locale}
        >
          <Component router={router} {...pageProps} />
        </PageWrapper>
      </AnimatePresence>
      <FPSStats />
    </>
  );
}
