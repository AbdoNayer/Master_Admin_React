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
  CSelect,
  CTextarea,
  CRow,
} from "@coreui/react";

import ImageUploading from "react-images-uploading";
import { FiPlusSquare } from "react-icons/fi";
import Axios from "../../actions/Index";
import Loading from "../../containers/Loader";

const CreateOrganization = (data) => {
  const [errToasts, setErrToasts] = useState(false);
  const [isFadeBlock, setIsFadeBlock] = useState(false);
  const [isName, setIsName] = useState('');
  const [isPass, setIsPass] = useState('');
  const [toastMass, setToastMass] = useState("");
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [countries, setCountries] = useState([
    {
      name: "egypt",
      id: 1,
    },
    {
      name: "saudi arabia",
      id: 2,
    },
  ]);
  const [cities, setCities] = useState([
    {
      name: "cairo",
      id: 3,
    },
    {
      name: "riyadh",
      id: 4,
    },
  ]);
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
  const [link, setLink] = useState(undefined);
  const [secretKey, setSecretKey] = useState(undefined);
  const [minDate, setMinDate] = useState("");
  const [isClientOrganization, setIsClientOrganization] = useState(true);
  const [isStandardSetup, setIsStandardSetup] = useState(false);
  const maxNumber = 1;

  useEffect(() => {
    async function fetchPlans() {
      console.log(isClientOrganization);
      const response = await Axios(
        {},
        `plans/?type=${isStandardSetup ? "standard" : "standalone"}`,
        "GET"
      );
      setPlans(response.data);
    }
    try {
      fetchPlans();
    } catch (error) {
      console.log("err ---", error);
    }
    setOldDate();
  }, []);

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

  function chickPack(id) {
    setPlanId(id);
  }

  function validate() {
    let isError = false;
    setToastMass("");

    if (avatar === "") {
      isError = true;
      setErrToasts(true);
      setToastMass("set logo");
    } else if (name.length <= 0) {
      isError = true;
      setErrToasts(true);
      setToastMass("set name");
    } else if (industry.length <= 0) {
      isError = true;
      setErrToasts(true);
      setToastMass("set industry");
    } else if (identifier.length <= 0) {
      isError = true;
      setErrToasts(true);
      setToastMass("set identifier");
    } else if (phone.length <= 0) {
      isError = true;
      setErrToasts(true);
      setToastMass("set phone");
    } else if (info.length <= 0) {
      isError = true;
      setErrToasts(true);
      setToastMass("set info");
    } else if (planId == null) {
      isError = true;
      setErrToasts(true);
      setToastMass("choose the plan");
    } else if (dateStart === "") {
      isError = true;
      setErrToasts(true);
      setToastMass("set start at");
    } else if (dateEnd === "") {
      isError = true;
      setErrToasts(true);
      setToastMass("set ends At");
    } else if (isClientOrganization && payment === "") {
      isError = true;
      setErrToasts(true);
      setToastMass("set payment");
    } else if (isStandardSetup && link === "") {
      isError = true;
      setErrToasts(true);
      setToastMass("set installation link");
    } else if (isStandardSetup && secretKey === "") {
      isError = true;
      setErrToasts(true);
      setToastMass("set secret Key");
    }

    setTimeout(() => {
      setErrToasts(false);
    }, 2000);
    return isError;
  }

  function onSubmit() {
    const err = validate();

    if (!err) {
      setLoader(true);

      const dataVal = {
        name: name,
        logo: avatar,
        organizationType: isClientOrganization
          ? "client"
          : "maintenance_company",
        industry: industry,
        // countryId: countryId,
        // cityId: cityId,
        cityId: 0,
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

      Axios(dataVal, "organizations", "POST")
          .then((response) => {
            setIsName(response.data.username);
            setIsPass(response.data.password);
            setIsFadeBlock(true);
            setLoader(false);
          })
          .catch((err) => {
            console.log("err ---", err);
            setLoader(false);
          });

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
          <div className="toastFun">
            <h5 className="m-0">{toastMass}</h5>
          </div>
         :
          null
      }
      {
        !isFadeBlock ?
            <CRow className="position-relative">
              {loadBody()}
              <CCol xs="12" md="12">
                <CCard>
                  <CCardBody>
                    <CCardHeader className="mb-5 pt-3 pb-4 pr-0 pl-0 flex flexItemCenter flexSpace">
                      <h6 className='m-0'>Im Creating :</h6>
                      <div className="flex flexItemCenter">
                        <CButton
                            className={
                              isClientOrganization
                                  ? "mr-2 ml-2 bg-info text-white"
                                  : "mr-2 ml-2"
                            }
                            onClick={() => toggleShow("on")}
                        >
                          Organization
                        </CButton>
                        <CButton
                            className={
                              !isClientOrganization
                                  ? "mr-2 ml-2 bg-info text-white"
                                  : "mr-2 ml-2"
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
                                            src={avatar ? avatar : image["data_url"]}
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                          </CCol>
                          <CCol xs="12" md="6">
                            <CInput
                                className="mb-3"
                                type="text"
                                placeholder="industry"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                            />
                          </CCol>
                          <CCol xs="12" md="6">
                            <CInput
                                className="mb-3"
                                type="text"
                                placeholder="commercial identifier"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                          </CCol>
                          <CCol xs="12" md="6">
                            <CInput
                                className="mb-3"
                                type="tel"
                                placeholder="phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                          </CCol>
                          {/*<CCol xs="12" md="6">*/}
                          {/*  <CSelect*/}
                          {/*    custom*/}
                          {/*    className="mb-3"*/}
                          {/*    name="country"*/}
                          {/*    id="country"*/}
                          {/*    onChange={changeCountry.bind(this)}*/}
                          {/*    value={countryId}*/}
                          {/*  >*/}
                          {/*    <option selected disabled>*/}
                          {/*      select country*/}
                          {/*    </option>*/}
                          {/*    {countries.map((item) => (*/}
                          {/*      <option key={item.value} value={item.id}>*/}
                          {/*        {item.name}*/}
                          {/*      </option>*/}
                          {/*    ))}*/}
                          {/*  </CSelect>*/}
                          {/*</CCol>*/}
                          {/*<CCol xs="12" md="6">*/}
                          {/*  <CSelect*/}
                          {/*    custom*/}
                          {/*    className="mb-3"*/}
                          {/*    name="city"*/}
                          {/*    id="city"*/}
                          {/*    onChange={changeCity.bind(this)}*/}
                          {/*    value={cityId}*/}
                          {/*  >*/}
                          {/*    <option selected disabled>*/}
                          {/*      select city*/}
                          {/*    </option>*/}
                          {/*    {cities.map((item) => (*/}
                          {/*      <option key={item.value} value={item.id}>*/}
                          {/*        {item.name}*/}
                          {/*      </option>*/}
                          {/*    ))}*/}
                          {/*  </CSelect>*/}
                          {/*</CCol>*/}
                          <CCol xs="12" md="12">
                            <CTextarea
                                className="mb-3"
                                rows="9"
                                value={info}
                                onChange={(e) => setInfo(e.target.value)}
                                placeholder="Other information about the organization"
                            />
                          </CCol>
                        </CFormGroup>
                      </CCol>
                    </CFormGroup>
                    <CCardHeader className="mb-5 pt-3 pb-4 pr-0 pl-0 flex flexItemCenter flexSpace">
                      <h6 className='m-0'>Installation Type :</h6>
                      <div className="flex flexItemCenter">
                        <CButton
                            className={
                              !isStandardSetup
                                  ? "mr-2 ml-2 bg-info text-white"
                                  : "mr-2 ml-2"
                            }
                            onClick={() => toggleShow2("off")}
                        >
                          Standard
                        </CButton>
                        {isClientOrganization ? (
                            <CButton
                                className={
                                  isStandardSetup
                                      ? "mr-2 ml-2 bg-info text-white"
                                      : "mr-2 ml-2"
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
                                        value={planId}
                                        defaultChecked={planId}
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
                            value={dateStart}
                            onChange={(e) => setDateStart(e.target.value)}
                        />
                      </CCol>
                      <CCol xs="12" md="4">
                        <CLabel htmlFor="date-input">Ends At</CLabel>
                        <CInput
                            type="date"
                            min={minDate}
                            value={dateEnd}
                            onChange={(e) => setDateEnd(e.target.value)}
                        />
                      </CCol>
                      {isClientOrganization ? (
                          <CCol xs="12" md="4">
                            <CLabel htmlFor="date-input">Payment Reference</CLabel>
                            <CInput
                                type="text"
                                value={payment}
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
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                          </CCol>
                          <CCol xs="12" md="6">
                            <CLabel htmlFor="date-input">Secret Key</CLabel>
                            <CInput
                                type="text"
                                value={secretKey}
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
            :
            <CCard>
              <CCardBody>
                <CCardHeader className="mb-3 pt-3 pb-4 pr-0 pl-0 flex flexItemCenter flexSpace">
                  <h5 className='text-success m-0'>Successfully Added :</h5>
                  <CButton
                      active
                      color="info"
                      to="/organizations/organizations"
                  >
                    Go To Organization
                  </CButton>
                </CCardHeader>
                <div className='blockInfoUser'>
                  <div className='flex flexItemCenter mt-3 mb-3'>
                    <h5 className='m-0'>userName : </h5>
                    <h6 className='text-info m-0 mr-3 ml-3'>{ isName }</h6>
                  </div>
                  <div className='flex flexItemCenter mt-3 mb-3'>
                    <h5 className='m-0'>passWord : </h5>
                    <h6 className='text-info m-0 mr-3 ml-3'>{ isPass }</h6>
                  </div>
                </div>
              </CCardBody>
            </CCard>
      }
    </>
  );
};

export default CreateOrganization;
