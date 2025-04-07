import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useNavigate } from 'react-router';
import { useSetUserPasswordMutation } from '../../redux/features/auth/authApi';
import { useEffect } from 'react'; 
import Swal from 'sweetalert2'
const SetPassword = () => {

    const navigate = useNavigate(); 
    const [setUserPassword , { isLoading  , error , data , isSuccess, isError}] = useSetUserPasswordMutation() 

    useEffect(() => {
        if (isSuccess) {
          if (data) {
            Swal.fire({
              text: data?.message,
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
            //   setToLocalStorage("tradeToken", data?.data);   
               navigate('/auth/staff-login');  
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

    const onFinish: FormProps<FieldNamesType>['onFinish'] = async(values) => {

        await setUserPassword(values)
      
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
                        <h1 className="text-3xl  font-semibold text-center pt-[30px] ">Set password</h1>
                        {/* <p>Your new password must be different to previously used passwords.</p> */}
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
                                    New Password
                                </label>
                            }
                            name="newPassword"
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
                            name="confirmPassword"
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
                            {isLoading ? 'Updating...' : 'Update Password'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default SetPassword;