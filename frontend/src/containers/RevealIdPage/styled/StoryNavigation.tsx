import styled from 'styled-components';
import { motion } from 'framer-motion';

import { Navigation } from '../components/Navigation/Navigation';

interface Props {}

export const StoryNavigation = styled(Navigation)<Props>`
  background: red;
  position: fixed;
  display: inline-block;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
`;
