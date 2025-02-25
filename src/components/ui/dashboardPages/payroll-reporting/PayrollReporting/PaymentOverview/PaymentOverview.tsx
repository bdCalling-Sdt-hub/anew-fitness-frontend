import { ConfigProvider, Empty, Select } from "antd";
import { useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import SelectStaffModal from "./SelectStaffModal"; 
import Table, { ColumnsType } from "antd/es/table"; 
import noData from "../../../../../../assets/noData.png";

interface DataType {
    key: string
    biweeklyDate: string
    instructorName: string
    totalWorkingHour: number
    workingAmount: number
    totalMiles: number
    mileageRate: number
    totalAmount: number
  }
const data: DataType[] = [
    {
      key: "1",
      biweeklyDate: "Jan 01, 25 - Jan 14, 25",
      instructorName: "Jolanca LaSalle",
      totalWorkingHour: 12.0,
      workingAmount: 330,
      totalMiles: 10,
      mileageRate: 10,
      totalAmount: 340,
    },
    {
      key: "2",
      biweeklyDate: "Jan 15, 25 - Jan 28, 25",
      instructorName: "Jolanca LaSalle",
      totalWorkingHour: 12.0,
      workingAmount: 330,
      totalMiles: 10,
      mileageRate: 10,
      totalAmount: 340,
    },
    {
      key: "3",
      biweeklyDate: "Jan 29, 25 - Feb 11, 25",
      instructorName: "Jolanca LaSalle",
      totalWorkingHour: 12.0,
      workingAmount: 330,
      totalMiles: 10,
      mileageRate: 10,
      totalAmount: 340,
    },
    {
      key: "4",
      biweeklyDate: "Feb 12, 25 - Feb 26, 25",
      instructorName: "Jolanca LaSalle",
      totalWorkingHour: 12.0,
      workingAmount: 330,
      totalMiles: 10,
      mileageRate: 10,
      totalAmount: 340,
    },
    {
      key: "5",
      biweeklyDate: "Feb 27, 25 - Mar 12, 25",
      instructorName: "Jolanca LaSalle",
      totalWorkingHour: 12.0,
      workingAmount: 330,
      totalMiles: 10,
      mileageRate: 10,
      totalAmount: 340,
    },
  ] 

const PaymentOverview = () => {
    const [staffModal, setStaffModal] = useState(false) 

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
                    options={[
                        { value: 'Biweekly', label: 'Biweekly ' },
                        { value: 'Monthly', label: 'Monthly' },
                        { value: 'Yearly', label: 'Yearly' },
                    ]}
                />

                <button className=" h-[45px] px-7 border border-primary text-primaryText rounded-lg font-medium text-[20px] flex items-center justify-center gap-2" onClick={() => setStaffModal(true)}>

                    <span><HiOutlineAdjustmentsHorizontal size={22} /> </span>
                    <span>Jolanca LaSalle </span>
                </button>

                <button className=" h-[45px] px-7 bg-primary text-white rounded-lg font-medium text-[22px]"> Export</button>

            </div> 

            <div> 
            <div className="mx-auto bg-white rounded-lg shadow-sm pt-[40px]">
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
                            
                                </div>
                            }
                        />
                    </div>}
            </div> 
            </div>
            <SelectStaffModal open={staffModal} setOpen={setStaffModal} />
        </div>
    );
};

export default PaymentOverview;