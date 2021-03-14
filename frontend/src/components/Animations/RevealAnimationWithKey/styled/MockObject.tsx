import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const MockObject = styled(motion.div)<Props>`
  visibility: hidden;
  z-index: -1;
  opacity: 0;
  pointer-events: none;
`;
