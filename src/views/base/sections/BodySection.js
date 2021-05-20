import React, {useState, useEffect} from "react";
import { CButton, CCardBody, CFormGroup, CInputCheckbox, CLabel } from '@coreui/react'
import {FiEdit, FiEye, FiTrash2} from "react-icons/fi";

import Axios from '../../../actions/Index'
import Loading from '../../../containers/Loader'
import NoData from '../../../containers/NoData'

function BodySection (data) {

    const [usersData, setUsersData]               = useState([]);
    const [loader, setLoader]                     = useState(true);
    const [fieldOrganiz, setFieldOrganiz]         = useState([
        'logo',
        'name',
        'type',
        'current_plan',
        'active',
        'actions'
    ]);
    const [fieldPlan, setFieldPlan]                = useState([
        'name',
        'pricePerMonth',
        'pricePerYear',
        'description',
        'isActive',
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
                                        data.data.page === 'organizations' ?
                                            fieldOrganiz.map((valName, i) => (
                                                <th className="" key={i}>{valName}</th>
                                            ))
                                            :
                                            fieldPlan.map((valName, i) => (
                                                <th className="" key={i}>{valName}</th>
                                            ))
                                    }
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    usersData.map((infoUser , i) => (
                                        data.data.page === 'organizations' ?
                                            <tr className="" key={i}>
                                                <td className=""><img src={infoUser.logo} alt="" className='logoTab'/></td>
                                                <td className="">{infoUser.name}</td>
                                                <td className="">{infoUser.organizationType}</td>
                                                <td className="">{infoUser.activeSubscription}</td>
                                                <td className="">
                                                    <CFormGroup variant="custom-checkbox" className='m-0'>
                                                        <CInputCheckbox defaultChecked={infoUser.isActive} disabled custom id="inline-checkbox2" name="inline-checkbox2" value={infoUser.isActive} />
                                                        <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2"/>
                                                    </CFormGroup>
                                                </td>
                                                <td className="">
                                                    <CButton to={{pathname : '/organizations/detailsOrganization/'+ infoUser.id, id : { id: infoUser.id }}} className='mr-1 ml-1' variant="outline" active color="success" aria-pressed="true">
                                                        <FiEye/>
                                                    </CButton>
                                                    <CButton
                                                        to={{pathname : '/organizations/updateInfoOrganization', data : { id: infoUser.id }}}
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
                                            :
                                            <tr className="" key={i}>
                                                <td className="">{infoUser.name}</td>
                                                <td className="">{infoUser.pricePerMonth}</td>
                                                <td className="">{infoUser.pricePerYear}</td>
                                                <td className="">{infoUser.description}</td>
                                                <td className="">
                                                    <CFormGroup variant="custom-checkbox" className='m-0'>
                                                        <CInputCheckbox defaultChecked={infoUser.isActive} disabled custom id="inline-checkbox2" name="inline-checkbox2" value={infoUser.isActive} />
                                                        <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2"/>
                                                    </CFormGroup>
                                                </td>
                                                <td className="">
                                                    <CButton
                                                        to={{pathname : '/plans/createPlan', data : { id: infoUser.id, name : 'update' }}}
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
