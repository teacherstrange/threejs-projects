import styled from 'styled-components';
import { motion } from 'framer-motion';
import { media } from 'utils/responsive';

type DropdownsContainerProps = {};

export const DropdownsContainer = styled(motion.div)<DropdownsContainerProps>`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;

  ${media.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;
