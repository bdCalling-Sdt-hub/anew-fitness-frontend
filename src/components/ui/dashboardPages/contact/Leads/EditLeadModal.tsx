import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAddLeadContactMutation, useGetAllLeadContactQuery, useUpdateLeadContactMutation } from "../../../../../redux/features/contact/leadContactApi";

const EditLeadModal = ({ open, setOpen, setOpenLeads, editLeadData , setEditLeadData}: { open: boolean,  setOpen: (open: boolean) => void, setOpenLeads: (openLeads: boolean) => void , setEditLeadData: (editLeadData: any)=> void , editLeadData: any}) => {

    const [form] = Form.useForm(); 

    const [addLeadContact, { isError, isLoading, isSuccess, data, error }] = useAddLeadContactMutation();

    const [updateLeadContact, { isError: isUpdateError, isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: updateData, error: updateError }] = useUpdateLeadContactMutation(); 

    const {refetch} = useGetAllLeadContactQuery(undefined);

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
                              setEditLeadData({})
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
 


 
    //for lead contact 
    useEffect(() => {
        if (editLeadData) {
            form.setFieldsValue({
                name: editLeadData?.lead_name,
                lead_email: editLeadData?.lead_email,
                gender: editLeadData?.gender,
                address: editLeadData?.address,
                phone: editLeadData?.phone,});
        }
    }, [editLeadData])

    useEffect(() => {
        if (open && setOpenLeads) {
            setOpenLeads(false);
        }
    }, [open, setOpenLeads]);

 
    const OnFinish = (values:{ client_name:string , client_email:string , gender:string , address:string , mobile_number:string}) => {
 
        if (editLeadData?.id) {
            updateLeadContact({ id: editLeadData?.id, data: values })
        } else {
            addLeadContact(values)
        }
    }

    return (
        <Modal open={open} onCancel={() => {setOpen(false) ; setEditLeadData({})}} footer={null} width={600} title={<p className=" text-primary text-[24px] font-bold">Lead Contact Information </p>} centered>
            <Form layout="vertical" className=" pt-4" form={form} onFinish={OnFinish}>
                <div className="">

                    <Form.Item name="name" label={<p className=" text-primaryText text-[18px] font-semibold"> Lead Name </p>}>
                        <Input type="text" placeholder="Enter Lead Name" className=" rounded-lg " style={{
                            height: '45px',
                            width: '100%',

                        }} />
                    </Form.Item>

                    <Form.Item name="lead_email" label={<p className=" text-primaryText text-[18px] font-semibold"> Lead Email </p>}>
                        <Input type="text" placeholder="Enter Lead email" className=" rounded-lg " style={{
                            height: '45px',
                            width: '100%',

                        }} />
                    </Form.Item>
                    <Form.Item name="address" label={<p className=" text-primaryText text-[18px] font-semibold"> Address </p>}>
                        <Input type="text" placeholder="Enter Address" className=" rounded-lg " style={{
                            height: '45px',
                            width: '100%',

                        }} />
                    </Form.Item>


                    <Form.Item name="gender" label={<p className=" text-primaryText text-[18px] font-semibold"> Gender </p>}>
                        <Select
                            className=""
                            placeholder="Select Gender"
                            style={{ height: '45px', width: '100%' }}
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item name="phone" label={<p className=" text-primaryText text-[18px] font-semibold"> Phone </p>}>
                        <Input type="text" placeholder="Enter phone Number" className=" rounded-lg " style={{
                            height: '45px',
                            width: '100%',

                        }} />
                    </Form.Item>


                </div>

                <div className="flex  items-center justify-end gap-4 mt-4">
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Button  htmlType="submit"  className='px-6 py-[6px] text-white bg-primary rounded' > {isUpdateLoading || isLoading ? "Saving..." : "Save"}</Button>
                </div>

            </Form>
        </Modal>
    );
};

export default EditLeadModal;