import { Button, ConfigProvider, DatePicker, Form, Input, Modal, Select, TimePicker } from "antd";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAddAppointmentContactMutation, useGetAllAppointmentContactQuery, useUpdateAppointmentContactMutation } from "../../../../redux/features/contact/appointmentClientApi";
import { useGetAllClientContactQuery } from "../../../../redux/features/contact/clientContactApi";
import { useGetAllLeadContactQuery } from "../../../../redux/features/contact/leadContactApi";
import { useGetAllStaffQuery } from "../../../../redux/features/staff/staffManagementApi";
import dayjs from "dayjs";

const AppointmentModal = ({ open, setOpen, setModalOpen, setEditAppointmentData, editAppointmentData }: { open: boolean, setModalOpen?: (modalOpen: boolean) => void, setOpen: (open: boolean) => void, editAppointmentData?: any, setEditAppointmentData?: (editAppointmentData: any) => void }) => {

    const [form] = Form.useForm();

    const [addAppointmentContact, { isError, isLoading, isSuccess, data, error }] = useAddAppointmentContactMutation();
    const [updateAppointmentContact, { isError: isUpdateError, isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: updateData, error: updateError }] = useUpdateAppointmentContactMutation();

    const { refetch } = useGetAllAppointmentContactQuery(undefined);
    const { data: clientContact } = useGetAllClientContactQuery(undefined);
    const { data: allLeads } = useGetAllLeadContactQuery(undefined);
    const { data: allStaff } = useGetAllStaffQuery(undefined);

    const ContactName = clientContact?.map((item: any) => ({ label: item?.client_name, value: item?.client_name }));
    const LeadName = allLeads?.map((item: any) => ({ label: item?.lead_name, value: item?._id }));
    const StaffName = allStaff?.map((item: any) => ({ label: item?.name, value: item?._id }));

    useEffect(() => {
        if (isSuccess) {
            if (data) {
                Swal.fire({
                    text: data?.message,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    setOpen(false);
                    refetch();
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


    useEffect(() => {
        if (isUpdateSuccess) {
            if (updateData) {
                Swal.fire({
                    text: updateData?.message,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    setOpen(false);
                    setEditAppointmentData({})
                    refetch();
                    form.resetFields();
                })
            }
        }
        if (isUpdateError) {
            Swal.fire({
                //@ts-ignore
                text: updateError?.updateData?.message,
                icon: "error",
            });
        }
    }, [isUpdateSuccess, isUpdateError, updateError, updateData]);

    useEffect(() => {
        if (editAppointmentData) {
            form.setFieldsValue({  
                contactName: editAppointmentData?.contactName,
                service: editAppointmentData?.service,
                date: editAppointmentData?.date ? dayjs(editAppointmentData?.date ) : null,
                time: editAppointmentData?.time ? dayjs(editAppointmentData?.time ,  "HH:mm" ) : null ,
                staffId: editAppointmentData?.staffId, 
                leadId: editAppointmentData?.leadId
            });
        }
    }, [editAppointmentData])


    useEffect(() => {
        if (open && setModalOpen) {
            setModalOpen(false);
        }
    }, [open, setModalOpen]);



    const OnFinish = (values: { client_name: string, client_email: string, gender: string, address: string, mobile_number: string , date:string , time:string }) => { 
    
        const { date, time, ...othersValue } = values; 

        const data = {
            ...othersValue,
            date: dayjs(date).format("YYYY-MM-DD"),
            time: dayjs(time).format("HH:mm"),
          }; 

          console.log(data);  

        if (editAppointmentData?.id) {
            updateAppointmentContact({ id: editAppointmentData?.id, data: data }).then((res) => { console.log(res); });
        } else {
            addAppointmentContact(data).then((res) => { console.log(res); });
        }
    }


    return (
        <Modal open={open} onCancel={() => { setOpen(false); setEditAppointmentData({}) }} footer={null} width={600} title={<p className=" text-primary text-[24px] font-bold">Book Appointment </p>} centered>
            <Form layout="vertical" form={form} onFinish={OnFinish}>
                <div className="">
                    <Form.Item name="contactName" label={<p className=" text-primaryText text-[18px] font-semibold"> Contact </p>}>
                        <Select
                            className=""
                            placeholder="Select Contact Name"
                            style={{ height: '45px', width: '100%' }}
                            options={ContactName}
                        />
                    </Form.Item>

                    <Form.Item name="service" label={<p className=" text-primaryText text-[18px] font-semibold">Service </p>}>
                        <Input type="text" placeholder="Enter service name" className=" rounded-lg " style={{
                            height: '45px',
                            width: '100%',

                        }} />
                    </Form.Item>

                    <Form.Item name="staffId" label={<p className=" text-primaryText text-[18px] font-semibold"> Staff </p>}>
                        <Select
                            className=""
                            placeholder="Select Staff"
                            style={{ height: '45px', width: '100%' }}
                            options={StaffName}
                        />
                    </Form.Item>

                    <Form.Item name="leadId" label={<p className=" text-primaryText text-[18px] font-semibold"> Lead </p>}>
                        <Select
                            className=""
                            placeholder="Select Lead"
                            style={{ height: '45px', width: '100%' }}
                            options={LeadName}
                        />
                    </Form.Item>


                    <Form.Item name="date" label={<p className=" text-primaryText text-[18px] font-semibold"> Date </p>}>
                        <DatePicker
                            className=""
                            style={{ height: '45px', width: '100%' }}
                            // onChange={handleDateChange} 
                            placeholder="Select Date"
                            allowClear
                        />
                    </Form.Item>

                    <ConfigProvider
                        theme={{
                            components: {
                                DatePicker: {
                                    timeColumnWidth: 150,
                                },
                            },
                        }}
                    >
                        <Form.Item name="time" label={<p className=" text-primaryText text-[18px] font-semibold"> Time </p>}>
                            <TimePicker style={{ height: '45px', width: '100%' }}  format={'HH:mm'} />
                        </Form.Item>
                    </ConfigProvider>
                </div>

                <div className="flex  items-center justify-end gap-4 mt-4">
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Button htmlType="submit" className='px-5 py-[6px] text-white bg-primary rounded' >{ isUpdateLoading || isLoading ? "Saving.." : "Save"}</Button>
                </div>

            </Form>
        </Modal>
    );
};

export default AppointmentModal;