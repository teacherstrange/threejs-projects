import React from 'react'

import { Button } from './styled/Button'
import { CrossContainer } from './styled/CrossContainer'
import { Stripe } from './styled/Stripe'
import { Label } from './styled/Label'
import type { RegionType } from '../../Dropdown'

interface DropdownButtonProps {
  toggleDropdown: () => void
  showDropdown: boolean
  region: RegionType
}

export const DropdownButton: React.FC<DropdownButtonProps> = React.memo(({ toggleDropdown, showDropdown, region }) => {
  return (
    <Button onClick={() => toggleDropdown()}>
      <Label>{`${region.name} - ${region.stores.length}`}</Label>
      <CrossContainer animate={showDropdown ? 'visible' : 'invisible'}>
        <Stripe initial="invisible" animate={showDropdown ? 'visible' : 'invisible'} stripeOne></Stripe>
        <Stripe initial="213" animate="dont" stripeTwo></Stripe>
      </CrossContainer>
    </Button>
  )
})
