import { Button, ConfigProvider, Dropdown, Empty, MenuProps, Modal, Radio, Select, Space, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { LuPlus } from "react-icons/lu"; 
import noData from "../../../../assets/noData.png"
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import AddLocationModal from "./AddLocationModal";

interface DataType {
    key: string;
    venueName: string;
    status: 'online' | 'offline'; 
    address?: string;
    action: string; 
    activeStatus?: 'active' | 'inactive';
}

const data: DataType[] = [
    {
        key: '1',
        venueName: 'Technical Station',
        status: 'online',  
        activeStatus: 'inactive',
        action: '',
    },
    {
        key: '2',
        venueName: 'Technical Station',
        status: 'online', 
        activeStatus: 'active',
        action: '',
    },
    {
        key: '3',
        venueName: 'Technical Station',
        status: 'offline', 
        address:"Dhaka , Bangladesh", 
        activeStatus: 'inactive',
        action: '',
    },
    {
        key: '4',
        venueName: 'Technical Station',
        status: 'offline', 
        address:"Dhaka , Bangladesh", 
        activeStatus: 'active',
        action: '',
    },
];
const LocationManagement = () => { 
       const [isStatusOpen, setIsStatusOpen] = useState(false)  
       const [location , setLocation] = useState(false)

    const columns: ColumnsType<DataType> = [
        {
            title: 'Venue Name',
            dataIndex: 'venueName',
            key: 'venueName',
            render: (text, record) => (
                <Space>
                    {text}
                    {record.status === 'online' && (
                        <Tag color="success">Online</Tag>
                    )}
                </Space>
            ),
        }, 
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Status',
            dataIndex: 'activeStatus',
            key: 'activeStatus',
            render: (activeStatus: string) => (

                <div className={` flex justify-center items-center w-[100px] h-[30px] cursor-pointer ${activeStatus === 'active' ? ' border border-[#00721E] rounded-full text-[#00721E]' : 'border border-[#AB0906] rounded-full text-[#AB0906]'}`} onClick={() => setIsStatusOpen(true)} >
                    {activeStatus.charAt(0).toUpperCase() + activeStatus.slice(1)}
                </div>

            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Dropdown menu={{ items, className: "custom-dropdown-width" }} trigger={['click']} >
                    <Button type="text" icon={<MoreHorizontal className="w-5 h-5" />} />
                </Dropdown>
            ),
        },
    ];  

       const items: MenuProps['items'] = [
            { key: '1', label: <div className='font-medium tracking-wide ' > Edit </div> },
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
        <div className="px-[30px] pt-[30px]">

            <div className="flex items-center justify-between">
                <p className="text-[35px] font-bold text-primary ">All Location </p>

                <div className="flex items-center gap-5 ">
                    <Select
                        placeholder="sort"
                        defaultValue={'All Location'}
                        className="placeholder:text-primary placeholder:font-semibold placeholder:text-[18px]"
                        style={{ height: '45px', width: '160px', border: '1px solid #ab0906', borderRadius: '7px' }}
                        options={[
                            { value: 'All Location', label: 'All Location ' },
                            { value: 'Online Location', label: 'Online Location' },
                            { value: 'offline Location', label: 'offline Location' },
                        ]}
                    />

                    <button className=" bg-primary text-white text-[18px] font-semibold px-6 h-[45px] rounded-lg flex items-center gap-1 " 
                    onClick={() => setLocation(true)} >
                        <span> <LuPlus size={22} />  </span>
                        <span> Create </span>
                    </button>
                </div>
            </div>

            <p className=" text-[16px] font-medium pt-2 pb-10">Manage multiple venues for your business and let attendees know where to show up.</p>

            <div className="mx-auto bg-white rounded-lg shadow-sm ">
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
                                        You don't have any Location yet
                                    </p>
                                </div>
                            }
                        />
                    </div>}
            </div>
            <StatusModal isStatusOpen={isStatusOpen} setIsStatusOpen={setIsStatusOpen} /> 
            <AddLocationModal open={location} setOpen={setLocation} />
        </div>
    );
};

export default LocationManagement;