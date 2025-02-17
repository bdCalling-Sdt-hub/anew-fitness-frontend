import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { Select, Segmented, ConfigProvider,  DatePicker } from "antd";
import { useEffect, useState } from "react";
import { EventInput } from "@fullcalendar/core";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import AddNewModal from "./AddNewModal";

interface Resource {
    id: string;
    title: string;
}

interface CalendarEvent extends EventInput {
    resourceId?: string;
    category?: string;
}

export default function ScheduleCalender() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [resources, setResources] = useState<Resource[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>("Full Calendar");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const demoEvents: CalendarEvent[] = [
        { id: "1", title: "Yoga Class", start: "2025-02-17T10:00:00", resourceId: "room1", category: "Classes" },
        { id: "2", title: "HIIT Training", start: "2025-02-17T12:00:00", resourceId: "room2", category: "Classes" },
        { id: "3", title: "Strength Training", start: "2025-02-18T14:00:00", resourceId: "room1", category: "Events" },
        { id: "4", title: "Pilates Session", start: "2025-02-19T08:00:00", resourceId: "room3", category: "1-1 Appointments" },
        { id: "5", title: "Full Moon Yoga", start: "2025-02-20T18:00:00", resourceId: "room1", category: "Full Calendar" },
    ];

    const demoResources: Resource[] = [
        { id: "room1", title: "Yoga Room" },
        { id: "room2", title: "HIIT Studio" },
        { id: "room3", title: "Strength Training Room" },
    ];

    useEffect(() => {
        setEvents(demoEvents);
        setResources(demoResources);
    }, []);

    const handleDateClick = (info: { date: Date }) => {
        setSelectedDate(info.date);
        setModalOpen(true);
    };



    const filteredEvents = selectedFilter === "Full Calendar"
        ? events
        : events.filter((event) => event.category === selectedFilter); 


        const FilterCard = () => (
<div className=" flex items-center justify-center gap-4 py-5" hidden={!isFilterOpen}>                    
  <Select
    className="filter-select" 
    placeholder="Staff"
    style={{ height: '40px', width: '190px' }}
    options={[
      { value: 'All Location', label: 'All Location' },
      { value: 'Location 1', label: 'Location 1' },
      { value: 'Location 2', label: 'Location 2' },
    ]}
  />
  
  <Select
    className="filter-select" 
       placeholder="Location"
    style={{ height: '40px', width: '190px' }}
    options={[
      { value: 'All Location', label: 'All Location' },
      { value: 'Location 1', label: 'Location 1' },
      { value: 'Location 2', label: 'Location 2' },
    ]}
  />
  
  <Select
    className="filter-select" 
    placeholder="Classes"
    style={{ height: '40px', width: '190px' }}
    options={[
      { value: 'All Location', label: 'All Location' },
      { value: 'Location 1', label: 'Location 1' },
      { value: 'Location 2', label: 'Location 2' },
    ]}
  />
  
  <Select
    className="filter-select" 
    placeholder="Services"
    style={{ height: '40px', width: '190px' }}
    options={[
      { value: 'All Location', label: 'All Location' },
      { value: 'Location 1', label: 'Location 1' },
      { value: 'Location 2', label: 'Location 2' },
    ]}
  /> 

<DatePicker
        className="filter-select"
        style={{ height: '40px', width: '190px' }}
        value={selectedDate ? selectedDate : undefined}
        // onChange={handleDateChange} 
        placeholder="Select Date"
        allowClear
      /> 

</div>
        );

    return (
        <div className="p-4">

            <div className=" flex justify-between items-center w-full mb-5">

                <div className=" w-1/3">
                    <ConfigProvider
                        theme={{
                            components: {
                                Segmented: {
                                    trackPadding: "7px 20px",
                                    itemSelectedBg: "#ab0906",
                                    itemSelectedColor: "#fff",
                                    // trackBg: "#f3e1e0" ,
                                },
                            },
                            token: {
                                controlHeight: 37,
                            },
                        }}
                    >

                        <Segmented
                            options={["Full Calendar", "Classes", "Events", "1-1 Appointments"]}
                            value={selectedFilter}
                            onChange={(val) => setSelectedFilter(val as string)}
                            className="mb-4 flex items-center justify-center  segmented-gap"
                            style={{
                                height: '50px',

                            }}
                        />

                    </ConfigProvider>
                </div>

                <div className=" flex items-center gap-x-3">
                    <button
                        className='flex items-center justify-between gap-2 p-2 px-4 text-primaryText relative'
                        style={{ borderRadius: '8px', border: '1px solid #1f1f1f', background: 'white', fontWeight: '400', fontSize: '20px', height: '45px' }}
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <HiOutlineAdjustmentsHorizontal size={24} />
                        <span>Filter</span>

                        <span className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : "rotate-0"}`}>
                            <IoIosArrowDown />
                        </span>
                    </button>


                    <button className='flex items-center justify-between gap-2 p-2 px-5 text-white bg-primary h-[45px] rounded-lg '>
Add New 

                    </button>
                </div>

            </div>
 
 <div> 
 {isFilterOpen && <FilterCard />}
 </div>
           

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
                initialView="timeGridWeek"
                editable={true}
                selectable={true}
                events={filteredEvents}
                resources={resources}
                dateClick={handleDateClick}
                eventDrop={(info) => {
                    const updatedEvents = events.map((event) =>
                        event.id === info.event.id ? { ...event, start: info.event.start?.toISOString() } : event
                    );
                    setEvents(updatedEvents);
                }}
            />

           <AddNewModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    );
}
