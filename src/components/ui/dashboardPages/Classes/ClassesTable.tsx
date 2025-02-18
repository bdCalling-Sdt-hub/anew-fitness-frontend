import { Button, Table, Tag, Empty, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import {  MoreHorizontal } from 'lucide-react';
import noData from "../../../../assets/noData.png";

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
        serviceCategory: "Group Class",
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
        serviceCategory: "Group Class",
        scheduled: "+New Schedule",
        status: "active"
    },
    {
        key: '4',
        name: "Event Name",
        serviceCategory: "Group Class",
        scheduled: "+New Schedule",
        status: "active"
    }, 
    {
        key: '5',
        name: "Class Name",
        serviceCategory: "Group Class",
        scheduled: "+New Schedule",
        status: "inactive"
    },
    {
        key: '6',
        name: "Event Name",
        serviceCategory: "Group Class",
        scheduled: "+New Schedule",
        status: "active"
    },
    {
        key: '7',
        name: "Class Name",
        serviceCategory: "Group Class",
        scheduled: "+New Schedule",
        status: "inactive"
    },
    {
        key: '8',
        name: "Event Name",
        serviceCategory: "Group Class",
        scheduled: "+New Schedule",
        status: "active"
    },
];

const ClassesTable = () => {

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


    return (
        <div className="p-8  relative">
            <div className="flex justify-between items-center mb-6">                   
                        <h2 className="text-[30px] font-bold"> Classes</h2>   
                <button
                    className='p-2 px-5 text-white bg-primary rounded-lg'
                >
                    Add New
                </button>
               
            </div>
            <div className="mx-auto bg-white rounded-lg shadow-sm">
                {data.length > 0 ? <Table columns={columns} dataSource={data}  className="border rounded-lg" /> : <div className="py-8 flex justify-center items-center">
            <Empty 
                image={noData}
                imageStyle={{ width: 150, height: 150 , marginLeft:65 }} 
                description={
                    <div className="flex flex-col items-center gap-1 text-center">
                        <p className="text-primaryText font-semibold text-[22px]">
                            You don't have any classes yet
                        </p>
                        <p className="text-primary font-semibold text-[22px] underline underline-offset-4 cursor-pointer">
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

export default ClassesTable;