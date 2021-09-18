import { Layout, Menu, Dropdown, Row, Col, Badge, Space, Avatar, Typography } from 'antd';
import { DownOutlined, BellOutlined, UserOutlined, MailOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/Auth';

const { Header } = Layout;
const { Item } = Menu;
const { Text } = Typography;

const menu = (
    <Menu>
        <Item key="name" icon={<UserOutlined />}>
            Serati ma
        </Item>
        <Item key="team" icon={<MailOutlined />}>
            Invite Team
        </Item>
        <Item key="settings" icon={<SettingOutlined />}>
            Settings
        </Item>
        <Item key="logout" icon={<LogoutOutlined />}>
            Sign Out
        </Item>
    </Menu>
);

function AppHeader() {

    const auth = useContext(AuthContext);
    console.log({ auth })
    const [count, setCount] = useState(1)
    return (
        <Header className="site-layout-background">
            <Row justify="end">
                <Col>
                    <Space>
                        <Badge count={count}>
                            <BellOutlined className='icon' />
                        </Badge>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link user-avatar">
                                <Avatar src="https://palife.co.uk/wp-content/uploads/2017/11/dummy.jpg" />
                                <Text>
                                    {auth.user.fullName}
                                </Text>
                            </a>
                        </Dropdown>
                    </Space>
                </Col>
            </Row>
        </Header>
    )
}

export default AppHeader
