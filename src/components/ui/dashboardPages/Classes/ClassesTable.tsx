import { Button, Table, Empty, Dropdown, Modal, Radio, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import { MoreHorizontal } from 'lucide-react';
import noData from "../../../../assets/noData.png";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuPlus } from 'react-icons/lu';


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

    const [isStatusOpen, setIsStatusOpen] = useState(false)
    const navigate = useNavigate();

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

                <div className={` flex justify-center items-center w-[100px] h-[30px] cursor-pointer ${status === 'active' ? ' border border-[#00721E] rounded-full text-[#00721E]' : 'border border-[#AB0906] rounded-full text-[#AB0906]'}`} onClick={() => setIsStatusOpen(true)} >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>

            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <Dropdown menu={{ items, className: "custom-dropdown-width" }} trigger={['click']} >
                    <Button type="text" icon={<MoreHorizontal className="w-5 h-5" />} />
                </Dropdown>
            ),
        },
    ];

    const items: MenuProps['items'] = [
        { key: '1', label: <div className='font-medium tracking-wide ' onClick={() => navigate('/create-class')} > Edit </div> },
        { key: '2', label: 'Delete' },
    ];

    const StatusModal = ({ isStatusOpen, setIsStatusOpen }: { isStatusOpen: boolean; setIsStatusOpen: (open: boolean) => void }) => {
        return (
            <Modal
                title={<h3 className="text-[22px] font-semibold text-primary border-b border-primary py-2">Class Status</h3>}
                open={isStatusOpen}
                onCancel={() => setIsStatusOpen(false)}
                footer={null}
                width={250}
                centered
            >
                <Radio.Group className="flex flex-col gap-3 mt-2">
                    <Radio value="active" className="text-[18px]">Active</Radio>
                    <Radio value="inactive" className="text-[18px]">Inactive</Radio>
                </Radio.Group>
            </Modal>
        );
    };


    return (
        <div className="p-8  relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-[30px] font-bold"> Classes</h2>
                <button className=" flex items-center justify-center gap-4 bg-primary text-white w-auto p-2 px-5 rounded-lg"
                    onClick={() => navigate('/create-class')} >
                    <span className=""> New </span>
                    <span> <LuPlus size={25} />  </span>
                </button>

            </div>
            <div className="mx-auto bg-white rounded-lg shadow-sm">
                {data.length > 0 ?


                    <ConfigProvider
                        theme={{
                            components: {
                                Pagination: {
                                    itemActiveBg: "#6C57EC",
                                    borderRadius: 100
                                }
                            },
                            token: {
                                colorPrimary: "white"
                            }
                        }}
                    >
                        <Table columns={columns} dataSource={data} className="border rounded-lg" />
                    </ConfigProvider> : <div className="py-8 flex justify-center items-center">
                        <Empty
                            image={noData}
                            imageStyle={{ width: 150, height: 150, marginLeft: 65 }}
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
            <StatusModal isStatusOpen={isStatusOpen} setIsStatusOpen={setIsStatusOpen} />
        </div>
    );
};

export default ClassesTable;