import { createGlobalStyle } from 'styled-components';
import { sharedValues } from 'utils/sharedValues';
import { colors, renderColor } from 'utils/theme/themes';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    text-decoration: none;
    border: 0;
    text-decoration: none;
  }

  [data-js-focus-visible] :focus:not([data-focus-visible-added]) {
    outline: none;
  }

  button,
  textarea,
  input,
  select,
  a, 
  span {
    width: initial;
    background-color: transparent;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%; 
  }

  body, html{
    overflow:hidden;
  }

  body,
  input,
  textarea,
  button {
    font-family: Open Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight:400;
    font-style:normal;
  }

  * {
    transition: background-color ${sharedValues.transitionTimes.normal};
  }

  ::selection {
    background-color: ${renderColor(colors.brand500)};
    color: ${renderColor(colors.white)};
  }

  a[href^="tel"]{
    color:inherit;
    text-decoration:none;
  }
`;
