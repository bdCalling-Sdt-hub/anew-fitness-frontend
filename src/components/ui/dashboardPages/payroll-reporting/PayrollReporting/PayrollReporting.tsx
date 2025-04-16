
import booking from "../../../../../assets/booking.png"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useGetAllPayrollReportingQuery } from "../../../../../redux/features/payrollReporting/payrollReportingApi";
import { DatePicker, Select } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const chartConfigs = [
  {
    title: 'Total Payroll',
    dataKey: 'payroll',
    yDomain: [400, 1000],
  },
  {
    title: 'Total Instructors',
    dataKey: 'instructors',
    yDomain: [50, 100],
  },
  {
    title: 'Total Classes',
    dataKey: 'classes',
    yDomain: [50, 100],
  }
];



const PayrollReporting = () => { 
  const [status, setStatus] = useState("")
  const {data:allPayroll} = useGetAllPayrollReportingQuery(status);  


  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const transformedMonthlyData = monthNames.map((month) => ({
    name: month.slice(0, 3), // Jan, Feb, etc.
    payroll: allPayroll?.monthlyPayroll?.find((item:{ month: string; value: number; }) => item.month === month)?.value || 0,
    instructors: allPayroll?.monthlyInstructors?.find((item:{ month: string; value: number; }) => item.month === month)?.value || 0,
    classes: allPayroll?.monthlyClasses?.find((item:{ month: string; value: number; }) => item.month === month)?.value || 0,
  })); 

  const classesData = [
    {
        id: 1,
        total: allPayroll?.totalPayrollAmount,
        title: "Total Payroll Amount"
    },
    {
        id: 2,
        total: allPayroll?.totalInstructors,
        title: "Total Instructor"
    },
    {
        id: 3,
        total: allPayroll?.totalClasses,
        title: "Total Classes"
    },
    {
        id: 4,
        total: allPayroll?.totalPayrollAmount,
        title: "Total Miles Amount"
    },

]   

const onchange = (date: any) => { 
  const formattedDate = dayjs(date).format('YYYY'); 
    setStatus(formattedDate)
}

    return (
        <div className="px-[30px] pt-[30px]">
                <div>
                <div className=" grid grid-cols-4 gap-10 w-full  my-6 " >  
                    <div className=" col-span-4 "> 

                    <div className="grid grid-cols-4 gap-10 ">

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

               
                </div>
            </div>  
 
            <div className=" flex items-center justify-end pb-6">
            <DatePicker   onChange={onchange} picker="year" style={{ height: '45px', width: '120px', border: '1px solid #ab0906', borderRadius: '7px' }}  />
        </div>
            <div className=" ">
      <div className="grid grid-cols-1 gap-6">
        {chartConfigs.map((config, index) => (
          <div key={index} className="bg-gray-100 rounded-lg shadow-sm border border-primary p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-primaryText pb-2">{config.title}</h2>
              </div>
           
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={transformedMonthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <defs>
                  <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4136" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#EF4136" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  domain={config.yDomain}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={config.dataKey}
                  stroke="#EF4136"
                  strokeWidth={2}
                  dot={{ fill: '#FBB040', stroke: '#FBB040', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#FBB040', strokeWidth: 2 }}
                  fill={`url(#gradient-${index})`}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div> 
        </div>
    );
};

export default PayrollReporting;