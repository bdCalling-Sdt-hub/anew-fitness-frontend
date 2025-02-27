import { Button, DatePicker, Form, Modal, Select } from "antd";
import { useEffect } from "react";

const AppointmentModal = ({open , setOpen , setModalOpen }:{open: boolean, setModalOpen?: (modalOpen: boolean) => void , setOpen: (open: boolean) => void}) => { 

    useEffect(() => {
        if (open && setModalOpen) {
          setModalOpen(false);
        }
      }, [open, setModalOpen]); 

    return (
        <Modal open={open}  onCancel={() => setOpen(false)} footer={null} width={600} title={<p className=" text-primary text-[24px] font-bold">Book Appointment </p>} centered>
            <Form layout="vertical"> 
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
                    <button className='px-5 py-[6px] text-white bg-primary rounded' type="submit">Save</button>
                </div>

            </Form>
        </Modal>
    );
};

export default AppointmentModal;