import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const CanvasWrapper = styled(motion.div)<Props>`
  height: 400px;
  position: relative;
  border: 2px solid red;
`;
