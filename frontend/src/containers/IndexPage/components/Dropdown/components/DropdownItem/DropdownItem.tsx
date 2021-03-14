import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { useDropdown } from '../../hooks/useDropdown'
import { DropdownButton } from '../../components/DropdownButton/DropdownButton'
import type { RegionType } from '../../Dropdown'
import { DropContent } from './styled/DropContent'
import { DropContentWrapper } from './styled/DropContentWrapper'
import { DropWrapper } from './styled/DropWrapper'

interface DropdownItemProps {
  region: RegionType
}

export const DropdownItem: React.FC<DropdownItemProps> = React.memo(({ region }) => {
  const { showDropdown, toggleDropdown } = useDropdown()
  const [dropHeight, setDropHeight] = useState(100)

  const dropContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (dropContentRef.current) {
      let measuredDropHeight = dropContentRef.current.clientHeight
      setDropHeight(measuredDropHeight)
    }
  }, [])

  const dropContentWrapperVariants = {
    variants: {
      invisible: {
        height: 0,
      },
      visible: {
        height: dropHeight,
      },
    },
  }

  return (
    <DropWrapper>
      <DropdownButton region={region} showDropdown={showDropdown} toggleDropdown={toggleDropdown}></DropdownButton>
      <AnimatePresence>
        {showDropdown && (
          <DropContentWrapper variants={dropContentWrapperVariants.variants}>
            <DropContent>{`${region.name}`}</DropContent>
          </DropContentWrapper>
        )}
      </AnimatePresence>
      <DropContent toMeasure ref={dropContentRef}>{`${region.name}`}</DropContent>
    </DropWrapper>
  )
})
