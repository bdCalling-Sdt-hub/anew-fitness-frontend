import { Button, Form, Input, Modal } from "antd";
import { useCreateMilesMutation } from "../../../../../redux/features/payrollReporting/paymentReportApi";
import { useEffect } from "react";
import Swal from "sweetalert2";

const MilesReportModal = ({open , setOpen , id , refetch}:{open: boolean, setOpen: (open: boolean) => void , id:string|null , refetch: () => void}) => {
     
  const [createMiles , {isError , isLoading , isSuccess , data , error }] = useCreateMilesMutation()  
  const [form] = Form.useForm(); 


    useEffect(() => {
      if (isSuccess) {
        if (data) { 
          console.log(data);
          Swal.fire({
            text: data?.message,
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            form.resetFields();
            refetch();
            setOpen(false);
          });
        }
  
      }
      if (isError) {
        Swal.fire({
          //@ts-ignore
          text: error?.data?.message,
          icon: "error",
        });
      }
    }, [isSuccess, isError, error, data]);  

  const onFinish = async(values: any) => {
       
    const data = {
      instructorId: id, 
      milesDetails: {
        ...values
      }
    } 

    await createMiles(data)

  } 

  return (
        <Modal open={open}  onCancel={() => setOpen(false)} footer={null} width={600} title={<p className=" text-primary text-[24px] font-bold">Miles Report </p>} centered>
        <Form layout="vertical" onFinish={onFinish} form={form}> 
            <div className="">  
            <Form.Item
          label={ <p className="text-[18px] font-semibold text-primaryText"> Miles</p> }
          name="miles"     
        >
          <Input placeholder="Enter Miles" size="large" style={{ height: "45px" }} />
        </Form.Item>  

            <Form.Item
          label={ <p className="text-[18px] font-semibold text-primaryText"> Mileage Rate</p> }
          name="mileRate"
        
        >
          <Input placeholder="Enter Mileage Rate" size="large" style={{ height: "45px" }} />
        </Form.Item> 
     
            </div> 

            <div className="flex  items-center justify-end gap-4 mt-4">
                <Button onClick={() => setOpen(false)}>Close</Button>
                <button className='px-5 py-[6px] text-white bg-primary rounded' type="submit">{isLoading ? "Saving..." : "Save"}</button>
            </div>

        </Form>
    </Modal>
    );
};

export default MilesReportModal;