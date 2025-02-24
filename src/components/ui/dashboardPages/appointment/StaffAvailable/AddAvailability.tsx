import { useState } from 'react';
import { Input, Select, DatePicker, Button } from 'antd';
import { Trash2 } from 'lucide-react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  [key: string]: TimeSlot[];
}
const AddAvailability = () => {  
    const navigate = useNavigate();
    const [availability, setAvailability] = useState<DayAvailability>({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      });
    
      const timeOptions = Array.from({ length: 48 }, (_, i) => {
        const hour = Math.floor(i / 2);
        const minute = i % 2 === 0 ? '00' : '30';
        const time = `${hour.toString().padStart(2, '0')}:${minute}`;
        return { value: time, label: time };
      });
    
      const addTimeSlot = (day: string) => {
        setAvailability((prev) => ({
          ...prev,
          [day]: [...prev[day], { start: '09:00', end: '17:00' }],
        }));
      };
    
      const removeTimeSlot = (day: string, index: number) => {
        setAvailability((prev) => ({
          ...prev,
          [day]: prev[day].filter((_, i) => i !== index),
        }));
      };
    
      const updateTimeSlot = (day: string, index: number, field: 'start' | 'end', value: string) => {
        setAvailability((prev) => ({
          ...prev,
          [day]: prev[day].map((slot, i) =>
            i === index ? { ...slot, [field]: value } : slot
          ),
        }));
      }; 
    return (
        <div className=" px-[50px] "> 
        <div className=' flex items-center py-[30px] '>  
            <span><RiArrowLeftLine  color='#ab0906' size={30} onClick={()=>navigate(-1)} /> </span>
            <span className="text-[40px] font-bold text-primary ">Add Availability</span>
        </div>
        <div className=" mx-auto bg-[#f8fafc] border border-[#D8D8D8] rounded-lg shadow p-10">
          <h1 className="text-[30px] font-bold mb-6">Main Details</h1> 

          <div className=' flex items-center justify-between gap-10 w-full mb-10'> 
          <div className=" w-1/2">
            <label className="block text-[22px] font-bold mb-2">Staff Name</label>
            <p className="text-[18px] font-medium text-primaryText mb-2">
              Give your service a solid title. Remember, it will be visible to the public.
            </p>
            <Input placeholder="Enter a name" className=" h-[50px] rounded-lg placeholder:font-poppins placeholder:text-[#808080]" />
          </div>
  
          <div className=" mt-5 w-1/2">
            <label className="block text-[22px] font-bold mb-2">Add Date</label>
            <DatePicker  placeholder="Select an Date"  className=" w-full h-[50px] rounded-lg placeholder:font-poppins placeholder:text-[#808080]" />
          </div> 
          </div>

          <div className=' grid grid-cols-2 gap-10 px-4'> 
          {Object.entries(availability).map(([day, slots]) => (
            <div key={day} className="mb-6 border border-[#D8D8D8] rounded-lg bg-white p-[30px]">
              <div className="flex justify-between items-center ">
                <h2 className="text-[24px] font-bold">{day}</h2>
                {slots.length === 0 && (
                  <button
                    onClick={() => addTimeSlot(day)}
                    className="text-[24px] font-bold text-primary "
                  >
                    + Add Availability
                  </button>
                )}
              </div>            
  
              {slots.map((slot, index) => (
                <div key={index} className="flex items-center gap-4 mb-2 pt-3">
                  <Select
                    value={slot.start}
                    onChange={(value) => updateTimeSlot(day, index, 'start', value)}
                    options={timeOptions}
                    className="w-32 h-[40px]"
                  />
                  <Select
                    value={slot.end}
                    onChange={(value) => updateTimeSlot(day, index, 'end', value)}
                    options={timeOptions}
                    className="w-32 h-[40px]"
                  />
                  <button
                    onClick={() => removeTimeSlot(day, index)}
                    className="text-primary"
                  >
                    <Trash2 size={20} />
                  </button>
                  {index === slots.length - 1 && (
                    <button
                      onClick={() => addTimeSlot(day)}
                      className="text-primary text-lg font-bold"
                    >
                      +Add another time
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))}
  
</div> 
  
     
          <div className="flex justify-end gap-6 ">
            <button className='text-[22px] text-[#808080] font-semibold' onClick={()=>navigate(-1)}>Cancel</button>
            <button  style={{ 
                height: '50px',
            }} className="bg-primary rounded-lg text-white text-[22px] px-7 font-semibold">Save</button>
          </div>
        </div>
      </div>
    );
  }


export default AddAvailability;