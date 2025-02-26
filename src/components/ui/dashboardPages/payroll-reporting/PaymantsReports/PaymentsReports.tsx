import { DatePicker, Select, Table } from 'antd';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { TbReport } from 'react-icons/tb';
import ReportDetailsModal from './ReportDetailsModal';
import MilesReportModal from '../../appointment/StaffAvailable/MilesReportModal';


interface WeeklyData {
  date: string;
  workDescription: string;
  workType: string;
  workingHour: number;
  hourRate: number;
  totalAmount: number;
}

const PaymentsReports = () => {
  const [reportDetails, setReportDetails] = useState(false);
  const [milesReport, setMilesReport] = useState(false);

  const week1Data: WeeklyData[] = [
    {
      date: '04-01-2025',
      workDescription: 'Group Class',
      workType: 'Offline',
      workingHour: 2.00,
      hourRate: 30.00,
      totalAmount: 60
    },
    {
      date: '04-02-2025',
      workDescription: 'Team Meeting',
      workType: 'Offline',
      workingHour: 1.00,
      hourRate: 20.00,
      totalAmount: 20
    },
    {
      date: '04-03-2025',
      workDescription: 'Events',
      workType: 'Offline',
      workingHour: 1.00,
      hourRate: 30.00,
      totalAmount: 30
    },
    {
      date: '04-04-2025',
      workDescription: 'Personal Training',
      workType: 'Offline',
      workingHour: 1.00,
      hourRate: 35.00,
      totalAmount: 35
    },
    {
      date: '04-05-2025',
      workDescription: 'Training Hours',
      workType: 'Offline',
      workingHour: 1.00,
      hourRate: 20.00,
      totalAmount: 20
    }
  ];

  const week2Data: WeeklyData[] = [
    {
      date: '04-08-2025',
      workDescription: 'Group Class',
      workType: 'Offline',
      workingHour: 2.00,
      hourRate: 30.00,
      totalAmount: 60
    },
    {
      date: '04-09-2025',
      workDescription: 'Team Meeting',
      workType: 'Offline',
      workingHour: 1.00,
      hourRate: 20.00,
      totalAmount: 20
    },
    {
      date: '04-10-2025',
      workDescription: 'Events',
      workType: 'Offline',
      workingHour: 1.00,
      hourRate: 30.00,
      totalAmount: 30
    },
    {
      date: '04-11-2025',
      workDescription: 'Personal Training',
      workType: 'Offline',
      workingHour: 1.00,
      hourRate: 35.00,
      totalAmount: 35
    },
    {
      date: '04-12-2025',
      workDescription: 'Training Hours',
      workType: 'Offline',
      workingHour: 1.00,
      hourRate: 20.00,
      totalAmount: 20
    }
  ];

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Work Description',
      dataIndex: 'workDescription',
      key: 'workDescription',
    },
    {
      title: 'Work Type',
      dataIndex: 'workType',
      key: 'workType',
    },
    {
      title: 'Working Hour',
      dataIndex: 'workingHour',
      key: 'workingHour',
    },
    {
      title: 'Hour Rate',
      dataIndex: 'hourRate',
      key: 'hourRate',
      render: (rate: number) => `$${rate.toFixed(2)}`,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `$${amount}`,
    },
  ];

  const summaryColumns = [
    {
      title: 'Week Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Total Working Hour',
      dataIndex: 'totalHours',
      key: 'totalHours',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `$${amount}`,
    },
  ];

  const week1SummaryData = [{
    date: 'jan 01, 25 - jan 07, 25',
    totalHours: 6.00,
    totalAmount: 165,
  }];

  const week2SummaryData = [{
    date: 'jan 08, 25 - jan 14, 25',
    totalHours: 6.00,
    totalAmount: 165,
  }];

  const milesColumns = [
    {
      title: 'Week Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Total Working Hour',
      dataIndex: 'totalHours',
      key: 'totalHours',
    },
    {
      title: 'Working Amount',
      dataIndex: 'workingAmount',
      key: 'workingAmount',
      render: (amount: number) => `$${amount}`,
    },
    {
      title: 'Total Miles',
      dataIndex: 'totalMiles',
      key: 'totalMiles',
    },
    {
      title: 'Mileage Rate',
      dataIndex: 'mileageRate',
      key: 'mileageRate',
      render: (rate: number) => `$${rate}`,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `$${amount}`,
    },
  ];

  const week1MilesData = [{
    date: 'jan 01, 25 - jan 07, 25',
    totalHours: 6.00,
    workingAmount: 165,
    totalMiles: '5mi',
    mileageRate: 30,
    totalAmount: 205,
  }];

  const week2MilesData = [{
    date: 'jan 08, 25 - jan 14, 25',
    totalHours: 6.00,
    workingAmount: 165,
    totalMiles: '5mi',
    mileageRate: 30,
    totalAmount: 205,
  }];

  const biweeklyColumns = [
    {
      title: 'Work Description',
      dataIndex: 'workDescription',
      key: 'workDescription',
    },
    {
      title: 'Total Working Hour',
      dataIndex: 'totalHours',
      key: 'totalHours',
    },
    {
      title: 'Hour Rate',
      dataIndex: 'hourRate',
      key: 'hourRate',
      render: (rate: number) => `$${rate.toFixed(2)}`,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `$${amount}`,
    },
  ];

  const biweeklyData = [
    {
      workDescription: 'Group Class',
      totalHours: 4.00,
      hourRate: 30.00,
      totalAmount: 120,
    },
    {
      workDescription: 'Team Meeting',
      totalHours: 2.00,
      hourRate: 20.00,
      totalAmount: 40,
    },
    {
      workDescription: 'Events',
      totalHours: 2.00,
      hourRate: 30.00,
      totalAmount: 60,
    },
    {
      workDescription: 'Personal Training',
      totalHours: 2.00,
      hourRate: 35.00,
      totalAmount: 70,
    },
    {
      workDescription: 'Training Hours',
      totalHours: 2.00,
      hourRate: 20.00,
      totalAmount: 40,
    },
  ];

  const biweeklySummaryData = [{
    date: 'jan 01, 25 - jan 14, 25',
    totalHours: 12.00,
    totalAmount: 330,
  }];

  const biweeklyMilesData = [{
    date: 'jan 01, 25 - jan 14, 25',
    totalHours: 12.00,
    workingAmount: 330,
    totalMiles: '10mi',
    mileageRate: 30,
    totalAmount: 410,
  }];

  return (
    <div>
      <div className="p-[30px] pb-[0px] ">
        <div className="flex justify-end items-center ">
          <p className='text-[22px] font-bold'>BIWEEKLY COMPENSATION LOG</p>
        </div>

        <p className=' flex items-center gap-1 text-[30px] font-bold'> <span> <TbReport size={24} />  </span> <span>View Report</span>    </p>

        <div>
          <p className='text-[22px] font-bold pt-5'>Instructor Name </p>
          <p className='text-[18px] font-medium py-3'> Select the Instructor Name you'd like to create a new report </p>
          <Select placeholder="Select an option" style={{ height: '50px', width: '32%' }}>
            <Select.Option value="instructor1">Instructor 1</Select.Option>
            <Select.Option value="instructor2">Instructor 2</Select.Option>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  py-5">

          <div>
            <p className='text-[22px] font-bold'>Period Beginning </p>
            <DatePicker className="w-full" style={{ height: '50px' }} />
          </div>

          <div>
            <p className='text-[22px] font-bold'>Period Ending </p>
            <DatePicker className="w-full" style={{ height: '50px' }} />
          </div>

          <div className='flex items-end'>
            <button
              className="bg-primary text-white font-semibold py-2 px-4 flex items-center gap-2 rounded h-[50px]"
              onClick={() => setReportDetails(true)}
            >
              <span> Add Report Details </span>  <span><FiPlus size={22} /></span>
            </button>
          </div>

        </div>



        <div className="my-8 w-full">
          <p className="text-primary font-bold text-[30px] pb-4">Week-1</p>
          <Table
            columns={columns}
            dataSource={week1Data}
            pagination={false}
            className="mb-6 border border-primary rounded-lg"
          />

          <div className=' flex justify-end items-center'>
            <Table
              columns={summaryColumns}
              dataSource={week1SummaryData}
              pagination={false}
              className="mb-4  w-2/4 border border-primary rounded-lg"
            />

          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <p className="text-primary font-bold text-[30px] ">Week-1 Totals</p>
            <button
              className="bg-primary text-white font-semibold py-2 px-4 flex items-center gap-2 rounded h-[50px]" 
              onClick={() => setMilesReport(true)}
            >
              <span> Add Miles Report </span>  <span><FiPlus size={22} /></span>
            </button>
          </div>
          <Table
            columns={milesColumns}
            dataSource={week1MilesData}
            pagination={false}
            className='border border-primary rounded-lg'
          />

          <div className=' flex justify-end items-center mt-6'>
            <button
              className="bg-primary text-white font-semibold py-2 px-4 flex items-center gap-2 rounded h-[50px]" 
              onClick={() => setReportDetails(true)}
            >
              <span> Add  Report Details </span>  <span><FiPlus size={22} /></span>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-primary font-bold text-[30px] mb-4">Week-2</p>
          <Table
            columns={columns}
            dataSource={week2Data}
            pagination={false}
            className="mb-6 border border-primary rounded-lg"
          />

          <div className=' flex justify-end items-center'>
            <Table
              columns={summaryColumns}
              dataSource={week2SummaryData}
              pagination={false}
              className="mb-4 w-1/2 border border-primary rounded-lg"
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <p className="text-primary font-bold text-[30px] ">Week-2 Totals</p>
            <button
              className="bg-primary text-white font-semibold py-2 px-4 flex items-center gap-2 rounded h-[50px]" 
              onClick={() => setMilesReport(true)}
            >
              <span> Add Miles Report </span>  <span><FiPlus size={22} /></span>
            </button>
          </div>
          <Table
            columns={milesColumns}
            dataSource={week2MilesData}
            pagination={false}
            className='border border-primary rounded-lg mb-5'
          />
        </div>

        <div className="mb-8">
          <p className="text-primary font-bold text-[30px] mb-4">Biweekly Totals</p>
          <Table
            columns={biweeklyColumns}
            dataSource={biweeklyData}
            pagination={false}
            className="mb-6 border border-primary rounded-lg"
          />

          <div className=' flex justify-end items-center'>
            <Table
              columns={summaryColumns}
              dataSource={biweeklySummaryData}
              pagination={false}
              className="mb-4 w-1/2 border border-primary rounded-lg"
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <p className="text-primary font-bold text-[30px]">Biweekly Totals</p>
          </div>
          <Table
            columns={milesColumns}
            dataSource={biweeklyMilesData}
            pagination={false}
            className='border border-primary rounded-lg '
          />
        </div>

        <div className="flex justify-end gap-4 my-8">
          <button className='border border-primary text-primary font-medium py-2 px-7 text-[22px] rounded h-[45px]'>Cancel</button>
          <button
            className="bg-primary text-white font-medium py-2 px-7 text-[22px] rounded h-[45px]"
          >
            Save
          </button>
        </div>
      </div> 
      <ReportDetailsModal open={reportDetails} setOpen={setReportDetails} /> 
      <MilesReportModal open={milesReport} setOpen={setMilesReport} />
    </div>
  );
};

export default PaymentsReports;