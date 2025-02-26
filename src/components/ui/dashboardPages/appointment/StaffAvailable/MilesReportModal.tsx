import { Button, Form, Input, Modal } from "antd";

const MilesReportModal = ({open , setOpen}:{open: boolean, setOpen: (open: boolean) => void}) => {
    return (
        <Modal open={open}  onCancel={() => setOpen(false)} footer={null} width={600} title={<p className=" text-primary text-[24px] font-bold">Miles Report </p>} centered>
        <Form layout="vertical"> 
            <div className="">  
            <Form.Item
          label={ <p className="text-[18px] font-semibold text-primaryText"> Miles</p> }
          name="miles"
        
        >
          <Input placeholder="Enter Miles" size="large" style={{ height: "45px" }} />
        </Form.Item>  

            <Form.Item
          label={ <p className="text-[18px] font-semibold text-primaryText"> Mileage Rate</p> }
          name="mileage-rate"
        
        >
          <Input placeholder="Enter Mileage Rate" size="large" style={{ height: "45px" }} />
        </Form.Item> 
     
            </div> 

            <div className="flex  items-center justify-end gap-4 mt-4">
                <Button onClick={() => setOpen(false)}>Close</Button>
                <button className='px-5 py-[6px] text-white bg-primary rounded' type="submit">Save</button>
            </div>

        </Form>
    </Modal>
    );
};

export default MilesReportModal;