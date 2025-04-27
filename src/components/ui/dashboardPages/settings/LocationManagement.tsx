
import { ConfigProvider, Empty,  Modal, Radio, Select, Space, Tabs, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { LuPlus } from "react-icons/lu";
import noData from "../../../../assets/noData.png"
import { useState } from "react";
import {  Trash2 } from "lucide-react";
import AddLocationModal from "./AddLocationModal";
import { useDeleteLocationMutation, useGetLocationQuery, useUpdateStatusMutation } from "../../../../redux/features/location/locationApi";
import { TbEdit } from "react-icons/tb";
import Swal from "sweetalert2";

interface DataType {
    key: string;
    venueName: string;
    workType: 'online' | 'offline';
    address?: string;
    action: string; 
    activeStatus?: 'active' | 'inactive';  
    id:string
}

const LocationManagement = () => {
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [location, setLocation] = useState(false);
    const [tabOption, setTabOption] = useState("All"); 
    const [workType , setWorkType] = useState("")   
    const [editData , setEditData] = useState({})
    const { data: allLocation , refetch } = useGetLocationQuery(workType); 
    const [deleteLocation] = useDeleteLocationMutation();  
 

    const data = allLocation?.map((item: any, index: number) => ({
        key: index + 1,
        firstName: item?.firstName,
        lastName: item?.lastName,
        hourRate: item?.hourRate,
        address: item?.address,
        locationType: item?.locationType,
        activeStatus: item?.status,
        email: item?.email,
        name: item?.locationName,
        mobileNumber: item?.mobileNumber,
        workType: item?.workType,
        status: item?.status, 
        id: item?._id, 
        region: item?.region, 

    }))

    const activeData = data?.filter((item: DataType) => item.activeStatus === 'active') || [];
    const inactiveData = data?.filter((item: DataType) => item.activeStatus === 'inactive') || [];

    const tabItems = [
        {
            key: "All",
            label: (
                <div className='flex items-center gap-1'>
                    <p className="text-[18px] font-semibold">All</p>
                    <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">{data?.length || 0}</p>
                </div>
            ),
        },
        {
            key: "Active",
            label: (
                <div className='flex items-center gap-1'>
                    <p className="text-[18px] font-semibold">Active</p>
                    <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">{activeData.length}</p>
                </div>
            ),
        },
        {
            key: "Inactive",
            label: (
                <div className='flex items-center gap-1'>
                    <p className="text-[18px] font-semibold">Inactive</p>
                    <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">{inactiveData.length}</p>
                </div>
            ),
        },
    ];

    const onChange = (key: string) => {
        setTabOption(key);
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
                  await deleteLocation(id).then((res) => { 
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


    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space>
                    {text}
                    {record?.workType === 'online' && <Tag color="success">Online</Tag>}
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
            render: (_,record: any) => (
                <div
                    className={`flex justify-center items-center w-[100px] h-[30px] cursor-pointer ${record?.activeStatus === 'active'
                        ? 'border border-[#00721E] rounded-full text-[#00721E]'
                        : 'border border-[#AB0906] rounded-full text-[#AB0906]'
                        }`}
                    onClick={() =>{ setIsStatusOpen(true) , setEditData(record)}}
                >
                    {record?.activeStatus.charAt(0).toUpperCase() + record?.activeStatus.slice(1)}
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_,record) => (
                <div className="flex gap-1">
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() =>{ setEditData(record) , setLocation(true)}}>
                        <TbEdit size={22} color="#575555" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => handleDelete(record.id)}>
                        <Trash2 className="h-5 w-5 text-[#FE3838]" />
                    </button>
                </div>
            ),
        },
    ];

    const StatusModal = ({ isStatusOpen, setIsStatusOpen , editData , refetch }: { isStatusOpen: boolean; setIsStatusOpen: (open: boolean) => void , editData : any , refetch : () => void }) => { 
        const [updateStatus] = useUpdateStatusMutation();    

        const handleStatusChange = async (status: string) => { 
            const data = {
                locationId: editData?.id,
                status: status,
            };
            await updateStatus(data).then((res) => { 
                if (res?.data) {
                    Swal.fire({
                        text: res?.data?.message,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        refetch(); 
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
                <Radio.Group className="flex flex-col gap-3 mt-2" defaultValue={editData?.activeStatus} onChange={(e) =>handleStatusChange(e.target.value)}>
                    <Radio value="active" className="text-[18px]">Active</Radio>
                    <Radio value="inactive" className="text-[18px]">Inactive</Radio>
                </Radio.Group>
            </Modal>
        );
    }; 

    const getCurrentData = () => {
        if (tabOption === "Active") return activeData;
        if (tabOption === "Inactive") return inactiveData;
        return data || [];
    };

    return (
        <div className="px-[30px] pt-[30px]">
            <div className="flex items-center justify-between">
                <p className="text-[35px] font-bold text-primary">All Location</p>
                <div className="flex items-center gap-5">
                    <Select
                        placeholder="sort"
                        defaultValue={'All Location'} 
                        onChange={(value) => setWorkType(value)}
                        className="placeholder:text-primary placeholder:font-semibold placeholder:text-[18px]"
                        style={{ height: '45px', width: '160px', border: '1px solid #ab0906', borderRadius: '7px' }}
                        options={[
                            { value: '', label: 'All Location' },
                            { value: 'online', label: 'Online Location' },
                            { value: 'offline', label: 'Offline Location' },
                        ]}
                    />
                    <button
                        className="bg-primary text-white text-[18px] font-semibold px-6 h-[45px] rounded-lg flex items-center gap-1"
                        onClick={() => setLocation(true)}
                    >
                        <LuPlus size={22} />
                        <span>Create</span>
                    </button>
                </div>
            </div>

            <p className="text-[16px] font-medium pt-2 pb-10">
                Manage multiple venues for your business and let attendees know where to show up.
            </p>

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
                <Tabs defaultActiveKey="All" items={tabItems} onChange={onChange} />
            </ConfigProvider>

            <div className="mx-auto bg-white rounded-lg shadow-sm">
                {getCurrentData().length > 0 ? (
                    <ConfigProvider
                        theme={{
                            components: {
                                Pagination: {
                                    itemActiveBg: "#6C57EC",
                                    borderRadius: 100,
                                },
                            },
                            token: {
                                colorPrimary: "white",
                            },
                        }}
                    >
                        <Table columns={columns} dataSource={getCurrentData()} className="border rounded-lg" />
                    </ConfigProvider>
                ) : (
                    <div className="py-8 flex justify-center items-center">
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
                    </div>
                )}
            </div>

            <StatusModal isStatusOpen={isStatusOpen} setIsStatusOpen={setIsStatusOpen} editData={editData} refetch={refetch}  />
            <AddLocationModal open={location} setOpen={setLocation} editData={editData} setEditData={setEditData} refetch={refetch} />
        </div>
    );
};

export default LocationManagement;