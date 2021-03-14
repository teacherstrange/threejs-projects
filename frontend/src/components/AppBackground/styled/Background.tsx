import styled from 'styled-components';
import { motion } from 'framer-motion';

import { colors, renderColor } from 'utils/theme/themes';

interface Props {}

export const Background = styled(motion.div)<Props>`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  background-color: ${renderColor(colors.background500)};
  width: 100%;
  height: 100%;
`;
