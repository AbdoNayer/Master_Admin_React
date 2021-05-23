import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CTextarea, CRow, CButton } from "@coreui/react";
import 'react-circular-progressbar/dist/styles.css';

function InfoOrganization (data) {

    return (
        <CRow>
            <CCol xs="12" md="12">
                <CCard>
                    <CCardHeader className='mb-5 p-4 flex flexItemCenter flexSpace'>
                        <h6>Organization Details :</h6>
                        <CButton color='info'>
                            <span className='mr-1 ml-1'>{data ? data.data.organizationType : ''}</span>
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CFormGroup row>
                            <CCol xs="12" md="4">
                                <img className='imgView' src={data ? data.data.logo : ''} alt=""/>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CFormGroup row>
                                    <CCol xs='12' md='6'>
                                        <CInput
                                            className       = 'mb-3'
                                            value           = {data ? data.data.name : ''}
                                            disabled
                                        />
                                    </CCol>
                                    <CCol xs='12' md='6'>
                                        <CInput
                                            className       = 'mb-3'
                                            value           = {data ? data.data.industry : ''}
                                            disabled
                                        />
                                    </CCol>
                                    <CCol xs='12' md='6'>
                                        <CInput
                                            className       = 'mb-3'
                                            value           = {data ? data.data.commercialIdentifier : ''}
                                            disabled
                                        />
                                    </CCol>
                                    <CCol xs='12' md='6'>
                                        <CInput
                                            className       = 'mb-3'
                                            value           = {data ? data.data.phone : ''}
                                            disabled
                                        />
                                    </CCol>
                                    <CCol xs='12' md='12'>
                                        <CTextarea
                                            className       = 'mb-3'
                                            rows            = "9"
                                            value           = {data ? data.data.about : ''}
                                            disabled
                                        />
                                    </CCol>
                                </CFormGroup>
                            </CCol>
                        </CFormGroup>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default InfoOrganization
