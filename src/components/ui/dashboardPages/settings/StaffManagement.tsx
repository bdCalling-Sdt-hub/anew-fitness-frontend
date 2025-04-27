//@ts-nocheck
import { ConfigProvider,  Empty, Table } from "antd";
import { Trash2 } from "lucide-react";
import { LuPlus } from "react-icons/lu";
import noData from "../../../../assets/noData.png"
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useState } from "react";
import AddStaffModal from "../appointment/StaffAvailable/AddStaffModal";
import { useNavigate } from "react-router-dom";
import { useDeleteStaffMutation, useGetAllStaffQuery } from "../../../../redux/features/staff/staffManagementApi";
import { imageUrl } from "../../../../redux/base/baseApi"; 
import moment from "moment"; 
import { TbEdit } from "react-icons/tb";
import Swal from "sweetalert2";

const StaffManagement = () => { 
    const [staff , setStaff]= useState(false) 
    const navigate = useNavigate(); 
    const {data:getAllStaff , refetch} = useGetAllStaffQuery(undefined)    
    const [editStaff , setEditStaff] = useState({})
    const [deleteStaff] = useDeleteStaffMutation();


    const data = getAllStaff?.map((item:any , index:number) => ({ 
        key: index+1 ,
        name: item?.name,
        roles: item?.role,
        access: item?.status,
        created: moment(item?.createdAt).format('YYYY-MM-D') ,
        document: item?.documents?.startsWith("http") ? item?.documents : `${imageUrl}${item?.documents}`,
        documentationExpiredDate: moment(item?.expiryDate).format('YYYY-MM-D'), 
        id: item?._id,
      }) ) 

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
              await deleteStaff(id).then((res) => { 
             
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
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles: string[]) => <div className="flex gap-2">
                 <div className=" text-primaryText border border-[#00721E] rounded-lg px-2 py-1 text-lg font-medium">{roles}
                </div></div>
        },
        {
            title: 'Access',
            dataIndex: 'access',
            key: 'access',
            render: (access: string) => <div> {access === "valid" ? <IoMdCheckmarkCircleOutline size={24} color="#AB0906" /> : <IoMdCheckmarkCircleOutline size={24} color="#D8D8D8" />}</div>,
        },
        {
            title: 'Created',
            dataIndex: 'created',
            key: 'created',
        },
        {
            title: 'Document',
            dataIndex: 'document',
            key: 'document', 
            render: (document: string) => (
                <div className="flex items-center gap-2">
                    <a href={document} target="_blank" rel="noopener noreferrer" className="text-primaryText font-normal text-[14px]  hover:text-blue-600">View Document</a>
                </div>
            )
        },
        {
            title: 'Document Expired Date',
            dataIndex: 'documentationExpiredDate',
            key: 'documentationExpiredDate'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_:any,record:any) => (
                <div className="flex gap-1">
                <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() =>{setEditStaff(record) , setStaff(true)}} >
                    <TbEdit size={22} color="#575555"  /> 
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full" onClick={()=>handleDelete(record?.id)} >
                  <Trash2 className="h-5 w-5 text-[#FE3838]" />
                </button>
              </div>
            ),
        },
    ];

    return (
        <div className=" pt-[30px]">
            <div className="flex justify-end items-center gap-7">
                <button className=" border border-primary text-primaryText text-[18px] font-semibold px-6 h-[45px] rounded-lg flex items-center gap-2 " onClick={() => setStaff(true)} >
                    <span> <LuPlus size={22} />  </span>
                    <span> Add New Staff </span>
                </button>

                <button className=" flex items-center justify-center gap-2 bg-primary text-white w-auto h-[45px] p-2 px-5 rounded-lg" 
                onClick={() => navigate("/role-management")} >
                    <span> <LuPlus size={22} />  </span>
                    <span className="">Add Management Role </span>
                </button>
            </div>

            <div className="mx-auto bg-white rounded-lg shadow-sm mt-10">
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
                                        You don't have any staff yet
                                    </p>
                                </div>
                            }
                        />
                    </div>}
            </div>  
            
            <AddStaffModal openStaff={staff} setOpenStaff={setStaff} refetch={refetch} editStaff={editStaff} setEditStaff={setEditStaff} />
        </div>
    );
};

export default StaffManagement;