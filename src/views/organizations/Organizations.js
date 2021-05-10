import React, { useState, createRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInputCheckbox,
  CFormGroup,
  CLabel,
  CInput,
  CRow,
  CSelect,
} from '@coreui/react'
import { FiCheckSquare , FiMinusSquare, FiFileText, FiSettings, FiPlus, FiEye, FiEdit } from "react-icons/fi";
import Statistics from "../base/statistics/Statistics";


const Organizations = () => {

  const usersData = [
    {
      name: 'John Doe',
      type: 'client',
      current_plan: 'pronze',
      country: 'KSA',
      city: 'Ryadh',
    },
    {
      name: 'John Doe',
      type: 'client',
      current_plan: 'pronze',
      country: 'KSA',
      city: 'Ryadh',
    },
  ]
  const fields = ['name','type', 'current_plan', 'country', 'city', 'active', 'actions']
  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" md="3">
          <Statistics data={{
            icon : <FiCheckSquare size='40' className='text-success'/>,
            count : 100,
            info: "Active Organization",
            value : 20,
            color : 'success',
          }}
          />
        </CCol>
        <CCol xs="12" sm="6" md="3">
          <Statistics data={{
            icon : <FiMinusSquare size='40' className='text-info'/>,
            count : 200,
            info: "Passive Organization",
            value : 45,
            color : 'info',
          }}
          />
        </CCol>
        <CCol xs="12" sm="6" md="3">
          <Statistics data={{
            icon : <FiFileText size='40' className='text-warning'/>,
            count : 300,
            info: "Client",
            value : 50,
            color : 'warning',
          }}
          />
        </CCol>
        <CCol xs="12" sm="6" md="3">
          <Statistics data={{
            icon : <FiSettings size='40' className='text-danger'/>,
            count : 400,
            info: "Maintainance Company",
            value : 75,
            color : 'danger',
          }}
          />
        </CCol>
      </CRow>
      <CCard>
        <CCardHeader className='p-4'>
          <div className='flex flexItemCenter flexSpace'>
            <div className=''>
              <div className='flex flexItemCenter'>
                <FiFileText size={20}/>
                <h6 className='font-weight-bold m-0 mr-1 ml-1 font-lg'>Organization List</h6>
              </div>
            </div>
            <div className=' flex flexItemCenter'>
              <CButton color="info" to="/organizations/createOrganization" className='mr-1 ml-1'>
                <FiPlus/>
                <span>New Organization</span>
              </CButton>
              <CSelect name="active" id="active" className='mr-1 ml-1 w-auto'>
                <option value="1">active</option>
              </CSelect>
              <CSelect name="customer" id="customer" className='mr-1 ml-1 w-auto'>
                <option value="1">customer</option>
              </CSelect>
              <CFormGroup className='m-0 mr-1 ml-1 w-auto'>
                <CInput id="company" placeholder="search" />
              </CFormGroup>
            </div>
          </div>
        </CCardHeader>
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
                        <CButton to="/organizations/detailsOrganization" className='mr-1 ml-1' variant="outline" active color="success" aria-pressed="true">
                          <FiEye/>
                        </CButton>
                        <CButton to="/organizations/createOrganization" className='mr-1 ml-1' variant="outline" active color="danger" aria-pressed="true">
                          <FiEdit/>
                        </CButton>
                      </td>
                    </tr>
                ))
              }
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Organizations
