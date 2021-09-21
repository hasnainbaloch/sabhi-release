import React, { useContext, useState, useEffect, useMemo } from 'react';
import './dashboard.less';
import ApplicantsTable from './../../components/tables/ApplicantsTable';

import { Col, Input, Layout, Radio, Row, Space, Typography } from 'antd';
import { getApplicantsListWithRecord } from '../../services/api';
import { SocketContext } from '../../context/Socket';

const { Group, Button: RadioButton } = Radio
const { Title } = Typography
const { Search } = Input

export default function Dashboard() {
    let SOCKET = useContext(SocketContext);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [allpicantsList, setAllpicantsList] = useState([]);
    const [newRecord, setNewRecord] = useState(false)

    const [value, setValue] = useState('pending')

    useEffect(() => {
        async function fetchApplicantsList() {
            setShowSkeleton(true)
            try {
                const { data, status } = await getApplicantsListWithRecord("pending");

                if (status) {
                    setAllpicantsList(data?.data);
                    setShowSkeleton(false)
                }
            } catch (error) {
                console.log(error, 'error')
            }
        }
        fetchApplicantsList()
    }, [])

    let newSocketInterval = null;
    // update socket record
    useMemo(() => {
        setAllpicantsList(allRecord => [SOCKET?.applicantReport, ...allRecord]);
        setNewRecord(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        newSocketInterval = setTimeout(() => {
            setNewRecord(false);
        }, 5000);
        // clear socket interval
        return () => clearInterval(newSocketInterval);
    }, [SOCKET?.applicantReport])

    const handleWithStatus = async (status) => {
        setShowSkeleton(true)
        try {
            const res = await getApplicantsListWithRecord(status);
            if (res.status) {
                setAllpicantsList(res.data.data);
                setShowSkeleton(false)
            }
        } catch (error) {
            console.log({ error })
        }
    }

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
                        <RadioButton onClick={() => handleWithStatus("pending")} value="pending">Pending</RadioButton>
                        <RadioButton onClick={() => handleWithStatus("accepted")} value="accepted">Accepted</RadioButton>
                        <RadioButton onClick={() => handleWithStatus("rejected")} value="rejected">Rejected</RadioButton>
                        <RadioButton onClick={() => handleWithStatus("all")} value="all">All</RadioButton>
                    </Group>
                </Space>
            </Layout.Content>
            <div style={{ height: "15px", backgroundColor: "#F0F2F5" }}></div>

            <Layout.Content className="_tableContainer">
                {
                    <ApplicantsTable showSkeleton={showSkeleton} data={allpicantsList} newRecord={newRecord} />
                }
            </Layout.Content>

            {/* <NotificationBox /> */}
        </div>
    )
}
