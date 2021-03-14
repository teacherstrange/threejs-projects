import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springMedium } from 'components/Animations/framerTransitions';

type DropContentWrapperProps = {};

export const DropContentWrapper = styled(motion.div)<DropContentWrapperProps>`
  overflow: hidden;
`;

DropContentWrapper.defaultProps = {
  initial: 'invisible',
  animate: 'visible',
  exit: 'invisible',
  transition: {
    ...springMedium,
  },
};
