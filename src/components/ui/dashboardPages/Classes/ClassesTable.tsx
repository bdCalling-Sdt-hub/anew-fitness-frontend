import { Button, Table, Empty, Dropdown, Modal, Radio, ConfigProvider, Tabs } from 'antd';
import type { MenuProps } from 'antd';
import { MoreHorizontal } from 'lucide-react';
import noData from "../../../../assets/noData.png";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuPlus } from 'react-icons/lu';
import { useGetAllClassesQuery, useUpdateClassStatusMutation } from '../../../../redux/features/services/classesApi';
import moment from 'moment';


const ClassesTable = () => {
    const [tabOption, setTabOption] = useState("services")
    const { data: getAllClass } = useGetAllClassesQuery(undefined) 
    const [editClassData , setEditClassData] = useState({})
    // const [updateClassStatus, { isLoading, isError, isSuccess, data: updateData, error }] = useUpdateClassStatusMutation() 
    console.log(getAllClass);

    const data = getAllClass?.map((item: any) => ({
        key: item?._id,
        name: item?.name,
        serviceCategory: item?.serviceCategory,
        scheduled: moment(item?.scheduled).format('YYYY-MM-DD'),
        status: item?.status,
        staffName: item?.staff,
        leadName: item?.lead
    }))
    const tabItems = [
        {
            key: "All",
            label: <div className='flex items-center gap-1'>
                <p className=" text-[18px] font-semibold "> Classes </p>
                <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">
                    {data?.length}</p>
            </div>,

        },
        {
            key: "active ",
            label: <div className='flex items-center gap-1'>
                <p className=" text-[18px] font-semibold ">  Active Classes </p>
                <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">3</p>
            </div>,

        },

        {
            key: "inactive ",
            label: <div className='flex items-center gap-1'>
                <p className=" text-[18px] font-semibold "> Inactive Classes </p>
                <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">5</p>
            </div>,

        },
    ];

    const onChange = (key: string) => {
        setTabOption(key)
    };
    const [isStatusOpen, setIsStatusOpen] = useState(false)
    const navigate = useNavigate();

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

                <div className={` flex justify-center items-center w-[100px] h-[30px] cursor-pointer ${status === 'active' ? ' border border-[#00721E] rounded-full text-[#00721E]' : 'border border-[#AB0906] rounded-full text-[#AB0906]'}`} onClick={() => setIsStatusOpen(true)} >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>

            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
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

                <div className='flex items-center gap-1'>
                    <h2 className="text-[30px] font-bold"> Classes</h2>
                    {/* <p className="text-primaryText bg-[#FFC1C0] w-[30px] h-[30px] flex items-center justify-center rounded-full font-medium">{data.length}</p> */}
                </div>

                <button className=" flex items-center justify-center gap-4 bg-primary text-white w-auto p-2 px-5 rounded-lg"
                    onClick={() => navigate('/create-class')} >
                    <span className=""> New </span>
                    <span> <LuPlus size={25} />  </span>
                </button>

            </div>
            <div>
                <ConfigProvider
                    theme={{
                        components: {
                            Tabs: {
                                itemActiveColor: "#ab0906",
                                itemSelectedColor: "#ab0906",
                                inkBarColor: "#ab0906",
                                itemHoverColor: "#ab0906",

                            },
                        },
                    }}
                >

                    <Tabs defaultActiveKey="services" items={tabItems} onChange={onChange} />
                </ConfigProvider>
            </div>
            <div className="mx-auto bg-white rounded-lg shadow-sm">
                {data?.length > 0 ?
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
                                    <p className="text-primary font-semibold text-[22px] underline underline-offset-4 cursor-pointer" onClick={() => navigate('/calender')}>
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