import React, { useEffect, useState } from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormGroup,
    CInput,
    CSelect,
    CTextarea,
    CRow,
} from "@coreui/react";

import ImageUploading from "react-images-uploading";
import { FiPlusSquare } from "react-icons/fi";
import Axios from "../../actions/Index";
import Loading from "../../containers/Loader";

const UpdateInfoOrganization = (data) => {
    const [avatar, setAvatar] = useState("");
    const [errToasts, setErrToasts] = useState(false);
    const [toastMass, setToastMass] = useState("");
    const [loader, setLoader] = useState(true);
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
    const [organizationType, setOrganizationType] = useState("");
    const [name, setName] = useState("");
    const [industry, setIndustry] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [phone, setPhone] = useState("");
    const [countryId, setCountryId] = useState("");
    const [cityId, setCityId] = useState("");
    const [info, setInfo] = useState("");
    const maxNumber = 1;

    function fetchData() {
        Axios(null, "organizations/" + data.location.data.id, "GET")
            .then((response) => {
                images.push(response.data.logo);
                setAvatar(response.data.logo);
                setName(response.data.name);
                setIndustry(response.data.industry);
                setIdentifier(response.data.commercialIdentifier);
                setPhone(response.data.phone);
                setInfo(response.data.about);
                setCityId(response.data.cityId);
                setCountryId(response.data.countryId);
                setOrganizationType(response.data.organizationType);
                setLoader(false);
            })
            .catch((err) => {
                console.log("err ---", err);
                setLoader(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

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

    function validate() {
        let isError = false;
        setToastMass("");

        if (avatar === "") {
            isError = true;
            setErrToasts(true);
            setToastMass("set logo");
        } else if (name === "") {
            isError = true;
            setErrToasts(true);
            setToastMass("set name");
        } else if (industry === "") {
            isError = true;
            setErrToasts(true);
            setToastMass("set industry");
        } else if (identifier === "") {
            isError = true;
            setErrToasts(true);
            setToastMass("set identifier");
        } else if (phone === "") {
            isError = true;
            setErrToasts(true);
            setToastMass("set phone");
        } else if (info === "") {
            isError = true;
            setErrToasts(true);
            setToastMass("set info");
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
                industry: industry,
                // countryId: countryId,
                // cityId: cityId,
                cityId: 0,
                commercialIdentifier: identifier,
                about: info,
                phone: phone,
            };

            Axios(dataVal, "organizations/" + data.location.data.id, "PUT")
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

    function loadBody() {
        if (loader) {
            return <Loading name="loadBody" value="please wait ..." />;
        }
    }

    return (
        <>
            {errToasts ? (
                <div className="toastFun">
                    <h5 className="m-0">{toastMass}</h5>
                </div>
            ) : null}
            <CRow className="position-relative">
                {loadBody()}
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardBody>
                            <CCardHeader className="mb-5 pt-3 pb-4 pr-0 pl-0 flex flexItemCenter flexSpace">
                                <h6>Edit Organization Basic Info :</h6>
                                <CButton className="mr-2 ml-2 bg-info text-white">
                                    {organizationType}
                                </CButton>
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
                                        {/*    <CSelect*/}
                                        {/*        custom*/}
                                        {/*        className="mb-3"*/}
                                        {/*        name="country"*/}
                                        {/*        id="country"*/}
                                        {/*        onChange={changeCountry.bind(this)}*/}
                                        {/*        value={countryId}*/}
                                        {/*    >*/}
                                        {/*        <option selected disabled>*/}
                                        {/*            select country*/}
                                        {/*        </option>*/}
                                        {/*        {countries.map((item) => (*/}
                                        {/*            <option key={item.value} value={item.id}>*/}
                                        {/*                {item.name}*/}
                                        {/*            </option>*/}
                                        {/*        ))}*/}
                                        {/*    </CSelect>*/}
                                        {/*</CCol>*/}
                                        {/*<CCol xs="12" md="6">*/}
                                        {/*    <CSelect*/}
                                        {/*        custom*/}
                                        {/*        className="mb-3"*/}
                                        {/*        name="city"*/}
                                        {/*        id="city"*/}
                                        {/*        onChange={changeCity.bind(this)}*/}
                                        {/*        value={cityId}*/}
                                        {/*    >*/}
                                        {/*        <option selected disabled>*/}
                                        {/*            select city*/}
                                        {/*        </option>*/}
                                        {/*        {cities.map((item) => (*/}
                                        {/*            <option key={item.value} value={item.id}>*/}
                                        {/*                {item.name}*/}
                                        {/*            </option>*/}
                                        {/*        ))}*/}
                                        {/*    </CSelect>*/}
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
                                update organization
                            </CButton>
                        </div>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default UpdateInfoOrganization;
