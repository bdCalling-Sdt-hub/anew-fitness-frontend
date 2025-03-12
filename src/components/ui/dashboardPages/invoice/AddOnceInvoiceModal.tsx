import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

const AddOnceInvoiceModal = ({open , setOpen , setOpenLeads }:{open: boolean, setOpen: (open: boolean) => void , setOpenLeads: (openLeads: boolean) => void}) => {  
    useEffect(() => {
        if (open && setOpenLeads) {
          setOpenLeads(false);
        }
      }, [open, setOpenLeads]);  
    return (
        <Modal open={open}  onCancel={() => setOpen(false)} footer={null} width={600} title={<p className=" text-primary text-[24px] font-bold"> Contact Information </p>} centered>
        <Form layout="vertical" className=" pt-4"> 
            <div className="">  

            <Form.Item name="name" label={<p className=" text-primaryText text-[18px] font-semibold"> Client Name </p>}>
                <Input type="text" placeholder="Enter Client Name" className=" rounded-lg " style={{ 
                    height: '45px', 
                    width: '100%', 
                   
                }} /> 
            </Form.Item> 

            <Form.Item name="email" label={<p className=" text-primaryText text-[18px] font-semibold"> Client Email </p>}>
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
                <Button  onClick={() => setOpen(false)}>Close</Button>
                <button className='px-6 py-[6px] text-white bg-primary rounded' type="submit">Save</button>
            </div>

        </Form>
    </Modal>
    );
};

export default AddOnceInvoiceModal;