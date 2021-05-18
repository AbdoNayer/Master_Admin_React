import React from "react";
import { CCard, CCol, CRow } from "@coreui/react";
import {
  FiEdit2,
  FiGlobe,
  FiFileText,
  FiSettings,
  FiShare,
} from "react-icons/fi";
import Statistics from "../base/statistics/Statistics";

import HeaderSection from "../base/sections/HeaderSection";
import BodySection from "../base/sections/BodySection";

const Plans = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" md="3">
          <Statistics
            data={{
              icon: <FiGlobe size="40" className="text-success" />,
              count: 100,
              info: "Public",
              value: 20,
              color: "success",
            }}
          />
        </CCol>
        <CCol xs="12" sm="6" md="3">
          <Statistics
            data={{
              icon: <FiEdit2 size="40" className="text-info" />,
              count: 200,
              info: "Custom",
              value: 45,
              color: "info",
            }}
          />
        </CCol>
        <CCol xs="12" sm="6" md="3">
          <Statistics
            data={{
              icon: <FiFileText size="40" className="text-warning" />,
              count: 300,
              info: "Standard",
              value: 50,
              color: "warning",
            }}
          />
        </CCol>
        <CCol xs="12" sm="6" md="3">
          <Statistics
            data={{
              icon: <FiSettings size="40" className="text-danger" />,
              count: 400,
              info: "Standalone",
              value: 75,
              color: "danger",
            }}
          />
        </CCol>
      </CRow>
      <CCard>
        <HeaderSection
          data={{
            title: "plan list",
            add: "new plan",
            url: "/plans/createPlan",
          }}
        />
        <BodySection
          data={{
            page: "plans",
          }}
        />
      </CCard>
    </>
  );
};

export default Plans;
