import React, { useState } from 'react';
import './layout.less';

import { Layout, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';

import AppHeader from './AppHeader';
import AppMenu from './AppMenu';

const { Content, Footer, Sider } = Layout;

export default function AppLayout({ component, path }) {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                zIndex: 9999
            }} className="side-menu-shadow" trigger={null} collapsible collapsed={collapsed} onCollapse={onCollapse}>
                {/* App menu */}
                <AppMenu collapsed={collapsed} />

                {/* side-menu bottom toggle button */}
                <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16, background: 'white', color: 'black', border: 'none' }} className="collapsed-btn">
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
            </Sider>
            <Layout className="site-layout">
                {/* App top header */}
                <AppHeader />

                {/* rest of the body content */}
                <Content style={{ margin: '16px 60px 16px 16px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb> */}

                    <div className="site-layout-background" style={!collapsed ? { marginLeft: "220px" } : { marginLeft: "100px" }}>
                        {/* dynamic component render*/}
                        {component}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}
