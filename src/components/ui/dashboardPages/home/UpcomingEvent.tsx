import { Button, Table, Tag, Empty,  Select, Card } from 'antd';
import { useState } from 'react';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoIosArrowDown } from 'react-icons/io'; 
import noData from "../../../../assets/noData.png";
import { useNavigate } from 'react-router-dom';
import { useGetHomeDataQuery } from '../../../../redux/features/home/homeApi';

interface ClassSchedule {
    key: string;
    name: string;
    location: {locationName: string};
    startTime: string; 
    staff:{name: string}
    status: 'active' | 'inactive'; 
    _id:string
}

 
const UpcomingEvent = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false); 
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
       location: '',
        dateRange: ''
    }); 
 
    const { data: allData } = useGetHomeDataQuery({ location: filters?.location, dateRange: filters?.dateRange });

    const upComingEventsData = allData?.upcomingEvents

    const data = upComingEventsData?.map((item: ClassSchedule) => ({
        key: item?._id,
        name: item?.name,
        location: item?.location?.locationName, 
        startTime: item?.startTime,
        staff: item?.staff?.name,
        status: item?.status,
    }));

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Location', dataIndex: 'location', key: 'location' },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (text: string) => <span className="text-red-600">{text}</span>,
        }, 
        { title: 'Staff Name', dataIndex: 'staff', key: 'staff' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'active' ? 'success' : 'error'}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Tag>
            ),
        },
 
    ];


    const FilterCard = () => (
        <Card className="absolute top-[100px] right-0 w-[420px] shadow-lg p-4 z-10 bg-gray-50" hidden={!isFilterOpen}>
            <div className="space-y-4">
                <div className='flex items-center justify-between gap-2'>
                    <p className=" text-lg font-medium text-gray-700 mb-1">Location  </p>
                    <Select
                        className="w-full"
                        value={filters.location} 
                        style={{ 
                             height:'40px', 
                            width: '190px'
                        }}
                        onChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
                        options={[
                            { value: 'All Location', label: 'All Location' },
                            { value: 'Location 1', label: 'Location 1' },
                            { value: 'Location 2', label: 'Location 2' },
                        ]}
                    />
                </div>
                <div  className='flex items-center justify-between gap-2'>
                    <p className="text-lg font-medium text-gray-700 mb-1">Date Range</p>
                    <Select
                        className="w-full"
                        value={filters.dateRange}
                        onChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))} 
                        style={{ 
                            height:'40px' ,
                            width: '190px'

                       }}
                        options={[
                            { value: 'today', label: 'Today' },
                            { value: 'thisWeek', label: 'This Week' },
                            { value: 'thisMonth', label: 'This Month' },
                        ]}
                    />
                </div>
                <div className="flex  items-center justify-end gap-4 mt-4">
                    <Button onClick={() => setFilters({ location: 'All Location', dateRange: 'Today' })}>Clear</Button>
                    <button className='px-5 py-[6px] text-white bg-primary rounded'  onClick={() => setIsFilterOpen(false)}>Save</button>
                </div>
            </div>
        </Card>
    );

    return (
        <div className="p-8 border border-gray-200 rounded-lg bg-gray-50 relative my-5">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <div className='flex items-center gap-1'>
                        <h2 className="text-[30px] font-bold">Upcoming Event</h2>
                        <p className="text-primaryText bg-[#FFC1C0] w-[30px] h-[30px] flex items-center justify-center rounded-full font-medium">{data?.length}</p>
                    </div>
                </div>
                <button
                    className='flex items-center justify-between gap-2 p-2 px-5 text-primaryText relative'
                    style={{ borderRadius: '8px', border: '2px solid #ab0906', background: 'white', fontWeight: '400', fontSize: '20px', height: '45px' }}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    <HiOutlineAdjustmentsHorizontal size={24} />
                    <span>Filter</span>

                    <span className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : "rotate-0"}`}>
                        <IoIosArrowDown />
                    </span> 
                </button>
                {isFilterOpen && <FilterCard />}
            </div>
            <div className=" bg-white rounded-lg shadow-sm">
                {data?.length > 0 ? <Table columns={columns} dataSource={data} pagination={false} className="border rounded-lg" /> : <div className="py-8 flex justify-center items-center">
            <Empty 
                image={noData}
                styles={{ image: { width: 150, height: 150, marginLeft: 65 } }}
                description={
                    <div className="flex flex-col items-center gap-1 text-center">
                        <p className="text-primaryText font-semibold text-[22px]">
                            You don't have any classes yet
                        </p>
                        <p className="text-primary font-semibold text-[22px] underline underline-offset-4 cursor-pointer" onClick={() => navigate('/calender')}>
                            Schedule an Event
                        </p>
                    </div>
                }
            />
        </div>}
            </div>
        </div>
    );
};

export default UpcomingEvent;