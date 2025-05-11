import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { useCreateSingleInvoiceMutation, useUpdateSingleInvoiceMutation } from "../../../../redux/features/invoice/invoiceApi";
import Swal from "sweetalert2";
import moment from "moment";
import { useGetAllClientContactQuery } from "../../../../redux/features/contact/clientContactApi";

const AddOnceInvoiceModal = ({ open, setOpen, setOpenInvoice ,editData , setEditData , refetch }: { open: boolean, setOpen: (open: boolean) => void, setOpenInvoice: (openInvoice: boolean) => void , refetch: () => void  , editData: any , setEditData: any}) => {

    const [form] = Form.useForm();
    const [createSingleInvoice, { isLoading, isError, isSuccess, error, data }] = useCreateSingleInvoiceMutation() 
    const [updateSingleInvoice , { isLoading: isUpdateLoading, isError: isUpdateError, isSuccess: isUpdateSuccess, error: updateError, data: updateData }] = useUpdateSingleInvoiceMutation() 
    const { data: allClient } = useGetAllClientContactQuery(undefined)

    const clientNameOptions = allClient?.map((client: any) => ({ value: client?._id, label: client?.name })); 

          useEffect(() => {
              if (isUpdateSuccess) {
                  if (updateData) {
                      Swal.fire({
                          text: updateData?.message,
                          icon: "success",
                          timer: 1500,
                          showConfirmButton: false
                      }).then(() => {
                        setOpenInvoice(false);  
                          setEditData({})
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
          }, [isUpdateSuccess, isUpdateError, updateError, updateData,form]);    

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
                });
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
        if (open && setOpenInvoice) {
            setOpenInvoice(false);
        }
    }, [open, setOpenInvoice]);  

    console.log(editData);

    useEffect(() => {
        if (editData) {
            form.setFieldsValue({clientId: editData?.clientId , classId: editData?.classId ,className: editData?.className , contactName: editData?.contactName ,invoiceNumber: editData?.invoiceNumber , services: editData?.services ,  invoiceDate: moment(editData?.invoiceDate) , invoiceDueDate: moment(editData?.invoiceDueDate) , invoiceTotal: editData?.invoiceTotal});
        }
    },[editData , form])

    const onFinish = async (values: any) => {
        const { invoiceDate, invoiceDueDate, invoiceTotal, ...otherValues } = values 

        const formattedDate = moment(invoiceDate).format("YYYY-MM-DD")
        const formattedDueDate = moment(invoiceDueDate).format("YYYY-MM-DD")
        const formattedTotal = Number(invoiceTotal)

        const data = {
            ...otherValues,
            invoiceDate: formattedDate,
            invoiceDueDate: formattedDueDate,
            invoiceTotal: formattedTotal
        } 
 
        if(editData?.id) { 

        await updateSingleInvoice({id: editData?.id , data}).then((res) => {
            console.log(res);
        })

        }else{ 

            await createSingleInvoice(data)
                                                                                                                                                                                                    
        }

    }


    return (
        <Modal open={open} onCancel={() => setOpen(false)} footer={null} width={650} title={<p className=" text-primary text-[24px] font-bold"> Invoice Information </p>} centered>
            <Form layout="vertical" className=" pt-4" form={form} onFinish={onFinish}>
                {/* <Form.Item name="invoiceId" label={<p className=" text-primaryText text-[18px] font-semibold"> Invoice Id </p>}>
                    <Input type="text" placeholder="Enter Invoice Id" className=" rounded-lg " style={{
                        height: '45px',
                        width: '100%',

                    }} />
                </Form.Item> */}

                <div className=" grid grid-cols-2 gap-x-4">

                    <Form.Item name="clientId" label={<p className=" text-primaryText text-[18px] font-semibold"> Partner Name </p>}>
                    <Select
                            className=""
                            placeholder="Select  Partner Name"
                            style={{ height: '45px', width: '100%' }}
                            options={clientNameOptions}
                        />
                     
                    </Form.Item>

                    <Form.Item name="className" label={<p className=" text-primaryText text-[18px] font-semibold"> Class Name </p>}>
                        <Input type="text" placeholder="Enter Class Name" className=" rounded-lg " style={{
                            height: '45px',
                            width: '100%',

                        }} />
                    </Form.Item>

                    <Form.Item name="contactName" label={<p className=" text-primaryText text-[18px] font-semibold"> Contact Name </p>}>
                        <Input type="text" placeholder="Enter Contact Name" className=" rounded-lg " style={{
                            height: '45px',
                            width: '100%',

                        }} />
                    </Form.Item>

                    <Form.Item name="invoiceTotal" label={<p className=" text-primaryText text-[18px] font-semibold"> Invoice Total  </p>}>
                        <Input type="number" placeholder="Enter Invoice Total " className=" rounded-lg " style={{
                            height: '45px',
                            width: '100%',

                        }} />
                    </Form.Item>

                    <Form.Item name="invoiceNumber" label={<p className=" text-primaryText text-[18px] font-semibold"> Invoice Number </p>}>
                        <Input type="text" placeholder="Enter Invoice " className=" rounded-lg " style={{
                            height: '45px',
                            width: '100%',

                        }} />
                    </Form.Item>

                    <Form.Item name="invoiceDate" label={<p className=" text-primaryText text-[18px] font-semibold"> Invoice Date </p>}>
                        <DatePicker placeholder="Enter Invoice Date" style={{
                            height: '45px',
                            width: '100%',

                        }} />
                    </Form.Item>


                    <Form.Item name="services" label={<p className=" text-primaryText text-[18px] font-semibold"> Services </p>}>
                        <Input type="text" placeholder="Enter Invoice Total " className=" rounded-lg " style={{
                            height: '45px',
                            width: '100%',

                        }} />
                    </Form.Item>

                    <Form.Item name="invoiceDueDate" label={<p className=" text-primaryText text-[18px] font-semibold"> Invoice Due Date </p>}>
                        <DatePicker placeholder="Enter Invoice Due Date" style={{
                            height: '45px',
                            width: '100%',

                        }} />

                    </Form.Item>


                </div>

                <div className="flex  items-center justify-end gap-4 mt-4">
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Button htmlType="submit" className=' px-6 py-[6px] text-white bg-primary rounded '> {isLoading ? "Saving..." : "Save"} </Button>
                </div>

            </Form>
        </Modal>
    );
};

export default AddOnceInvoiceModal;