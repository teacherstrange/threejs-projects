export type ThemeType = keyof typeof THEMES;

interface Themes {
  primaryTheme: 'primaryTheme';
  secondaryTheme: 'secondaryTheme';
}

export const renderColor = (color: string) => {
  return `var(--${color})`;
};

export const colors = {
  background500: 'background500',
  surface500: 'surface500',
  brand500: 'brand500',
  contrast500: 'contrast500',
  smallContrast500: 'smallContrast500',
  white: 'white',
  black: 'black',
};

export const THEMES: Themes = {
  primaryTheme: 'primaryTheme',
  secondaryTheme: 'secondaryTheme',
};

export const THEME_VALUES = {
  primaryTheme: [
    [colors.background500, '#ffffff'],
    [colors.surface500, '#171717'],
    [colors.brand500, '#8518ed'],
    [colors.contrast500, '#e0e0e0'],
    [colors.smallContrast500, '#f0f0f0'],
    [colors.white, '#ffffff'],
    [colors.black, '#000000'],
  ],
  secondaryTheme: [
    [colors.background500, '#171717'],
    [colors.surface500, '#ffffff'],
    [colors.brand500, '#8518ed'],
    [colors.contrast500, '#404040'],
    [colors.smallContrast500, '#262626'],
    [colors.white, '#ffffff'],
    [colors.black, '#000000'],
  ],
};
