import { Col, Layout, Row, Typography, Form, Input, Button, Space } from "antd"
import './Settings.less';

const { Title, Text } = Typography
const { Content } = Layout
const { Item } = Form;

function Settings() {
  return (
    <>
      <Content style={{ background: '#f0f2f5' }}>
        <Form>
          <Row justify="space-between" align="center">
            <Col offset={6} span={12} className="_container">
              <Title level={4}>Personal Information</Title>
              <br />
              <div>
                <Text>First name</Text>
                <Item
                  name="firstname"
                  rules={[{ required: true, message: ' ' }]}
                >
                  <Input placeholder="Muhammad" />
                </Item>
              </div>
              <div>
                <Text>Last name</Text>
                <Item
                  name="lastname"
                  rules={[{ required: true, message: ' ' }]}
                >
                  <Input placeholder="Hamza Baqi" />
                </Item>
              </div>
            </Col>
          </Row>
          <Row justify="space-between" align="center">
            <Col offset={6} span={12} className="_container">
              <Title level={4}>Account Information</Title>
              <br />
              <div>
                <Text>Email</Text>
                <Item
                  name="email"
                  rules={[
                    { type: 'email', message: 'email not valid!' },
                    { required: true, message: ' ' }
                  ]}
                >
                  <Input placeholder="hamzabaqi@gmail.com" />
                </Item>
              </div>
              <div>
                <Text>Password</Text>
                <Item
                  name="password"
                  rules={[
                    { required: true, message: ' ' },
                    { min: 7 }
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="********" />
                </Item>
              </div>
              <div>
                <Text>Confirm Password</Text>
                <Item
                  name="confirm"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('passwords not matched!'));
                      }
                    })
                  ]}
                >
                  <Input.Password placeholder="12345678" />
                </Item>
              </div>
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

export default Settings
