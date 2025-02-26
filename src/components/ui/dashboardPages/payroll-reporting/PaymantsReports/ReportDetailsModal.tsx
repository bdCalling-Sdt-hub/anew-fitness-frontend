import { Button, DatePicker, Form, Input, Modal, Select } from "antd";


const ReportDetailsModal = ({open , setOpen}:{open: boolean, setOpen: (open: boolean) => void}) => {
    return (
        <Modal open={open}  onCancel={() => setOpen(false)} footer={null} width={600} title={<p className=" text-primary text-[24px] font-bold">Report Details </p>} centered>
        <Form layout="vertical"> 
            <div className="">  
            <Form.Item name="date" label={<p className=" text-primaryText text-[18px] font-semibold"> Date </p>}>
                <DatePicker
                    className=""
                    style={{ height: '45px', width: '100%' }}
                    // onChange={handleDateChange} 
                    placeholder="Select Date"
                    allowClear
                />
            </Form.Item>  
            <Form.Item name="description" label={<p className=" text-primaryText text-[18px] font-semibold"> Work Description </p>}>
                <Select
                    className=""
                    placeholder="Select Work Description"
                    style={{ height: '45px', width: '100%' }}
                    options={[
                        { value: 'Group Class', label: 'Group Class' },
                        { value: 'Location 1', label: 'Location 1' },
                        { value: 'Location 2', label: 'Location 2' },
                    ]}
                />
            </Form.Item>  

            <Form.Item
          label={ <p className="text-[18px] font-semibold text-primaryText"> Hours</p> }
          name="hours"
        
        >
          <Input placeholder="Enter Hours" size="large" style={{ height: "45px" }} />
        </Form.Item>  

            <Form.Item
          label={ <p className="text-[18px] font-semibold text-primaryText"> Hour Rate</p> }
          name="hour-rate"
        
        >
          <Input placeholder="Enter Hour Rate" size="large" style={{ height: "45px" }} />
        </Form.Item> 

            <Form.Item name="work-type" label={<p className=" text-primaryText text-[18px] font-semibold"> Work Type </p>}>
                <Select
                    className=""
                    placeholder="Select Work Type"
                    style={{ height: '45px', width: '100%' }}
                    options={[
                        { value: 'Offline', label: 'Offline' },
                        { value: 'Online', label: 'Online' },                   
                    ]}
                />
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

export default ReportDetailsModal;