import React from 'react'

import { Menu, Typography, Row, Button, Space, Col } from 'antd';
import {
    DashboardOutlined,
    FormOutlined,
    TableOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

const { SubMenu, Item } = Menu;
const { Title, Text } = Typography


export default function AppMenu({ collapsed }) {
    return (
        <div className="_side-menu-wrapper">
            <div className="logo" >
                <img src='assets/logo.svg' alt="" />
                {!collapsed &&
                    <Title level={4}>Dashboard</Title>
                }
            </div>

            <div className="_side-menu-layout">
                <Menu theme="light" defaultSelectedKeys={['dashboard']} mode="inline">
                    <Item key="dashboard" icon={<DashboardOutlined />}>
                        Dashbaord
                    </Item>
                    <SubMenu key="integration" icon={<FormOutlined />} title="Integration">
                        <Item key="1">Get started</Item>
                        <Item key="2">New applicant</Item>
                        <Item key="3">Activate webhooks</Item>
                        <Item key="4">API integration</Item>
                        <Item key="5">Activate account</Item>
                    </SubMenu>
                    <SubMenu key="activation" icon={<TableOutlined />} title="Activation">
                        <Item key="6">Get started</Item>
                        <Item key="7">Company information</Item>
                        <Item key="8">Billing information</Item>
                        <Item key="9">Select plan</Item>
                        <Item key="10">Activate account</Item>
                    </SubMenu>
                    <SubMenu key="developers" icon={<CheckCircleOutlined />} title="Developers">
                        <Item key="11">Documentation</Item>
                        <Item key="12">API logs</Item>
                        <Item key="13">Activate webhooks</Item>
                        <Item key="14">Webhooks</Item>
                        <Item key="15">Events</Item>
                    </SubMenu>
                </Menu>

                {
                    !collapsed &&
                    <Row justify="center" className="_bottom-menu">
                        <Space direction="vertical">
                            <Text type="secondary" className="_bottom-text" strong>Have a question?</Text>
                            <Button type="dashed">Visit Help Center</Button>
                            <Button type="dashed">Contact support</Button>
                        </Space>
                    </Row>
                }
            </div>
        </div>
    )
}
