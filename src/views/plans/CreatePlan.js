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
  CInputCheckbox,
} from "@coreui/react";
import Axios from "../../actions/Index";
import CIcon from "@coreui/icons-react";

const CreatePlan = () => {

  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [count, setCount] = useState([]);
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [disAr, setDisAr] = useState("");
  const [disEn, setDisEn] = useState("");
  const [priceYear, setPriceYear] = useState("");
  const [priceMonth, setPriceMonth] = useState("");

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await Axios({}, "modules", "GET");
      console.log(response);
      setModules(response.data);
    }
    try {
      fetchData();
    } catch (error) {
      console.log("err ---", error);
    }
  }, []);

  function onSubmit() {}

  const triggerModule = (id) => {
    console.log(id);
    const arr = [...selectedModules];
    const index = arr.indexOf(id);

    if (index > -1) {
      arr.splice(index, 1);
    } else {
      arr.push(id);
    }
    console.log(arr);
    setSelectedModules(arr);
    
  };

  return (
    <>
      <CRow>
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
                <CCol xs="12" md="6">
                  <div className="flex flexItemCenter">
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
                  <CFormGroup variant="custom-checkbox" className="m-0 p-0">
                    <CLabel htmlFor="count">User Capacity (by User)</CLabel>
                    <CInput
                      className="mb-3"
                      name="count"
                      placeholder="Plan Capacity (by User)"
                      id="count"
                      type="number"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                    ></CInput>
                  </CFormGroup>
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
                <CCol xs="12" md="6">
                  <CInput
                    className="mb-3"
                    type="text"
                    placeholder="price per year"
                    value={priceYear}
                    onChange={(e) => setPriceYear(e.target.value)}
                  />
                </CCol>
                <CCol xs="12" md="6">
                  <CInput
                    className="mb-3"
                    type="text"
                    placeholder="price per month"
                    value={priceMonth}
                    onChange={(e) => setPriceMonth(e.target.value)}
                  />
                </CCol>
              </CFormGroup>

              {modules.map((m) => (
                <CFormGroup key={m.id} row>
                  <CCol xs="12" md="12">
                    <div className="flex flexItemCenter flexSpace">
                      <h3>{m.nameEn}</h3>
                      {/* <CFormGroup variant="custom-checkbox" className="m-0 p-0">
                        <CInputCheckbox
                          custom
                          id="inline-checkbox2"
                          name="inline-checkbox"
                          value="option2"
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-checkbox"
                        >
                          Check All
                        </CLabel>
                      </CFormGroup> */}
                    </div>
                    <CFormGroup row>
                      {m.children.map((pack) => (
                        <CCol key={pack.id} xs="12" sm="6" md="3">
                          <CCard
                            onClick={() => {
                              triggerModule(pack.id);
                            }}
                            className="mt-3 mb-3"
                          >
                            {/* <CCardHeader>
                              <div className="card-header-actions m-0">
                              </div>
                            </CCardHeader> */}
                            <CCardBody className="text-center">
                                {(selectedModules.indexOf(pack.id) > 0) && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                  </svg>
                                )}
                              <h4 className="text-info">{pack.nameEn}</h4>
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
