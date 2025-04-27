import { Button, Form, Input, Select } from "antd";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAssignStaffMutation } from "../../../../redux/features/staff/staffManagementApi";
import { useEffect } from "react";
import Swal from "sweetalert2";

const RoleManagement = () => {
    const navigate = useNavigate();
    const [assignStaff, { isLoading, isSuccess, isError, data, error }] = useAssignStaffMutation();
    const [form] = Form.useForm();

    useEffect(() => {
        if (isSuccess) {
            if (data) {
                Swal.fire({
                    text: data?.message,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    form.resetFields();

                })
            }
        }
        if (isError) {
            Swal.fire({
                //@ts-ignore
                text: error?.data?.message,
                icon: "error",
            });
        }
    }, [isSuccess, isError, error, data]);


    const onFinish = async (values: any) => {
     await assignStaff(values)
    }
    return (
        <div className="px-[30px] pt-[30px]">
            <h1 className="flex items-center gap-2 mb-5"> <span><RiArrowLeftLine color='#ab0906' size={30} onClick={() => navigate(-1)} className="cursor-pointer" />  </span> <span className="text-[30px] font-bold text-primary">Edit Management Role </span></h1>

            <div className="w-full flex gap-10 mt-[70px] border border-[#D8D8D8]  rounded-lg relative ">
                <div className="w-1/5 border-r border-[#D8D8D8] p-8  ">
                    <p className="text-[24px] font-bold bg-primary text-white w-full h-[54px] rounded-lg p-4 flex items-center "> Profile </p>
                </div>

                <div className="w-3/5  p-8">
                    <Form layout="vertical" onFinish={onFinish} form={form} >
                        <Form.Item
                            label={<div className=" flex flex-col gap-y-2">
                                <p className="text-[18px] font-bold text-primaryText"> Display name </p>
                                <p className="text-[16px] text-primaryText font-medium pb-4"> The name that shows up to clients. </p>
                            </div>}
                            name="name"

                        >
                            <Input placeholder="Enter Display name" size="large" style={{ height: "50px" }} />
                        </Form.Item>

                        <Form.Item
                            label={<div className=" flex flex-col gap-y-2">
                                <p className="text-[18px] font-bold text-primaryText"> Email </p>
                                <p className="text-[16px] text-primaryText font-medium pb-4"> This is the email for login </p>
                            </div>}
                            name="email"

                        >
                            <Input placeholder="Enter Email" size="large" style={{ height: "50px" }} />
                        </Form.Item>

                        <Form.Item
                            label={<div className=" flex flex-col gap-y-2">
                                <p className="text-[18px] font-bold text-primaryText"> Assign Role </p>
                                <p className="text-[16px] text-primaryText font-medium pb-4"> This is the Role for login. </p>
                            </div>}
                            name="role"

                        >
                            <Select
                                className=""
                                placeholder="Select Assign Role"
                                style={{ height: '45px', width: '100%' }}
                                options={[
                                    { value: 'Chief Financial Officer', label: 'Chief Financial Officer' },
                                    { value: 'Chief Operating Officer', label: 'Chief Operating Officer' },
                                    { value: 'Chief Executive Officer', label: 'Chief Executive Officer' },
                                    { value: 'Training Supervisor', label: 'Training Supervisor' },
                                    { value: 'Sales Director', label: 'Sales Director' },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<div className=" flex flex-col gap-y-2">
                                <p className="text-[18px] font-bold text-primaryText"> Page Access Control </p>
                                <p className="text-[16px] text-primaryText font-medium pb-4"> Your selected options will be effective for your selected person. </p>
                            </div>}
                            name="accessControls"

                        >
                            <Select
                                mode="multiple"
                                className=""
                                placeholder="Select Access Control"
                                style={{ height: '45px', width: '100%' }}
                                options={[
                                    { value: 'calendar', label: 'Calendar' },
                                    { value: 'services', label: 'Services' },
                                    { value: 'invoice', label: 'Invoice' },
                                    { value: 'contact', label: 'Contact' },
                                    { value: 'reports', label: 'Reports' },
                                    { value: 'payroll-reporting', label: 'Payroll Reporting' },
                                    { value: 'settings', label: 'Settings' },
                                ]}
                            />
                        </Form.Item>

                    </Form>

                </div>

                <div className="w-1/5 py-8  ">
                    <div>
                        <p className=" text-[24px] font-bold pb-2"> Profile </p>
                        <p className=" text-[16px] text-primaryText font-medium"> Manage your staff personal profile </p>
                    </div>

                    <div className="absolute bottom-5 right-5">
                        <div className="flex items-center justify-end gap-4">
                            <Button onClick={() => navigate(-1)} style={{ height: "40px" }}>Close</Button>
                            <button onClick={() => form.submit()} className='px-5 py-[6px] text-white bg-primary rounded' type="submit" style={{ height: "40px" }}>
                                {isLoading ? "Saving..." : "Save"} </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleManagement;