import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Label = styled(motion.h2)<Props>`
  font-size: 20px;
  position: fixed;
  left: 50%;
  top: 20px;
  font-weight: 400;
  letter-spacing: 6px;
  text-transform: uppercase;
  transform: translateX(-50%);
  z-index: 20;
  color: black;
`;
