import { ConfigProvider, Empty, Table } from "antd";
import noData from "../../../../../assets/noData.png";
import moment from "moment";
 
const LeadsClasses = ({sort, pastClasses , upcomingClasses}: {sort:string, pastClasses:any, upcomingClasses:any}) => {  
     
 const data = (sort === "upcoming" ? upcomingClasses : pastClasses)?.map((item:any)=>({
    className: item?.name,
    schedule:moment(item?.schedule?.date).format("YYYY-MM-DD  , HH:mm a"),
    staffName: item?._id 
}))


    const columns = [
        { title: 'Class Name', dataIndex: 'className', key: 'className' },
        { title: 'Schedule', dataIndex: 'schedule', key: 'schedule' },
        { title: 'Staff Name', dataIndex: 'staffName', key: 'staffName' }
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
                                styles={{ image: { width: 150, height: 150, marginLeft: 65 } }}
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