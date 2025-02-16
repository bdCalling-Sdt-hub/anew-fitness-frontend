import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useNavigate } from 'react-router';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values) => {
        console.log('Received values of form: ', values);
        navigate('/auth/verify-otp');
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ab0906',

                    colorBgContainer: '#ffffff',
                },
                components: {
                    Input: {
                        borderRadius: 4,
                        colorBorder: '#ab0906',
                        colorPrimaryBorder: '#ab0906',
                        hoverBorderColor: '#ab0906',
                        controlOutline: 'none',
                        activeBorderColor: '#ab0906',
                    },
                },
            }}
        >
            <div className="">
                <div className="">
                    <div className="text-primaryText text-center">
                        <h1 className="text-3xl  font-bold text-center pt-[30px] pb-[15px] text-[000000]">Forget Password ?</h1> 
                        <p className=' pb-[32px]'>Don't worry, we will send you a reset link. Once you click on that link, you will be able to reset your password.</p>
                    </div>

                    <Form
                        name="normal_ForgetPassword"
                        className="ForgetPassword-form"
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
                            <Input placeholder="Enter your email address" type="email" className="h-12" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                               
                                type="primary"
                                htmlType="submit"
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500, 
                                    fontSize: 18,
                                }}
                            >
                                Send Code
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ForgetPassword;
