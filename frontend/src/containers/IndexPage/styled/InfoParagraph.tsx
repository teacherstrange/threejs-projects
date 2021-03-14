import styled from 'styled-components';
import { rgba, cssVar } from 'polished';

import { RichText } from 'components/RichText/RichText';
import { colors, renderColor } from 'utils/theme/themes';

interface Props {}

export const InfoParagraph = styled(RichText)<Props>`
  color: black;
  background: ${renderColor(colors.contrast500)};

  :lang(en-US) {
    background: red;
  }
  :lang(pl) {
    background: yellow;
  }
`;
