import { ConfigProvider, Empty, Select } from "antd";
import { useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import SelectStaffModal from "./SelectStaffModal"; 
import Table, { ColumnsType } from "antd/es/table"; 
import noData from "../../../../../../assets/noData.png";
import { useGetPayrollOverviewQuery } from "../../../../../../redux/features/payrollReporting/payrollReportingApi";
import moment from "moment";
import { exportToCSV } from "../../../../../shared/ExportToCSV";

interface DataType {
    key: string
    biweeklyDate: string
    instructorName: string
    totalWorkingHours: number
    totalWorkAmount: number
    totalMiles: number
    mileageRate: number
    totalAmount: number 
    _id: string  
    periodEnding: string 
    periodBeginning: string

  }


const PaymentOverview = () => {
    const [staffModal, setStaffModal] = useState(false)   
    const [filterType , setFilterType] = useState("") 
    const [staffData , setStaffData] = useState("")

    const {data:useAllPayroll} = useGetPayrollOverviewQuery({filterType ,staffData }) 

    const data = useAllPayroll?.overviewData?.map((item:DataType)=>({
        key: item?._id,
        biweeklyDate: `${moment(item?.periodBeginning).format("MMM DD, YY")} - ${moment(item?.periodEnding).format("MMM DD, YY")}` ,
        instructorName: item?.instructorName,
        totalWorkingHour: item?.totalWorkingHours,
        workingAmount: item?.totalWorkAmount,
        totalMiles: item?.totalMiles,
        mileageRate: item?.mileageRate,
        totalAmount: item?.totalAmount
    }))

    const columns: ColumnsType<DataType> = [
        {
          title: "Biweekly Date",
          dataIndex: "biweeklyDate",
          key: "biweeklyDate",
        },
        {
          title: "Instructor Name",
          dataIndex: "instructorName",
          key: "instructorName",
        },
        {
          title: "Total Working Hour",
          dataIndex: "totalWorkingHour",
          key: "totalWorkingHour",
        },
        {
          title: "Working Amount",
          dataIndex: "workingAmount",
          key: "workingAmount",
          render: (value) => `$${value}`,
        },
        {
          title: "Total Miles",
          dataIndex: "totalMiles",
          key: "totalMiles",
          render: (value) => `${value}mi`,
        },
        {
          title: "Mileage Rate",
          dataIndex: "mileageRate",
          key: "mileageRate",
          render: (value) => `$${value}`,
        },
        {
          title: "Total Amount",
          dataIndex: "totalAmount",
          key: "totalAmount",
          render: (value) => `$${value}`,
        },
        {
          title: "Action",
          key: "action",
          render: () => <button className="bg-primary text-white px-4 py-1 rounded ">View Details</button>,
        },
      ] 

    return (
        <div className=" p-[30px] pb-[0px]">

            <div className=" flex items-center justify-end gap-5">
                <Select
                    placeholder="Biweekly"
                    defaultValue={'Biweekly'}
                    className="placeholder:text-primary placeholder:font-semibold placeholder:text-[18px]"
                    style={{ height: '45px', width: '120px', border: '1px solid #ab0906', borderRadius: '7px' }} 
                    onChange={(value) => setFilterType(value)}
                    options={[
                        { value: 'biweekly', label: 'Biweekly ' },
                        { value: 'monthly', label: 'Monthly' },
                        { value: 'yearly', label: 'Yearly' },
                    ]}
                />

                <button className=" h-[45px] px-7 border border-primary text-primaryText rounded-lg font-medium text-[20px] flex items-center justify-center gap-2" onClick={() => setStaffModal(true)}>

                    <span><HiOutlineAdjustmentsHorizontal size={22} /> </span>
                    <span>Filter by name </span>
                </button>

                <button className=" h-[45px] px-7 bg-primary text-white rounded-lg font-medium text-[22px]" 
                onClick={() => {
                                            if (data) {
                                                exportToCSV(data, {
                                                    filename: "payment-overview",
                                                    fields: [
                                                        "biweeklyDate",
                                                        "instructorName",
                                                        "totalWorkingHour",
                                                        "workingAmount",
                                                        "totalMiles",
                                                        "mileageRate",
                                                        "totalAmount",
                                                    ],
                                                    headers: {
                                                        biweeklyDate: "biweeklyDate",
                                                        instructorName: "instructorName",
                                                        totalWorkingHour: "totalWorkingHour",
                                                        workingAmount: "workingAmount",
                                                        totalMiles: "totalMiles",
                                                        mileageRate: "mileageRate",
                                                        totalAmount: "totalAmount",
                                                    },
                                                });
                                            }
                                        }} > Export</button>

            </div> 

            <div> 
            <div className="mx-auto bg-white rounded-lg shadow-sm pt-[40px]">
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
                            
                                </div>
                            }
                        />
                    </div>}
            </div> 
            </div>
            <SelectStaffModal open={staffModal} setOpen={setStaffModal} setStaffData={setStaffData}/>
        </div>
    );
};

export default PaymentOverview;