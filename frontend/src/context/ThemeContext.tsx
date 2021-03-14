import React, { createContext, useContext, useState } from 'react';

import {
  getInitialColorMode,
  updateCurrentVariables,
} from 'utils/theme/themesConfig';
import type { ThemeType } from 'utils/theme/themes';

type Props = {
  children: React.ReactNode;
};

type ThemeContextTypes = {
  currentTheme: ThemeType;
  setTheme: (value: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined);

export const ThemeContextProvider = React.memo<Props>(props => {
  const { children } = props;

  const [currentTheme, rawSetColorMode] = useState(getInitialColorMode);

  const setTheme = (value: ThemeType) => {
    rawSetColorMode(value);
    updateCurrentVariables({ currentTheme: value });
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
});

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error(
      'useThemeContext must be used within a ThemeContextProvider',
    );
  }
  return ctx;
};

ThemeContext.displayName = 'ThemeContext';
ThemeContextProvider.displayName = 'ThemeContextProvider';
