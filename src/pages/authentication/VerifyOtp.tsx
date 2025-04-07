import { Button, ConfigProvider, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { GetLocalStorage } from '../../utils/LocalStroage';
import { useForgetPasswordMutation, useVerifyEmailMutation } from '../../redux/features/auth/authApi';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const email = GetLocalStorage("email")
    const [verifyEmail, { isLoading, error: verifyError, data: verifyData, isSuccess: verifyIsSuccess, isError: verifyIsError }] = useVerifyEmailMutation()
    const [forgetPassword, { isSuccess, isError, error, data }] = useForgetPasswordMutation();

    // for otp password  
    useEffect(() => {
        if (verifyIsSuccess) {
            if (verifyData) {
                Swal.fire({
                    text: verifyData?.message,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    navigate("/auth/new-password")
                    //   setToLocalStorage("resetToken", res?.data?.data); 
                    window.location.reload();
                })
            }

        }
        if (verifyIsError) {
            Swal.fire({
                title: "Failed to Login",
                //@ts-ignore
                text: verifyError?.verifyData?.message,
                icon: "error",
            });
        }
    }, [verifyIsSuccess, verifyIsError, verifyError, verifyData, navigate]);


    // for resend password  
    useEffect(() => {
        if (isSuccess) {
            if (data) {
                Swal.fire({
                    text: data?.message,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                })
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



    const onFinish = async (values: { otp: string }) => {
        const data = {
            email: email,
            otp: values.otp,
        }
        await verifyEmail(data)
        // navigate('/auth/new-password');
    };


    const handleResendCode = async () => {
        await forgetPassword({ email: email })
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        // lineHeight: 3,
                        controlHeight: 50,

                        borderRadius: 10,
                    },
                },
                token: {
                    colorPrimary: '#AB0906',
                },
            }}
        >
            <div className="">
                <div className="">
                    <div className="text-primaryText  text-center">
                        <h1 className="text-3xl  font-semibold text-center pt-[30px] pb-[15px]">Check your email</h1>
                        <p>
                            We sent a reset link to {email} enter 5 digit code that mentioned in the email
                        </p>
                    </div>

                    <Form
                        name="normal_VerifyOtp"
                        className="my-5"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            className="flex items-center justify-center mx-auto"
                            name="otp"
                            rules={[{ required: true, message: 'Please input otp code here!' }]}
                        >
                            <Input.OTP
                                style={{
                                    width: 300,
                                }}
                                className=""
                                variant="filled"
                                length={6}
                            />
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
                            // onClick={() => navigate('/')}
                            >
                                {isLoading ? "Verifying..." : "Verify OTP Code"}
                            </Button>
                        </Form.Item>
                        <div className="text-center text-lg flex items-center justify-center gap-2">
                            <p className="text-primaryText">Didn't receive the code?</p>
                            <p className="text-primary cursor-pointer" onClick={handleResendCode}>Resend code</p>
                        </div>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;
