import { Button, Modal } from "antd";
import { Upload, message } from 'antd';
import { UploadCloud as CloudUpload } from 'lucide-react';
import type { UploadProps } from 'antd';
import { useEffect } from "react";

const AddMultipleInvoice = ({ open, setOpen, setOpenLeads }: { open: boolean, setOpen: (open: boolean) => void, setOpenLeads: (openLeads: boolean) => void }) => { 
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
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <div>
        <Modal open={open} onCancel={() => setOpen(false)} footer={null} width={600} title={<p className=" text-primary text-[24px] font-bold"> Add Multiple Contacts At Once </p>} centered>

            <div className="  py-[27px] px-5">
                <div className=" mx-auto bg-white rounded-lg  ">
                    <h1 className="text-3xl font-bold mb-2">Upload File</h1>
                    <p className="text-gray-600 text-[18px] font-medium mb-8">Upload a CSV file with your contact details</p>

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
                </div>
            </div> 
            <div className="flex  items-center justify-end gap-4 mt-4">
            <Button  onClick={() => setOpen(false)}>Close</Button>
            <button className='px-6 py-[6px] text-white bg-primary rounded' type="submit">Save</button>
        </div>
        </Modal>
    </div>
    );
};

export default AddMultipleInvoice;