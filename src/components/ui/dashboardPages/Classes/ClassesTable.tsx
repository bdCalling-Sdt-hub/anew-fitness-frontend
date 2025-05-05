import {  Table, Empty, Modal, Radio, ConfigProvider, Tabs } from 'antd';
import { Trash2 } from 'lucide-react';
import noData from "../../../../assets/noData.png";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuPlus } from 'react-icons/lu';
import { useDeleteClassesMutation, useGetAllClassesQuery, useUpdateClassStatusMutation } from '../../../../redux/features/services/classesApi';
import moment from 'moment';
import Swal from 'sweetalert2';
import { TbEdit } from 'react-icons/tb';

interface DataType {
    _id: string;
    name: string;
    serviceCategory: any;
    schedule: any;
    status: string;
    staff: any;
    lead: any;
}


const ClassesTable = () => {
    const [tabOption, setTabOption] = useState("all")
    const { data: getAllClass, refetch } = useGetAllClassesQuery(undefined) 
    const [editClassData, setEditClassData] = useState({})
    const [isStatusOpen, setIsStatusOpen] = useState(false)
    const navigate = useNavigate();
    const [deleteClasses] = useDeleteClassesMutation();   
    const data = getAllClass?.map((item: DataType) => ({
        key: item?._id,
        name: item?.name,
        scheduled:  moment(item?.schedule?.[0]?.date, 'YYYY-MM-DD, hh:mm A').format('YYYY-MM-DD'),
        status: item?.status,
        staffName: item?.staff?.name,
        leadName: item?.lead?.name,
        id: item?._id
    })) 


    const activeData = data?.filter((item: DataType) => item.status === 'active') || [];
    const inactiveData = data?.filter((item: DataType) => item.status === 'inactive') || [];

    const tabItems = [
        {
            key: "all",
            label: <div className='flex items-center gap-1'>
                <p className=" text-[18px] font-semibold "> Classes </p>
                <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">
                    {data?.length || 0}</p>
            </div>,

        },
        {
            key: "active",
            label: <div className='flex items-center gap-1'>
                <p className=" text-[18px] font-semibold ">  Active Classes </p>
                <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">{activeData?.length || 0}</p>
            </div>,

        },

        {
            key: "inactive",
            label: <div className='flex items-center gap-1'>
                <p className=" text-[18px] font-semibold "> Inactive Classes </p>
                <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">{inactiveData?.length || 0}</p>
            </div>,

        },
    ];

    const getCurrentData = () => {
        if (tabOption === "active") return activeData;
        if (tabOption === "inactive") return inactiveData;
        return data || [];
    };

    const onChange = (key: string) => {
        setTabOption(key)
    }; 

           const handleDelete = async (id:string) => {   
                Swal.fire({
                    title: "Are you sure?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                  }).then(async (result) => { 
                   
                    if (result.isConfirmed) {
                      await deleteClasses(id).then((res) => { 
                        if (res?.data) {
                          Swal.fire({
                            text: res?.data?.message,
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                          }).then(() => {
                            refetch(); 
                          });
                        } else {
                          Swal.fire({
                            //@ts-ignore
                            text: res?.error?.data?.message,
                            icon: "error",
                            timer: 1500,
                            showConfirmButton: false,
                          });
                        }
                      })
                    }
                  }); 
        
              }   



    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
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
            render: (_: any, record: any) => (

                <div className={` flex justify-center items-center w-[100px] h-[30px] cursor-pointer ${record?.status === 'active' ? ' border border-[#00721E] rounded-full text-[#00721E]' : 'border border-[#AB0906] rounded-full text-[#AB0906]'}`} onClick={() => { setIsStatusOpen(true); setEditClassData(record) }} >
                    {record?.status.charAt(0).toUpperCase() + record?.status.slice(1)}
                </div>

            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <div className="flex gap-1">
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => { setEditClassData(record) ; navigate(`/create-class?id=${record?.id}`)}}>
                        <TbEdit size={22} color="#575555" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => handleDelete(record.id)}>
                        <Trash2 className="h-5 w-5 text-[#FE3838]" />
                    </button>
                </div>
            ),
        },
    ];


    const StatusModal = ({ isStatusOpen, setIsStatusOpen, editClassData, setEditClassData, refetch }: { isStatusOpen: boolean; setIsStatusOpen: (open: boolean) => void, editClassData: any, setEditClassData: any, refetch: () => void }) => {
        const [updateClassStatus] = useUpdateClassStatusMutation()

        const handleStatusChange = async (status: string) => {
            const data = {
                id: editClassData?.id,
                status: status,
            };
            await updateClassStatus(data).then((res) => {
  
                if (res?.data) {
                    Swal.fire({
                        text: res?.data?.message,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        refetch();
                        setEditClassData({})
                        setIsStatusOpen(false);
                    });
                } else {
                    Swal.fire({
                        //@ts-ignore
                        text: res?.error?.data?.message,
                        icon: "error",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }
            });

        }

        return (
            <Modal
                title={<h3 className="text-[22px] font-semibold text-primary border-b border-primary py-2">Class Status</h3>}
                open={isStatusOpen}
                onCancel={() => setIsStatusOpen(false)}
                footer={null}
                width={250}
                centered
            >
                <Radio.Group className="flex flex-col gap-3 mt-2" defaultValue={editClassData?.status} onChange={(e) => handleStatusChange(e.target.value)}>
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
                {getCurrentData()?.length > 0 ?
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
                        <Table columns={columns} dataSource={getCurrentData()} className="border rounded-lg" />
                    </ConfigProvider> : <div className="py-8 flex justify-center items-center">
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
            <StatusModal isStatusOpen={isStatusOpen} setIsStatusOpen={setIsStatusOpen} setEditClassData={setEditClassData} editClassData={editClassData} refetch={refetch} />
        </div>
    );
};

export default ClassesTable;