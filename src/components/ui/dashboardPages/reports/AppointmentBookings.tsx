import { ConfigProvider, Empty, Input, Select } from "antd";
import { RiSearchLine } from "react-icons/ri";
import booking from "../../../../assets/booking.png"
import noData from "../../../../assets/noData.png"
import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useGetAppointmentReportQuery } from "../../../../redux/features/reports/reportsApi";
import { useState } from "react";


interface DataType {
  _id: string;
  date: string;
  staff: { name: string };
  contact: { name: string };
  lead: { name: string };
  service: string;
  status: string;
}

const AppointmentBookings = () => {
  const [status, setStatus] = useState("")
  const [search, setSearch] = useState("")
  const { data: allAppointments } = useGetAppointmentReportQuery({ status, search })

  const classesData = [
    {
      id: 1,
      total: allAppointments?.totalAppointments,
      title: "Total Appointment"
    },
    {
      id: 2,
      total: allAppointments?.completedAppointments,
      title: "Completed Appointment "
    },
    {
      id: 3,
      total: allAppointments?.upcomingAppointments,
      title: "Upcoming Appointment"
    },

  ]


  const data = allAppointments?.appointments?.map((item: DataType) => ({
    key: item?._id,
    reservedAt: item?.date,
    staff: item?.staff?.name,
    contactName: item?.contact?.name,
    leadName: item?.lead?.name,
    serviceName: item?.service,
    status: item?.status,
  }))

  const columns: ColumnsType<DataType> = [
    {
      title: "Reserved at",
      dataIndex: "reservedAt",
      key: "reservedAt",
    },
    {
      title: "Staff Name",
      dataIndex: "staff",
      key: "staff",
    },
    {
      title: "Contact Name",
      dataIndex: "contactName",
      key: "contactName",
    },
    {
      title: "Lead Name",
      dataIndex: "leadName",
      key: "leadName",
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}
        >
          {status}
        </span>
      ),
    },
  ]


  return (
    <div className="px-[30px] pt-[20px]">
      <div className=" flex items-center justify-between">
        <Input placeholder="Search here" prefix={<RiSearchLine size={22} color="#808080" />} style={{ width: "500px", height: "51px", borderRadius: "8px" }} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div>
        <div className=" grid grid-cols-4 gap-10 w-full  my-6 " >
          {
            classesData.map((item) => (
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
            placeholder="All Appointment"
            className="placeholder:text-primary placeholder:font-semibold placeholder:text-[18px]"
            style={{ height: '45px', width: '180px', border: '1px solid #ab0906', borderRadius: '7px' }}
            options={[
              { value: '', label: 'All Appointment' },
              { value: 'completed', label: 'Completed' },
              { value: 'upcoming', label: 'Upcoming' },
            ]}
            onChange={(value) => setStatus(value)}
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
                      You don't have any  Appointment yet
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

export default AppointmentBookings;