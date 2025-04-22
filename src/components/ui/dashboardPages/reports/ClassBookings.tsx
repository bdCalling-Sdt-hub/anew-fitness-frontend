import { ConfigProvider, Empty, Input, Select } from "antd";
import { RiSearchLine } from "react-icons/ri";
import booking from "../../../../assets/booking.png"
import noData from "../../../../assets/noData.png"
import { Table, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useGetClassReportQuery } from "../../../../redux/features/reports/reportsApi";
import moment from "moment";
import { useState } from "react";

interface DataType {
  key: string
  bookedAt: string
  name: string
  frequency: string
  totalCapacity: string
  location: {
    locationName: string
  }
  workType?: string
  staff: {
    name: string
  }
  bookingId: string
  paymentMethod: string
  status: "Running" | "Not Running"
  _id: string
  createdAt: string
}

const ClassBookings = () => {
  const [status, setStatus] = useState("")
  const [search, setSearch] = useState("")
  const { data: classReport } = useGetClassReportQuery({ status, search })
  console.log(classReport);

  const classesData = [
    {
      id: 1,
      total: classReport?.totalClasses,
      title: "Total Classes"
    },
    {
      id: 2,
      total: classReport?.completedClassesCount      ,
      title: "Completed Class"
    },
    {
      id: 3,
      total: classReport?.runningClassesCount,
      title: "Running Class"
    },
    {
      id: 4,
      total: classReport?.notRunningClassesCount,
      title: "Not Running Class"
    },
  ]

  const data = classReport?.classesData?.map((item: DataType) => ({
    key: item?._id,
    bookedAt: moment(item?.createdAt).format('YYYY-MM-D'),
    workType: item?.workType,
    frequency: item?.frequency,
    totalCapacity: item?.totalCapacity,
    class: item?.name,
    location: item?.location?.locationName,
    trainer: item?.staff?.name,
    status: item?.status,
    id: item?._id
  }))

  const columns: ColumnsType<DataType> = [
    {
      title: "Booked at",
      dataIndex: "bookedAt",
      key: "bookedAt",
    },
    {
      title: "Class Name",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Work Type",
      dataIndex: "workType",
      key: "workType",
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
    },
    {
      title: "Capacity",
      dataIndex: "totalCapacity",
      key: "totalCapacity",
    },
    {
      title: "Staff Name",
      dataIndex: "trainer",
      key: "trainer",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Staff Name",
      dataIndex: "trainer",
      key: "trainer",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag color={status === "active" ? "green" : "red"} >{status === "active" ? "Running" : "Not Running"}</Tag>,
    },
  ]


  return (
    <div className="px-[30px] pt-[20px]">
      <div className=" flex items-center justify-between">
        <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search here" prefix={<RiSearchLine size={22} color="#808080" />} style={{ width: "500px", height: "51px", borderRadius: "8px" }} />
      </div>

      <div>
        <div className=" grid grid-cols-4 gap-10 w-full  my-6 " >
          {
            classesData?.map((item) => (
              <div className="px-[29px] py-[35px] border border-primary rounded-lg  flex items-center gap-4">
                <div className=" flex items-center justify-center h-[85px] w-[85px] rounded-full bg-[#ffc1c0] border border-primary">
                  <img src={booking} alt="" className=" h-[45px] w-[50px] " />
                </div>
                <div key={item.id} className=" flex flex-col gap-y-1">
                  <p className=" text-[36px] font-bold"> {item.total} </p>
                  <p className="text-[16px]  tracking-wider "> {item.title} </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div>
        <div className=" flex items-center justify-end pb-6">
          <Select
            placeholder="All Classes"
            className="placeholder:text-primary placeholder:font-semibold placeholder:text-[18px]"
            style={{ height: '45px', width: '120px', border: '1px solid #ab0906', borderRadius: '7px' }}
            onChange={(value) => setStatus(value)}
            options={[
              { value: '', label: 'All' },
              { value: 'running', label: 'Running' },
              { value: 'not running', label: 'Not Running' },
            ]}
          />
        </div>
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

                  </div>
                }
              />
            </div>}
        </div>
      </div>
    </div>
  );
};

export default ClassBookings;