import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  color: ${sharedValues.colors.white}; //set default color to all text
`;
