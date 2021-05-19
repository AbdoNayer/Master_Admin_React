import React  from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CRow, CButton, CLabel } from "@coreui/react";
import { FiPlus } from "react-icons/fi";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function SubscriptionsPlan (data) {

    return (
        <CRow>
            <CCol xs="12" md="12">
                <CCard>
                    <CCardHeader className='mb-5 p-4 flex flexItemCenter flexSpace'>
                        <h6>subscriptions and plans :</h6>
                        <div className='flex flexItemCenter'>
                            <CButton to='/' color='success' className='mr-2 ml-2'>
                                <FiPlus className='text-white'/>
                                <span className='mr-1 ml-1'>subscribe to other Plan</span>
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CFormGroup row>
                            <CCol xs="12" md="6">
                                <CFormGroup row>
                                    <CCol xs='12' md='12' className='mb-4'>
                                        <CLabel htmlFor="date-input">current plan is :</CLabel>
                                        <span className='badge badge-warning mr-2 ml-2'>XYZ</span>
                                        <span className=''>plan</span>
                                    </CCol>
                                    <CCol xs='12' md='12'>
                                        <CLabel htmlFor="date-input">started at :</CLabel>
                                        <CInput
                                            className       = 'mb-3'
                                            value           = {data ? data.data.installationType : 'no installation type'}
                                            disabled
                                        />
                                    </CCol>
                                    <CCol xs='12' md='12'>
                                        <CLabel htmlFor="date-input">started at :</CLabel>
                                        <CInput
                                            className       = 'mb-3'
                                            value           = {data ? data.data.startsAt : 'no start at'}
                                            disabled
                                        />
                                    </CCol>
                                    <CCol xs='12' md='12'>
                                        <CLabel htmlFor="date-input">ent at :</CLabel>
                                        <CInput
                                            className       = 'mb-3'
                                            value           = {data ? data.data.endsAt : 'no ent at'}
                                            disabled
                                        />
                                    </CCol>
                                    <CCol xs='12' md='12'>
                                        <CLabel htmlFor="date-input">payment type :</CLabel>
                                        <CInput
                                            className       = 'mb-3'
                                            value           = {data ? data.data.paymentType : 'no payment type'}
                                            disabled
                                        />
                                    </CCol>
                                    <CCol xs='12' md='12'>
                                        <CLabel htmlFor="date-input">payment ref :</CLabel>
                                        <CInput
                                            className       = 'mb-3'
                                            value           = {data ? data.data.paymentRef : 'no payment ref'}
                                            disabled
                                        />
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <div className='text-center mt-4 mb-4'>
                                    <div className='itemCircle m-auto'>
                                        <CircularProgressbar value={data ? data.data.consumedQuota : 0} text={`${data ? data.data.consumedQuota : 0}%`} />
                                    </div>
                                    <h5 className='text-info mt-3 mb-3'>Consumed Quota</h5>
                                </div>
                            </CCol>
                        </CFormGroup>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default SubscriptionsPlan
