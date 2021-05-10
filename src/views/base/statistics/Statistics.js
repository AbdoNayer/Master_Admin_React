import React, { useState, createRef } from 'react'
import {
    CCard,
    CCol,
    CProgress,
} from '@coreui/react'

const Statistics = (data) => {
    return (
        <>
            <CCard>
                <div className='flex flexItemCenter w-100'>
                    <CCol xs="12" md="3" className='iconCart pl-2 pr-2 text-center'>
                        {data.data.icon}
                    </CCol>
                    <CCol xs="12" md="9" className='infoCart p-3'>
                        <h4 className={`mt-0 mb-2 font-weight-bold text-${data.data.color}`}>{data.data.count}</h4>
                        <h6 className='mt-0 mb-2 font-xs'>{data.data.info}</h6>
                        <CProgress value={data.data.value} color={data.data.color} style={{height: "3px"}}/>
                    </CCol>
                </div>
            </CCard>
        </>
    )
}

export default Statistics
