import React, { useEffect, useState, createRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody, CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput, CInputCheckbox, CInputFile, CInputRadio,
  CLabel, CSelect, CSwitch,
  CTextarea, CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const CreateOrganization = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader className='mb-5 p-4 flex flexItemCenter flexSpace'>
              <h6>Im Creating :</h6>
              <div className='flex flexItemCenter'>
                <CButton variant="outline" color="info" className='mr-2 ml-2'>Organization</CButton>
                <CButton variant="outline" color="info" className='mr-2 ml-2'>Maintainance Company</CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol xs="12" md="4">

                  </CCol>
                  <CCol xs="12" md="8">
                    <CFormGroup row>
                      <CCol xs='12' md='6'>
                        <CInput className='mb-3' type="text" id="hf-name" name="hf-name" placeholder="name" autoComplete="name" />
                      </CCol>
                      <CCol xs='12' md='6'>
                        <CInput className='mb-3' type="text" id="hf-industry" name="hf-industry" placeholder="industry" autoComplete="industry" />
                      </CCol>
                      <CCol xs='12' md='6'>
                        <CInput className='mb-3' type="text" id="hf-commercial" name="hf-commercial" placeholder="Commercial Identifier" autoComplete="commercial" />
                      </CCol>
                      <CCol xs='12' md='6'>
                        <CInput className='mb-3' type="tel" id="hf-phone" name="hf-phone" placeholder="Phone Number" autoComplete="phone" />
                      </CCol>
                      <CCol xs='12' md='6'>
                        <CSelect custom className='mb-3' name="country" id="country">
                          <option selected disabled>select country</option>
                          <option>egypt</option>
                          <option>ksa</option>
                          <option>spain</option>
                        </CSelect>
                      </CCol>
                      <CCol xs='12' md='6'>
                        <CSelect custom className='mb-3' name="city" id="city">
                          <option selected disabled>select city</option>
                          <option>cairo</option>
                          <option>cairo</option>
                        </CSelect>
                      </CCol>
                      <CCol xs='12' md='12'>
                        <CTextarea
                            className='mb-3'
                            name="textarea-input"
                            id="textarea-input"
                            rows="9"
                            placeholder="Other information about the organization"
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CCardHeader className='mb-5 p-4 flex flexItemCenter flexSpace'>
                  <h6>Installation Type :</h6>
                  <div className='flex flexItemCenter'>
                    <CButton variant="outline" color="info" className='mr-2 ml-2'>Standard</CButton>
                    <CButton variant="outline" color="info" className='mr-2 ml-2'>Standalone</CButton>
                  </div>
                </CCardHeader>
                <CFormGroup row>
                  <CCol xs="12" md="12">
                    <h6>Choose one of this plan to subscribe to :</h6>
                  </CCol>
                  <CCol xs="12" md="3">
                    
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default CreateOrganization
