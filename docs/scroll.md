import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import debounce from 'lodash.debounce'
import { useMotionValue, useTransform, useSpring } from 'framer-motion'
import normalizeWheel from 'normalize-wheel'

import { MediaProps } from 'types/Media'
import { LookbookItemProps } from 'components/LookbookItem/types'
import { Background } from 'components/Background/Background'
import useDisableScroll from 'u9/hooks/useDisableScroll'

import Wrapper from './styled/Wrapper'
import Header from './styled/Header'
import LookbookItem from './styled/LookbookItem'
import { ContentWrapper } from './styled/ContentWrapper'
import { SCROLL_MODE_HORIZONTAL, SCROLL_MODE_VERTICAL } from './constants'
import { breakpoints } from 'utils/responsive'

interface Props {
  title: string
  aboutTabLabel: string
  onCourtTabLabel: string
  offCourtTabLabel: string
  aboutHeading: string
  aboutParagraph: string
  aboutImage1: MediaProps
  aboutImage2: MediaProps
  onCourtHeading: string
  onCourtParagraph: string
  offCourtHeading: string
  offCourtParagraph: string
  onCourtItems: LookbookItemProps[]
  offCourtItems: LookbookItemProps[]
}

const LookbookPage: FunctionComponent<Props> = ({
  title,
  aboutTabLabel,
  onCourtTabLabel,
  offCourtTabLabel,
  aboutHeading,
  aboutParagraph,
  aboutImage1,
  aboutImage2,
  onCourtHeading,
  onCourtParagraph,
  offCourtHeading,
  offCourtParagraph,
  onCourtItems,
  offCourtItems,
  ...restProps
}) => {
  useDisableScroll() // useEffect hook for setting overflow hidden to html and body
  const contentWidth = useMotionValue(0)
  const contentHeight = useMotionValue(0)
  const windowWidth = useMotionValue(0)
  const windowHeight = useMotionValue(0)
  const offsetX = useSpring(0, { stiffness: 900, damping: 90 })
  const offsetY = useSpring(0, { stiffness: 900, damping: 90 })
  let scrollMode = SCROLL_MODE_VERTICAL
  let offsetXBlueprint = 0
  let offsetYBlueprint = 0
  let lastTouchX = 0
  let lastTouchY = 0
  let useMomentum = false
  let touchMomentum = 0
  const contentContainerReference = useRef(null)
  const momentumRafReference = useRef(null)
  const MOMENTUM_DAMPING = 0.98
  const MOMENTUM_CARRY = 0.3

  useEffect(() => {
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('wheel', onMouseWheel, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    onResize()
    momentumRafReference.current = requestAnimationFrame(updateMomentum)

    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('wheel', onMouseWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(momentumRafReference.current)
    }
  }, [])

  const onResize = debounce(() => {
    contentHeight.set(contentContainerReference.current.scrollHeight)
    contentWidth.set(contentContainerReference.current.scrollWidth)
    windowHeight.set(window.innerHeight)
    windowWidth.set(window.innerWidth)

    if (windowWidth.get() >= breakpoints.tablet) {
      scrollMode = SCROLL_MODE_HORIZONTAL
    } else {
      scrollMode = SCROLL_MODE_VERTICAL
    }
  }, 200)

  const updateMomentum = (time) => {
    momentumRafReference.current = requestAnimationFrame(updateMomentum)
    const timeFactor = Math.min(Math.max(time / (1000 / time), 1), 4)
    touchMomentum *= Math.pow(MOMENTUM_DAMPING, timeFactor)

    if (!useMomentum) {
      return
    }

    if (touchMomentum >= 0.01 || touchMomentum <= -0.01) {
      applyScroll({
        verticalAmountPx: touchMomentum,
        horizontalAmountPx: touchMomentum,
      })
    }
  }

  const onTouchStart = (event: TouchEvent) => {
    lastTouchX = event.touches[0].clientX
    lastTouchY = event.touches[0].clientY
    useMomentum = false
  }

  const onTouchMove = (event: TouchEvent) => {
    const touchX = event.touches[0].clientX
    const touchY = event.touches[0].clientY

    const deltaX = -(touchX - lastTouchX)
    const deltaY = -(touchY - lastTouchY)

    lastTouchX = touchX
    lastTouchY = touchY

    touchMomentum *= MOMENTUM_CARRY

    switch (scrollMode) {
      case SCROLL_MODE_VERTICAL:
        touchMomentum += deltaY
        break
      case SCROLL_MODE_HORIZONTAL:
        touchMomentum += deltaX
        break
      default:
        throw new Error('Invalid scrolling mode')
    }

    applyScroll({ horizontalAmountPx: deltaX, verticalAmountPx: deltaY })
  }

  const onTouchEnd = () => {
    useMomentum = true
  }

  const onMouseWheel = (event: WheelEvent) => {
    useMomentum = false

    const { pixelY } = normalizeWheel(event)

    applyScroll({
      horizontalAmountPx: pixelY,
      verticalAmountPx: pixelY,
    })
  }

  const applyScroll = ({ horizontalAmountPx, verticalAmountPx }: { horizontalAmountPx: number; verticalAmountPx: number }) => {
    switch (scrollMode) {
      case SCROLL_MODE_VERTICAL:
        applyScrollVertical(verticalAmountPx)
        break
      case SCROLL_MODE_HORIZONTAL:
        applyScrollHorizontal(horizontalAmountPx)
        break
      default:
        throw new Error('Invalid scrolling mode')
    }
  }

  const applyScrollHorizontal = (amountPx: number) => {
    offsetXBlueprint += amountPx

    const horizontalSideBoundary = contentWidth.get() - windowWidth.get()

    //No need to scroll
    if (horizontalSideBoundary <= 0) {
      return
    }

    if (offsetXBlueprint <= 0) {
      offsetXBlueprint = 0
    } else if (offsetXBlueprint >= horizontalSideBoundary) {
      offsetXBlueprint = horizontalSideBoundary
    }
    offsetX.set(-offsetXBlueprint)
  }

  const applyScrollVertical = (amountPx: number) => {
    offsetYBlueprint += amountPx

    const verticalBottomBoundary = contentHeight.get() - windowHeight.get()

    //No need to scroll
    if (verticalBottomBoundary <= 0) {
      return
    }

    if (offsetYBlueprint <= 0) {
      offsetYBlueprint = 0
    } else if (offsetYBlueprint >= verticalBottomBoundary) {
      offsetYBlueprint = verticalBottomBoundary
    }
    offsetY.set(-offsetYBlueprint)
  }

  const onKeyDown = () => {}

  return (
    <Wrapper {...restProps}>
      <Header showLogo showMenu />
      <Background showLines></Background>
      <ContentWrapper ref={contentContainerReference} style={{ translateY: offsetY, translateX: offsetX }}>
        <h1>{title}</h1>
      </ContentWrapper>
    </Wrapper>
  )
}

export default LookbookPage

//STYLES:

Wrapper: const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

ContentWrapper: none
