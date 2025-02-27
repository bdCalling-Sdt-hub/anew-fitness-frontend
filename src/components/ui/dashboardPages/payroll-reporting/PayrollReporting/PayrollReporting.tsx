import { Select } from "antd";
import booking from "../../../../../assets/booking.png"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';


const monthlyData = [
  { name: 'Jan', payroll: 150000, instructors: 150, classes: 150 },
  { name: 'Feb', payroll: 160000, instructors: 160, classes: 155 },
  { name: 'Mar', payroll: 155000, instructors: 155, classes: 160 },
  { name: 'Apr', payroll: 175000, instructors: 170, classes: 165 },
  { name: 'May', payroll: 165000, instructors: 165, classes: 170 },
  { name: 'Jun', payroll: 170000, instructors: 175, classes: 175 },
  { name: 'Jul', payroll: 160000, instructors: 165, classes: 165 },
  { name: 'Aug', payroll: 180000, instructors: 180, classes: 180 },
  { name: 'Sep', payroll: 170000, instructors: 170, classes: 170 },
  { name: 'Oct', payroll: 175000, instructors: 175, classes: 175 },
  { name: 'Nov', payroll: 180000, instructors: 180, classes: 180 },
  { name: 'Dec', payroll: 175000, instructors: 175, classes: 175 },
];

const chartConfigs = [
  {
    title: 'Total Payroll',
    dataKey: 'payroll',
    prefix: '$',
    yDomain: [140000, 190000],
    growth: '+10%',
    value: '150K'
  },
  {
    title: 'Total Instructors',
    dataKey: 'instructors',
    yDomain: [140, 190],
    growth: '+15%',
    value: '150'
  },
  {
    title: 'Total Classes',
    dataKey: 'classes',
    yDomain: [140, 190],
    growth: '+10%',
    value: '150'
  }
];


const classesData = [
    {
        id: 1,
        total: "$12,000",
        title: "Total Payroll"
    },
    {
        id: 2,
        total: "357",
        title: "Total Instructor"
    },
    {
        id: 3,
        total: "128",
        title: "Total Class"
    },

] 
const PayrollReporting = () => {
    return (
        <div className="px-[30px] pt-[30px]">
                <div>
                <div className=" grid grid-cols-4 gap-10 w-full  my-6 " >  
                    <div className=" col-span-3 "> 

                    <div className="grid grid-cols-3 gap-10 ">

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

                    <div className=" col-span-1  flex items-start justify-end gap-5">  
                    <Select
                            placeholder="Biweekly" 
                            defaultValue={'Biweekly'}
                            className="placeholder:text-primary placeholder:font-semibold placeholder:text-[18px]"
                            style={{ height: '50px', width: '120px', border: '1px solid #ab0906', borderRadius: '7px' }}
                            options={[
                                { value: 'Biweekly', label: 'Biweekly ' },
                                { value: 'Monthly', label: 'Monthly' },
                                { value: 'Yearly', label: 'Yearly' },
                            ]}
                        />
                    <button className=" h-[50px] px-7 bg-primary text-white rounded-lg font-medium text-[22px]"> Export</button>

                    </div>
                </div>
            </div>  

            <div className=" ">
      <div className="grid grid-cols-1 gap-6">
        {chartConfigs.map((config, index) => (
          <div key={index} className="bg-gray-100 rounded-lg shadow-sm border border-primary p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-primaryText pb-2">{config.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[34px] font-semibold">
                    {config.prefix}{config.value}
                  </span>
                  <span className="text-primary text-sm font-medium">
                    {config.growth}
                  </span>
                </div>
              </div>
           
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
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