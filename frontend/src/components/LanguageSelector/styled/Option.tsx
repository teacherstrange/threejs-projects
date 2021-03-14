import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';
import { colors, renderColor } from 'utils/theme/themes';

interface Props {
  isActive: boolean;
}

export const Option = styled(motion.button)<Props>`
  ${sharedValues.text.normal};
  cursor: pointer;

  padding: 0.5rem 1.5rem;
  background-color: ${renderColor(colors.contrast500)};
  border-radius: 5px;

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;
