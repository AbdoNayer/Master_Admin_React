import React, { useEffect, useState, createRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput, CInputRadio,
  CLabel, CSelect,
  CTextarea, CRow
} from "@coreui/react";

const CreatePlan = () => {
  const [nameAr, setNameAr]               = useState('');
  const [nameEn, setNameEn]               = useState('');
  const [disAr, setDisAr]                 = useState('');
  const [disEn, setDisEn]                 = useState('');
  const [priceYear, setPriceYear]         = useState('');
  const [priceMonth, setPriceMonth]       = useState('');
  const [minDate, setMinDate]             = useState('');

  function fetchData(){

  }

  useEffect(() => {
    fetchData();
    setOldDate();
  });

  function setOldDate(){
    let dtToday   = new Date();
    let month     = dtToday.getMonth() + 1;
    let day       = dtToday.getDate();
    let year      = dtToday.getFullYear();

    if(month < 10)
      month = '0' + month.toString();
    if(day < 10)
      day = '0' + day.toString();

    let maxDate = year + '-' + month + '-' + day;
    setMinDate(maxDate)
  }

  // const changeCountry = (event) => {
  //   setCountryId(event.target.value)
  // }

  function onSubmit (){


  };


  return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader className='mb-3 p-4 flex flexItemCenter flexSpace'>
                <h6>Im Creating :</h6>
              </CCardHeader>
              <CCardBody>
                <CFormGroup row>
                  <CCol xs='12' md='6'>
                    <CInput
                        className       = 'mb-3'
                        type            = "text"
                        placeholder     = "name arabic"
                        value           = {nameAr}
                        onChange        = {e => setNameAr(e.target.value)}
                    />
                  </CCol>
                  <CCol xs='12' md='6'>
                    <CInput
                        className       = 'mb-3'
                        type            = "text"
                        placeholder     = "name english"
                        value           = {nameEn}
                        onChange        = {e => setNameEn(e.target.value)}
                    />
                  </CCol>
                  <CCol xs='12' md='6'>
                    <CTextarea
                        className       = 'mb-3'
                        rows            = "9"
                        value           = {disAr}
                        onChange        = {e => setDisAr(e.target.value)}
                        placeholder     = "description arabic"
                    />
                  </CCol>
                  <CCol xs='12' md='6'>
                    <CTextarea
                        className       = 'mb-3'
                        rows            = "9"
                        value           = {disEn}
                        onChange        = {e => setDisEn(e.target.value)}
                        placeholder     = "description english"
                    />
                  </CCol>
                  <CCol xs='12' md='6'>
                    <CInput
                        className       = 'mb-3'
                        type            = "date"
                        placeholder     = "price per year"
                        value           = {priceYear}
                        onChange        = {e => setPriceYear(e.target.value)}
                    />
                  </CCol>
                  <CCol xs='12' md='6'>
                    <CInput
                        className       = 'mb-3'
                        type            = "date"
                        placeholder     = "price per month"
                        value           = {priceMonth}
                        onChange        = {e => setPriceMonth(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>
                <div className='flex flexItemCenter flexContentEnd mb-4 mt-2'>
                  <CButton
                      active
                      color='danger'
                      className='mr-2 ml-2'
                      to="/plans/plans"
                  >
                    cancel
                  </CButton>
                  <CButton
                      active
                      color='success'
                      className='mr-2 ml-2'
                      onClick={() => onSubmit()}
                  >
                    create plan
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
  )
}

export default CreatePlan
