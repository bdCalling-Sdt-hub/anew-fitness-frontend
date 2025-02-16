import { Button, Table, Tag, Empty, Space, Dropdown, Select, Card } from 'antd';
import type { MenuProps } from 'antd';
import { Calendar, Filter, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoIosArrowDown } from 'react-icons/io';

interface ClassSchedule {
    key: string;
    name: string;
    serviceCategory: string;
    scheduled: string;
    status: 'active' | 'inactive';
}

const data = [
    {
        key: '1',
        name: "Event Name",
        serviceCategory: "Event",
        scheduled: "+New Schedule",
        status: "active"
    },
    {
        key: '2',
        name: "Class Name",
        serviceCategory: "Group Class",
        scheduled: "+New Schedule",
        status: "inactive"
    },
    {
        key: '3',
        name: "Event Name",
        serviceCategory: "Event",
        scheduled: "+New Schedule",
        status: "active"
    }
];

const UpcomingClass = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        location: 'All Location',
        dateRange: 'Today'
    });

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Service Category', dataIndex: 'serviceCategory', key: 'serviceCategory' },
        {
            title: 'Scheduled',
            dataIndex: 'scheduled',
            key: 'scheduled',
            render: (text: string) => <span className="text-red-600">{text}</span>,
        },
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
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <Dropdown menu={{ items }} trigger={['click']}>
                    <Button type="text" icon={<MoreHorizontal className="w-5 h-5" />} />
                </Dropdown>
            ),
        },
    ];

    const items: MenuProps['items'] = [
        { key: '1', label: 'Edit' },
        { key: '2', label: 'Delete' },
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
                {data.length > 0 ? <Table columns={columns} dataSource={data} pagination={false} className="border rounded-lg" /> : <Empty description="You don't have any classes yet" />}
            </div>
        </div>
    );
};

export default UpcomingClass;