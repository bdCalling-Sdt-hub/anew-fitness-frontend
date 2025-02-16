import { Button, Checkbox, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values) => {
        console.log('Received values of form: ', values);
        navigate('/');
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ab0906',

                    colorBgContainer: '#fffff',
                },
                components: {
                    Input: {
                        borderRadius: 4,
                        colorBorder: '#AB0906',
                        colorPrimaryBorder: '#AB0906',
                        hoverBorderColor: '#AB0906',
                        controlOutline: 'none',
                        activeBorderColor: '#AB0906',
                    },
                },
            }}
        >
            <div className="">
                <div className=" ">
                        <p className="text-[16px] font-semibold py-3 text-[#383737]  flex items-center justify-center ">Welcome back! Please enter your details.</p>
                  

                    <Form
                        name="normal_login"
                        className="login-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="email" className="block text-primaryText mb-1 text-lg">
                                    Email
                                </label>
                            }
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input placeholder="Enter your email address" type="email" className=" h-12  px-6 " />
                        </Form.Item>

                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    Password
                                </label>
                            }
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password placeholder="Enter your password" className=" h-12  px-6" />
                        </Form.Item>

                        <div className="flex items-center justify-between mb-4">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className="text-primaryText text-lg">Remember me</Checkbox>
                            </Form.Item>
                            <Link to="/auth/forget-password" className="text-primary text-md hover:text-primary font-bold">
                                Forget password
                            </Link>
                        </div>

                        <Form.Item>
                            <Button
                                // shape="round" 
                                type="primary"
                                htmlType="submit"
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500, 
                                    fontSize: 18,
                                }}
                                // onClick={() => navigate('/')}
                            >
                                Log In 
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Login;
