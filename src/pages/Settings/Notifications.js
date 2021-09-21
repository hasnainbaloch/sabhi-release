import { Col, Layout, Row, Typography, Form, Button, Space, Checkbox } from "antd"
import './Settings.less';

const { Title } = Typography
const { Content } = Layout

function Notifications() {
  return (
    <>
      <Content style={{ background: '#f0f2f5' }}>
        <Form>
          <Row justify="space-between" align="center">
            <Col offset={6} span={12} className="_container">
              <Title level={4}>Email Notifications</Title>
              <br />
              <Space direction="vertical">
                <Checkbox>New verifications</Checkbox>
                <Checkbox>Weekly summaries</Checkbox>
                <Checkbox>Product updates and Sabhi news</Checkbox>
              </Space>
            </Col>
          </Row>
          <br />
          <Row justify="space-between" align="center">
            <Col offset={6} span={12}>
              <Space>
                <Col>
                  <Button type="primary" htmlType="submit" className="_button-width">
                    Save
                  </Button>
                </Col>
                <Col>
                  <Button className="_button-width">
                    Cancel
                  </Button>
                </Col>
              </Space>
            </Col>
          </Row>
        </Form>
      </Content>
    </>
  )
}

export default Notifications
