import React, { useEffect, useState } from "react";
import { CCard, CCol, CRow } from "@coreui/react";
import {
  FiCheckSquare,
  FiMinusSquare,
  FiFileText,
  FiSettings,
} from "react-icons/fi";
import Statistics from "../base/statistics/Statistics";

import HeaderSection from "../base/sections/HeaderSection";
import BodySection from "../base/sections/BodySection";
import Axios from "../../actions/Index";

const Organizations = () => {

  const [statistics, setStatistics] = useState({});
  const [newDataList, setNewDataList] = useState([]);

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

  return (
    <>
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
        <CCol xs="12" sm="6" md="3">
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
      <CCard>
        <HeaderSection
            dataNew={(data)=> {
                setNewDataList(data)
            }}
            data={{
                title: "organization list",
                add: "New Organization",
                url: "/organizations/createOrganization",
                namePage: "organizations",
            }}
        />
        <BodySection
            data={{
                page: "organizations",
                newData : newDataList,
            }}
        />
      </CCard>
    </>
  );
};

export default Organizations;
