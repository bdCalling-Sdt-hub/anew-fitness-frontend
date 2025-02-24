import { ConfigProvider, Empty, Table } from "antd";
import noData from "../../../../../assets/noData.png";
 
const data = [
    {
        className: "Mathematics 101",
        schedule: "Monday - 10:00 AM",
        staffName: "Mr. John Doe"
    },
    {
        className: "Physics 201",
        schedule: "Tuesday - 11:30 AM",
        staffName: "Dr. Jane Smith"
    },
    {
        className: "Chemistry 301",
        schedule: "Wednesday - 2:00 PM",
        staffName: "Prof. Emma Wilson"
    },
    {
        className: "Biology 101",
        schedule: "Thursday - 9:00 AM",
        staffName: "Dr. Robert Johnson"
    },
 
];
const LeadsClasses = () => { 
    const columns = [
        { title: 'Class Name', dataIndex: 'className', key: 'className' },
        { title: 'Schedule', dataIndex: 'schedule', key: 'schedule' },
        { title: 'Staff Name', dataIndex: 'staffName', key: 'staffName' }
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

export default LeadsClasses;