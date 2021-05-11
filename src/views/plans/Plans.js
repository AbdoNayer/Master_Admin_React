import React  from 'react'
import { CCard, CCol, CRow } from '@coreui/react'
import { FiCheckSquare , FiMinusSquare, FiFileText, FiSettings } from "react-icons/fi";
import Statistics from "../base/statistics/Statistics";

import HeaderSection from "../base/sections/HeaderSection";
import BodySection from "../base/sections/BodySection";

const Plans = () => {

  return (
      <>
        <CRow>
          <CCol xs="12" sm="6" md="3">
            <Statistics data={{
              icon : <FiCheckSquare size='40' className='text-success'/>,
              count : 100,
              info: "Active Plan",
              value : 20,
              color : 'success',
            }}
            />
          </CCol>
          <CCol xs="12" sm="6" md="3">
            <Statistics data={{
              icon : <FiMinusSquare size='40' className='text-info'/>,
              count : 200,
              info: "Passive Plan",
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
          <HeaderSection data={{
            title : 'plan list',
            add : 'new plan',
            url : '/plans/createPlan'
          }}
          />
          <BodySection data={{
            page : 'plans'
          }}
          />
        </CCard>
      </>
  )
}

export default Plans
