import { Col, Layout, Row, Typography, Form, Button, Divider } from "antd"
import { DeleteOutlined } from '@ant-design/icons';
import './Settings.less';

const { Title, Text } = Typography
const { Content } = Layout

const Role = ({ email, role }) => {
  return (
    <Row justify="space-around" align="center">
      <Col span={9}>
        <Text>{email || '--'}</Text>
        <Divider />
      </Col>
      <Col span={9}>
        <Text>{role || '--'}</Text>
        <Divider />
      </Col>
      <Col className="_role-right" span={6}>
        <Button danger type="text">
          <DeleteOutlined />Delete
        </Button>
        <Button style={{ color: '#1890FF' }} type="text">
          Edit
        </Button>
      </Col>
    </Row>
  )
}

function AdminControl() {
  return (
    <>
      <Content style={{ background: '#f0f2f5' }}>
        <Form>
          <Row>
            <Col offset={6} span={12} className="_container">
              <Row justify="space-between" align="center">
                <Col>
                  <Title level={4}>Team</Title>
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit" className="_invite-button">
                    Invite
                  </Button>
                </Col>
              </Row>
              <br />
              <Row justify="start">
                <Col span={9}>
                  <Title level={5}>
                    {/* <Divider type="vertical" /> */}
                    Email</Title>
                </Col>
                <Col span={9}>
                  <Title level={5}>
                    {/* <Divider type="vertical" /> */}
                    Role</Title>
                </Col>
              </Row>
              <br />
              <Role email="hamzabaqi@gmail.com" role="admin" />
              <Role email="ehtishamislam@gmail.com" role="admin" />
              <Role email="bilalawan@gmail.com" role="admin" />
            </Col>
          </Row>
        </Form>
      </Content>
    </>
  )
}

export default AdminControl
