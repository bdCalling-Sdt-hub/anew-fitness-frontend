import { Trash2 } from "lucide-react";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { HiPlus } from "react-icons/hi2";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDeleteStaffMutation, useGetAllStaffQuery } from "../../../../../redux/features/staff/staffManagementApi";
import { imageUrl } from "../../../../../redux/base/baseApi";
import moment from "moment";
import { Table } from "antd";
import Swal from "sweetalert2";

const StaffAvailablePage = ({ setOpenStaff, setEditStaff }: { setOpenStaff: (isOpen: boolean) => void, setEditStaff: any }) => {
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate(); 
  const [userId , setUserId] = useState("")
  const { data: allStaff, refetch } = useGetAllStaffQuery(undefined)
  const [deleteStaff] = useDeleteStaffMutation();  


  const data = allStaff?.map((item: { name: string, role: string, status: string, createdAt: string, documents: string, expiryDate: string, _id: string, availability: any }, index: number) => ({
    key: index + 1,
    name: item?.name,
    roles: item?.role,
    access: item?.status,
    created: moment(item?.createdAt).format('YYYY-MM-D'),
    document: item?.documents?.startsWith("http") ? item?.documents : `${imageUrl}${item?.documents}`,
    documentationExpiredDate: moment(item?.expiryDate).format('YYYY-MM-D'),
    id: item?._id,
    availability: item?.availability ?? []
  }))

  const handleDelete = async (id: string) => {
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



  const toggleItem = (id: number) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }; 


  return (
    <div className="w-full">
      {data?.map((item: { name: string, role: string, status: string, createdAt: string, documents: string, expiryDate: string, id: string, availability: any }, index: number) => {
        const isOpen = openItems[index] || false;
        return (
          <div key={index} className="rounded-lg border border-gray-200 bg-white mb-4 w-full">
            {/* Header Section */}
            <div className="px-[35px] py-7 ">
              <div>

                <div className="flex items-center justify-between">
                  <div>            <h3 className="text-[22px] font-bold text-primaryText pb-2">{item?.name}</h3>  </div>

                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => { setOpenStaff(true), setEditStaff(item) }}>
                      <TbEdit size={26} color="#575555" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => handleDelete(item?.id)}>
                      <Trash2 className="h-6 w-6 text-[#FE3838]" />
                    </button>
                  </div>
                </div>

                {item?.availability && item?.availability.length > 0 ? (
                 <div className="mt-4">
    <Table
      dataSource={item.availability.map((slot:{ day: string; timeSlots: { startTime: string; endTime: string; }[]; }, idx:number) => ({
        key: idx,
        day: slot.day,
        timeSlots: slot.timeSlots
          .map((time:{ startTime: string; endTime: string; }) => `${time.startTime} - ${time.endTime}`)
          .join(", "),
      }))}
      columns={[
        {
          title: "Day",
          dataIndex: "day",
          key: "day",
          render: (text) => <strong>{text}</strong>,
        },
        {
          title: "Time Slots",
          dataIndex: "timeSlots",
          key: "timeSlots",
          render: (text) => (
            <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
              {text}
            </div>
          ),
        },
      ]}
      pagination={false}
      bordered
      size="small"
    />
  </div> 
                ) : (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() =>{ toggleItem(index); setUserId(item?.id)}}>
                    <span className="text-[#FE3838] text-[22px] font-bold">
                      Availability Not Set
                    </span>
                    {isOpen ? <FaChevronUp size={22} color="#FE3838" /> : <FaChevronDown size={22} color="#FE3838" />}
                  </div>
                )}
              </div>

            </div>

            {/* Expanded Content */}
            {isOpen && (
              <div className="px-6 py-4 border-t border-gray-200 bg-[#f8fafc]">

                <div>
                  <h4 className="text-[18px] font-medium text-primaryText mb-[2px]">Availability</h4>
                  <p className="text-[18px] font-medium text-primaryText">
                    Client can't book appointments with this staff unless you add some available times.
                  </p>
                  <button
                    className="mt-4 flex items-center gap-2 text-primary"
                    onClick={() => navigate(`/appointment/add-availability?id=${userId}`)}
                  >
                    <HiPlus size={22} color="#ab0906" />
                    <span className="font-bold text-[22px]">Add Availability</span>
                  </button>
                </div>

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StaffAvailablePage;
