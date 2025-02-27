import  { useState } from 'react';
import { Select, Button, Radio, InputNumber, TimePicker } from 'antd';
import { Plus, Trash } from 'lucide-react';
import { PiCalendarPlusBold } from 'react-icons/pi';
import AddNameModal from './allClassModals/AddNameModal';
import AddLocationModal from './allClassModals/AddLocationModal';
import { FaMinus } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';

const CreateClass = () => { 
    const [frequency, setFrequency] = useState('once');
    const [capacity, setCapacity] = useState(0);
    const [mode, setMode] = useState('in-person'); 
    const [isLocationModalOpen , setIsLocationModalOpen] = useState(false) 
    const [isAddLocationModalOpen , setIsAddLocationModalOpen] = useState(false)  
    const [timeSlots, setTimeSlots] = useState([{ id: Date.now() }]);

    const addTimeSlot = () => {
      setTimeSlots([...timeSlots, { id: Date.now() }]);
    };
  
    const removeTimeSlot = (id: number) => {
      setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
    };

    return (
        <div className="  ">
        <div className=" mx-auto space-y-4">
          {/* New Schedule Section */}
          <div className="bg-gray-50 border border-[#D8D8D8] py-[35px] px-[50px] rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="space-y-5">
                <h2 className="text-base flex items-center gap-x-1">
                  <PiCalendarPlusBold size={26} className="text-gray-700" /> 
                  <span className=' text-[30px] font-bold '>     New Schedule </span>
              
                </h2>
                <div>
                  <p className="text-[22px] font-bold">Name</p>
                  <p className="text-lg text-gray-500">Select the class you'd like to create a new time-slot for</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-4 w-[100%]"> 
                <div className='w-1/2'> 
                <Select
                className="flex-1"
                placeholder="Select an option"
                size="large" 
                style={{ height: '50px' , width: '60%' }}
              />
                </div>
           
              <Button 
                type="primary" 
                className="bg-primary hover:bg-red-800 flex items-center text-[22px] gap-1 h-[50px]" 
                onClick={() => setIsLocationModalOpen(true)}
              >
                New Class
                <Plus size={22} />
              </Button>
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
                  <h3 className="text-[30px] font-bold">Location</h3>
                  <p className="text-lg font-medium text-primaryText pb-2">Select the location where the class takes place.</p>
                  <Select
                    className="w-full mb-2"
                    placeholder="Select an option"
                    size="large" 
                    style={{height:"50px" }}
                  />
                  <p  className="text-primary pt-1 h-auto font-medium text-[18px] cursor-pointer" onClick={() => setIsAddLocationModalOpen(true)}>
                    + New Location
                  </p>
                </div> 


                <div className=' border border-[D8D8D8] rounded-xl p-4 pb-0'> 
  
                <div className="space-y-4 flex items-center justify-between">
                  <h3 className="text-[22px] font-bold">Frequency</h3>
                  <Radio.Group 
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="flex flex-col gap-4"
                  >
                    <Radio value="once" className="text-[16px]">Once (on Sun, 26 jan 2025)</Radio>
                    <Radio value="recurring" className="text-[16px]">Recurring (Weekly)</Radio> 
                    <div> 
                    <Radio value="biweekly" className="text-[16px]">Bi-Weekly</Radio>
                    <Radio value="monthly" className="text-[16px]">Monthly</Radio>
                    </div>
                  </Radio.Group>
                </div>
  
                <div className=" border border-[#D8D8D8] rounded-xl p-[30px] my-3 w-full flex items-center justify-between gap-8"> 
                    <div className=''> 
                  <h3 className="text-[22px] font-bold">Total Capacity</h3>
                  <p className="text-[16px] font-medium text-primaryText">How many participant can join this class in total?</p>
                    </div> 

                  <div className="flex items-center gap-3  p-2 rounded ">
                    <Button 
                      className="flex items-center justify-center w-12 h-8 p-0 border-gray-300"
                      onClick={() => setCapacity(Math.max(0, capacity - 1))}
                    >
                      <FaMinus  size={22} />
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
                    <FiPlus size={22}/>
                    </Button>
                  </div>
                </div>

                </div> 

                <div className="space-y-1 border border-[#D8D8D8] rounded-xl p-4">
                  <h3 className="text-[22px] font-bold ">Select Lead</h3>
                  <p className="text-[16px] text-gray-500 pb-3">Your Lead will see the class type from your website.</p>
                  <Select
                    className="w-full"
                    placeholder="Select an staff"
                    size="large"
                  />
                </div> 
              </div>
  
              {/* Right Column */}
              <div className="space-y-10 lg:w-[60%]">
                <div className="space-y-1 mb-4">
                  <h3 className="text-[30px] font-bold">Schedule</h3>
                  <p className="text-lg font-medium text-primaryText pb-2">Select the date when the class takes place.</p>
                  <Select
                    className="w-full "
                    placeholder="Sun, 26 jan 2025"
                    size="large" 
                    style={{height:"50px" }}
                  />
                </div>
  
                <div className="space-y-1 border border-[#D8D8D8] rounded-xl p-4">
                  <h3 className="text-[22px] font-bold ">Start Time & Duration</h3>
                  <p className="text-[16px] text-primaryText pb-3">Select the start time and add the duration in minutes</p>
                  {timeSlots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center gap-4  rounded-lg p-4 mb-3"
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
                  <p className="text-primary p-0 h-auto font-medium cursor-pointer text-[18px] pt-1"  onClick={addTimeSlot}>
                    + Add Another Time
                  </p>
                </div>
  
                <div className="space-y-1 border border-[#D8D8D8] rounded-xl p-4">
                  <h3 className="text-[22px] font-bold ">Assign Staff</h3>
                  <p className="text-[16px] text-gray-500 pb-3">Your Staff will see the class type from your website.</p>
                  <Select
                    className="w-full"
                    placeholder="Select an staff"
                    size="large"
                  />
                </div>
              </div>
            </div>
  
            <div className="flex justify-end gap-3 mt-0">
              <Button size="large" className="px-6">Cancel</Button>
              <Button type="primary" size="large" className="bg-primary  px-8">
                Save
              </Button>
            </div>
          </div>
        </div> 
        <AddNameModal isLocationModalOpen={isLocationModalOpen} setIsLocationModalOpen={setIsLocationModalOpen} /> 
        <AddLocationModal isLocationModalOpen={isAddLocationModalOpen} setIsLocationModalOpen={setIsAddLocationModalOpen} />
      </div>
    );
};

export default CreateClass;