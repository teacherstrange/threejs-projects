import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { media } from 'utils/responsive';

type DropContentProps = {
  toMeasure?: boolean;
};

export const DropContent = styled(motion.div)<DropContentProps>`
  padding: 6rem 3rem;
  background: grey;

  ${props =>
    props.toMeasure &&
    css`
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    `}
`;
