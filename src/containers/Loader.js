import React from 'react'
import { CSpinner } from '@coreui/react'

const Loader = (data) => {

    return (
        <div className={data.name === 'loadBody' ? 'loader position-absolute' : 'loader position-fixed'}>
            <CSpinner variant="grow" style={{width:'2rem', height:'2rem'}} />
            <h5 className='mt-4 mb-4'>{data.value}</h5>
        </div>
    )

}

export default Loader
