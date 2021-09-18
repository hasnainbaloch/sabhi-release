import React, { useContext, useState } from 'react';
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

const { Text } = Typography

export default function Welcome() {
    const history = useHistory();
    const location = useLocation();
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const { from } = location.state || { from: { pathname: "/dashboard" } };

    const login = (data) => {
        console.log({ data })
        setLoading(true)
        auth.signIn(data, () => history.replace(from));
        setLoading(false)
    };

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
                        <Col className="back-container" onClick={() => history.push('/welcome')}>
                            {/* <img src="assets/back.svg" alt="back" /> */}
                            <Text className="back-text">
                                Under development!
                            </Text>
                        </Col>
                    </Row>
                    {/* <Row justify="center">
                        <ForgetPassword />
                    </Row> */}
                    <Row justify="center">
                        <LoginSignup login={login} />
                    </Row>
                    {/* <Row justify="center">
                        <Verification />
                    </Row> */}
                    {/* <Row justify="center">
                        <CreateNewPassword />
                    </Row> */}
                    {/* <Row justify="center">
                        <Congratulations />
                    </Row> */}
                    {/* <Button onClick={() => login()}>LOGIN BUTTON</Button> */}
                </Col>
                <Col align="center" justify="center" className='right-side' span={12}>
                    <img src="assets/rafiki.svg" alt="sabhi" />
                </Col>
            </Row>
        </div>
    )
}
