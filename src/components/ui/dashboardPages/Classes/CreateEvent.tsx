
import { PiCalendarHeartDuotone } from "react-icons/pi";
import { Select, Button, Radio, InputNumber, TimePicker } from 'antd';
import { Trash } from 'lucide-react';
import { PiCalendarPlusBold } from 'react-icons/pi';
import AddNameModal from './allClassModals/AddNameModal';
import AddLocationModal from './allClassModals/AddLocationModal';
import { FaMinus } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';
import { useState } from "react";
import NewEventModal from "./allClassModals/NewEventModal";

const CreateEvent = () => {

    const [frequency, setFrequency] = useState('once');
    const [capacity, setCapacity] = useState(0);
    const [mode, setMode] = useState('in-person');
    const [isEventModalOpen, setIsEventModalOpen] = useState(false)
    const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false)
    const [timeSlots, setTimeSlots] = useState([{ id: Date.now() }]);

    const addTimeSlot = () => {
        setTimeSlots([...timeSlots, { id: Date.now() }]);
    };

    const removeTimeSlot = (id: number) => {
        setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
    };

    return (
        <div>
            <div className=" mx-auto space-y-4">

                {/* New event Section */}
                <div className="bg-gray-50 border border-[#D8D8D8] py-[63px] px-[50px] rounded-xl shadow-sm">
                    <div className="space-y-5">
                        <h2 className="text-base flex items-center gap-x-1">
                            <PiCalendarHeartDuotone size={26} className="text-gray-700" />
                            <span className=' text-[30px] font-bold '>Event </span>
                        </h2>
                        <p className="text-[22px] font-medium">For multiple participants, displayed on your events page Good for retreats, workshops, or similar.</p>
                    </div>
                </div>

                {/* Scheduling Section */}
                <div className="bg-gray-50 border border-[#D8D8D8] p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-[30px] font-bold ">Scheduling</h2>
                        <Radio.Group
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="flex gap-2"
                        >
                            <Radio.Button value="in-person">In Person</Radio.Button>
                            <Radio.Button value="online">Online</Radio.Button>
                        </Radio.Group>
                    </div>

                    <div className="flex  gap-12 px-5">
                        {/* Left Column */}
                        <div className="space-y-5  lg:w-[40%]">
                            <div className="space-y-1">
                                <h3 className="text-[30px] font-bold">Name</h3>
                                <p className="text-[16px] font-medium text-primaryText pb-2">Give your Event a solid title. Remember, it will be visible to the public.</p>
                                <Select
                                    className="w-full mb-2"
                                    placeholder="Select a name"
                                    size="large"
                                    style={{ height: "50px" }}
                                />
                                <p className="text-primary pt-1 h-auto font-medium text-[18px] cursor-pointer" onClick={() => setIsEventModalOpen(true)}>
                                    + New Event
                                </p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-10 lg:w-[60%]">
                            <div className="space-y-1">
                                <h3 className="text-[30px] font-bold">Location</h3>
                                <p className="text-[16px] font-medium text-primaryText pb-2">Select the location where the class takes place.</p>
                                <Select
                                    className="w-full mb-2"
                                    placeholder="Select an option"
                                    size="large"
                                    style={{ height: "50px" }}
                                />
                                <p className="text-primary pt-1 h-auto font-medium text-[18px] cursor-pointer" onClick={() => setIsAddLocationModalOpen(true)}>
                                    + New Location
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className=" border border-[#D8D8D8] rounded-xl p-[53px] mt-8 w-full ">

                        <div className="  ">
                            <div className="flex flex-col items-center text-center pb-6">
                                <h3 className="text-[22px] font-bold ">Start Time & Duration</h3>
                                <p className="text-[16px] text-primaryText pb-3">Select the start time and add the duration in minutes</p>
                            </div>

                            <div className="flex items-center justify-center ">
                                <div className="w-1/2 ">
                                    {timeSlots.map((slot) => (
                                        <div
                                            key={slot.id}
                                            className="flex items-center gap-x-4  rounded-lg  mb-5"
                                        >
                                            <div className="w-full">
                                                <p className="text-[14px] text-gray-600 mb-1">Start Time</p>
                                                <TimePicker
                                                    className="w-full"
                                                    size="large"
                                                    placeholder="03:00 AM"
                                                    format="hh:mm A"
                                                />
                                            </div>

                                            <div className="w-full">
                                                <p className="text-[14px] text-gray-600 mb-1">Duration (minutes)</p>
                                                <InputNumber
                                                    className="w-full"
                                                    placeholder="60 (Min)"
                                                    min={1}
                                                    size="large"
                                                />
                                            </div>

                                            {timeSlots.length > 1 && (
                                                <div

                                                    className="flex items-center justify-center w-12 h-12  cursor-pointer mt-4"
                                                    onClick={() => removeTimeSlot(slot.id)}
                                                >
                                                    <Trash size={24} color='#ab0906' />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <p className="text-primary p-0 h-auto font-medium cursor-pointer text-[18px] pt-1 ps-4" onClick={addTimeSlot}>
                                        + Add Another Time
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div className=" flex items-center justify-between w-full px-[30px] gap-20">
                            <div className='  w-1/2'>
                                <div className="space-y-4 flex items-center justify-between">
                                    <h3 className="text-[22px] font-bold">Frequency</h3>
                                    <Radio.Group
                                        value={frequency}
                                        onChange={(e) => setFrequency(e.target.value)}
                                        className="flex flex-col gap-4"
                                    >
                                        <Radio value="once" className="text-[16px]">Once (on Sun, 26 jan 2025)</Radio>
            
                                        <Radio value="biweekly" className="text-[16px]">Bi-Weekly</Radio>
                                    </Radio.Group>
                                </div>
                            </div>

                            <div className=" border border-[#D8D8D8] rounded-xl p-[30px] my-4 w-1/2 flex items-center justify-between gap-8">
                                    <div className=''>
                                        <h3 className="text-[22px] font-bold">Total Capacity</h3>
                                        <p className="text-[16px] font-medium text-primaryText">How many participant can join this class in total?</p>
                                    </div>

                                    <div className="flex items-center gap-3  p-2 rounded ">
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
                                            className="w-16 text-center  flex items-center justify-center"
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


                        <div className=" flex justify-between px-[30px] w-full mt-7"> 
                        <div className="space-y-1 border border-[#D8D8D8] p-8 rounded-xl w-1/2">
                  <h3 className="text-[22px] font-bold ">Assign Staff</h3>
                  <p className="text-[16px] text-gray-500 pb-3">Your Staff will see the class type from your website.</p>
                  <Select
                    className="w-full"
                    placeholder="Select an staff"
                    size="large"
                  />
                </div>  

                <div className="flex items-end justify-end gap-3 mt-8">
                        <Button size="large" className="px-6">Cancel</Button>
                        <Button type="primary" size="large" className="bg-primary  px-8">
                            Save
                        </Button>
                    </div> 

                        </div>
                    </div>

                 
                </div>
                <NewEventModal isLocationModalOpen={isEventModalOpen} setIsLocationModalOpen={setIsEventModalOpen} />
                <AddLocationModal isLocationModalOpen={isAddLocationModalOpen} setIsLocationModalOpen={setIsAddLocationModalOpen} />

            </div>
        </div>
    );
};

export default CreateEvent;