import { Button, ConfigProvider, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { useForgetPasswordMutation } from '../../redux/features/auth/authApi';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { SetLocalStorage } from '../../utils/LocalStroage';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [forgetPassword, { isLoading, isSuccess, isError, error, data }] = useForgetPasswordMutation(); 
    const [email , setEmail] = useState("")

    useEffect(() => {
        if (isSuccess) {
            if (data) {
                Swal.fire({
                    text: data?.message,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    navigate('/auth/verify-otp') 
                    SetLocalStorage("email", email); 
                    window.location.reload();
                });
            }

        }
        if (isError) {
            Swal.fire({
                title: "Failed to Login",
                //@ts-ignore
                text: error?.data?.message,
                icon: "error",
            });
        }
    }, [isSuccess, isError, error, data, navigate]);


    const onFinish = async (values:{email:string}) => {
 
        setEmail(values.email) 
        await forgetPassword(values)
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
                                {isLoading ? 'Sending...' : 'Send Code'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ForgetPassword;
