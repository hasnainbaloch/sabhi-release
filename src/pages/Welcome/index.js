import React, { useContext, useEffect, useState } from 'react';
import './welcome.less';
import ForgetPassword from './ForgetPassword';
import LoginSignup from './LoginSignup';
import Verification from './Verification';
import CreateNewPassword from './CreateNewPassword';
import Congratulations from './Congratulation';

import { Row, Col, Typography } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import { AuthContext } from '../../context/Auth';
import { CustomeLoader, StyledLoader } from '../../components/loader';
import queryString from 'query-string';
import { resetPassword, updatePassword } from './../../services/api';

const { Text } = Typography

export default function Welcome(props) {
    const history = useHistory();
    const location = useLocation();
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [showPage, setShowPage] = useState('login')
    const [type, setType] = useState('login')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')

    const { from } = location.state || { from: { pathname: "/dashboard" } };

    const login = (data) => {
        setLoading(true)
        auth.signIn(data, () => history.replace(from), () => setLoading(false));
    };

    const signup = (data) => {
        setLoading(true)
        auth.signUp(data, () => setShowPage("login"), () => setLoading(false));
    };

    const forgetPassword = async (value) => {
        setLoading(true)
        const { data, status } = await resetPassword(value)
        if (status === 200) {
            setLoading(false)
            setShowPage("login")
        }
    };

    const createNewPassword = async (value) => {
        setLoading(true)
        const updateValues = {
            ...value,
            email: email
        }
        const { data, status } = await updatePassword(updateValues)
        if (status === 200) {
            setLoading(false)
            setShowPage("login")
        }
    };

    const backHandler = (key) => {
        switch (key) {
            case "forgotPassword":
                setShowPage("login")
                break;
            case "verification":
                setShowPage("login")
                break;
            case "create-new-password":
                setShowPage("forgotPassword")
                break;
            case "congratulations":
                setShowPage("login")
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        const { company, email } = queryString.parse(history.location.search);
        setEmail(email || "")
        setCompany(company || "")
        console.log({ company, email })
        if (window.location.search.includes("page=verification")) {
            setShowPage("verification")
        } else if (window.location.search.includes("page=create-new-password")) {
            setShowPage("create-new-password")
        } else if (window.location.search.includes("page=congratulations")) {
            setShowPage("congratulations")
        } else if (window.location.search.includes("page=signup")) {
            setType("signup")
        }
    }, [])

    return (
        <div>
            {
                loading &&
                <StyledLoader />
            }
            <Row>
                <Col className='left-side' span={12}>
                    <Row className="logo-container">
                        <div className='logo'>
                            <img src="assets/logo.svg" alt="sabhi" className="light" />
                            <img src="assets/sabhi.svg" alt="sabhi" />
                        </div>
                    </Row>
                    <Row>
                        <Col className="back-container" onClick={() => backHandler(showPage)}>
                            {
                                showPage !== "login" &&
                                <>
                                    <img src="assets/back.svg" alt="back" />
                                    <Text className="back-text">
                                        Back
                                    </Text>
                                </>
                            }
                        </Col>
                    </Row>


                    {
                        showPage === "forgotPassword" &&
                        <Row justify="center">
                            <ForgetPassword resetPassword={forgetPassword} setShowPage={setShowPage} />
                        </Row>
                    }
                    {
                        showPage === "login" &&
                        <Row justify="center">
                            <LoginSignup
                                type={type}
                                setType={setType}
                                setShowPage={setShowPage}
                                login={login}
                                signup={signup}
                                company={company}
                                email={email}
                            />
                        </Row>
                    }
                    {
                        showPage === "verification" &&
                        <Row justify="center">
                            <Verification setShowPage={setShowPage} />
                        </Row>
                    }
                    {
                        showPage === "create-new-password" &&
                        <Row justify="center">
                            <CreateNewPassword createNewPassword={createNewPassword} setShowPage={setShowPage} />
                        </Row>
                    }
                    {
                        showPage === "congratulations" &&
                        <Row justify="center">
                            <Congratulations setShowPage={setShowPage} />
                        </Row>
                    }
                    {/* <Button onClick={() => login()}>LOGIN BUTTON</Button> */}
                </Col>
                <Col align="center" justify="center" className='right-side' span={12}>
                    <img src="assets/rafiki.svg" alt="sabhi" />
                </Col>
            </Row>
        </div>
    )
}
