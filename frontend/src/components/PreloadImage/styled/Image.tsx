import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Image = styled(motion.img)<Props>`
  width: 0;
  height: 0;
  position: absolute;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
`;
