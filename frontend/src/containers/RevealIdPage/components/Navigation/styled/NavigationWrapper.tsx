import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const NavigationWrapper = styled(motion.div)<Props>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: green;
`;
