import { Button, Cascader, Form, Input, Modal, Select } from "antd";
import stateCityOptions from "../../../../constant/constant";

const AddLocationModal = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
    return (
        <Modal open={open} onCancel={() => setOpen(false)} footer={null} width={850} title={<p className=" text-primary text-[24px] font-bold">Create Location </p>} centered>
            <Form layout="vertical">
                <div className=" grid grid-cols-2 gap-10">

                    <div>

                        <Form.Item
                            label={<p className="text-[18px] font-semibold text-primaryText"> Location Name</p>}
                            name="location name"

                        >
                            <Input placeholder="Enter Location Name" size="large" style={{ height: "45px" }} />
                        </Form.Item> 

                        <Form.Item
                            label={<p className="text-[18px] font-semibold text-primaryText"> Address</p>}
                            name="Address"

                        >
                            <Input placeholder="Enter Address" size="large" style={{ height: "45px" }} />
                        </Form.Item> 

                        <Form.Item
                    label={<p className="text-[18px] font-semibold text-primaryText"> Region</p>}
                    name="Region"
                >
                         <Cascader
        options={stateCityOptions}
        placeholder="Select State & City"
        size="large"
        style={{ width: "100%", height: "45px" }}
      />
                </Form.Item> 

                        <Form.Item name="Location Type" label={<p className=" text-primaryText text-[18px] font-semibold">  Location Type </p>}>
                        <Select
                            className=""
                            placeholder="Select  Location Type"
                            style={{ height: '45px', width: '100%' }}
                            options={[
                                { value: 'Location 1', label: 'Location 1' },
                                { value: 'Location 2', label: 'Location 2' },
                                { value: 'Location 3', label: 'Location 3' },
                            ]}
                        />
                    </Form.Item> 

                    <Form.Item
                        label={<p className="text-[18px] font-semibold text-primaryText"> Hour Rate</p>}
                        name="hour-rate"

                    >
                        <Input placeholder="Enter Hour Rate" size="large" style={{ height: "45px" }} />
                    </Form.Item> 

                    </div>

                    <div>
                    <Form.Item
                            label={<p className="text-[18px] font-semibold text-primaryText"> First Name</p>}
                            name="First name"

                        >
                            <Input placeholder="Enter First Name" size="large" style={{ height: "45px" }} />
                        </Form.Item>  

                    <Form.Item
                            label={<p className="text-[18px] font-semibold text-primaryText"> Last Name</p>}
                            name="Last name"

                        >
                            <Input placeholder="Enter Last Name" size="large" style={{ height: "45px" }} />
                        </Form.Item>  

                    <Form.Item
                            label={<p className="text-[18px] font-semibold text-primaryText"> Email</p>}
                            name="Email"

                        >
                            <Input placeholder="Enter Email" size="large" style={{ height: "45px" }} />
                        </Form.Item>  

                    <Form.Item
                            label={<p className="text-[18px] font-semibold text-primaryText"> Mobile Number</p>}
                            name="Mobile Number"

                        >
                            <Input placeholder="Enter Mobile Number" size="large" style={{ height: "45px" }} />
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


                </div>

                <div className="flex  items-center justify-end gap-4 mt-4">
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <button className='px-5 py-[6px] text-white bg-primary rounded' type="submit">Save</button>
                </div>

            </Form>
        </Modal>
    );
};

export default AddLocationModal;