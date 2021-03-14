import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';

type ButtonProps = {};

export const Button = styled(motion.button)<ButtonProps>`
  background-color: 'red';
  font-size: 2rem;
  width: 100%;
  cursor: pointer;
  position: relative;

  display: flex;
  align-items: center;

  &::before {
    content: '';
    display: block;
    position: absolute;
    background-color: white;
    right: 6rem;
    bottom: 0;
    height: 100%;
    width: 1px;
    z-index: 1;
  }
`;
