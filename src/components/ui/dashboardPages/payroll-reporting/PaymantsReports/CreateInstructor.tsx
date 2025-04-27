import { DatePicker, Form, Select, Button } from "antd";
import { FiPlus } from "react-icons/fi";
import { useCreateNewInstructorMutation } from "../../../../../redux/features/payrollReporting/paymentReportApi";
import { useGetAllStaffQuery } from "../../../../../redux/features/staff/staffManagementApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

const CreateInstructor = () => {
    const [form] = Form.useForm();
    const [createNewInstructor, { isLoading, isSuccess, isError, error, data }] = useCreateNewInstructorMutation();
    const { data: allStaff } = useGetAllStaffQuery(undefined)
    const navigate = useNavigate()


    useEffect(() => {

        if (isError) {
            Swal.fire({
                //@ts-ignore
                text: error?.data?.message,
                icon: "error",
            });
        }
    }, [isSuccess, isError, error, data, navigate]);


    const staffOption = allStaff?.map((item: any) => ({ label: item?.name, value: item?._id }));

    const onFinish = async (values: any) => {
        const payload = {
            instructorName: values.instructorName,
            periodBeginning: values.periodBeginning.toISOString(),
            periodEnding: values.periodEnding.toISOString(),
        };

        try {
            await createNewInstructor(payload).then((res) => { 
                if(res?.data) {
                    navigate(`/payment-reports?id=${res?.data?._id}`)
                    window.location.reload();
                }
            })
            // You can reset form or show success message here
            form.resetFields();
        } catch (error) {
            // Handle error here
            console.error("Error creating instructor:", error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-2/3 mt-10">
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item>
                        <h2 className="text-[22px] font-bold pt-5">Instructor Name</h2>
                        <p className="text-[18px] font-medium pt-2">
                            Select the Instructor Name you'd like to create a new report
                        </p>
                    </Form.Item>

                    <Form.Item
                        name="instructorName"
                        rules={[{ required: true, message: "Please select an instructor" }]}
                    >
                        <Select placeholder="Select an option" style={{ height: "50px", width: "82%" }} options={staffOption} />

                    </Form.Item>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
                        <Form.Item
                            label={<p className="text-[22px] font-bold">Period Beginning</p>}
                            name="periodBeginning"
                            rules={[{ required: true, message: "Please select period beginning" }]}
                        >
                            <DatePicker
                                className="w-full"
                                style={{ height: "50px", marginTop: "7px" }}
                                onChange={(date) => {
                                    if (date) {
                                        const ending = date.clone().add(14, "days");
                                        form.setFieldsValue({ periodEnding: ending });
                                    }
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<p className='text-[22px] font-bold'>Period Ending </p>}
                            name="periodEnding"
                            rules={[{ required: true, message: "Please select period ending" }]}>
                            <DatePicker className="w-full" style={{ height: "50px", marginTop: "7px" }} readOnly />
                        </Form.Item>
                    </div>

                    <div className="flex items-center justify-end">
                        <Button
                            htmlType="submit"
                            className="bg-primary text-white font-semibold py-2 px-4 flex items-center gap-2 rounded h-[50px]"
                            loading={isLoading}
                        >
                            <span>Create Instructor</span>
                            <FiPlus size={22} />
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default CreateInstructor;
