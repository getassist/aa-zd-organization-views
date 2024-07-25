import React from 'react'
import { Sidebar, CollapsibleSubNavItem, SubNavItem, SubNavItemText } from '@zendeskgarden/react-chrome'
import { MD } from '@zendeskgarden/react-typography'
import AppSideNavHeader from './AppSideNavHeader'
import useSideNav from '../hooks/useSideNav'

const AppSideNav = () => {
  const {
    navItemGroups,
    navItems,
    handleSelect,
    handleSearch,
  } = useSideNav()
  
  const id = window.location.pathname.replace('/display/', '')

  return (
    <Sidebar style={{ width: '300px', paddingLeft: 10, paddingRight: 10 }} hidden={false}>

      <AppSideNavHeader handleSearch={handleSearch} />

      {navItemGroups && navItemGroups.map((group) => (
        <CollapsibleSubNavItem
          key={group.value}
          header={(<MD isBold>{group.label}</MD>)}
          isExpanded>
            
          {navItems[group.value] && navItems[group.value].map((item) => (
            <SubNavItem key={item.id} onClick={() => handleSelect(item)} isCurrent={item.id === id}>
              <SubNavItemText>{item.title}</SubNavItemText>
            </SubNavItem>
          ))}

        </CollapsibleSubNavItem>
      ))}
    </Sidebar>
  )
}

export default AppSideNav