import React, { useEffect, useState, createRef } from "react";
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
  CSelect,
  CTextarea,
  CRow,
  CInputCheckbox,
} from "@coreui/react";
import Axios from "../../actions/Index";

const CreatePlan = () => {
  const [modules, setModules] = useState([]);
  const [count, setCount] = useState([]);
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [disAr, setDisAr] = useState("");
  const [disEn, setDisEn] = useState("");
  const [priceYear, setPriceYear] = useState("");
  const [priceMonth, setPriceMonth] = useState("");

  function fetchData() {
    Axios({}, "modules", "GET")
      .then((response) => {
        console.log("response ?????", response.data);
        setModules(response.data);
      })
      .catch((err) => {
        console.log("err ---", err);
      });
  }

  useEffect(() => {
    fetchData();
  });

  // const changeCountry = (event) => {
  //   setCountryId(event.target.value)
  // }

  function onSubmit() {}

  const changeCount = (event) => {
    // setCountryId(event.target.value)
  };

  return (
    <>
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader className="mb-3 p-4 flex flexItemCenter flexSpace">
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
                    <CLabel variant="custom-checkbox" htmlFor="inline-radio">
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
                    <CLabel variant="custom-checkbox" htmlFor="inline-radio1">
                      Custom
                    </CLabel>
                  </CFormGroup>
                </div>
              </div>
              <CSelect
                className="mb-3 w-auto"
                name="country"
                id="country"
                onChange={changeCount.bind(this)}
              >
                <option selected disabled>
                  user Capacity
                </option>
                {count.map((item) => (
                  <option key={item.value} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CSelect>
            </CCardHeader>
            <CCardBody>
              <CFormGroup row>
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
                <CFormGroup row>
                  <CCol xs="12" md="12">
                    <div className="flex flexItemCenter flexSpace">
                      <h5>{m.nameEn}</h5>
                      <CFormGroup variant="custom-checkbox" className="m-0 p-0">
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
                      </CFormGroup>
                    </div>
                    <CFormGroup row>
                      {m.children.map((pack) => (
                        <CCol xs="12" sm="6" md="3">
                          <CCard className="mt-3 mb-3">
                            <CCardHeader>
                              {/* {pack.nameEn} */}
                              <div className="card-header-actions m-0">
                                <CFormGroup
                                  variant="custom-checkbox"
                                  className="m-0 p-0"
                                >
                                  <CLabel
                                    variant="custom-checkbox"
                                    htmlFor="inline-checkbox1"
                                  />
                                </CFormGroup>
                              </div>
                            </CCardHeader>
                            <CCardBody className="text-center">
                              <h5 className="text-info">{pack.nameEn}</h5>
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
                  cancel
                </CButton>
                <CButton
                  active
                  color="success"
                  className="mr-2 ml-2"
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
  );
};

export default CreatePlan;
