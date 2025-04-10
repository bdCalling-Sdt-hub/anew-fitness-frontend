import { Button, DatePicker, Form, Modal, Select } from "antd";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAddAppointmentContactMutation, useGetAllAppointmentContactQuery, useUpdateAppointmentContactMutation } from "../../../../redux/features/contact/appointmentClientApi";

const AppointmentModal = ({open , setOpen , setModalOpen , setEditAppointmentData , editAppointmentData }:{open: boolean, setModalOpen?: (modalOpen: boolean) => void , setOpen: (open: boolean) => void , editAppointmentData?: any , setEditAppointmentData:(editAppointmentData: any)=>void}) => { 

        const [form] = Form.useForm();
    
        const [addAppointmentContact, { isError, isLoading, isSuccess, data, error }] = useAddAppointmentContactMutation();
    
        const [updateAppointmentContact, { isError: isUpdateError, isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: updateData, error: updateError }] = useUpdateAppointmentContactMutation(); 
    
        const {data:allAppointment , refetch} = useGetAllAppointmentContactQuery(undefined);
    
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
                form.setFieldsValue(editAppointmentData);
            }
        }, [editAppointmentData])
     

    useEffect(() => {
        if (open && setModalOpen) {
          setModalOpen(false);
        }
      }, [open, setModalOpen]);  



      const OnFinish = (values:{ client_name:string , client_email:string , gender:string , address:string , mobile_number:string}) => {
 
        console.log(editAppointmentData?.id);
        if (editAppointmentData?.id) {
            updateAppointmentContact({ id: editAppointmentData?.id, data: values }).then((res) => { console.log(res);});
        } else {

            addAppointmentContact(values).then((res) => { console.log(res);});
        }
    } 


    return (
        <Modal open={open}  onCancel={() =>{ setOpen(false); setEditAppointmentData({})}} footer={null} width={600} title={<p className=" text-primary text-[24px] font-bold">Book Appointment </p>} centered>
            <Form layout="vertical" form={form} onFinish={OnFinish}> 
                <div className=""> 
                <Form.Item name="contact" label={<p className=" text-primaryText text-[18px] font-semibold"> Contact </p>}>
                    <Select
                        className=""
                        placeholder="Select Contact Name"
                        style={{ height: '45px', width: '100%' }}
                        options={[
                            { value: 'All Location', label: 'All Location' },
                            { value: 'Location 1', label: 'Location 1' },
                            { value: 'Location 2', label: 'Location 2' },
                        ]}
                    />
                </Form.Item>

                <Form.Item name="Service" label={<p className=" text-primaryText text-[18px] font-semibold"> Service </p>}>
                    <Select
                        className=""
                        placeholder="Select Service"
                        style={{ height: '45px', width: '100%' }}
                        options={[
                            { value: 'All Location', label: 'All Location' },
                            { value: 'Location 1', label: 'Location 1' },
                            { value: 'Location 2', label: 'Location 2' },
                        ]}
                    />
                </Form.Item>


                <Form.Item name="Staff" label={<p className=" text-primaryText text-[18px] font-semibold"> Staff </p>}>
                    <Select
                        className=""
                        placeholder="Select Staff"
                        style={{ height: '45px', width: '100%' }}
                        options={[
                            { value: 'All Location', label: 'All Location' },
                            { value: 'Location 1', label: 'Location 1' },
                            { value: 'Location 2', label: 'Location 2' },
                        ]}
                    />
                </Form.Item> 

                <Form.Item name="lead" label={<p className=" text-primaryText text-[18px] font-semibold"> Lead </p>}>
                    <Select
                        className=""
                        placeholder="Select Lead"
                        style={{ height: '45px', width: '100%' }}
                        options={[
                            { value: 'All Location', label: 'All Location' },
                            { value: 'Location 1', label: 'Location 1' },
                            { value: 'Location 2', label: 'Location 2' },
                        ]}
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

                <Form.Item name="time" label={<p className=" text-primaryText text-[18px] font-semibold"> Time </p>}>
                    <Select
                        className=""
                        placeholder="Select time"
                        style={{ height: '45px', width: '100%' }}
                        options={[
                            { value: 'All Location', label: 'All Location' },
                            { value: 'Location 1', label: 'Location 1' },
                            { value: 'Location 2', label: 'Location 2' },
                        ]}
                    />
                </Form.Item> 
                </div> 

                <div className="flex  items-center justify-end gap-4 mt-4">
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Button htmlType="submit" className='px-5 py-[6px] text-white bg-primary rounded' >{isUpdateLoading || isLoading ? "Saving.." : "Save"}</Button>
                </div>

            </Form>
        </Modal>
    );
};

export default AppointmentModal;