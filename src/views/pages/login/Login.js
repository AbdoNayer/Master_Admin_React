import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow, CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [typeConsole, setTypeConsole] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const login = async () => {

    setLoading(true)

    const response = await fetch(
      "https://trendsgcc.ew.r.appspot.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (response.status === 200) {
      setIsError(false)
      setLoading(false)
      setTypeConsole('successfully registered')
      const resp = await response.json();
      const str = JSON.stringify(resp);
      localStorage.setItem("tosafeAdmin", str);
      window.location.reload();
    }else {
      setIsError(true)
      setLoading(false)
      setTypeConsole('check your data')
    }

  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center sectionLogin">
      <div className='overLay'/>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <p className={isError ? "text-danger" : "text-success"}>{typeConsole}</p>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          onClick={login}
                          color="primary"
                          className="px-4"
                        >
                          {
                            loading ?
                                <CSpinner variant="white" style={{width:'1rem', height:'1rem'}} />
                                :
                                <span>Login</span>
                          }
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Welcome Admin</h2>
                    <p>
                      If you found any problem please contact the tech team
                      here.{" "}
                    </p>
                    <a href="mailto:tech-support@trendsgcc.com">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        tech-support@trendsgcc.com
                      </CButton>
                    </a>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
