import { ConfigProvider, Empty, Table } from "antd";
import noData from "../../../../../assets/noData.png";
 
const data = [
    {
        contactName: "John Doe",
        date: "2025-02-24",
        service: "Website Development"
    },
    {
        contactName: "Jane Smith",
        date: "2025-02-25",
        service: "Cybersecurity Audit"
    },
    {
        contactName: "Emma Wilson",
        date: "2025-02-26",
        service: "Cloud Infrastructure Setup"
    },
    {
        contactName: "Robert Johnson",
        date: "2025-02-27",
        service: "IT Support & Maintenance"
    }
]; 

const LeadsAppointment = () => { 
    const columns = [
        { title: 'Contact Name', dataIndex: 'contactName', key: 'contactName' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Service', dataIndex: 'service', key: 'service' }
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
                                            You don't have any client contact yet
                                        </p>
                                  
                                    </div>
                                }
                            />
                        </div>}
                </div>
        </div>
    );
};

export default LeadsAppointment;