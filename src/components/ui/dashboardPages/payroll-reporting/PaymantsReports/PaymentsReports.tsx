import {  Table } from 'antd';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { TbReport } from 'react-icons/tb';
import ReportDetailsModal from './ReportDetailsModal';
import MilesReportModal from '../../appointment/StaffAvailable/MilesReportModal';
import { useSearchParams } from 'react-router-dom';
import { useGetAllReportQuery } from '../../../../../redux/features/payrollReporting/paymentReportApi';
import moment from 'moment';

const PaymentsReports = () => {
  const [reportDetails, setReportDetails] = useState(false);
  const [milesReport, setMilesReport] = useState(false);  
 const [searchParams] = useSearchParams()  
 const id = searchParams.get('id')    
const {data:instructorDetails , refetch} = useGetAllReportQuery(id)  
const firstWeekData = instructorDetails?.weeklyData?.[0]; 
const secondWeekData = instructorDetails?.weeklyData?.[1]; 
const biweeklyDatas = instructorDetails?.biweeklyData?.workDetails
const week1StartDate = moment(firstWeekData?.weekStart).format(' MMM DD , YY'); 
const week1EndDate = moment(firstWeekData?.weekEnd).format(' MMM DD,  YY'); 


const week2StartDate = moment(secondWeekData?.weekStart).format(' MMM DD , YY'); 
const week2EndDate = moment(secondWeekData?.weekEnd).format(' MMM DD,  YY');
 
const week1Data = firstWeekData?.workDetails?.map((item:any) => ({
  date: moment(item?.workDetails?.date).format('MM-DD-YYYY'), 
  workDescription: item?.workDetails?.workDescription,
  workType: item?.workDetails?.workType,
  workingHour: item?.workDetails?.hours,
  hourRate: item?.workDetails?.hourRate,
  totalAmount:item?.totalAmount
})) 

const week2Data = secondWeekData?.workDetails?.map((item:any) => ({
  date: moment(item?.workDetails?.date).format('MM-DD-YYYY'), 
  workDescription: item?.workDetails?.workDescription,
  workType: item?.workDetails?.workType,
  workingHour: item?.workDetails?.hours,
  hourRate: item?.workDetails?.hourRate,
  totalAmount:item?.totalAmount
}))  

const biweeklyData = biweeklyDatas?.map((item:any) => ({
  workDescription: item?.workDetails?.workDescription,
  totalHours: item?.workDetails?.hours,
  hourRate: item?.workDetails?.hourRate,
  totalAmount:item?.totalAmount
})) 

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
    date: week1StartDate + ' - ' + week1EndDate,
    totalHours: firstWeekData?.summary?.totalWorkingHours,
    totalAmount: firstWeekData?.summary?.totalWorkAmount,
  }];

  const week2SummaryData = [{
    date: week2StartDate + ' - ' + week2EndDate,
    totalHours: secondWeekData?.summary?.totalWorkingHours,
    totalAmount: secondWeekData?.summary?.totalWorkAmount,
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
    date: week1StartDate + ' - ' + week1EndDate,
    totalHours: firstWeekData?.summary?.totalWorkingHours,
    workingAmount: firstWeekData?.summary?.totalWorkAmount,
    totalMiles: firstWeekData?.summary?.totalMiles,
    mileageRate: firstWeekData?.summary?.avgMileageRate,
    totalAmount:  firstWeekData?.summary?.weekTotalAmount,
  }];

  const week2MilesData = [{
    date: week2StartDate + ' - ' + week2EndDate,
    totalHours: secondWeekData?.summary?.totalWorkingHours,
    workingAmount: secondWeekData?.summary?.totalWorkAmount,
    totalMiles: secondWeekData?.summary?.totalMiles,
    mileageRate: secondWeekData?.summary?.avgMileageRate,
    totalAmount:  secondWeekData?.summary?.weekTotalAmount,
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
      render: (rate: number) => `$${rate?.toFixed(2)}`,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `$${amount}`,
    },
  ];



  const biweeklySummaryData = [{
    date: week1StartDate + ' - ' + week2EndDate,
    totalHours: instructorDetails?.biweeklyData?.summary?.totalWorkingHours,
    totalAmount: instructorDetails?.biweeklyData?.summary?.totalWorkAmount,
  }];

  const biweeklyMilesData = [{
    date: week1StartDate + ' - ' + week2EndDate,
    totalHours: instructorDetails?.overallTotals?.totalWorkingHours,
    workingAmount: instructorDetails?.overallTotals?.totalWorkAmount,
    totalMiles: '10mi',
    mileageRate: 30,
    totalAmount: instructorDetails?.overallTotals?.grandTotalAmount,
  }];

  return (
    <div>
      <div className="p-[30px] pb-[0px] ">
        <div className="flex justify-end items-center ">
          <p className='text-[22px] font-bold'>BIWEEKLY COMPENSATION LOG</p>
        </div>

        <p className=' flex items-center gap-1 text-[30px] font-bold'> <span> <TbReport size={24} />  </span> <span>View Report</span>    </p>

        <div className="my-8 w-full"> 

          <div className='flex justify-between items-center pb-4'> 
          <p className="text-primary flex items-center gap-3  "> <span className='font-bold text-[30px]'>Week-1 </span>  <span className='font-medium text-[16px]'> ({` ${week1StartDate} - ${week1EndDate}`}) </span> </p>

          <div className='flex items-end'>
            <button
              className="bg-primary text-white font-semibold py-2 px-4 flex items-center gap-2 rounded h-[50px] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setReportDetails(true)} 
              disabled={week1Data?.length === 7}
            >
              <span> Add Report Details </span>  <span><FiPlus size={22} /></span>
            </button>
          </div> 

          </div>
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
              className="bg-primary text-white font-semibold py-2 px-4 flex items-center gap-2 rounded h-[50px] disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={() => setMilesReport(true)} 
              disabled={firstWeekData?.milesDetails?.length === 1}
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


        </div>

        <div className="mb-8 mt-24"> 
          
          <div className='flex justify-between items-center mb-4 '> 
          <p className="text-primary flex items-center gap-3  "> <span className='font-bold text-[30px]'>Week-2 </span>  <span className='font-medium text-[16px]'> ({` ${week2StartDate} - ${week2EndDate}`}) </span> </p>
          <div className=' flex justify-end items-center '>
            <button
              className="bg-primary text-white font-semibold py-2 px-4 flex items-center gap-2 rounded h-[50px] disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={() => setReportDetails(true)} 
              disabled={week2Data?.length === 7}
            >
              <span> Add  Report Details </span>  <span><FiPlus size={22} /></span>
            </button>
          </div> 
          </div>
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
              className="bg-primary text-white font-semibold py-2 px-4 flex items-center gap-2 rounded h-[50px] disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={() => setMilesReport(true)} 
              disabled={secondWeekData?.milesDetails?.length === 1}
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

      </div> 
      <ReportDetailsModal open={reportDetails} setOpen={setReportDetails} id={id} refetch={refetch} /> 
      <MilesReportModal open={milesReport} setOpen={setMilesReport} id={id} refetch={refetch} />
    </div>
  );
};

export default PaymentsReports;