import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { useAddClientContactMutation, useGetAllClientContactQuery, useUpdateClientContactMutation } from "../../../../../redux/features/contact/clientContactApi";
import Swal from "sweetalert2";

const AddClientModal = ({ open, setOpen, setOpenLeads, editClientData , setEditClientData }: { open: boolean, editClientData: any, setOpen: (open: boolean) => void, setOpenLeads: (openLeads: boolean) => void , setEditClientData: (editClientData: any)=> void }) => {

    const [form] = Form.useForm();

    const [addClientContact, { isError, isLoading, isSuccess, data, error }] = useAddClientContactMutation();

    const [updateClientContact, { isError: isUpdateError, isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: updateData, error: updateError }] = useUpdateClientContactMutation(); 

    const {refetch} = useGetAllClientContactQuery(undefined);

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
                              setEditClientData({})
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
        if (editClientData) {
            form.setFieldsValue(editClientData);
        }
    }, [editClientData])


    useEffect(() => {
        if (open && setOpenLeads) {
            setOpenLeads(false);
        }
    }, [open, setOpenLeads]);

 
    const OnFinish = (values:{ client_name:string , client_email:string , gender:string , address:string , mobile_number:string}) => {
 
        console.log(editClientData?.id);
        if (editClientData?.id) {
            updateClientContact({ id: editClientData?.id, data: values }).then((res) => { console.log(res);});
        } else {

            addClientContact(values).then((res) => { console.log(res);});
        }
    }

    return (
        <Modal open={open} onCancel={() => {setOpen(false) ; setEditClientData({})}} footer={null} width={600} title={<p className=" text-primary text-[24px] font-bold"> Contact Information </p>} centered>
            <Form layout="vertical" className=" pt-4" form={form} onFinish={OnFinish}>
                <div className="">

                    <Form.Item name="client_name" label={<p className=" text-primaryText text-[18px] font-semibold"> Client Name </p>}>
                        <Input type="text" placeholder="Enter Client Name" className=" rounded-lg " style={{
                            height: '45px',
                            width: '100%',

                        }} />
                    </Form.Item>

                    <Form.Item name="client_email" label={<p className=" text-primaryText text-[18px] font-semibold"> Client Email </p>}>
                        <Input type="text" placeholder="Enter Client email" className=" rounded-lg " style={{
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

export default AddClientModal;