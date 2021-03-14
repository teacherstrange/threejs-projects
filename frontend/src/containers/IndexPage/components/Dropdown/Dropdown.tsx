import React from 'react';

import { DropdownsContainer } from './styled/DropdownsContainer';
import { DropdownItem } from './components/DropdownItem/DropdownItem';

interface DropdownProps {}

export type RegionType = {
  name: string;
  stores: {
    location: string;
    name: string;
    address: string;
    phone: string;
    website: string;
  }[];
};

export const Dropdown = React.memo<DropdownProps>(props => {
  const REGIONS = [
    {
      name: 'Asia',
      stores: [
        {
          location: 'Taiwan',
          name: 'YONEX Jp',
          address: '134 Road 14, 132234',
          phone: '+21 234345345',
          website: 'www.gfdgfdg.com',
        },
      ],
    },
    {
      name: 'Europe',
      stores: [
        {
          location: 'Taiwan',
          name: 'YONEX Jp',
          address: '134 Road 14, 132234',
          phone: '+21 234345345',
          website: 'www.gfdgfdg.com',
        },
      ],
    },
  ];

  const dropdowns = REGIONS.map((region: RegionType) => {
    return <DropdownItem region={region} key={region.name}></DropdownItem>;
  });

  return (
    <>
      <DropdownsContainer>{dropdowns}</DropdownsContainer>
    </>
  );
});
