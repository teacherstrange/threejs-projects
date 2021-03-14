import styled from 'styled-components';
import { motion } from 'framer-motion';
import { media } from 'utils/responsive';

type DropWrapperProps = {};

export const DropWrapper = styled(motion.div)<DropWrapperProps>`
  width: 100%;
`;
