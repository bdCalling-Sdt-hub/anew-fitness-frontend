
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import {Segmented, ConfigProvider, DatePicker } from "antd";
import { useEffect, useRef, useState } from "react";
import { EventInput } from "@fullcalendar/core";
import AddNewModal from "./AddNewModal";
import AppointmentModal from "./AppointmentModal";
import { useGetAllCalenderDataQuery, useGetCalenderDataQuery } from "../../../../redux/features/calender/calenderApi";
import moment from "moment";
import { useGetAllEventsQuery } from "../../../../redux/features/event/eventApi";
import { useGetAllAppointmentContactQuery } from "../../../../redux/features/contact/appointmentClientApi";


interface Resource {
  id: string;
  title: string;
}

interface CalendarEvent extends EventInput {
  id?: string;
  resourceId?: string;
  category?: string;
}

export default function ScheduleCalender() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("Full Calendar");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: getCalenderData } = useGetCalenderDataQuery(undefined);
  const { data: allCalenderData } = useGetAllCalenderDataQuery(undefined);
  const { data: getAllEventsData } = useGetAllEventsQuery(undefined);
  const { data: getAllAppointmentData } = useGetAllAppointmentContactQuery(undefined);
  const calendarRef = useRef<FullCalendar | null>(null); 

  useEffect(() => {
    if (!getCalenderData?.classesData) return;

    const newEvents: CalendarEvent[] = getCalenderData.classesData.flatMap((item: any) =>
      item.schedule?.flatMap((sched: any) => {
        const baseDate = moment(sched.date, [
          moment.ISO_8601,
          "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)",
          "YYYY-MM-DD , hh:mm A",
        ]);

        if (!baseDate.isValid()) return [];

        if (sched.sessions?.length > 0) {
          return sched.sessions.map((session: any) => {
            const sessionStart = moment(baseDate).set({
              hour: moment(session.startTime, ["hh:mm A", "h:mm A"]).hour(),
              minute: moment(session.startTime, ["hh:mm A", "h:mm A"]).minute(),
            });

            return {
              id: session._id,
              title: item.name,
              start: sessionStart.toISOString(),
              resourceId: item.resourceId || "room1",
              category: "Classes",
            };
          });
        }

        const singleStartTime = moment(sched.startTime, ["hh:mm A", "HH:mm"]);
        const fallbackStart = moment(baseDate).set({
          hour: singleStartTime.hour(),
          minute: singleStartTime.minute(),
        });

        return {
          id: `${item.name}-${baseDate.valueOf()}`,
          title: item.name,
          start: fallbackStart.toISOString(),
          resourceId: item.resourceId || "room1",
          category: "Full Calendar",
          allDay: false,
        };
      }) || []
    );

    const additionalEvents: CalendarEvent[] = allCalenderData?.flatMap((event: any) => {
      const events: CalendarEvent[] = [];
    
      // Fallback to old format (eventDate + startTime)
      if (event.eventDate && event.startTime) {
        const start = moment(event.eventDate);
        const startTime = moment(event.startTime, ["hh:mm A", "h:mm A"]);
    
        const startWithTime = moment(start).set({
          hour: startTime.hour(),
          minute: startTime.minute(),
        });
    
        events.push({
          id: event._id,
          title: event.name,
          start: startWithTime.toISOString(),
          resourceId: "room2",
          category: "Full Calendar",
        });
      }
    
      
      if (Array.isArray(event.schedule)) {
        const sessionEvents = event.schedule.flatMap((sched: any) => {
          const baseDate = moment(sched.date, [
            moment.ISO_8601,
            "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)",
            "YYYY-MM-DD , hh:mm A",
          ]);
    
          if (!baseDate.isValid()) return [];
    
          return sched.sessions?.map((session: any) => {
            const time = moment(session.startTime, ["hh:mm A", "h:mm A"]);
            const sessionStart = moment(baseDate).set({
              hour: time.hour(),
              minute: time.minute(),
            });
    
            return {
              id: session._id || `${event._id}-${session.startTime}`,
              title: event.name,
              start: sessionStart.toISOString(),
              resourceId: "room2",
              category: "Full Calendar",
            };
          }) || [];
        });
    
        events.push(...sessionEvents);
      }
    
      return events;
    }) || [];
    


    const allEvents: CalendarEvent[] = getAllEventsData?.data?.map((event: any) => {
      const start = moment(event.eventDate);
      const startTime = moment(event.startTime, ["hh:mm A", "h:mm A"]);

      const startWithTime = moment(start).set({
        hour: startTime.hour(),
        minute: startTime.minute(),
      });

      return {
        id: event._id,
        title: event.name,
        start: startWithTime.toISOString(),
        resourceId: "room2",
        category: "Events",
      };
    }) || [];


    const appointmentEvents: CalendarEvent[] = getAllAppointmentData?.map((appt: any) => {
      const startDate = moment(appt.date);
      const startTime = moment(appt.time, ["HH:mm", "hh:mm A", "h:mm A"]);

      const startWithTime = moment(startDate).set({
        hour: startTime.hour(),
        minute: startTime.minute(),
      });

      return {
        id: appt._id,
        title: `${appt.contact.name} - ${appt.service}`,
        start: startWithTime.toISOString(),
        resourceId: "room3",
        category: "1-1 Appointments",
      };
    }) || [];


    setEvents([...newEvents, ...additionalEvents, ...allEvents, ...appointmentEvents]);
    setResources([
      { id: "room1", title: "Yoga Room" },
      { id: "room2", title: "HIIT Studio" },
      { id: "room3", title: "Appointments Room" },
    ]);
  }, [getCalenderData, allCalenderData, getAllEventsData]);

  const handleDateClick = (info: { date: Date }) => {
    setSelectedDate(info.date);
    setModalOpen(true);
  };

  const filteredEvents = selectedFilter === "Full Calendar"
    ? events
    : events.filter((event) => event.category === selectedFilter);

  // const FilterCard = () => (
  //   <div className="flex items-center justify-center gap-4 py-5" hidden={!isFilterOpen}>
  //     {["Staff", "Location", "Classes", "Services"].map((label) => (
  //       <Select
  //         key={label}
  //         className="filter-select"
  //         placeholder={label}
  //         style={{ height: '40px', width: '190px' }}
  //         options={[
  //           { value: 'All Location', label: 'All Location' },
  //           { value: 'Location 1', label: 'Location 1' },
  //           { value: 'Location 2', label: 'Location 2' },
  //         ]}
  //       />
  //     ))}

   
  //   </div>
  // );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center w-full mb-5">
        <div className="w-1/3">
          <ConfigProvider
            theme={{
              components: {
                Segmented: {
                  trackPadding: "7px 20px",
                  itemSelectedBg: "#ab0906",
                  itemSelectedColor: "#fff",
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
              className="mb-4 flex items-center justify-center segmented-gap"
              style={{ height: '50px' }}
            />
          </ConfigProvider>
        </div>

        <div className="flex items-center gap-x-3">
          {/* <button
            className="flex items-center gap-2 p-2 px-4 text-primaryText relative"
            style={{ borderRadius: '8px', border: '1px solid #1f1f1f', background: 'white', fontWeight: 400, fontSize: '20px', height: '45px' }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <HiOutlineAdjustmentsHorizontal size={24} />
            <span>Filter</span>
            <span className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : "rotate-0"}`}>
              <IoIosArrowDown />
            </span>
          </button> */} 

<DatePicker
        className="filter-select"
        style={{ height: '44px', width: '130px' }}
        value={selectedDate ? moment(selectedDate) : undefined}
        placeholder="Select Date"
        allowClear
        onChange={(date) => {
          setSelectedDate(date ? date.toDate() : null);
          if (calendarRef.current && date) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.gotoDate(date.toDate());
          }
        }}
      />

          <button
            className="flex items-center gap-2 p-2 px-5 text-white bg-primary h-[45px] rounded-lg"
            onClick={() => setModalOpen(true)}
          >
            Add New
          </button>
        </div>
      </div>

      {/* {isFilterOpen && <FilterCard />} */}

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
        initialView="timeGridWeek"
        editable
        selectable
        events={filteredEvents}
        resources={resources}
        dateClick={handleDateClick}
        displayEventTime
        eventDrop={(info: any) => {
          const updatedEvents = events.map((event) =>
            event.id === info.event.id
              ? { ...event, start: info.event.start?.toISOString() }
              : event
          );
          setEvents(updatedEvents);
        }}
      />

      <AddNewModal modalOpen={modalOpen} setModalOpen={setModalOpen} setOpen={setOpen} />
      <AppointmentModal open={open} setOpen={setOpen} setModalOpen={setModalOpen} />
    </div>
  );
}
