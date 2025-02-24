import { ConfigProvider, Empty, Switch, Table } from "antd";
import { TbEdit } from "react-icons/tb";
import noData from "../../../../../assets/noData.png";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const data = [
    {
        clientName: "John Doe",
        address: "123 Main St, New York, NY",
        phone: "+1 555-1234",
        gender: "Male",
        email: "johndoe@example.com",
        createdAt: "1 week"
    },
    {
        clientName: "Jane Smith",
        address: "456 Oak Ave, Los Angeles, CA",
        phone: "+1 555-5678",
        gender: "Female",
        email: "janesmith@example.com",
        createdAt: "1 month"
    },
    {
        clientName: "Emma Wilson",
        address: "789 Pine Rd, Chicago, IL",
        phone: "+1 555-9012",
        gender: "Female",
        email: "emmawilson@example.com",
        createdAt: "1 year"
    },
    {
        clientName: "Robert Johnson",
        address: "321 Maple Dr, Houston, TX",
        phone: "+1 555-3456",
        gender: "Male",
        email: "robertjohnson@example.com",
        createdAt: "1 week"
    },
    {
        clientName: "Olivia Davis",
        address: "654 Birch Ln, Phoenix, AZ",
        phone: "+1 555-7890",
        gender: "Female",
        email: "oliviadavis@example.com",
        createdAt: "1 month"
    },
    {
        clientName: "William Taylor",
        address: "987 Cedar Ct, Philadelphia, PA",
        phone: "+1 555-2345",
        gender: "Male",
        email: "williamtaylor@example.com",
        createdAt: "1 year"
    },
    {
        clientName: "Sophia Miller",
        address: "159 Spruce St, San Antonio, TX",
        phone: "+1 555-6789",
        gender: "Female",
        email: "sophiamiller@example.com",
        createdAt: "1 week"
    },
    {
        clientName: "Liam Martinez",
        address: "753 Elm Blvd, San Diego, CA",
        phone: "+1 555-0123",
        gender: "Male",
        email: "liammartinez@example.com",
        createdAt: "1 month"
    },
    {
        clientName: "Ava Clark",
        address: "852 Redwood Ave, Dallas, TX",
        phone: "+1 555-4567",
        gender: "Female",
        email: "avaclark@example.com",
        createdAt: "1 year"
    },
    {
        clientName: "Noah Hernandez",
        address: "951 Aspen Cir, San Jose, CA",
        phone: "+1 555-8901",
        gender: "Male",
        email: "noahhernandez@example.com",
        createdAt: "1 week"
    }
];

const LeadsContact = ({ setAddClient }: { setAddClient: (open: boolean) => void }) => {
    const navigate = useNavigate();

    const columns = [
        { title: 'Client Name', dataIndex: 'clientName', key: 'clientName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <div className="flex items-center gap-4">
                    <FaRegEye size={22} color="#575555" onClick={() => setAddClient(true)} className=" cursor-pointer" />
                    <TbEdit size={22} color="#575555" className=" cursor-pointer" onClick={() => navigate("/contact/leads-details")} />
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#AB0906',
                            },
                        }}
                    >
                        <Switch defaultChecked />
                    </ConfigProvider>
                </div>
            ),
        },
    ];


    return (
        <div>
            <div>

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
                                                You don't have any Leads yet
                                            </p>

                                        </div>
                                    }
                                />
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadsContact;