import { useEffect, useState } from 'react';
import { Select, Button, Radio, InputNumber, TimePicker, Input, Form, DatePicker, Spin } from 'antd';
import { Trash } from 'lucide-react';
import { PiCalendarPlusBold } from 'react-icons/pi';
// import AddNameModal from './allClassModals/AddNameModal'; 
import { FaMinus } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAddClassesMutation, useEditClassesMutation, useGetAllClassesQuery, useGetClassByIdQuery } from '../../../../redux/features/services/classesApi';
import { useGetLocationQuery } from '../../../../redux/features/location/locationApi';
import { useGetAllLeadContactQuery } from '../../../../redux/features/contact/leadContactApi';
import { useGetAllStaffQuery } from '../../../../redux/features/staff/staffManagementApi';
import moment from 'moment';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

const CreateClass = () => {
  const [frequency, setFrequency] = useState('once');
  const [capacity, setCapacity] = useState(0);
  const [mode, setMode] = useState('offline');
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data: locations } = useGetLocationQuery('')
  const { data: allLead } = useGetAllLeadContactQuery('')
  const { data: allStaff } = useGetAllStaffQuery('')
  const [addClasses , { isError, isLoading, isSuccess, data, error }] = useAddClassesMutation() 
  const [editClasses , { isError: isUpdateError, isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: updateData, error: updateError }] = useEditClassesMutation()
 const {refetch} = useGetAllClassesQuery(undefined)
  const { data: classDetails , refetch: updateRefetch } = useGetClassByIdQuery(id)
  const navigate = useNavigate()
  const [form] = Form.useForm(); 

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
                refetch();  
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


