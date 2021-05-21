import React, { useState, useEffect } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Axios from "../../actions/Index";
import {
  FiCheckSquare,
  FiList,
  FiMinusSquare,
  FiFileText,
  FiSettings,
} from "react-icons/fi";
import Statistics from "../base/statistics/Statistics";
import MainChart from "./MainChart";

// const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
// const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Dashboard = () => {
  const [statistics, setStatistics] = useState({});
  const [by, setBy] = useState("Day");

  useEffect(() => {
    async function fetchData() {
      const response = await Axios({}, "organizations/statistics", "POST");
      setStatistics(response.data);
    }
    try {
      fetchData();
    } catch (error) {
      console.log("err ---", error);
    }
  }, []);

  // "activeCount": 12,
  // "passiveCount": 7,
  // "clientsCount": 16,
  // "companiesCount": 3,
  // "standardCount": 3,
  // "standaloneCount": 16,
  // "allCount": 19,

  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" md="4">
          <Statistics
            data={{
              icon: <FiList size="40" className="text-info" />,
              count: statistics.activeCount || 0,
              info: "All Organization",
              value:
                (statistics.activeCount /
                  (statistics.passiveCount + statistics.activeCount)) *
                100,
              color: "info",
            }}
          />
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <Statistics
            data={{
              icon: <FiFileText size="40" className="text-warning" />,
              count: statistics.clientsCount || 0,
              info: "Client",
              value:
                (statistics.clientsCount /
                  (statistics.companiesCount + statistics.clientsCount)) *
                100,
              color: "warning",
            }}
          />
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <Statistics
            data={{
              icon: <FiSettings size="40" className="text-danger" />,
              count: statistics.companiesCount || 0,
              info: "Maintainance Company",
              value:
                (statistics.companiesCount /
                  (statistics.companiesCount + statistics.clientsCount)) *
                100,
              color: "danger",
            }}
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol xs="12" sm="6" md="3">
          <Statistics
            data={{
              icon: <FiCheckSquare size="40" className="text-success" />,
              count: statistics.activeCount || 0,
              info: "Active Organization",
              value:
                (statistics.activeCount /
                  (statistics.passiveCount + statistics.activeCount)) *
                100,
              color: "success",
            }}
          />
        </CCol>
        <CCol xs="12" sm="6" md="3">
          <Statistics
            data={{
              icon: <FiMinusSquare size="40" className="text-info" />,
              count: statistics.passiveCount || 0,
              info: "Passive Organization",
              value:
                (statistics.passiveCount /
                  (statistics.passiveCount + statistics.activeCount)) *
                100,
              color: "info",
            }}
          />
        </CCol>
        <CCol xs="12" sm="6" md="3">
          <Statistics
            data={{
              icon: <FiFileText size="40" className="text-warning" />,
              count: statistics.standardCount || 0,
              info: "Standard Subscription",
              value:
                (statistics.standardCount /
                  (statistics.standardCount + statistics.standaloneCount)) *
                100,
              color: "warning",
            }}
          />
        </CCol>
        <CCol xs="12" sm="6" md="3">
          <Statistics
            data={{
              icon: <FiSettings size="40" className="text-danger" />,
              count: statistics.standaloneCount || 0,
              info: "Standalone Subscription",
              value:
                (statistics.standaloneCount /
                  (statistics.standaloneCount + statistics.standardCount)) *
                100,
              color: "danger",
            }}
          />
        </CCol>
      </CRow>

      {/* <WidgetsDropdown /> */}
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Subscription Timeline
              </h4>
              <div className="small text-muted">
                View Subscribed Organizations Over Time{" "}
              </div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButtonGroup className="float-right mr-3">
                {["Day", "Month", "Year"].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === by}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart style={{ height: "300px", marginTop: "40px" }} />
        </CCardBody>
      </CCard>

      {/* <WidgetsBrand withCharts /> */}
    </>
  );
};

export default Dashboard;
