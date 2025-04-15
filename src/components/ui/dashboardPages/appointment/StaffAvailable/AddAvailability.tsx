import { useEffect, useState } from 'react';
import { Select, DatePicker, Form } from 'antd';
import { Trash2 } from 'lucide-react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useNavigate, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import {
  useAddStaffAvailabilityMutation,
  useGetAllStaffQuery,
} from '../../../../../redux/features/staff/staffManagementApi';
import Swal from 'sweetalert2';

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  [key: string]: TimeSlot[];
}

const AddAvailability = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [addStaffAvailability, { isLoading  , isError , isSuccess , data , error}] = useAddStaffAvailabilityMutation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { data: allStaff } = useGetAllStaffQuery('');
  const [availability, setAvailability] = useState<DayAvailability>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  }); 

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

  const staffOption = allStaff?.map((staff: { name: string; _id: string }) => ({
    value: staff?._id,
    label: staff?.name,
  }));

  const onFinish = async (values: any) => {
    const { staff, date } = values;
    const formattedAvailability = Object.entries(availability)
      .filter(([, slots]) => slots.length > 0)
      .map(([day, slots]) => ({
        day,
        timeSlots: slots.map((slot) => ({
          startTime: slot.start,
          endTime: slot.end,
        })),
      }));

    const payload = {
      staffId: staff,
      date: moment(date).format('YYYY-MM-DD'),
      availability: formattedAvailability,
    };


      await addStaffAvailability(payload).unwrap();
     

  };

  return (
    <div className="px-[50px]">
      <div className="flex items-center py-[30px]">
        <span>
          <RiArrowLeftLine color="#ab0906" size={30} onClick={() => navigate(-1)} />
        </span>
        <span className="text-[40px] font-bold text-primary">Add Availability</span>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ staff: id }}
      >
        <div className="mx-auto bg-[#f8fafc] border border-[#D8D8D8] rounded-lg shadow p-10">
          <h1 className="text-[30px] font-bold mb-6">Main Details</h1>

          <div className="flex items-center justify-between gap-10 w-full mb-10">
            <div className="w-1/2">
              <label className="block text-[22px] font-bold mb-2">Staff Name</label>
              <p className="text-[18px] font-medium text-primaryText mb-2">
                Give your service a solid title. Remember, it will be visible to the public.
              </p>
              <Form.Item name="staff" rules={[{ required: true, message: 'Please select a staff' }]}>
                <Select placeholder="Select a staff" size="large" options={staffOption} />
              </Form.Item>
            </div>

            <div className="mt-5 w-1/2">
              <label className="block text-[22px] font-bold mb-2">Add Date</label>
              <Form.Item name="date" rules={[{ required: true, message: 'Please select a date' }]}>
                <DatePicker
                  placeholder="Select a Date"
                  className="w-full h-[50px] rounded-lg placeholder:font-poppins placeholder:text-[#808080]"
                />
              </Form.Item>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 px-4">
            {Object.entries(availability).map(([day, slots]) => (
              <div key={day} className="mb-6 border border-[#D8D8D8] rounded-lg bg-white p-[30px]">
                <div className="flex justify-between items-center">
                  <h2 className="text-[24px] font-bold">{day}</h2>
                  {slots.length === 0 && (
                    <button
                      onClick={() => addTimeSlot(day)}
                      type="button"
                      className="text-[24px] font-bold text-primary"
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
                      type="button"
                      className="text-primary"
                    >
                      <Trash2 size={20} />
                    </button>
                    {index === slots.length - 1 && (
                      <button
                        onClick={() => addTimeSlot(day)}
                        type="button"
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

          <div className="flex justify-end gap-6">
            <button
              className="text-[22px] text-[#808080] font-semibold"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ height: '50px' }}
              className="bg-primary rounded-lg text-white text-[22px] px-7 font-semibold"
            >
            { isLoading ? 'Loading...' : 'Save'}  
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddAvailability;
