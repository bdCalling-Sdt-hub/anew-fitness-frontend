import { Button, Form, Modal, Select } from "antd";
import { X } from "lucide-react";
import { useGetPayrollOverviewQuery } from "../../../../../../redux/features/payrollReporting/payrollReportingApi";

const SelectStaffModal = ({ open, setOpen , setStaffData  }:{open: boolean, setOpen: (open: boolean) => void , setStaffData: (staffData: any) => void}) => { 
 
  const {data:useAllPayroll} = useGetPayrollOverviewQuery({})  

  const nameOption  = useAllPayroll?.overviewData?.map((item: any) => ({ label: item?.instructorName, value: item?.instructorName }))
    const onFinish = (values:{staffName:string}) => {
      setOpen(false); 
      setStaffData(values?.staffName)
    }
    return (
        <Modal
        title={
          <div className="flex items-center justify-between  pb-4">
            <h3 className="text-[22px] font-semibold text-primary">Select Staff Name</h3>
            <Button
              type="text"
              className="flex items-center justify-center w-8 h-8 p-0"
              onClick={() => setOpen(false)}
              icon={<X size={20} />}
            />
          </div>
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={580}
        className="location-modal"
        closable={false} 
        centered
      >
        <Form  layout="vertical" onFinish={onFinish} >
          <Form.Item
            label={ <div className=" flex flex-col gap-y-2"> 
            <p className="text-[22px] font-semibold text-primaryText"> Name</p>
             </div>}
            name="staffName"
          
          >
           <Select
                            placeholder="Select name"          
                            className="placeholder:text-primary placeholder:font-semibold placeholder:text-[18px]"
                            style={{ height: '45px', width: '100%', border: '1px solid #ab0906', borderRadius: '7px' }}
                            options={nameOption}
                        />
          </Form.Item>
  
         
          <div className="flex justify-end gap-3 pt-4">
            <Button size="large" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button htmlType="submit" size="large"  className="bg-red-700 hover:bg-red-800 text-white">
              Search
            </Button>
          </div>
        </Form>
      </Modal>
    );
};

export default SelectStaffModal;