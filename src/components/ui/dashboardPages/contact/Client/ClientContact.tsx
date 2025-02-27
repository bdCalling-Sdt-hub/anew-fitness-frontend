import { ConfigProvider, Empty, Switch, Table, Tabs } from "antd";
import { TbEdit } from "react-icons/tb";
import noData from "../../../../../assets/noData.png";
import { useState } from "react";

const data = [
    {
        clientName: "John Doe",
        address: "123 Main St, New York, NY",
        phone: "+1 555-1234",
        gender: "Male",
        email: "johndoe@example.com"
    },
    {
        clientName: "Jane Smith",
        address: "456 Oak Ave, Los Angeles, CA",
        phone: "+1 555-5678",
        gender: "Female",
        email: "janesmith@example.com"
    },
    {
        clientName: "Emma Wilson",
        address: "789 Pine Rd, Chicago, IL",
        phone: "+1 555-9012",
        gender: "Female",
        email: "emmawilson@example.com"
    },
    {
        clientName: "Robert Johnson",
        address: "321 Maple Dr, Houston, TX",
        phone: "+1 555-3456",
        gender: "Male",
        email: "robertjohnson@example.com"
    },
    {
        clientName: "Olivia Davis",
        address: "654 Birch Ln, Phoenix, AZ",
        phone: "+1 555-7890",
        gender: "Female",
        email: "oliviadavis@example.com"
    },
    {
        clientName: "William Taylor",
        address: "987 Cedar Ct, Philadelphia, PA",
        phone: "+1 555-2345",
        gender: "Male",
        email: "williamtaylor@example.com"
    },
    {
        clientName: "Sophia Miller",
        address: "159 Spruce St, San Antonio, TX",
        phone: "+1 555-6789",
        gender: "Female",
        email: "sophiamiller@example.com"
    },
    {
        clientName: "Liam Martinez",
        address: "753 Elm Blvd, San Diego, CA",
        phone: "+1 555-0123",
        gender: "Male",
        email: "liammartinez@example.com"
    },
    {
        clientName: "Ava Clark",
        address: "852 Redwood Ave, Dallas, TX",
        phone: "+1 555-4567",
        gender: "Female",
        email: "avaclark@example.com"
    },
    {
        clientName: "Noah Hernandez",
        address: "951 Aspen Cir, San Jose, CA",
        phone: "+1 555-8901",
        gender: "Male",
        email: "noahhernandez@example.com"
    }
];

const ClientContact = ({ setAddClient }: { setAddClient: (addClient: boolean) => void }) => {
    const [tabOption, setTabOption] = useState("services")

    const items = [
        {
            key: "All",
            label: <div className='flex items-center gap-1'>
                <p className=" text-[18px] font-semibold "> Services </p>
                <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">10</p>
            </div>,

        },
        {
            key: "active ",
            label: <div className='flex items-center gap-1'>
                <p className=" text-[18px] font-semibold "> Active Clients </p>
                <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">10</p>
            </div>,

        },

        {
            key: "inactive ",
            label: <div className='flex items-center gap-1'>
                <p className=" text-[18px] font-semibold ">  Inactive Clients </p>
                <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">10</p>
            </div>,

        },
    ];

    const onChange = (key: string) => {
        setTabOption(key)
    };


    const columns = [
        { title: 'Client Name', dataIndex: 'clientName', key: 'clientName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Gender', dataIndex: 'gender', key: 'gender' },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <div className="flex items-center gap-4">
                    <TbEdit size={22} color="#575555" onClick={() => setAddClient(true)} />
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

                    <Tabs defaultActiveKey="services" items={items} onChange={onChange} />
                </ConfigProvider>
            </div>
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
                                            You don't have any client contact yet
                                        </p>

                                    </div>
                                }
                            />
                        </div>}
                </div>
            </div>
        </div>
    );
};

export default ClientContact;