useEffect(() => {
    if (isUpdateSuccess) {
        if (updateData) {
            Swal.fire({
                text: updateData?.message,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {   
              updateRefetch();           
            })
        }
    }
    if (isUpdateError) {
        Swal.fire({
            //@ts-ignore
            text: updateError?.updateData?.message,
            icon: "error",
        });
    }
}, [isUpdateSuccess, isUpdateError, updateError, updateData]);     



  useEffect(() => {
    if (id) {
      setFrequency(classDetails?.frequency)
      setCapacity(classDetails?.totalCapacity)
      setMode(classDetails?.workType)

      form.setFieldsValue({
        name: classDetails?.name,
        location: classDetails?.location,
        schedule_date: dayjs(classDetails?.schedule[0].date),
        capacity: classDetails?.totalCapacity,
        frequency: classDetails?.frequency,
        timeSlots: classDetails?.schedule[0].sessions.map((session: any) => ({
          id: Date.now(),
          startTime: moment(session.startTime, 'hh:mm A'),
          duration: session.duration,
        })),
        lead: classDetails?.lead?._id,
        staff: classDetails?.staff?._id
      })
    }
  }, [id, classDetails])

  const locationOption = locations?.map((location: { locationName: string; _id: string }) => ({
    value: location?._id,
    label: location?.locationName
  }));


  const leadOption = allLead?.map((lead: { name: string; _id: string }) => ({
    value: lead?._id,
    label: lead?.name
  }));


  const staffOption = allStaff?.map((staff: { name: string; _id: string }) => ({
    value: staff?._id,
    label: staff?.name
  }));


  const handleSubmit = (values: any) => {

    const formattedData = {
      name: values.name,
      locationId: values.location,
      schedule: [
        {
          date: values.schedule_date.format('YYYY-MM-DD , hh:mm A'),
          sessions: values.timeSlots.map((slot: any) => ({
            startTime: slot.startTime.format('hh:mm A'),
            duration: slot.duration,
          })),
        },
      ],
      totalCapacity: values.capacity,
      frequency: values.frequency,
      workType: mode,
      leadId: values.lead,
      staffId: values.staff,
    };


    if(id) {
      editClasses({ id, data: formattedData })
     }else{ 
addClasses(formattedData)
    }
  }


  return (
    <Form layout="vertical" onFinish={handleSubmit} form={form}>

      {/* Top Section */}
      <div className="bg-gray-50 border border-[#D8D8D8] py-[35px] px-[50px] rounded-xl shadow-sm mb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="space-y-5">
            <h2 className="text-base flex items-center gap-x-1 ">
              <span><PiCalendarPlusBold size={26} className="text-gray-700" /></span>
              <span className="text-[30px] font-bold">{id ? "Edit" : "New"} Schedule</span>
            </h2>
            <div>
              <p className="text-[22px] font-bold">Name</p>
              <p className="text-lg text-gray-500">Enter the class you'd like to create a new time-slot for</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="w-1/2">
            <Form.Item name="name" rules={[{ required: true, message: 'Please enter the class name' }]}>
              <Input
                placeholder="Enter class name"
                style={{ height: '50px', width: '100%', borderRadius: '10px', backgroundColor: 'white' }}
              />
            </Form.Item>
          </div>
        </div>
      </div>

      {/* Scheduling Section */}
      <div className="bg-gray-50 border border-[#D8D8D8] p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[30px] font-bold">Scheduling</h2>
          <Form.Item name="mode" className="mb-0">
            <Radio.Group onChange={(e) => setMode(e.target.value)} defaultValue={mode} className="flex gap-2">
              <Radio.Button value="offline">In Person</Radio.Button>
              <Radio.Button value="online">Online</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>

        <div className="flex gap-12 px-5">
          {/* Left Column */}
          <div className="space-y-5 lg:w-[40%]">
            <div className="space-y-1">
              <h3 className="text-[30px] font-bold">Location</h3>
              <p className="text-lg font-medium text-primaryText pb-2">Select the location where the class takes place.</p>
              <Form.Item name="location" rules={[{ required: true, message: 'Please select a location' }]}>
                <Select
                  className="w-full mb-2"
                  placeholder="Select an option"
                  size="large"
                  style={{ height: "50px" }}
                  options={locationOption}
                />
              </Form.Item>
              <p className="text-primary pt-1 h-auto font-medium text-[18px] cursor-pointer" onClick={() => { navigate("/location-management") }}>
                + New Location
              </p>
            </div>

            {/* Frequency and Capacity */}
            <div className="border border-[#D8D8D8] rounded-xl p-4 pb-0">
              <div className="space-y-4 flex items-center justify-between">
                <h3 className="text-[22px] font-bold">Frequency</h3>
                <Form.Item name="frequency">
                  <Radio.Group onChange={(e) => setFrequency(e.target.value)} value={frequency} className="flex flex-col gap-4">
                    <Radio value="Once">Once {`(on ${moment().format('ddd, DD MMM YYYY')})`}</Radio>
                    <Radio value="Weekly">Recurring (Weekly)</Radio>
                    <Radio value="Bi-Weekly">Bi-Weekly</Radio>
                    <Radio value="Monthly">Monthly</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>

              <div className="border border-[#D8D8D8] rounded-xl p-[30px] my-3 w-full flex items-center justify-between gap-8">
                <div>
                  <h3 className="text-[22px] font-bold">Total Capacity</h3>
                  <p className="text-[16px] font-medium text-primaryText">How many participant can join this class in total?</p>
                </div>
                <div className="flex items-center gap-3 p-2 rounded">
                  <Button onClick={() => setCapacity(Math.max(0, capacity - 1))}><FaMinus size={22} /></Button>
                  <Form.Item name="capacity" className="mb-0">
                    <InputNumber min={0} value={capacity} onChange={(val) => setCapacity(Number(val))} />
                  </Form.Item>
                  <Button onClick={() => setCapacity(capacity + 1)}><FiPlus size={22} /></Button>
                </div>
              </div>
            </div>

            {/* Lead Selection */}
            <div className="space-y-1 border border-[#D8D8D8] rounded-xl p-4">
              <h3 className="text-[22px] font-bold">Select Lead</h3>
              <p className="text-[16px] text-gray-500 pb-3">Your Lead will see the class type from your website.</p>
              <Form.Item name="lead">
                <Select placeholder="Select a staff" size="large" options={leadOption} />
              </Form.Item>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-10 lg:w-[60%]">
            <div className="space-y-1 mb-4">
              <h3 className="text-[30px] font-bold">Schedule</h3>
              <p className="text-lg font-medium text-primaryText pb-2">Select the date when the class takes place.</p>
              <Form.Item name="schedule_date">
                <DatePicker placeholder="Sun, 26 Jan 2025" size="large" style={{ height: "50px", width: "100%" }} />
              </Form.Item>
            </div>

            {/* Time Slots */}
            <div className="space-y-1 border border-[#D8D8D8] rounded-xl p-4">
              <h3 className="text-[22px] font-bold">Start Time & Duration</h3>
              <p className="text-[16px] text-primaryText pb-3">Select the start time and add the duration in minutes</p>
              <Form.List name="timeSlots">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <div key={key} className='flex items-center gap-4'>
                        <Form.Item name={[name, 'startTime']} label="Start Time" rules={[{ required: true }]}>
                          <TimePicker format="hh:mm A" style={{ width: "200px" }} />
                        </Form.Item>
                        <Form.Item name={[name, 'duration']} label="Duration" rules={[{ required: true }]}>
                          <InputNumber min={1} style={{ width: "100%" }} />
                        </Form.Item>
                        <Button icon={<Trash className='text-primary p-1' />} onClick={() => remove(name)} />
                      </div>
                    ))}
                    <Button onClick={() => add()}>Add Time Slot</Button>
                  </>
                )}
              </Form.List>
            </div>

            {/* Assign Staff */}
            <div className="space-y-1 border border-[#D8D8D8] rounded-xl p-4">
              <h3 className="text-[22px] font-bold">Assign Staff</h3>
              <p className="text-[16px] text-gray-500 pb-3">Your Staff will see the class type from your website.</p>
              <Form.Item name="staff">
                <Select placeholder="Select a staff" size="large" options={staffOption} />
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button size="large" className="px-6">Cancel</Button>
          <Button type="primary" htmlType="submit" size="large" className="bg-primary px-8">{isLoading||isUpdateLoading ? <Spin size="small" /> : "Save"}</Button>
        </div>
      </div>

    </Form>

  );
};

export default CreateClass;