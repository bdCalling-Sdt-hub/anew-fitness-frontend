import { ConfigProvider, Empty, Table } from "antd";
import noData from "../../../../../assets/noData.png";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const data = [
    {
        contactName: "John Doe",
        service: "Web Development",
        staff: "Alice Johnson",
        date: "2025-03-01",
        time: "10:00 AM"
    },
    {
        contactName: "Jane Smith",
        service: "Graphic Design",
        staff: "Michael Brown",
        date: "2025-03-02",
        time: "11:30 AM"
    },
    {
        contactName: "Emma Wilson",
        service: "SEO Consultation",
        staff: "Sophia Martinez",
        date: "2025-03-03",
        time: "2:00 PM"
    },
    {
        contactName: "Robert Johnson",
        service: "Marketing Strategy",
        staff: "Daniel Lee",
        date: "2025-03-04",
        time: "9:00 AM"
    },
    {
        contactName: "Olivia Davis",
        service: "Content Writing",
        staff: "Emily White",
        date: "2025-03-05",
        time: "4:00 PM"
    },
    {
        contactName: "William Taylor",
        service: "App Development",
        staff: "James Anderson",
        date: "2025-03-06",
        time: "1:30 PM"
    },
    {
        contactName: "Sophia Miller",
        service: "Cybersecurity Audit",
        staff: "Ethan Thomas",
        date: "2025-03-07",
        time: "3:00 PM"
    },
    {
        contactName: "Liam Martinez",
        service: "Cloud Services",
        staff: "Charlotte Wilson",
        date: "2025-03-08",
        time: "12:00 PM"
    },
    {
        contactName: "Ava Clark",
        service: "Social Media Management",
        staff: "Benjamin Moore",
        date: "2025-03-09",
        time: "5:30 PM"
    },
    {
        contactName: "Noah Hernandez",
        service: "E-commerce Setup",
        staff: "Mia Robinson",
        date: "2025-03-10",
        time: "8:00 AM"
    }
];



const ServicesPage = ({setOpenService}:{setOpenService: (openService: boolean) => void}) => { 
const navigate = useNavigate();

    const columns = [
        { title: 'Contact Name', dataIndex: 'contactName', key: 'contactName' },
        { title: 'Service', dataIndex: 'service', key: 'service' },
        { title: 'Staff', dataIndex: 'staff', key: 'staff' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Time', dataIndex: 'time', key: 'time' },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <div className="flex items-center gap-4">
                    <TbEdit size={22} color="#575555" onClick={() => setOpenService(true)} className="cursor-pointer" /> 
                    <RiDeleteBinLine size={22} color="#AB0906"  className="cursor-pointer"/>
                </div>
            ),
        },
    ];


    return (
        <div>
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