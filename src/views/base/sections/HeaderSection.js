import React, {useState} from 'react'
import { CButton, CCardHeader,CFormGroup, CInput, CSelect } from '@coreui/react'
import {FiFileText, FiPlus} from "react-icons/fi";
import Axios from "../../../actions/Index";

function HeaderSection ({data, dataNew}) {

    const [allActive, setAllActive]             = useState([
        { id : true, val : 'true' },
        { id : false, val : 'false' }
    ]);
    const [allType, setAllType]                 = useState([
        { id : 3, val : 'client' },
        { id : 4, val : 'maintenance_company' }
    ]);
    const [type, setType]                       = useState('');
    const [active, setActive]                   = useState('');
    const [search, setSearch]                   = useState('');


    const changeActive = (event) => {
        setActive(event.target.value)
        Axios(null, data.namePage === 'plans' ? `plans?active=${event.target.value}&type=${type ? type : 'client'}` : `organizations?active=${event.target.value}&type=${type ? type : 'client'}`, 'GET').then((response) => {
            dataNew(response.data);
        }).catch((err) => {
            console.log('err ---', err)
        });
    }

    const changeType = (event) => {
        setType(event.target.value)
        Axios(null, data.namePage === 'plans' ? `plans?active=${active ? active : true}&type=${event.target.value}` : `organizations?active=${active ? active : true}&type=${event.target.value}`, 'GET').then((response) => {
            dataNew(response.data);
        }).catch((err) => {
            console.log('err ---', err)
        });
    }

    return (
        <>
            <CCardHeader className='p-4'>
                <div className='flex flexItemCenter flexSpace'>
                    <div className=''>
                        <div className='flex flexItemCenter'>
                            <FiFileText size={20}/>
                            <h6 className='font-weight-bold m-0 mr-1 ml-1 font-lg'>{data.title}</h6>
                        </div>
                    </div>
                    <div className=' flex flexItemCenter'>
                        <CButton color="info" to={data.url} className='mr-1 ml-1'>
                            <FiPlus/>
                            <span>{data.add}</span>
                        </CButton>
                        <CSelect name="active" id="active" className='mr-1 ml-1 w-auto' onChange={changeActive.bind(this)}>
                            <option selected disabled>active</option>
                            {
                                allActive.map(item => (
                                    <option key={item.val} value={item.id}>
                                        {item.val}
                                    </option>
                                ))
                            }
                        </CSelect>
                        <CSelect name="customer" id="customer" className='mr-1 ml-1 w-auto' onChange={changeType.bind(this)}>
                            <option selected disabled>type</option>
                            {
                                allType.map(item => (
                                    <option key={item.id} value={item.val}>
                                        {item.val}
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
