import styled from 'styled-components';
import { motion } from 'framer-motion';

import { colors, renderColor } from 'utils/theme/themes';

interface Props {}

export const FooterContainer = styled(motion.footer)<Props>`
  width: 100%;
  background-color: ${renderColor(colors.contrast500)};
`;
