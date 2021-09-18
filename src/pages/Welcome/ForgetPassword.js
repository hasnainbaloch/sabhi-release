import { Tabs, Row, Col, Form, Typography, Input, Button } from 'antd';
import { useState } from 'react';

const { Text } = Typography;
const { Item } = Form;
const { TabPane } = Tabs


const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} not valid!',
  }
};

function ForgetPassword() {

  const onFinish = (values) => {
    console.log(values);
  };

  const [submitting, setSubmitting] = useState(false)

  return (
    <div>
      <Row justify="center" className="padding-bottom">
        <Tabs size="large" centered>
          <TabPane key="Reset password" tab="Reset password" />
        </Tabs>
      </Row>
      <Row className="container">
        <Col>
          <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <div className="padding-bottom">
              <Text>
                Enter your registered email below to recieve password reset instructions
              </Text>
            </div>
            <Item
              name={['email']}
              rules={[{ type: 'email' }]}
            >
              <Input placeholder="Enter here" />
            </Item>
            <Button type="primary" htmlType="submit" className="full-width">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default ForgetPassword