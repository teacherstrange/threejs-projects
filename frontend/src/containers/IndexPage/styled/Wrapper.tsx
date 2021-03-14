import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>``;

Wrapper.defaultProps = {
  variants: {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 1,
    },
  },
  transition: {
    staggerChildren: 0.2,
  },
};
