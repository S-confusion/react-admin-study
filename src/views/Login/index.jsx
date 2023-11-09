import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { login } from "@/store/modules/user";
import styles from "./login.module.scss";
import { isPhone } from "@/utils/validator.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    await dispatch(login(values));
    navigator("/page1");
    message.success("登录成功");
  };
  return (
    <div className={styles.root}>
      <Form
        name="normal_login"
        className="login-form"
        validateTrigger="onBlur"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="mobile"
          rules={[
            { required: true, message: "Please input your mobile!" },
            () => ({
              validator(_, value) {
                if (!value || isPhone(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("请输入正确的手机号!"));
              },
            }),
          ]}
        >
          <Input
            className="login-input user"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="mobile"
          />
        </Form.Item>
        <Form.Item
          name="code"
          className="login-input password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox >Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item> */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
