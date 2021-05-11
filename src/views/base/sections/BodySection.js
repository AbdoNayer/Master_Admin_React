import React, {useState, useEffect} from "react";
import { CButton, CCardBody, CFormGroup, CInputCheckbox, CLabel } from '@coreui/react'
import {FiEdit, FiEye, FiTrash2} from "react-icons/fi";

import Axios from '../../../actions/Index'

const BodySection = (data) => {

    const [usersData, setUsersData]               = useState([]);
    const [fields, setFields]                     = useState([
        'name',
        'type',
        'current_plan',
        'country',
        'city',
        'active',
        'actions'
    ]);

    function fetchData(){
        console.log('page', data.data.page)
        Axios(data, data.data.page === 'plans' ? 'plans' : 'organizations', 'GET').then((response) => {
            console.log('response ?????', response)
        }).catch((err) => {
            console.log('err ---', err)
        });
    }

    useEffect(() => {
        fetchData();
    });


    return (
        <>
            <CCardBody>
                <div className="position-relative table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            {
                                fields.map(valName => (
                                    <th className="">{valName}</th>
                                ))
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            usersData.map(infoUser => (
                                <tr className="">
                                    <td className="">{infoUser.name}</td>
                                    <td className="">{infoUser.type}</td>
                                    <td className="">{infoUser.current_plan}</td>
                                    <td className="">{infoUser.country}</td>
                                    <td className="">{infoUser.city}</td>
                                    <td className="">
                                        <CFormGroup variant="custom-checkbox" className='m-0'>
                                            <CInputCheckbox custom id="inline-checkbox2" name="inline-checkbox2" value="option2" />
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
                                            to={data.data.page === 'organizations' ? "/organizations/createOrganization" : "/plans/createPlan"}
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
            </CCardBody>
        </>
    )
}

export default BodySection
