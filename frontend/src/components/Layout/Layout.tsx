import React, { memo } from 'react';

import { CookieInfo } from 'components/CookieInfo/CookieInfo';
import { CursorCircle } from 'components/CursorCircle/CursorCircle';
import { AppBackground } from 'components/AppBackground/AppBackground';

interface LayoutProps {}

export const Layout = memo<LayoutProps>(props => {
  return (
    <>
      {/* <CursorCircle /> */}
      <CookieInfo />
      <AppBackground />
    </>
  );
});

Layout.displayName = 'Layout';
