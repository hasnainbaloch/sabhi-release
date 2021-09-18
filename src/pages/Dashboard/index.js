import React, { useContext, useState, useEffect } from 'react';
import './dashboard.less';

import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import ApplicantsTable from './../../components/tables/ApplicantsTable';
import NotificationBox from './../../components/notificationBox';

import { Button, Col, Input, Layout, Radio, Row, Space, Typography } from 'antd';
import { getApplicantsListWithRecord } from '../../services/api';
import CustomeLoader from '../../components/loader';

const { Group, Button: RadioButton } = Radio
const { Title } = Typography
const { Search } = Input

export default function Dashboard() {

    const [showSkeleton, setShowSkeleton] = useState(false);
    const [allpicantsList, setAllpicantsList] = useState([]);
    const [value, setValue] = useState('pending')
    const [loading, setLoading] = useState(true)
    let history = useHistory();
    let auth = useContext(AuthContext);

    useEffect(async () => {
        // setLoading(false)
        setShowSkeleton(true)
        try {
            const res = await getApplicantsListWithRecord("pending");
            console.log({ res })

            if (res.status) {
                setAllpicantsList(res.data.data);
                setShowSkeleton(false)
                // setLoading(false)
            }
        } catch (error) {
            console.log({ error })
            // setLoading(false)
        }
    }, []);

    return (
        <div>
            <Layout.Content className='_container'>
                <Row justify="space-between" align="center">
                    <Col span={4}>
                        <Title level={4}>Applications</Title>
                    </Col>
                    <Col span={4}>
                        <Search placeholder="Search" />
                    </Col>
                </Row>
                <Space direction="vertical">
                    <Group
                        defaultValue={value}
                        buttonStyle="solid"
                        onChange={(e) => setValue(e.target.value)}
                    >
                        <RadioButton value="pending">Pending</RadioButton>
                        <RadioButton value="accepted">Accepted</RadioButton>
                        <RadioButton value="rejected">Rejected</RadioButton>
                        <RadioButton value="all">All</RadioButton>
                    </Group>
                </Space>
            </Layout.Content>
            <div style={{ height: "15px", backgroundColor: "#F0F2F5" }}></div>

            <Layout.Content className="_tableContainer">
                {
                    <ApplicantsTable showSkeleton={showSkeleton} data={allpicantsList} />
                }
            </Layout.Content>

            {/* <NotificationBox /> */}
        </div>
    )
}
