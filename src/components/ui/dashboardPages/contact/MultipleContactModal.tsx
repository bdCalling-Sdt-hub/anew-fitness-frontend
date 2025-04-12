import { Button, Form, Modal } from "antd";
import { Upload, message } from 'antd';
import { UploadCloud as CloudUpload } from 'lucide-react';
import type { UploadProps } from 'antd';
import { useEffect } from "react";
import { useAddMultipleLeadContactMutation, useGetAllLeadContactQuery } from "../../../../redux/features/contact/leadContactApi";
import Swal from "sweetalert2";
const MultipleContactModal = ({ open, setOpen, setOpenLeads }: { open: boolean, setOpen: (open: boolean) => void, setOpenLeads: (openLeads: boolean) => void }) => {
    const [form] = Form.useForm();
    const [addMultipleLeadContact, { isError, isLoading, isSuccess, data, error }] = useAddMultipleLeadContactMutation(); 
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
                    refetch();
                    form.resetFields();
                    setOpen(false);
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
    }, [isSuccess, isError, error, data]);

    useEffect(() => {
        if (open && setOpenLeads) {
            setOpenLeads(false);
        }
    }, [open, setOpenLeads]);

    const props: UploadProps = {
        name: 'file',
        accept: '.csv',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } 
        },
    };

    const onFinish = async (values: { contactsFile: any }) => {
        const file = values.contactsFile?.[0]?.originFileObj
        const formData = new FormData();
        if (file) {
            formData.append("documents", file);
        }
        await addMultipleLeadContact(formData).then((res) => {
            console.log(res);
        })

    }
    return (
        <div>
            <Modal open={open} onCancel={() => setOpen(false)} footer={null} width={600} title={<p className=" text-primary text-[24px] font-bold"> Add Multiple Contacts At Once </p>} centered>

                <div className="  py-[27px] px-5">
                    <div className=" mx-auto bg-white rounded-lg  ">
                        <h1 className="text-3xl font-bold mb-2">Upload File</h1>
                        <p className="text-gray-600 text-[18px] font-medium mb-8">Upload a CSV file with your contact details</p>
                        <Form onFinish={onFinish} form={form}>

                            <Form.Item
                                name="contactsFile"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                            >
                                <Upload.Dragger {...props} className="bg-white  rounded-lg ">
                                    <div className="text-center p-5">
                                        <div className="flex justify-center mb-6">
                                            <div className="w-20 h-20 bg-red-800 rounded-full flex items-center justify-center">
                                                <CloudUpload className="w-10 h-10 text-white" />
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm max-w-sm mx-auto">
                                            By uploading you are agreeing that you have consent to email all of the imported contacts.
                                        </p>
                                    </div>
                                </Upload.Dragger>
                            </Form.Item>
                            <div className="flex  items-center justify-end gap-4 mt-6">
                                <Button onClick={() => setOpen(false)}>Close</Button>
                                <Button onSubmit={() => form.submit()} htmlType="submit" className='px-6 py-[6px] text-white bg-primary rounded'>{isLoading ? "Saving..." : "Save"}</Button>
                            </div>
                        </Form>

                    </div>
                </div>

            </Modal>
        </div>
    );
};

export default MultipleContactModal;