import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const ErrorCode = styled(motion.p)<Props>`
  font-size: 1.5rem;
  color: ${sharedValues.colors.black};
  letter-spacing: 1px;
`;
