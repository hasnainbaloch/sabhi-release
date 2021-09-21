import { Col, Layout, Row, Typography, Form, Button, Space, Checkbox } from "antd"
import './Settings.less';

const { Title } = Typography
const { Content } = Layout

function Subscription() {
  return (
    <>
      <Content style={{ background: '#f0f2f5' }}>
        <Form>
          <Row justify="space-between" align="center">
            <Col offset={6} span={12} className="_container">
              <Title level={4}>Team</Title>
              <br />

            </Col>
          </Row>
        </Form>
      </Content>
    </>
  )
}

export default Subscription
