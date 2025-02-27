import { Button, Table, Empty,  Select, Card } from 'antd';
import { useState } from 'react';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoIosArrowDown } from 'react-icons/io'; 
import noData from "../../../../assets/noData.png";
import { useNavigate } from 'react-router-dom';

const data = [
    {
        key: '1',
        name: "Event Name",
        serviceCategory: "Group Class",
        scheduled: "+New Schedule",
        status: "active",
        staffName: "John Doe",
        leadName: "Alice Smith"
    }, 
    {
        key: '2',
        name: "Class Name",
        serviceCategory: "Group Class",
        scheduled: "+New Schedule",
        status: "active",
        staffName: "Emily Johnson",
        leadName: "Michael Brown"
    },
    {
        key: '3',
        name: "Event Name",
        serviceCategory: "Group Class",
        scheduled: "+New Schedule",
        status: "active",
        staffName: "David Wilson",
        leadName: "Sophia Martinez"
    }
];
const UpcomingClass = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false); 
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        location: 'All Location',
        dateRange: 'Today'
    });

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Service Category', dataIndex: 'serviceCategory', key: 'serviceCategory' },
        { title: 'Staff Name', dataIndex: 'staffName', key: 'staffName' },
        { title: 'Leads Name', dataIndex: 'leadName', key: 'leadName' },
        {
            title: 'Scheduled',
            dataIndex: 'scheduled',
            key: 'scheduled',
            render: (text: string) => <span className="text-primary cursor-pointer" onClick={() => navigate('/calender')}>{text}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
              
                <div className={` flex justify-center items-center w-[100px] h-[30px]  ${status === 'active' ? ' border border-[#00721E] rounded-full text-[#00721E]' : 'border border-[#AB0906] rounded-full text-[#AB0906]'}`} >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
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
                            { value: 'Today', label: 'Today' },
                            { value: 'This Week', label: 'This Week' },
                            { value: 'This Month', label: 'This Month' },
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
        <div className="p-8 border border-gray-200 rounded-lg bg-gray-50 relative">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <div className='flex items-center gap-1'>
                        <h2 className="text-[30px] font-bold">Upcoming Class</h2>
                        <p className="text-primaryText bg-[#FFC1C0] w-[30px] h-[30px] flex items-center justify-center rounded-full font-medium">{data.length}</p>
                    </div>
                    <p className="text-[22px] text-primaryText">Showing <span className='font-semibold'> All Locations Of Today </span></p>
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
            <div className="mx-auto bg-white rounded-lg shadow-sm">
                {data.length > 0 ? <Table columns={columns} dataSource={data} pagination={false} className="border rounded-lg" /> : <div className="py-8 flex justify-center items-center">
            <Empty 
                image={noData}
                imageStyle={{ width: 150, height: 150 , marginLeft:65 }} 
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

export default UpcomingClass;