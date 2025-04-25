import { PiCalendarHeartDuotone } from "react-icons/pi";
import { Select, Button, Radio, InputNumber, TimePicker, Input, Form } from 'antd';
import { Trash } from 'lucide-react';
import AddLocationModal from './allClassModals/AddLocationModal';
import { FaMinus } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';
import { useEffect, useState } from "react";
import NewEventModal from "./allClassModals/NewEventModal";
import { useGetLocationQuery } from "../../../../redux/features/location/locationApi";
import { useNavigate } from "react-router-dom";
import { useGetAllStaffQuery } from "../../../../redux/features/staff/staffManagementApi";
import dayjs from "dayjs";
import { useCreateNewEventMutation } from "../../../../redux/features/event/eventApi";
import Swal from "sweetalert2";

const CreateEvent = () => {
    const [form] = Form.useForm();
    const [frequency, setFrequency] = useState('once');
    const [capacity, setCapacity] = useState(0);
    const [mode, setMode] = useState('in-person');
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);
    const { data: locations } = useGetLocationQuery("");
    const { data: allStaff } = useGetAllStaffQuery("");
    const [createNewEvent, { isError, isLoading, isSuccess, data, error }] = useCreateNewEventMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            if (data) {
                Swal.fire({
                    text: data?.message,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    navigate(-1)
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


    const locationOption = locations?.map((location: { locationName: string; _id: string }) => ({
        value: location?._id,
        label: location?.locationName
    }));

    const staffOption = allStaff?.map((staff: { name: string; _id: string }) => ({
        value: staff?._id,
        label: staff?.name
    }));

    const handleSubmit = async (values: any) => {
        const { name, location, staff, timeSlots } = values;

        const formattedData = {
            name,
            location,
            staff,
            frequency,
            totalCapacity: capacity,
            startTime: dayjs(timeSlots?.[0]?.startTime).format("hh:mm A"),
            duration: timeSlots?.[0]?.duration,
            eventDate: dayjs().hour(dayjs(timeSlots?.[0]?.startTime).hour()).minute(dayjs(timeSlots?.[0]?.startTime).minute()).second(0).toISOString(),
            workType: mode
        };

        await createNewEvent(formattedData).unwrap();

    };

    return (
        <div>
            <div className="mx-auto space-y-4">
                {/* New event Section */}
                <div className="bg-gray-50 border border-[#D8D8D8] py-[63px] px-[50px] rounded-xl shadow-sm">
                    <div className="space-y-5">
                        <h2 className="text-base flex items-center gap-x-1">
                            <PiCalendarHeartDuotone size={26} className="text-gray-700" />
                            <span className=' text-[30px] font-bold '>Event </span>
                        </h2>
                        <p className="text-[22px] font-medium">
                            For multiple participants, displayed on your events page. Good for retreats, workshops, or similar.
                        </p>
                    </div>
                </div>

                {/* Form Wrapper */}
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    {/* Scheduling Section */}
                    <div className="bg-gray-50 border border-[#D8D8D8] p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-[30px] font-bold ">Scheduling</h2>
                            <Radio.Group
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                                className="flex gap-2"
                            >
                                <Radio.Button value="offline">In Person</Radio.Button>
                                <Radio.Button value="online">Online</Radio.Button>
                            </Radio.Group>
                        </div>

                        <div className="flex gap-12 px-5">
                            {/* Left Column */}
                            <div className="space-y-5  lg:w-[40%]">
                                <div className="space-y-1">
                                    <h3 className="text-[30px] font-bold">Name</h3>
                                    <p className="text-[16px] font-medium text-primaryText pb-2">Give your Event a solid title. Remember, it will be visible to the public.</p>
                                    <Form.Item name="name" rules={[{ required: true, message: "Please enter event name" }]}>
                                        <Input
                                            className="w-full mb-2"
                                            placeholder="Select a name"
                                            size="large"
                                            style={{ height: "50px" }}
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-10 lg:w-[60%]">
                                <div className="space-y-1">
                                    <h3 className="text-[30px] font-bold">Location</h3>
                                    <p className="text-[16px] font-medium text-primaryText pb-2">Select the location where the class takes place.</p>
                                    <Form.Item name="location" rules={[{ required: true, message: "Please select a location" }]}>
                                        <Select
                                            className="w-full mb-2"
                                            placeholder="Select an option"
                                            size="large"
                                            style={{ height: "50px" }}
                                            options={locationOption}
                                        />
                                    </Form.Item>
                                    <p className="text-primary pt-1 h-auto font-medium text-[18px] cursor-pointer"
                                        onClick={() => navigate("/location-management")}>
                                        + New Location
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-[#D8D8D8] rounded-xl p-[53px] mt-8 w-full">
                            {/* Time Slots */}
                            <div className="flex items-center justify-center">
                                <div>
                                    <h3 className="text-[22px] font-bold text-center">Start Time & Duration</h3>
                                    <p className="text-[16px] text-primaryText pb-3">Select the start time and add the duration in minutes</p>
                                    <Form.List name="timeSlots" initialValue={[{}]}>
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name }) => (
                                                    <div key={key} className='flex items-center gap-4'>
                                                        <Form.Item
                                                            name={[name, 'startTime']}
                                                            label="Start Time"
                                                            rules={[{ required: true, message: 'Start time is required' }]}
                                                        >
                                                            <TimePicker format="hh:mm A" style={{ width: "200px" }} />
                                                        </Form.Item>
                                                        <Form.Item
                                                            name={[name, 'duration']}
                                                            label="Duration"
                                                            rules={[{ required: true, message: 'Duration is required' }]}
                                                        >
                                                            <InputNumber min={1} style={{ width: "100%" }} />
                                                        </Form.Item>
                                                        {fields.length > 1 && (
                                                            <Button icon={<Trash className='text-primary p-1' />} onClick={() => remove(name)} />
                                                        )}
                                                    </div>
                                                ))}
                                                <Button className="flex items-center justify-center gap-2 mt-4" onClick={() => add()}>Add Time Slot</Button>
                                            </>
                                        )}
                                    </Form.List>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full px-[30px] gap-20 mt-8">
                                {/* Frequency */}
                                <div className="w-1/2">
                                    <div className="space-y-4 flex items-center justify-between">
                                        <h3 className="text-[22px] font-bold">Frequency</h3>
                                        <Radio.Group
                                            value={frequency}
                                            onChange={(e) => setFrequency(e.target.value)}
                                            className="flex flex-col gap-4"
                                        >
                                            <Radio value="Once" className="text-[16px]">Once (on Sun, 26 Jan 2025)</Radio>
                                            <Radio value="Bi-Weekly" className="text-[16px]">Bi-Weekly</Radio>
                                        </Radio.Group>
                                    </div>
                                </div>

                                {/* Capacity */}
                                <div className="border border-[#D8D8D8] rounded-xl p-[30px] my-4 w-1/2 flex items-center justify-between gap-8">
                                    <div>
                                        <h3 className="text-[22px] font-bold">Total Capacity</h3>
                                        <p className="text-[16px] font-medium text-primaryText">How many participants can join this class in total?</p>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 rounded">
                                        <Button
                                            className="flex items-center justify-center w-12 h-8 p-0 border-gray-300"
                                            onClick={() => setCapacity(Math.max(0, capacity - 1))}
                                        >
                                            <FaMinus size={22} />
                                        </Button>
                                        <InputNumber
                                            min={0}
                                            value={capacity}
                                            onChange={(value) => setCapacity(Number(value))}
                                            className="w-16 text-center flex items-center justify-center"
                                            controls={false}
                                        />
                                        <Button
                                            className="flex items-center justify-center w-12 h-8 p-0 border-gray-300"
                                            onClick={() => setCapacity(capacity + 1)}
                                        >
                                            <FiPlus size={22} />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Staff & Buttons */}
                            <div className="flex justify-between px-[30px] w-full mt-7">
                                <div className="space-y-1 border border-[#D8D8D8] p-8 rounded-xl w-1/2">
                                    <h3 className="text-[22px] font-bold ">Assign Staff</h3>
                                    <p className="text-[16px] text-gray-500 pb-3">Your Staff will see the class type from your website.</p>
                                    <Form.Item name="staff" rules={[{ required: true, message: "Please select a staff member" }]}>
                                        <Select
                                            className="w-full"
                                            placeholder="Select a staff"
                                            size="large"
                                            options={staffOption}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="flex items-end justify-end gap-3 mt-8">
                                    <Button size="large" className="px-6">Cancel</Button>
                                    <Button type="primary" size="large" className="bg-primary px-8" htmlType="submit">
                                        {isLoading ? "Saving..." : "Save"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>

                <NewEventModal isLocationModalOpen={isEventModalOpen} setIsLocationModalOpen={setIsEventModalOpen} />
                <AddLocationModal isLocationModalOpen={isAddLocationModalOpen} setIsLocationModalOpen={setIsAddLocationModalOpen} />
            </div>
        </div>
    );
};

export default CreateEvent;
