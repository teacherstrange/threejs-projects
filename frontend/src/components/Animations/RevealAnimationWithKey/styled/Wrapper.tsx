import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

Wrapper.defaultProps = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
};
