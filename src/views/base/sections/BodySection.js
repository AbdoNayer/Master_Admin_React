import React, {useState, useEffect} from "react";
import { CButton, CCardBody, CFormGroup, CInputCheckbox, CLabel } from '@coreui/react'
import {FiEdit, FiEye, FiTrash2} from "react-icons/fi";

import Axios from '../../../actions/Index'
import Loading from '../../../containers/Loader'
import NoData from '../../../containers/NoData'

function BodySection (data) {

    const [usersData, setUsersData]               = useState([]);
    const [loader, setLoader]                     = useState(true);
    const [fields, setFields]                     = useState([
        'name',
        'type',
        'current_plan',
        'active',
        'actions'
    ]);

    function fetchData(){

        Axios(null, data.data.page === 'plans' ? 'plans' : 'organizations', 'GET').then((response) => {
            setUsersData(response.data)
            setLoader(false)
        }).catch((err) => {
            console.log('err ---', err)
            setLoader(false)
        });

    }

    useEffect(() => {
        fetchData();
    }, [setUsersData]);

    function onRemove (id, i){

        setLoader(true)
        Axios(null, data.data.page === 'plans' ? 'plans/' + id : 'organizations/' + id, 'DELETE').then((response) => {
            setLoader(false)
            usersData.splice(i, 1);
        }).catch((err) => {
            console.log('err ---', err)
            setLoader(false)
        });

    };

    function loadBody (){
        if (loader){
            return(
                <Loading name='loadBody' />
            );
        }
    }

    return (
        <>
            <CCardBody className='position-relative'>
                {loadBody()}
                {
                    usersData.length != 0 ?
                        <div className="position-relative table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    {
                                        fields.map((valName, i) => (
                                            <th className="" key={i}>{valName}</th>
                                        ))
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    usersData.map((infoUser , i) => (
                                        <tr className="" key={i}>
                                            <td className=""><img src={infoUser.logo} alt="" className='logoTab'/></td>
                                            <td className="">{infoUser.organizationType}</td>
                                            <td className="">{infoUser.activeSubscription}</td>
                                            <td className="">
                                                <CFormGroup variant="custom-checkbox" className='m-0'>
                                                    <CInputCheckbox defaultChecked disabled custom id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                                                    <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2"/>
                                                </CFormGroup>
                                            </td>
                                            <td className="">
                                                {
                                                    data.data.page === 'organizations' ?
                                                        <CButton to={{pathname : '/organizations/detailsOrganization/'+ infoUser.id, id : { id: infoUser.id }}} className='mr-1 ml-1' variant="outline" active color="success" aria-pressed="true">
                                                            <FiEye/>
                                                        </CButton>
                                                        :
                                                        null
                                                }
                                                <CButton
                                                    to={data.data.page === 'organizations' ? {pathname : '/organizations/createOrganization', data : { id: infoUser.id, name : 'update' }} : {pathname : '/plans/createPlan', data : { id: infoUser.id, name : 'update' }}}
                                                    className='mr-1 ml-1'
                                                    variant="outline"
                                                    active
                                                    color="info"
                                                    aria-pressed="true"
                                                >
                                                    <FiEdit/>
                                                </CButton>
                                                <CButton
                                                    className='mr-1 ml-1'
                                                    variant="outline"
                                                    active
                                                    color="danger"
                                                    aria-pressed="true"
                                                    onClick={() => onRemove(infoUser.id, i)}
                                                >
                                                    <FiTrash2/>
                                                </CButton>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                        :
                        <NoData />
                }
            </CCardBody>
        </>
    )
}

export default BodySection
