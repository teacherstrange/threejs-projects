import { THEME_VALUES, ThemeType } from './themes';

export const getInitialColorMode = (): ThemeType => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('theme-mode') as ThemeType;
  }
  return null;
};

export const switchColorsBasedOnColorMode = ({ themeValues, currentTheme }) => {
  const parsedThemeValues = JSON.parse(themeValues);

  let themeMode: ThemeType = 'primaryTheme';
  if (currentTheme) {
    themeMode = currentTheme;
    window.localStorage.setItem('theme-mode', currentTheme);
  } else {
    const persistedColorPreference = window.localStorage.getItem(
      'theme-mode',
    ) as ThemeType;

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';

    themeMode =
      hasMediaQueryPreference && mql.matches
        ? 'secondaryTheme'
        : 'primaryTheme';

    //Check if theme-mode from localStorage exists in our app
    if (parsedThemeValues[persistedColorPreference]) {
      themeMode = persistedColorPreference;
    }

    window.localStorage.setItem('theme-mode', themeMode);
  }
  const root = document.documentElement;

  root.style.setProperty('--initial-theme-mode', themeMode);

  return parsedThemeValues[themeMode].forEach(color => {
    root.style.setProperty(`--${color[0]}`, `${color[1]}`);
  });
};

export const updateCurrentVariables = ({ currentTheme }) => {
  switchColorsBasedOnColorMode({
    themeValues: JSON.stringify(THEME_VALUES),
    currentTheme: currentTheme,
  });
};
