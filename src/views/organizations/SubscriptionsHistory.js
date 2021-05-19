import React, {useState} from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormGroup,
    CInputCheckbox,
    CLabel,
    CRow
} from '@coreui/react'
import NoData from '../../containers/NoData'

function BodySection (data) {

    const [fields, setFields]                     = useState([
        'plan',
        'installation type',
        'started at',
        'ends at',
        'consumed quota',
        'active plan ?',
    ]);

    return (
        <>

            <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader className='mb-3 p-4 flex flexItemCenter flexSpace'>
                            <h6>subscriptions history :</h6>
                        </CCardHeader>
                        <CCardBody className='position-relative'>
                            {
                                data.data.length != 0 ?
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
                                                data.data.map((infoUser , i) => (
                                                    <tr className="" key={i}>
                                                        <td className="">{infoUser.plan}</td>
                                                        <td className="">{infoUser.installationType}</td>
                                                        <td className="">{infoUser.startsAt}</td>
                                                        <td className="">{infoUser.endsAt}</td>
                                                        <td className="">{infoUser.consumedQuota}</td>
                                                        <td className="">
                                                            <CFormGroup variant="custom-checkbox" className='m-0'>
                                                                <CInputCheckbox defaultChecked={infoUser.isActive} disabled custom id="inline-checkbox2" name="inline-checkbox2" value={infoUser.isActive} />
                                                                <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2"/>
                                                            </CFormGroup>
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
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default BodySection
