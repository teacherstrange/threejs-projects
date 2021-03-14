import styled from 'styled-components';
import { motion } from 'framer-motion';

import { colors, renderColor } from 'utils/theme/themes';

interface Props {}

export const ImageWrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 20vw;
  background: ${renderColor(colors.smallContrast500)};
  overflow: hidden;
  margin-bottom: 50px;
`;
