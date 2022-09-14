import { useState } from 'react';
import { Form, Input, Button, Row, Col, message, Card, Divider, Avatar } from 'antd';
//import logoLogin from '../../assets/logo.jpeg';
import logo from '../../assets/logo-example.jpg';
import logoBg from '../../assets/delivery-bg.jpg';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import '../../assets/styles/Login.css'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

interface Account {
  email: string;
  passowrd: string;
}

const Login = () => {
  const [account, setAccount] = useState<Account>({email: "", passowrd: ""});
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async () => {
    if(loading) return;

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, account.email, account.passowrd);
    } catch (error) {
      console.log(error);
      message.error("Error, datos incorrectos.");
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <Row justify="center">
        <Col >
          <div className='app-login-wrapper'>
            <Card
              className='app-login-card'
              cover={
                <div className="app-login-bg">
                  <img alt="login-bg" height={200} src={logoBg}/>
                  <div className="app-login-logo">
                    <Avatar
                      src={logo}
                      alt="logo"
                      style={{
                        width: 100,
                        height: 100
                      }}
                    />
                  </div>
                </div>
              }
            >
              <div className="app-login-title">
                <span>Inicio de Sesión</span>
              </div>
              <div className="app-login-subtitle">
                <p>Bienvenido</p>
              </div>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout='vertical'
                className='app-login-form'
              >
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Favor de escribir el correo.' }]}
                  hasFeedback
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    value={account.email}
                    onChange={(e) => setAccount({...account, email: e.target.value})}
                    placeholder="Correo"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Favor de escribir la contraseña.' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    value={account.passowrd}
                    onChange={(e) => setAccount({...account, passowrd: e.target.value})}
                    placeholder="Contraseña"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Entrar
                  </Button>
                </Form.Item>
              </Form>
              <Row gutter={[16, 0]} justify="space-around">
                <Col span={12}>
                  <a href="#app-store">
                    <img src="/app-store.png" alt="img-app-store" width="120" />
                  </a>
                </Col>
                <Col span={12}>
                  <a href="#google-play">
                    <img src="/google-play.png" alt="img-google-play" width="120" />
                  </a>
                </Col>
              </Row>
              <Divider />
                <div className="app-login-footer">
                    <span >Derechos reservados { new Date().getFullYear() } &#xa9;</span>
                </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Login;