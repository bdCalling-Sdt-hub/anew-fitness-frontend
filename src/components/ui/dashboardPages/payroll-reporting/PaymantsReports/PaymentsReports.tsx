import { Button, DatePicker, Select, Table, Typography, Form, Input } from 'antd';
import { PlusCircle } from 'lucide-react';
import { TbReport } from 'react-icons/tb';

const { Title } = Typography;

interface WeeklyData {
  date: string;
  workDescription: string;
  workType: string;
  workingHour: number;
  hourRate: number;
  totalAmount: number;
}

const PaymentsReports = () => { 
    const [form] = Form.useForm();

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

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8"> 

        <Title level={4}>New Report</Title>
        
        <Form form={form} layout="vertical" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Form.Item label="Instructor Name" name="instructorName">
            <Select placeholder="Select an option">
              <Select.Option value="instructor1">Instructor 1</Select.Option>
              <Select.Option value="instructor2">Instructor 2</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Period Beginning" name="periodBeginning">
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item label="Period Ending" name="periodEnding">
            <DatePicker className="w-full" />
          </Form.Item>
        </Form>

        <Button 
          type="primary" 
          className="bg-red-600 mt-4"
          icon={<PlusCircle className="w-4 h-4" />}
        >
          Add Report Details
        </Button>
      </div>

      <div className="mb-8">
        <Title level={4} className="text-red-600 mb-4">Week-1</Title>
        <Table 
          columns={columns} 
          dataSource={week1Data} 
          pagination={false}
          className="mb-4"
        />
        <Table 
          columns={summaryColumns} 
          dataSource={week1SummaryData} 
          pagination={false}
          className="mb-4"
        />
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Title level={4} className="text-red-600 m-0">Week-1 Totals</Title>
          <Button 
            type="primary" 
            className="bg-red-600"
            icon={<PlusCircle className="w-4 h-4" />}
          >
            Add Miles Report
          </Button>
        </div>
        <Table 
          columns={milesColumns} 
          dataSource={week1MilesData} 
          pagination={false}
        />
      </div>

      <div className="mb-8">
        <Title level={4} className="text-red-600 mb-4">Week-2</Title>
        <Table 
          columns={columns} 
          dataSource={week2Data} 
          pagination={false}
          className="mb-4"
        />
        <Table 
          columns={summaryColumns} 
          dataSource={week2SummaryData} 
          pagination={false}
          className="mb-4"
        />
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Title level={4} className="text-red-600 m-0">Week-2 Totals</Title>
          <Button 
            type="primary" 
            className="bg-red-600"
            icon={<PlusCircle className="w-4 h-4" />}
          >
            Add Miles Report
          </Button>
        </div>
        <Table 
          columns={milesColumns} 
          dataSource={week2MilesData} 
          pagination={false}
        />
      </div>

      <div className="mb-8">
        <Title level={4} className="text-red-600 mb-4">Biweekly Totals</Title>
        <Table 
          columns={biweeklyColumns} 
          dataSource={biweeklyData} 
          pagination={false}
          className="mb-4"
        />
        <Table 
          columns={summaryColumns} 
          dataSource={biweeklySummaryData} 
          pagination={false}
          className="mb-4"
        />
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Title level={4} className="text-red-600 m-0">Biweekly Totals</Title>
        </div>
        <Table 
          columns={milesColumns} 
          dataSource={biweeklyMilesData} 
          pagination={false}
        />
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button>Cancel</Button>
        <Button type="primary" className="bg-red-600">Save</Button>
      </div>
    </div>  
        </div>
    );
};

export default PaymentsReports;