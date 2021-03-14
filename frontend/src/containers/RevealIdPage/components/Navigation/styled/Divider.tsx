import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Divider = styled(motion.div)<Props>`
  width: 100%;
  height: 4px;
  background-color: red;
  /* margin: 10px 0; */
`;
