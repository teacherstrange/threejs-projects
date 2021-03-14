import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const NavigationNumber = styled(motion.div)<Props>`
  font-size: 5rem;
  line-height: 5rem;

  background: yellow;
  display: inline-block;
`;
