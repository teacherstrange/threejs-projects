import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Container = styled(motion.div)<Props>`
  position: relative;
  overflow: hidden;
  width: 100%;
`;
