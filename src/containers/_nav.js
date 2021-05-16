import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Home']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Organizations',
    to: '/organizations/Organizations',
    icon: 'cil-user',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Plans',
    to: '/plans/Plans',
    icon: 'cil-grid',
  },
]

export default _nav
