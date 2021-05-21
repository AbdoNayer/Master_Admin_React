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
    CRow,
} from "@coreui/react";

import Axios from "../../actions/Index";
import Loading from "../../containers/Loader";

const CreateOrganization = (data) => {

    console.log(data)

    const [errToasts, setErrToasts] = useState(false);
    const [toastMass, setToastMass] = useState("");
    const [loader, setLoader] = useState(false);
    const [plans, setPlans] = useState([]);
    const [planId, setPlanId] = useState(null);
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [payment, setPayment] = useState("");
    const [link, setLink] = useState(undefined);
    const [secretKey, setSecretKey] = useState(undefined);
    const [minDate, setMinDate] = useState("");
    const [isClientOrganization, setIsClientOrganization] = useState(true);
    const [isStandardSetup, setIsStandardSetup] = useState(false);

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

        if (planId == null) {
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
                apiLink: link,
                apiSecret: secretKey,
                planId: planId,
                id: data.location.id.id,
                startsAt: dateStart,
                endsAt: dateEnd,
                paymentRef: payment,
            };

            Axios(dataVal, "organizations/subscribe/", "POST")
                .then((response) => {
                    data.history.push({pathname : "/organizations/detailsOrganization/"+ data.location.id.id, id : { id: data.location.id.id }});
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
                                <h6>Installation Type :</h6>
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
        </>
    );
};

export default CreateOrganization;
