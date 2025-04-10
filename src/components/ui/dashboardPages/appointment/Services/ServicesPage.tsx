import { ConfigProvider, Empty, Table } from "antd";
import noData from "../../../../../assets/noData.png";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDeleteAppointmentContactMutation, useGetAllAppointmentContactQuery } from "../../../../../redux/features/contact/appointmentClientApi";
import Swal from "sweetalert2";

const ServicesPage = ({setOpenService , setEditAppointmentData }:{setOpenService: (openService: boolean) => void , setEditAppointmentData: (editAppointmentData: any) => void}) => { 
const navigate = useNavigate();  
const {data :getAllAppointment , refetch} = useGetAllAppointmentContactQuery(undefined)  
const [deleteAppointmentContact] = useDeleteAppointmentContactMutation()
console.log(getAllAppointment); 

const data = getAllAppointment?.map((item: any) => ({
    contactName: item?.contact?.client_name,
    service: item?.service,
    staff: item?.staff?.name,
    date: item?.date,
    time: item?.time ,
    id:item._id
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
            await deleteAppointmentContact(id).then((res) => {
                console.log(res);
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
        { title: 'Contact Name', dataIndex: 'contactName', key: 'contactName' },
        { title: 'Service', dataIndex: 'service', key: 'service' },
        { title: 'Staff', dataIndex: 'staff', key: 'staff' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Time', dataIndex: 'time', key: 'time' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_:any,record:any) => (
                <div className="flex items-center gap-4">
                    <TbEdit size={22} color="#575555" onClick={() =>{ setOpenService(true) ; setEditAppointmentData(record)}} className="cursor-pointer" /> 
                    <RiDeleteBinLine size={22} color="#AB0906"  className="cursor-pointer" onClick={() => handleDelete(record?.id)}/>
                </div>
            ),
        },
    ];


    return (
        <div>
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
        </div>
    );
};

export default ServicesPage;