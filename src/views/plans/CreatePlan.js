import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CTextarea,
  CRow, CSelect
} from "@coreui/react";
import Axios from "../../actions/Index";
import CIcon from "@coreui/icons-react";
import { FiCheck, FiGrid } from "react-icons/fi";
import Loading from "../../containers/Loader";
import { FaCircle } from "react-icons/fa";

const CreatePlan = (data) => {
  const [errToasts, setErrToasts] = useState(false);
  const [toastMass, setToastMass] = useState('');
  const [allData, setAllData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [modules, setModules] = useState([]);
  const [allPlanType, setallPlanType] = useState([
    {
      name: "standard",
      id: 1,
    },
    {
      name: "standalone",
      id: 2,
    },
  ]);
  const [planType, setPlanType] = useState('');
  const [selectedModules, setSelectedModules] = useState([]);
  const [count, setCount] = useState('');
  const [isCustom, setIsCustom] = useState('');
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [disAr, setDisAr] = useState("");
  const [disEn, setDisEn] = useState("");
  const [priceYear, setPriceYear] = useState("");
  const [priceMonth, setPriceMonth] = useState("");

  function fetchData() {

    if (data.location.data && data.location.data.name === "update") {

      Axios(null, "plans/" + data.location.data.id, "GET").then((response) => {

        setNameAr(response.data.nameAr)
        setNameEn(response.data.nameEn)
        setDisAr(response.data.descriptionAr)
        setDisEn(response.data.descriptionEn)
        setPriceYear(response.data.pricePerYear)
        setPriceMonth(response.data.pricePerMonth)
        setCount(response.data.userCapacity)
        setIsCustom(response.data.isCustom)
        setSelectedModules(response.data.modules)

      }).catch((err) => {
        console.log("err ---", err);
      });

    }

  }

  useEffect(() => {
    fetchData();
  }, [setAllData]);

  useEffect(() => {
    async function allModule() {
      const response = await Axios({}, "modules", "GET");
      setModules(response.data);
    } try {
      allModule();
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

  function inCheick (name) {
    setIsCustom(name);
  }

  const changePlanType = (event) => {
    setPlanType(event.target.value);
  };

  function validate () {

    let isError = false;
    setToastMass('');

    if (isCustom === "") {
      isError = true;
      setErrToasts(true);
      setToastMass('choose creating');
    } else if (nameAr === "") {
      isError = true;
      setErrToasts(true);
      setToastMass('set nameAr');
    } else if (nameEn === ""){
      isError = true;
      setErrToasts(true);
      setToastMass('set nameEn');
    } else if (disAr === ""){
      isError = true;
      setErrToasts(true);
      setToastMass('set descriptionAr');
    } else if (disEn === ""){
      isError = true;
      setErrToasts(true);
      setToastMass('set descriptionEn');
    } else if (priceYear === ""){
      isError = true;
      setErrToasts(true);
      setToastMass('set priceYear');
    } else if (priceMonth === ""){
      isError = true;
      setErrToasts(true);
      setToastMass('set priceMonth');
    } else if (count === ""){
      isError = true;
      setErrToasts(true);
      setToastMass('set plan capacity');
    } else if (planType === ""){
      isError = true;
      setErrToasts(true);
      setToastMass('choose plan type');
    } else if (selectedModules.length == 0){
      isError = true;
      setErrToasts(true);
      setToastMass('choose modules');
    }

    setTimeout(()=>{ setErrToasts(false) }, 2000)
    return isError;

  }

  function onSubmit() {

    const err = validate();

    if (!err){

      setLoader(true);

      const dataVal = {
        nameAr: nameAr,
        nameEn: nameEn,
        descriptionAr: disAr,
        descriptionEn: disEn,
        isCustom: isCustom,
        userCapacity: count,
        pricePerMonth: priceMonth,
        planType: planType,
        pricePerYear: priceYear,
        modules: selectedModules,
      };

      if (data.location.data && data.location.data.name === "update") {
        Axios(dataVal, "plans/" + data.location.data.id, "PUT")
            .then((response) => {
              data.history.push("/plans/plans");
              setLoader(false);
            })
            .catch((err) => {
              console.log("err ---", err);
              setLoader(false);
            });
      } else {
        Axios(dataVal, "plans", "POST")
            .then((response) => {
              data.history.push("/plans/plans");
              setLoader(false);
            })
            .catch((err) => {
              console.log("err ---", err);
              setLoader(false);
            });
      }

    }

  }

  function loadBody() {
    if (loader) {
      return <Loading name="loadBody" value="please wait ..." />;
    }
  }

  return (
    <>
      {
        errToasts ?
            <div className='toastFun'>
              <h5 className='m-0'>{ toastMass }</h5>
            </div>
            :
            null
      }
      <CRow className="position-relative">
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
                    <div className="pr-3 pl-3 flex flexItemCenter">
                      <div className='flex flexItemCenter mr-2 ml-2' onClick={() => inCheick(false)}>
                        <span className='pointCircle flex flexItemCenter flexContentCenter'>
                          {
                            isCustom === false ?
                                <FaCircle/>
                                :
                                null
                          }
                        </span>
                        <h6 className='m-0 mr-1 ml-1'>public</h6>
                      </div>
                      <div className='flex flexItemCenter mr-2 ml-2' onClick={() => inCheick(true)}>
                        <span className='pointCircle flex flexItemCenter flexContentCenter'>
                          {
                            isCustom === true ?
                                <FaCircle/>
                                :
                                null
                          }
                        </span>
                        <h6 className='m-0 mr-1 ml-1'>custom</h6>
                      </div>
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
                <CCol xs="12" md="3">
                  <CInput
                    className="mb-3"
                    type="text"
                    placeholder="price per year"
                    value={priceYear}
                    onChange={(e) => setPriceYear(e.target.value)}
                  />
                </CCol>
                <CCol xs="12" md="3">
                  <CInput
                    className="mb-3"
                    type="text"
                    placeholder="price per month"
                    value={priceMonth}
                    onChange={(e) => setPriceMonth(e.target.value)}
                  />
                </CCol>
                <CCol xs="12" md="3">
                  <CInput
                    className="mb-3"
                    type="tel"
                    placeholder="Plan Capacity (by User)"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                  />
                </CCol>
                <CCol xs="12" md="3">
                  <CSelect
                    custom
                    className="mb-3"
                    name="planType"
                    onChange={changePlanType.bind(this)}
                    value={planType}
                  >
                    <option selected disabled>
                      plan type
                    </option>
                    {allPlanType.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </CSelect>
                </CCol>
              </CFormGroup>

              {modules.map((m) => (
                <CFormGroup key={m.id} row>
                  <CCol xs="12" md="12">
                    <div className="flex flexItemCenter">
                      <FiGrid />
                      <h3 className="m-0">{m.nameEn}</h3>
                    </div>
                    <CFormGroup row>
                      {m.children.map((pack, i) => (
                        <CCol key={pack.id} xs="12" sm="6" md="3">
                          <CCard
                            onClick={() => {
                              triggerModule(pack.id);
                            }}
                            className="mt-3 mb-3 cardBlock"
                          >
                            <CCardBody className="text-center position-relative flexContentCenter flex flexItemCenter">
                              {
                                selectedModules.find(item => item === pack.id)?
                                    <div className="chick">
                                      <FiCheck size={20} />
                                    </div>
                                    :
                                    null
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
