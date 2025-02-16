import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useNavigate } from 'react-router';

const NewPassword = () => {
    const navigate = useNavigate();
    const onFinish: FormProps<FieldNamesType>['onFinish'] = (values) => {
        console.log('Received values of form: ', values);
        navigate('/');
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#AB0906',

                    colorBgContainer: '#ffffff',
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
                <div className="">
                    <div className="text-primaryText max-w-md mx-auto  text-center pb-[30px]">
                        <h1 className="text-3xl  font-semibold text-center pt-[30px] pb-[15px]">Set a new password</h1>
                        <p>Your new password must be different to previously used passwords.</p>
                    </div>

                    <Form
                        name="normal_NewPassword"
                        className="NewPassword-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    New Password
                                </label>
                            }
                            name="new_password"
                            rules={[{ required: true, message: 'Please input new password!' }]}
                        >
                            <Input.Password placeholder="KK!@#$15856" className=" h-12 px-6" />
                        </Form.Item>
                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    Confirm Password
                                </label>
                            }
                            name="confirm_password"
                            rules={[{ required: true, message: 'Please input confirm password!' }]}
                        >
                            <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
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
                                Update Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default NewPassword;
