import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';

type LabelProps = {};

export const Label = styled(motion.label)<LabelProps>`
  font-size: 2rem;
  color: 'red';
  margin-left: 6rem;
  text-transform: uppercase;
`;
