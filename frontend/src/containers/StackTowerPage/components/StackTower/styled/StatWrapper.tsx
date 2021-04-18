import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const StatWrapper = styled(motion.div)<Props>`
  position: absolute;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 100px;
  height: 100px;
`;
