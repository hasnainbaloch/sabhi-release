import { Tabs, Row, Col, Form, Typography, Input, Button } from 'antd';
import { useState } from 'react';

const { Text } = Typography;
const { Item } = Form;
const { TabPane } = Tabs

function CreateNewPassword() {

  const onFinish = (values) => {
    console.log(values);
  };

  const [submitting, setSubmitting] = useState(false)

  return (
    <div>
      <Row justify="center" className="padding-bottom">
        <Tabs size="large" centered>
          <TabPane key="Create new password" tab="Create new password" />
        </Tabs>
      </Row>
      <Row>
        <Col>
          <Form name="nest-messages" className="container" onFinish={onFinish}>
            <div className="padding-bottom">
              <Text>
                Reset your password below
              </Text>
            </div>
            <Item
              name="password"
              rules={[
                {
                  required: true,
                  message: ' ',
                },
                { min: 7 }
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password" />
            </Item>
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
              <Input.Password placeholder="Confirm password" />
            </Item>
            <Button type="primary" htmlType="submit" className="full-width">
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default CreateNewPassword