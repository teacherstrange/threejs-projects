import styled from 'styled-components';
import { motion } from 'framer-motion';

import { colors, renderColor } from 'utils/theme/themes';

interface Props {}

export const Circle = styled(motion.div)<Props>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  z-index: 200;
  pointer-events: none;
  background-color: white;
`;
