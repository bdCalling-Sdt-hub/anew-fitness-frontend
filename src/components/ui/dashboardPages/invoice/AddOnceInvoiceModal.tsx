import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

const AddOnceInvoiceModal = ({open , setOpen , setOpenInvoice }:{open: boolean, setOpen: (open: boolean) => void , setOpenInvoice: (openInvoice: boolean) => void}) => {  
    useEffect(() => {
        if (open && setOpenInvoice) {
          setOpenInvoice(false);
        }
      }, [open, setOpenInvoice]);  
    return (
        <Modal open={open}  onCancel={() => setOpen(false)} footer={null} width={650} title={<p className=" text-primary text-[24px] font-bold"> Invoice Information </p>} centered>
        <Form layout="vertical" className=" pt-4"> 
            <div className=" grid grid-cols-2 gap-x-4">  

            <Form.Item name="clientName" label={<p className=" text-primaryText text-[18px] font-semibold"> Client Name </p>}>
                <Input type="text" placeholder="Enter Client Name" className=" rounded-lg " style={{ 
                    height: '45px', 
                    width: '100%', 
                   
                }} /> 
            </Form.Item>  

            <Form.Item name="className" label={<p className=" text-primaryText text-[18px] font-semibold"> Class Name </p>}>
                <Input type="text" placeholder="Enter Class Name" className=" rounded-lg " style={{ 
                    height: '45px', 
                    width: '100%', 
                   
                }} /> 
            </Form.Item> 

            <Form.Item name="className" label={<p className=" text-primaryText text-[18px] font-semibold"> Contact Name </p>}>
                <Input type="text" placeholder="Enter Contact Name" className=" rounded-lg " style={{ 
                    height: '45px', 
                    width: '100%', 
                   
                }} /> 
            </Form.Item> 

            <Form.Item name="total" label={<p className=" text-primaryText text-[18px] font-semibold"> Invoice Total  </p>}>
                <Input type="text" placeholder="Enter Invoice Total " className=" rounded-lg " style={{ 
                    height: '45px', 
                    width: '100%', 
                   
                }} /> 
            </Form.Item>  

            <Form.Item name="invoice" label={<p className=" text-primaryText text-[18px] font-semibold"> Invoice </p>}>
                <Input type="text" placeholder="Enter Invoice " className=" rounded-lg " style={{ 
                    height: '45px', 
                    width: '100%', 
                   
                }} /> 
            </Form.Item> 

            <Form.Item name="invoiceDate" label={<p className=" text-primaryText text-[18px] font-semibold"> Invoice Date </p>}>  
            <DatePicker placeholder="Enter Invoice Date"  style={{ 
                    height: '45px', 
                    width: '100%', 
                   
                }} /> 
            </Form.Item>
            

            <Form.Item name="services" label={<p className=" text-primaryText text-[18px] font-semibold"> Services </p>}>
                <Select
                    className=""
                    placeholder="Select Services"
                    style={{ height: '45px', width: '100%' }}
                    options={[
                        { value: 'classes', label: 'Classes' },
                        { value: 'staff', label: 'Staff' },
                    ]}
                />
            </Form.Item>

            <Form.Item name="date" label={<p className=" text-primaryText text-[18px] font-semibold"> Invoice Due Date </p>}>  
            <DatePicker placeholder="Enter Invoice Due Date"  style={{ 
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