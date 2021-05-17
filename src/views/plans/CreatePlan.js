import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CInputRadio,
  CLabel,
  CTextarea,
  CRow,
} from "@coreui/react";
import Axios from "../../actions/Index";
import CIcon from "@coreui/icons-react";
import { FiCheck, FiGrid } from "react-icons/fi";
import Loading from "../../containers/Loader";

const CreatePlan = (data) => {

  const [allData, setAllData]                   = useState(null);
  const [loader, setLoader]                     = useState(false);
  const [modules, setModules]                   = useState([]);
  const [selectedModules, setSelectedModules]   = useState([]);
  const [count, setCount]                       = useState([]);
  const [nameAr, setNameAr]                     = useState("");
  const [nameEn, setNameEn]                     = useState("");
  const [disAr, setDisAr]                       = useState("");
  const [disEn, setDisEn]                       = useState("");
  const [priceYear, setPriceYear]               = useState("");
  const [priceMonth, setPriceMonth]             = useState("");

  function fetchData(){

    if(data.location.data && data.location.data.name === 'update'){

      Axios(null, 'plans/' + data.location.data.id, 'GET').then((response) => {
        console.log('response details ------------', response)
        setAllData(response.data.data)
      }).catch((err) => {
        console.log('err ---', err)
      });

    }

  }

  useEffect(() => {
    fetchData();
  }, [setAllData]);

  useEffect(() => {
    async function fetchData() {
      const response = await Axios({}, "modules", "GET");
      setModules(response.data);
    }try {
      fetchData();
    } catch (error) {
      console.log("err ---", error);
    }
  }, []);

  const triggerModule = (id) => {

    const arr = [...selectedModules];
    const index = arr.indexOf(id);

    if (index > -1) {
      arr.splice(index, 1);
    } else {
      arr.push(id);
    }

    setSelectedModules(arr);

  };

  function onSubmit (){
    setLoader(true)
    const dataVal = {
      "nameAr"            : nameAr,
      "nameEn"            : nameEn,
      "descriptionAr"     : disAr,
      "descriptionEn"     : disEn,
      "isCustom"          : true,
      "userCapacity"      : count,
      "pricePerMonth"     : priceMonth,
      "pricePerYear"      : priceYear,
      "modules"           : selectedModules,
      "id"                : "string"
    }

    if(data.location.data && data.location.data.name === 'update') {
      Axios(dataVal, 'plans/' + data.location.data.id, 'PUT').then((response) => {
        data.history.push('/plans/plans');
        setLoader(false)
      }).catch((err) => {
        console.log('err ---', err)
        setLoader(false)
      });
    }else {
      Axios(dataVal, 'plans', 'POST').then((response) => {
        data.history.push('/plans/plans');
        setLoader(false)
      }).catch((err) => {
        console.log('err ---', err)
        setLoader(false)
      });
    }

  }

  function loadBody (){
    if (loader){
      return(
          <Loading name='loadBody' value='please wait ...' />
      );
    }
  }

  return (
    <>
      <CRow className='position-relative'>
        {loadBody()}
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader className="mb-3 p-4 flex flexItemCenter flexSpace">
              <h3>
                <CIcon className="mfe-2" size="lg" name="cil-grid" />
                Create New Plan
              </h3>
            </CCardHeader>
            <CCardBody>
              <CFormGroup row>
                <CCol xs="12" md="12">
                  <div className="flex flexItemCenter mb-4">
                    <h6 className="m-0">Im Creating :</h6>
                    <div className="pr-3 pl-3">
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="inline-radio"
                          name="inline-radios"
                          value="option1"
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio"
                        >
                          Public
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="inline-radio1"
                          name="inline-radios"
                          value="option1"
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio1"
                        >
                          Custom
                        </CLabel>
                      </CFormGroup>
                    </div>
                  </div>
                </CCol>
                <CCol xs="12" md="6">
                  <CInput
                    className="mb-3"
                    type="text"
                    placeholder="name arabic"
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                  />
                </CCol>
                <CCol xs="12" md="6">
                  <CInput
                    className="mb-3"
                    type="text"
                    placeholder="name english"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                  />
                </CCol>
                <CCol xs="12" md="6">
                  <CTextarea
                    className="mb-3"
                    rows="9"
                    value={disAr}
                    onChange={(e) => setDisAr(e.target.value)}
                    placeholder="description arabic"
                  />
                </CCol>
                <CCol xs="12" md="6">
                  <CTextarea
                    className="mb-3"
                    rows="9"
                    value={disEn}
                    onChange={(e) => setDisEn(e.target.value)}
                    placeholder="description english"
                  />
                </CCol>
                <CCol xs="12" md="4">
                  <CInput
                    className="mb-3"
                    type="text"
                    placeholder="price per year"
                    value={priceYear}
                    onChange={(e) => setPriceYear(e.target.value)}
                  />
                </CCol>
                <CCol xs="12" md="4">
                  <CInput
                    className="mb-3"
                    type="text"
                    placeholder="price per month"
                    value={priceMonth}
                    onChange={(e) => setPriceMonth(e.target.value)}
                  />
                </CCol>
                <CCol xs="12" md="4">
                  <CInput
                      className="mb-3"
                      type="tel"
                      placeholder="Plan Capacity (by User)"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                  />
                </CCol>
              </CFormGroup>

              { modules.map((m) => (
                <CFormGroup key={m.id} row>
                  <CCol xs="12" md="12">
                    <div className="flex flexItemCenter">
                      <FiGrid/>
                      <h3 className='m-0'>{m.nameEn}</h3>
                    </div>
                    <CFormGroup row>
                      { m.children.map((pack) => (
                        <CCol key={pack.id} xs="12" sm="6" md="3">
                          <CCard onClick={() => {triggerModule(pack.id)}} className="mt-3 mb-3 cardBlock">
                            <CCardBody className="text-center position-relative flexContentCenter flex flexItemCenter">
                                {
                                  (selectedModules.indexOf(pack.id) > 0) && (
                                    <div className='chick'>
                                      <FiCheck size={20} />
                                    </div>
                                  )
                                }
                              <h4 className="text-dark">{pack.nameEn}</h4>
                            </CCardBody>
                          </CCard>
                        </CCol>
                      ))}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              ))}

              <div className="flex flexItemCenter flexContentEnd mb-4 mt-2">
                <CButton
                  active
                  color="danger"
                  className="mr-2 ml-2"
                  to="/plans/plans"
                >
                  Cancel
                </CButton>
                <CButton
                  active
                  color="success"
                  className="mr-2 ml-2"
                  onClick={() => onSubmit()}
                >
                  Create Plan
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default CreatePlan;
