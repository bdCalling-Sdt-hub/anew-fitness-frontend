import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { Select, Segmented, ConfigProvider, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { EventInput } from "@fullcalendar/core";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import AddNewModal from "./AddNewModal";
import AppointmentModal from "./AppointmentModal";
import { useGetCalenderDataQuery } from "../../../../redux/features/calender/calenderApi";
import moment from "moment";

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
  const [open, setOpen] = useState(false);

  const { data: getCalenderData } = useGetCalenderDataQuery(undefined); 

  useEffect(() => {
    if (!getCalenderData?.classesData) return;

    const newEvents: CalendarEvent[] = getCalenderData.classesData.flatMap((item: any) =>
      item.schedule?.flatMap((sched: any) => {
        const baseDate = moment(sched.date, [
          moment.ISO_8601,
          "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)",
          "YYYY-MM-DD , hh:mm A",
        ]);

        if (!baseDate.isValid()) {
        
          return [];
        }

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
              category: "Full Calendar",
            };
          });
        }

        // If no sessions, use fallback startTime
        const singleStartTime = moment(sched.startTime, ["hh:mm A", "HH:mm"]);
        const fallbackStart = moment(baseDate).set({
          hour: singleStartTime.hour(),
          minute: singleStartTime.minute(),
        });

        return {
          id: `${item.name}-${baseDate.valueOf()}`, // fallback id
          title: item.name,
          start: fallbackStart.toISOString(),
          resourceId: item.resourceId || "room1",
          category: "Full Calendar",
          allDay: false,
        };
      }) || []
    );

    setEvents(newEvents);
    setResources([
      { id: "room1", title: "Yoga Room" },
      { id: "room2", title: "HIIT Studio" },
      { id: "room3", title: "Strength Training Room" },
    ]);
  }, [getCalenderData]);

  const handleDateClick = (info: { date: Date }) => {
    setSelectedDate(info.date);
    setModalOpen(true);
  };

  const filteredEvents = selectedFilter === "Full Calendar"
    ? events
    : events.filter((event) => event.category === selectedFilter);

  const FilterCard = () => (
    <div className="flex items-center justify-center gap-4 py-5" hidden={!isFilterOpen}>
      {["Staff", "Location", "Classes", "Services"].map((label) => (
        <Select
          key={label}
          className="filter-select"
          placeholder={label}
          style={{ height: '40px', width: '190px' }}
          options={[
            { value: 'All Location', label: 'All Location' },
            { value: 'Location 1', label: 'Location 1' },
            { value: 'Location 2', label: 'Location 2' },
          ]}
        />
      ))}

      <DatePicker
        className="filter-select"
        style={{ height: '40px', width: '190px' }}
        value={selectedDate ? moment(selectedDate) : undefined}
        placeholder="Select Date"
        allowClear
      />
    </div>
  );

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
          <button
            className="flex items-center gap-2 p-2 px-4 text-primaryText relative"
            style={{ borderRadius: '8px', border: '1px solid #1f1f1f', background: 'white', fontWeight: 400, fontSize: '20px', height: '45px' }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <HiOutlineAdjustmentsHorizontal size={24} />
            <span>Filter</span>
            <span className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : "rotate-0"}`}>
              <IoIosArrowDown />
            </span>
          </button>

          <button
            className="flex items-center gap-2 p-2 px-5 text-white bg-primary h-[45px] rounded-lg"
            onClick={() => setModalOpen(true)}
          >
            Add New
          </button>
        </div>
      </div>

      {isFilterOpen && <FilterCard />}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
        initialView="timeGridWeek"
        editable
        selectable
        events={filteredEvents}
        resources={resources}
        dateClick={handleDateClick}
        displayEventTime
        eventDrop={(info) => {
          const updatedEvents = events.map((event) =>
            event.id === info.event.id ? { ...event, start: info.event.start?.toISOString() } : event
          );
          setEvents(updatedEvents);
        }}
      />

      <AddNewModal modalOpen={modalOpen} setModalOpen={setModalOpen} setOpen={setOpen} />
      <AppointmentModal open={open} setOpen={setOpen} setModalOpen={setModalOpen} />
    </div>
  );
}
