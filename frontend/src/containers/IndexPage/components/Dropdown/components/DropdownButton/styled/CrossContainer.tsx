import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springQuick } from 'components/Animations/framerTransitions';

type CrossContainerProps = {};

export const CrossContainer = styled(motion.div)<CrossContainerProps>`
  background-color: 'red';
  height: 6rem;
  width: 6rem;
  margin-left: auto;
  position: relative;
  border-radius: 50%;
`;

CrossContainer.defaultProps = {
  variants: {
    invisible: {
      rotate: 90,
    },
    visible: {
      rotate: 0,
    },
  },
  initial: 'invisible',
  animate: 'visible',
  exit: 'invisible',
  transition: {
    ...springQuick,
    delayChildren: 0.2,
  },
};
