import styled from 'styled-components';
import { motion } from 'framer-motion';

import { colors, renderColor } from 'utils/theme/themes';

import { rgba } from 'polished';

interface Props {}

export const SelectorWrapper = styled(motion.div)<Props>`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 50px;
  background: ${renderColor(colors.contrast500)};
  border-radius: 5px;
  box-shadow: 0 0 5rem ${rgba('black', 0.1)};
  margin: 50px 0;
`;
