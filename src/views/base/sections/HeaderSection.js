import React, {useState} from 'react'
import { CButton, CCardHeader,CFormGroup, CInput, CSelect } from '@coreui/react'
import {FiFileText, FiPlus} from "react-icons/fi";

const HeaderSection = (data) => {

    const [allActive, setAllActive]             = useState([]);
    const [allType, setAllType]                 = useState([]);



    return (
        <>
            <CCardHeader className='p-4'>
                <div className='flex flexItemCenter flexSpace'>
                    <div className=''>
                        <div className='flex flexItemCenter'>
                            <FiFileText size={20}/>
                            <h6 className='font-weight-bold m-0 mr-1 ml-1 font-lg'>{data.data.title}</h6>
                        </div>
                    </div>
                    <div className=' flex flexItemCenter'>
                        <CButton color="info" to={data.data.url} className='mr-1 ml-1'>
                            <FiPlus/>
                            <span>{data.data.add}</span>
                        </CButton>
                        <CSelect name="active" id="active" className='mr-1 ml-1 w-auto'>
                            <option selected disabled>active</option>
                            {
                                allActive.map(item => (
                                    <option key={item.value} value={item.id}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </CSelect>
                        <CSelect name="customer" id="customer" className='mr-1 ml-1 w-auto'>
                            <option selected disabled>type</option>
                            {
                                allType.map(item => (
                                    <option key={item.value} value={item.id}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </CSelect>
                        <CFormGroup className='m-0 mr-1 ml-1 w-auto'>
                            <CInput id="company" placeholder="search" />
                        </CFormGroup>
                    </div>
                </div>
            </CCardHeader>
        </>
    )
}

export default HeaderSection
