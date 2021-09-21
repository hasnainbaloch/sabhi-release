import { useEffect, useState } from 'react';

import { Tabs, Col, Form, Input, Typography, Select, Checkbox, Button } from 'antd';

const { Item } = Form;
const { Option } = Select;
const { Text } = Typography;

const prefixSelector = (
  <Item name="prefix" noStyle>
    <Select defaultValue="+92" style={{ width: 70 }}>
      <Option value="92">+92</Option>
    </Select>
  </Item>
);

function LoginSignup({
  login,
  signup,
  setShowPage,
  type,
  setType,
  company,
  email
}) {
  const [phoneMessage, setPhoneMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("afasfa");
  const PHONE_REGEX = /^[0-9\b]+$/;
  const validatePhone = (value) => value.length === 11 && PHONE_REGEX.test(value);
  const onBlurHandler = e => {
    console.log({ validatePhone: validatePhone(e) })
    if (!validatePhone(e)) {
      setPhoneMessage('Enter a valid Phone number.');
      setPhoneNumber(null);
    } else {
      setPhoneNumber(e)
    }
  };
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      companyname: "company",
      email: "email",
    });
  }, [])

  return (
    <div>
      <Col>
        <Tabs activeKey={type} size="large" onChange={setType} centered>
          <Tabs.TabPane key="login" tab="Login" />
          <Tabs.TabPane key="signup" tab="Sign up" />
        </Tabs>
        <br />

        {type === 'login' && (
          <Form
            className="container"
            onFinish={async (values) => {
              await login(values);
            }}
          >
            <Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'email not valid!',
                },
                {
                  required: true,
                  message: ' ',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Item>
            <Item
              name="password"
              rules={[{ required: true, message: ' ' }, { min: 3 }]}
            >
              <Input.Password placeholder="Create password" />
            </Item>
            <div className='remember-me'>
              <Checkbox>
                Remember me
              </Checkbox>
              <a onClick={() => setShowPage("forgotPassword")}>
                <Text
                  underline
                  style={{
                    color: '#1890FF',
                  }}
                >
                  Forgot password?
                </Text>
              </a>
            </div>
            <Button type="primary" htmlType="submit" className="full-width">
              Login
            </Button>
          </Form>
        )}

        {type === 'signup' && (
          <Form
            className="container"
            onFinish={async (values) => {
              await signup(values);
            }}
          >
            <Item
              name="fullname"
              rules={[{ required: true, message: ' ' }]}
            >
              <Input placeholder="Full name" />
            </Item>
            <Item
              name="companyname"
              rules={[{ required: true, message: ' ' }]}
            >
              <Input disabled={company && true} placeholder="Company name" />
            </Item>
            <Item
              name="phone"
              rules={[{ required: true, message: phoneMessage }]}
            >
              <Input
                onBlur={(e) => onBlurHandler(e.target.value)}
                controls={false}
                value={phoneNumber}
                // addonAfter={null}
                addonBefore={prefixSelector}
                style={{ width: '100%' }}
                placeholder="Phone number" />
            </Item>
            <Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'email not valid!',
                },
                {
                  required: true,
                  message: ' ',
                },
              ]}
            >
              <Input disabled={email && true} placeholder="Email" />
            </Item>
            <Item
              name="password"
              rules={[{ required: true, message: ' ' }, { min: 7 }]}
            >
              <Input.Password placeholder="Create password" />
            </Item>
            <div style={{ marginBottom: 32 }}>
              <Checkbox>
                I agree to the
              </Checkbox>
              <a onClick={() => console.log('t&c')}>
                <Text
                  underline
                  style={{
                    color: '#1890FF',
                  }}
                >
                  Terms and Conditions
                </Text>
              </a>
            </div>
            <Button type="primary" htmlType="submit" className="full-width">
              Sign up
            </Button>
          </Form>
        )}
      </Col>
    </div>
  )
}

export default LoginSignup
