import { ConfigProvider, Empty, Input, Select } from "antd";
import { RiSearchLine } from "react-icons/ri";
import booking from "../../../../assets/booking.png"
import noData from "../../../../assets/noData.png"
import { Table, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"

interface DataType {
  key: string
  bookedAt: string
  contact: string
  email: string
  class: string
  location: string
  trainer?: string
  bookingId: string
  paymentMethod: string
  status: "Running" | "Not Running"
}
const classesData = [
  {
    id: 1,
    total: "$12,000",
    title: "Total Class Sales"
  },
  {
    id: 2,
    total: "357",
    title: "Completed Class"
  },
  {
    id: 3,
    total: "128",
    title: "Running Class"
  },
  {
    id: 4,
    total: "75",
    title: "Not Assign Class"
  },
]

const data: DataType[] = [
  {
    key: "1",
    bookedAt: "04-02-2025",
    contact: "Sabbir Ahmed",
    email: "example@gmail.com",
    class: "Class Name",
    location: "Demo Location",
    trainer: "Rakibul Hasan",
    bookingId: "#123456",
    paymentMethod: "Visa Card",
    status: "Running",
  },
  {
    key: "2",
    bookedAt: "04-02-2025",
    contact: "Sabbir Ahmed",
    email: "example@gmail.com",
    class: "Class Name",
    location: "Demo Location",
    bookingId: "#123456",
    paymentMethod: "Visa Card",
    status: "Not Running",
  },
  {
    key: "3",
    bookedAt: "04-02-2025",
    contact: "Sabbir Ahmed",
    email: "example@gmail.com",
    class: "Class Name",
    location: "Demo Location",
    trainer: "Rakibul Hasan",
    bookingId: "#123456",
    paymentMethod: "Visa Card",
    status: "Running",
  },
  {
    key: "4",
    bookedAt: "04-02-2025",
    contact: "Sabbir Ahmed",
    email: "example@gmail.com",
    class: "Class Name",
    location: "Demo Location",
    bookingId: "#123456",
    paymentMethod: "Visa Card",
    status: "Not Running",
  },
  {
    key: "5",
    bookedAt: "04-02-2025",
    contact: "Sabbir Ahmed",
    email: "example@gmail.com",
    class: "Class Name",
    location: "Demo Location",
    trainer: "Rakibul Hasan",
    bookingId: "#123456",
    paymentMethod: "Visa Card",
    status: "Running",
  },
  {
    key: "6",
    bookedAt: "04-02-2025",
    contact: "Sabbir Ahmed",
    email: "example@gmail.com",
    class: "Class Name",
    location: "Demo Location",
    bookingId: "#123456",
    paymentMethod: "Visa Card",
    status: "Not Running",
  },
  {
    key: "7",
    bookedAt: "04-02-2025",
    contact: "Sabbir Ahmed",
    email: "example@gmail.com",
    class: "Class Name",
    location: "Demo Location",
    trainer: "Rakibul Hasan",
    bookingId: "#123456",
    paymentMethod: "Visa Card",
    status: "Running",
  },
]
const ClassBookings = () => {

  const columns: ColumnsType<DataType> = [
    {
      title: "Booked at",
      dataIndex: "bookedAt",
      key: "bookedAt",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Trainer",
      dataIndex: "trainer",
      key: "trainer",
    },
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag color={status === "Running" ? "green" : "red"}>{status}</Tag>,
    },
  ]


  return (
    <div className="px-[30px] pt-[20px]">
      <div className=" flex items-center justify-between">
        <Input placeholder="Search here" prefix={<RiSearchLine size={22} color="#808080" />} style={{ width: "500px", height: "51px", borderRadius: "8px" }} />
        <button className=" h-[51px] px-7 bg-primary text-white rounded-lg font-semibold text-[22px]"> Export</button>
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
            placeholder="All Classes"
            className="placeholder:text-primary placeholder:font-semibold placeholder:text-[18px]"
            style={{ height: '45px', width: '120px', border: '1px solid #ab0906', borderRadius: '7px' }}
            options={[
              { value: 'all', label: 'All' },
              { value: 'running', label: 'Running' },
              { value: 'not running', label: 'Not Running' },
            ]}
          />
        </div>
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