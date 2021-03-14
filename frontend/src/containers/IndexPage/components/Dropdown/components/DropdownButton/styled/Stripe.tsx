import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

type StripeProps = {
  stripeOne?: boolean
  stripeTwo?: boolean
}

export const Stripe = styled(motion.div)<StripeProps>`
  width: 35%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.surface.s500};
  position: absolute;
  left: 50%;
  top: 50%;
  /* transform-origin: left center; */

  ${(props) =>
    props.stripeOne &&
    css`
      transform: rotate(90deg) translate(-50%, -50%);
    `}

  ${(props) =>
    props.stripeTwo &&
    css`
      transform: rotate(0) translate(-50%, -50%);
    `}
`

Stripe.defaultProps = {
  variants: {
    invisible: {
      rotate: 90,
      x: '-50%',
      y: '-50%',
    },
    visible: {
      rotate: 0,
      x: '-50%',
      y: '-50%',
    },
  },
  // initial: 'invisible',
  // animate: 'visible',
  // exit: 'invisible',
}
