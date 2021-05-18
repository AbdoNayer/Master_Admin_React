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
} from "@coreui/react";

import ImageUploading from "react-images-uploading";
import { FiPlusSquare } from "react-icons/fi";
import Axios from "../../actions/Index";
import Loading from "../../containers/Loader";

const CreateOrganization = (data) => {
  const [allData, setAllData] = useState(null);
  const [errToasts, setErrToasts] = useState(false);
  const [toastMass, setToastMass] = useState('');
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  // const [plans, setPackage] = useState([]);
  const [plans, setPlans] = useState([]);
  const [planId, setPlanId] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [phone, setPhone] = useState("");
  const [countryId, setCountryId] = useState("");
  const [cityId, setCityId] = useState("");
  const [info, setInfo] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [payment, setPayment] = useState("");
  const [link, setLink] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [minDate, setMinDate] = useState("");
  const [isClientOrganization, setIsClientOrganization] = useState(true);
  const [isStandardSetup, setIsStandardSetup] = useState(false);
  const maxNumber = 1;

  function fetchData() {
    if (data.location.data && data.location.data.name === "update") {
      Axios(null, "organizations/" + data.location.data.id, "GET")
        .then((response) => {
          setAllData(response.data);
          images.push(response.data.logo)
          setAvatar(response.data.logo)
        })
        .catch((err) => {
          console.log("err ---", err);
        });
    }
  }
  
  useEffect(() => {
    async function fetchPlans() {
      console.log(isClientOrganization);
      const response = await Axios({}, `plans/?type=${isStandardSetup ? 'standard' : 'standalone'}`, "GET");
      setPlans(response.data);
    }

    try {
      fetchPlans();
    } catch (error) {
      console.log("err ---", error);
    }
    fetchData();
    setOldDate();
  }, [setAllData]);

  function setOldDate() {
    let dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();

    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    let maxDate = year + "-" + month + "-" + day;
    setMinDate(maxDate);
  }

  const onChange = (imageList) => {
    setImages(imageList);
    for (let i = 0; i < imageList.length; i++) {
      setAvatar(imageList[i].data_url);
    }
  };

  const changeCountry = (event) => {
    setCountryId(event.target.value);
  };

  const changeCity = (event) => {
    setCityId(event.target.value);
  };

  function toggleShow(val) {
    if (val === "on") {
      setIsClientOrganization(true);
      setLink("");
      setSecretKey("");
    } else {
      setIsClientOrganization(false);
      setIsStandardSetup(false);
      setLink("");
      setSecretKey("");
      setPayment("");
    }
  }

  function toggleShow2(val) {
    if (val === "on") {
      setIsStandardSetup(true);
    } else {
      setIsStandardSetup(false);
      setLink("");
      setSecretKey("");
    }
  }

  function chickPack(id){setPlanId(id)}

  function validate () {

    let isError = false;
    setToastMass('');

    if (avatar === "") {
      isError = true;
      setErrToasts(true);
      setToastMass('set logo');
    }else if (name.length <= 0) {
      isError = true;
      setErrToasts(true);
      setToastMass('set name');
    } else if (industry.length <= 0) {
      isError = true;
      setErrToasts(true);
      setToastMass('set industry');
    } else if (identifier.length <= 0) {
      isError = true;
      setErrToasts(true);
      setToastMass('set identifier');
    } else if (phone.length <= 0) {
      isError = true;
      setErrToasts(true);
      setToastMass('set phone');
    } else if (info.length <= 0) {
      isError = true;
      setErrToasts(true);
      setToastMass('set info');
    } else if (planId == null) {
      isError = true;
      setErrToasts(true);
      setToastMass('choose the plan');
    } else if (dateStart === '') {
      isError = true;
      setErrToasts(true);
      setToastMass('set dateStart');
    } else if (dateEnd === '') {
      isError = true;
      setErrToasts(true);
      setToastMass('set dateEnd');
    } else if (payment === '') {
      isError = true;
      setErrToasts(true);
      setToastMass('set payment');
    }

    setTimeout(()=>{ setErrToasts(false) }, 2000)
    return isError;

  }

  function onSubmit() {

    const err = validate();

    if (!err){

      setLoader(true);

      const dataVal = {
        name: name,
        logo: avatar,
        organizationType: isClientOrganization ? 'client' : 'maintenance_company',
        industry: industry,
        countryId: countryId,
        cityId: cityId,
        commercialIdentifier: identifier,
        about: info,
        phone: phone,
        apiLink: link,
        apiSecret: secretKey,
        planId: planId,
        startsAt: dateStart,
        endsAt: dateEnd,
        paymentRef: payment,
      };

      if (data.location.data && data.location.data.name === "update") {
        Axios(dataVal, "organizations/" + data.location.data.id, "PUT")
            .then((response) => {
              data.history.push("/organizations/organizations");
              setLoader(false);
            })
            .catch((err) => {
              console.log("err ---", err);
              setLoader(false);
            });
      } else {
        Axios(dataVal, "organizations", "POST")
            .then((response) => {
              data.history.push("/organizations/organizations");
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
            <CCardBody>
              <CCardHeader className="mb-5 pt-3 pb-4 pr-0 pl-0 flex flexItemCenter flexSpace">
                <h6>Im Creating :</h6>
                <div className="flex flexItemCenter">
                  <CButton
                      className={
                        isClientOrganization ? "mr-2 ml-2 bg-info text-white" : "mr-2 ml-2"
                      }
                      onClick={() => toggleShow("on")}
                  >
                    Organization
                  </CButton>
                  <CButton
                      className={
                        !isClientOrganization ? "mr-2 ml-2 bg-info text-white" : "mr-2 ml-2"
                      }
                      onClick={() => toggleShow("off")}
                  >
                    Maintainance Company
                  </CButton>
                </div>
              </CCardHeader>
              <CFormGroup row>
                <CCol xs="12" md="4">
                  <div className="App">
                    <ImageUploading
                      multiple
                      value={images}
                      onChange={onChange}
                      maxNumber={maxNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                          <button
                            className="btnUpload"
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            <FiPlusSquare size={30} className="mt-3 mb-3" />
                            <span className="d-block w-100">
                              Organization Logo
                            </span>
                          </button>
                          &nbsp;
                          {images.map((image, index) => (
                            <div key={index} className="imageItem">
                              <img
                                src={allData ? allData.logo : image["data_url"]}
                                alt=""
                                className="w-100 h-100"
                              />
                              <div className="btnWrapper">
                                <CButton
                                  className="mr-2 ml-2"
                                  onClick={() => onImageUpdate(index)}
                                  variant="outline"
                                  active
                                  color="success"
                                  aria-pressed="true"
                                >
                                  update
                                </CButton>
                                <CButton
                                  className="mr-2 ml-2"
                                  onClick={() => onImageRemove(index)}
                                  variant="outline"
                                  active
                                  color="danger"
                                  aria-pressed="true"
                                >
                                  remove
                                </CButton>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ImageUploading>
                  </div>
                </CCol>
                <CCol xs="12" md="8">
                  <CFormGroup row>
                    <CCol xs="12" md="6">
                      <CInput
                        className="mb-3"
                        type="text"
                        placeholder="name"
                        value={allData ? allData.name : name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </CCol>
                    <CCol xs="12" md="6">
                      <CInput
                        className="mb-3"
                        type="text"
                        placeholder="industry"
                        value={allData ? allData.industry : industry}
                        onChange={(e) => setIndustry(e.target.value)}
                      />
                    </CCol>
                    <CCol xs="12" md="6">
                      <CInput
                        className="mb-3"
                        type="text"
                        placeholder="commercial identifier"
                        value={allData ? allData.commercialIdentifier : identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                      />
                    </CCol>
                    <CCol xs="12" md="6">
                      <CInput
                        className="mb-3"
                        type="tel"
                        placeholder="phone number"
                        value={allData ? allData.phone : phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </CCol>
                    <CCol xs="12" md="6">
                      <CSelect
                        custom
                        className="mb-3"
                        name="country"
                        id="country"
                        onChange={changeCountry.bind(this)}
                      >
                        <option selected disabled>
                          select country
                        </option>
                        {countries.map((item) => (
                          <option key={item.value} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                    <CCol xs="12" md="6">
                      <CSelect
                        custom
                        className="mb-3"
                        name="city"
                        id="city"
                        onChange={changeCity.bind(this)}
                      >
                        <option selected disabled>
                          select city
                        </option>
                        {cities.map((item) => (
                          <option key={item.value} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                    <CCol xs="12" md="12">
                      <CTextarea
                        className="mb-3"
                        rows="9"
                        value={allData ? allData.about : info}
                        onChange={(e) => setInfo(e.target.value)}
                        placeholder="Other information about the organization"
                      />
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CCardHeader className="mb-5 pt-3 pb-4 pr-0 pl-0 flex flexItemCenter flexSpace">
                <h6>Installation Type :</h6>
                <div className="flex flexItemCenter">
                  <CButton
                    className={
                      !isStandardSetup ? "mr-2 ml-2 bg-info text-white" : "mr-2 ml-2"
                    }
                    onClick={() => toggleShow2("off")}
                  >
                    Standard
                  </CButton>
                  {isClientOrganization ? (
                    <CButton
                      className={
                        isStandardSetup ? "mr-2 ml-2 bg-info text-white" : "mr-2 ml-2"
                      }
                      onClick={() => toggleShow2("on")}
                    >
                      Standalone
                    </CButton>
                  ) : null}
                </div>
              </CCardHeader>
              <CFormGroup row>
                <CCol xs="12" md="12">
                  <h6>Choose one of this plan to subscribe to :</h6>
                </CCol>
                {plans.map((pack) => (
                  <CCol xs="12" sm="6" md="3">
                    <CCard className="mt-3 mb-3">
                      <CCardHeader>
                        {pack.name}
                        <div className="card-header-actions">
                          <CFormGroup
                            variant="custom-radio"
                            inline
                            className="p-0 m-0"
                          >
                            <CInputRadio
                              custom
                              id="inline-radio"
                              name="inline-radios"
                              value="option1"
                              onClick={() => chickPack(pack.id)}
                            />
                            <CLabel
                              variant="custom-checkbox"
                              htmlFor="inline-radio"
                            />
                          </CFormGroup>
                        </div>
                      </CCardHeader>
                      <CCardBody className="text-center">
                        <p className="">{pack.name}</p>
                        <h2 className="text-info">{pack.name}</h2>
                        <h5 className="mt-4">{pack.name}</h5>
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))}
              </CFormGroup>
              <CFormGroup row>
                <CCol xs="12" md="4">
                  <CLabel htmlFor="date-input">start at</CLabel>
                  <CInput
                    type="date"
                    min={minDate}
                    value={allData ? allData.activeSubscription.startsAt : dateStart}
                    onChange={(e) => setDateStart(e.target.value)}
                  />
                </CCol>
                <CCol xs="12" md="4">
                  <CLabel htmlFor="date-input">Ends At</CLabel>
                  <CInput
                    type="date"
                    min={minDate}
                    value={allData ? allData.activeSubscription.endsAt : dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                  />
                </CCol>
                {isClientOrganization ? (
                  <CCol xs="12" md="4">
                    <CLabel htmlFor="date-input">Payment Reference</CLabel>
                    <CInput
                      type="text"
                      value={allData ? allData.activeSubscription.paymentRef : payment}
                      onChange={(e) => setPayment(e.target.value)}
                    />
                  </CCol>
                ) : null}
              </CFormGroup>
              {isStandardSetup ? (
                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="date-input">Installation link</CLabel>
                    <CInput
                      type="text"
                      value={allData ? allData.activeSubscription.endsAt : link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </CCol>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="date-input">Secret Key</CLabel>
                    <CInput
                      type="text"
                      value={allData ? allData.activeSubscription.endsAt : secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>
              ) : null}
            </CCardBody>
            <div className="flex flexItemCenter flexContentEnd mb-4 mt-2 pr-3 pl-3">
              <CButton
                active
                color="danger"
                className="mr-2 ml-2"
                to="/organizations/organizations"
              >
                cancel
              </CButton>
              <CButton
                active
                color="success"
                className="mr-2 ml-2"
                onClick={() => onSubmit()}
              >
                create organization
              </CButton>
            </div>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default CreateOrganization;
