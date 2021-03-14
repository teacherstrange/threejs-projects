import styled from 'styled-components';
import { motion } from 'framer-motion';

import { colors, renderColor } from 'utils/theme/themes';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  color: ${renderColor(colors.surface500)}; //set default color to all text
`;
