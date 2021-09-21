import React from 'react'

import { Menu, Typography, Row, Button, Space } from 'antd';
import {
    DashboardOutlined,
    FormOutlined,
    TableOutlined,
    CheckCircleOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { SubMenu, Item } = Menu;
const { Title, Text } = Typography


export default function AppMenu({ collapsed }) {
    const history = useHistory()
    return (
        <div className="_side-menu-wrapper">
            <div className="logo" >
                <img src='assets/logo.svg' alt="" />
                {!collapsed &&
                    <Title level={4}>Dashboard</Title>
                }
            </div>

            <div className="_side-menu-layout">
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                    <Item onClick={() => history.push('/dashboard')} key="dashboard" icon={<DashboardOutlined />}>
                        Dashboard
                    </Item>
                    <SubMenu key="integration" icon={<FormOutlined />} title="Integration">
                        <Item key="1">Get started</Item>
                        <Item key="2">New applicant</Item>
                        <Item key="3">Activate webhooks</Item>
                        <Item key="4">API integration</Item>
                        <Item key="5">Activate account</Item>
                    </SubMenu>
                    <SubMenu key="developers" icon={<TableOutlined />} title="Developers">
                        <Item key="6">Documentation</Item>
                        <Item key="7">API logs</Item>
                        <Item key="8">Activate webhooks</Item>
                        <Item key="9">Webhooks</Item>
                        <Item key="10">Events</Item>
                    </SubMenu>
                    <Item onClick={() => history.push('/activation')} key="activation" icon={<CheckCircleOutlined />}>
                        Activate Sandbox
                    </Item>
                    <SubMenu key="settings" icon={<SettingOutlined />} title="Settings">
                        <Item key="11" onClick={() => history.push('/settings/profile')}>Profile</Item>
                        <Item key="12" onClick={() => history.push('/settings/notifications')}>Notification</Item>
                        <Item key="13" onClick={() => history.push('/settings/control')}>Admin Control</Item>
                        <Item key="14" onClick={() => history.push('/settings/subscription')}>Subscription</Item>
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
