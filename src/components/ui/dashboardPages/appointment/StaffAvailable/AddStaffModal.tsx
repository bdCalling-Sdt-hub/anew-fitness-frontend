
import { Button, Input, Modal, Form, DatePicker, Upload } from "antd";
import {  X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAddStaffMutation, useEditStaffInfoMutation } from "../../../../../redux/features/staff/staffManagementApi";
import Swal from "sweetalert2";
import moment from "moment";

interface AddStaffModalProps {
    openStaff: boolean;
    setOpenStaff: (isOpen: boolean) => void; 
    refetch: () => void; 
    editStaff: { 
        name: string | undefined;
        document: string| undefined;
        documentationExpiredDate: string| undefined;
        id: string| undefined;
    } 
    setEditStaff:any
}

const AddStaffModal: React.FC<AddStaffModalProps> = ({ openStaff, setOpenStaff , refetch , editStaff , setEditStaff }) => {
  const [form] = Form.useForm();  
  const [fileList, setFileList] = useState<any[]>([]);
  const [addStaff , {isError , isLoading , isSuccess , data , error}] = useAddStaffMutation(); 
  const [editStaffInfo , {isError: editIsError  , isSuccess: editIsSuccess , data: editData , error: editError}] = useEditStaffInfoMutation(); 

      useEffect(() => {
          if (isSuccess) {
              if (data) {
                  Swal.fire({
                      text: data?.message,
                      icon: "success",
                      timer: 1500,
                      showConfirmButton: false
                  }).then(() => {
                      setOpenStaff(false); 
                      refetch();  
                      form.resetFields(); 
                  })
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


      useEffect(() => {
          if (editIsSuccess) {
              if (editData) {
                  Swal.fire({
                      text: editData?.message,
                      icon: "success",
                      timer: 1500,
                      showConfirmButton: false
                  }).then(() => {
                      setOpenStaff(false);  
                      setEditStaff({})
                      refetch();  
                      form.resetFields(); 
                  })
              }
          }
          if (editIsError) {
              Swal.fire({
                  //@ts-ignore
                  text: editError?.editData?.message,
                  icon: "error",
              });
          }
      }, [editIsSuccess, editIsError, editError, editData]);   

    useEffect(() => {
      if (editStaff?.id && editStaff?.document) {
        const existingFile = {
          uid: "-1",
          name: editStaff.document.split("/").pop(),
          status: "done",
          url: editStaff.document,
        };
        setFileList([existingFile]);
      } else {
        setFileList([]);
      }
    
      form.setFieldsValue({
        name: editStaff?.name || "",
        expiryDate: editStaff?.documentationExpiredDate
          ? moment(editStaff.documentationExpiredDate, "YYYY-MM-DD")
          : null,
      });
    }, [editStaff]); 

  const handleCreateStaff = async(values:any) => {   

    const formattedDate = values.expiryDate?.format("YYYY-MM-DD"); 
    const formData = new FormData(); 
    
    formData.append("name", values.name); 

    formData.append("documents",values?.document?.[0]?.originFileObj);

    formData.append("expiryDate", formattedDate); 

    const data = {
      id: editStaff?.id, 
      name: values.name, 
      expiryDate: formattedDate,
    }  

    if(editStaff?.id) { 
    await editStaffInfo(data)
    } else {
    await addStaff(formData)
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center justify-between  pb-4">
          <h3 className="text-[22px] font-semibold text-primary">{editStaff?.id ? "Edit Staff" : "Add Staff"}</h3>
          <Button
            type="text"
            className="flex items-center justify-center w-8 h-8 p-0"
            onClick={() => {setOpenStaff(false); form.resetFields(); setEditStaff({})}}
            icon={<X size={20} />}
          />
        </div>
      }
      open={openStaff}
      onCancel={() => setOpenStaff(false)}
      footer={true}
      width={580}
      className="location-modal"
      closable={false} 
      centered
    >
    <Form form={form} layout="vertical" onFinish={handleCreateStaff}>
  {/* Name Input */}
  <Form.Item
    label={
      <div className="flex flex-col gap-y-2">
        <p className="text-[22px] font-semibold text-primaryText">Name</p>
        <p className="text-[16px] text-primaryText font-medium pb-4">
          Enter your staff's name. This name will be visible to the public on your website.
        </p>
      </div>
    }
    name="name"
  >
    <Input placeholder="Enter staff name" size="large" style={{ height: "50px" }} />
  </Form.Item>

  {/* Add Document Input */}
  <Form.Item
    label={
      <div className="flex flex-col gap-y-2">
        <p className="text-[22px] font-semibold text-primaryText">Add Document</p>
        <p className="text-[16px] text-primaryText font-medium pb-4">
        Upload the relevant certification document for the staff.
        </p>
      </div>
    }
    name="document"
    valuePropName="fileList"
    getValueFromEvent={(e) => e?.fileList}
  >
    <Upload   
    fileList={fileList}
    onChange={({ fileList }) => setFileList(fileList)} beforeUpload={() => false} maxCount={1}>
      <Button size="large" disabled={editStaff?.id ? true : false} className="disabled:cursor-not-allowed" >Upload Document</Button>
    </Upload>
  </Form.Item>

  {/* Expired Date Input */}
  <Form.Item
    label={
      <div className="flex flex-col gap-y-2">
        <p className="text-[22px] font-semibold text-primaryText">Expired Date</p>
        <p className="text-[16px] text-primaryText font-medium pb-4">
          Select the expiration date for this document.
        </p>
      </div>
    }
    name="expiryDate"
  >
    <DatePicker size="large" style={{ width: "100%", height: "50px" }} format={"YYYY-MM-DD"} />
  </Form.Item>

  {/* Buttons */}
  <div className="flex justify-end gap-3 pt-4">
    <Button size="large" onClick={() => setOpenStaff(false)}>
      Cancel
    </Button> 
    
    <Button type="primary" size="large"  htmlType="submit" className="bg-red-700 hover:bg-red-800">
     {isLoading? "Adding.." : "Add"}
    </Button>
  </div>
</Form>
    </Modal>
  );
};

export default AddStaffModal;
