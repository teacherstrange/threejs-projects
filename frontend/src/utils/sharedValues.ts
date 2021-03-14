import { rgba } from 'polished';

// :lang(en-US) {
//   background: red;
// }
// :lang(pl) {
//   background: yellow;
// }

export const sharedValues = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    brand: '#8518ed',
  },
  transitionTimes: {
    normal: '0.45s',
    blobButton: '0.8s',
  },

  boxShadow: {
    normal: `0 0 20px ${rgba(0, 0, 0, 0.2)}`,
  },
  borderRadius: {
    round: '15rem',
    normal: '5px',
  },
  containers: {
    normal: {
      maxWidth: 1420,
      referenceWidth: 1620,
      mobilePadding: 28,
      get breakpoint() {
        return this.referenceWidth;
      },
    },
  },
  modals: {
    small: {
      maxWidth: 450,
      padding: 40,
      margin: 15,
    },
  },
};
