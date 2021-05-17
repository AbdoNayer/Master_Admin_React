import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://tosafeapp.com" target="_blank" rel="noopener noreferrer">To-Safe</a>
        <span className="ml-1">&copy; 2021 TrendsGCC.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://trendsgcc.com" target="_blank" rel="noopener noreferrer">TrendsGCC</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
