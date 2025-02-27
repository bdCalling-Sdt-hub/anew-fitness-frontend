
import { Button, Input, Modal, Form, DatePicker, Upload } from "antd";
import {  X } from "lucide-react";

interface AddStaffModalProps {
    openStaff: boolean;
    setOpenStaff: (isOpen: boolean) => void;
}

const AddStaffModal: React.FC<AddStaffModalProps> = ({ openStaff, setOpenStaff }) => {
  const [form] = Form.useForm();

  const handleCreateStaff = () => {
    form.validateFields().then((values) => {
      console.log("Staff Name :", values);
      setOpenStaff(false);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={
        <div className="flex items-center justify-between  pb-4">
          <h3 className="text-[22px] font-semibold text-primary">Add Staff</h3>
          <Button
            type="text"
            className="flex items-center justify-center w-8 h-8 p-0"
            onClick={() => setOpenStaff(false)}
            icon={<X size={20} />}
          />
        </div>
      }
      open={openStaff}
      onCancel={() => setOpenStaff(false)}
      footer={null}
      width={580}
      className="location-modal"
      closable={false} 
      centered
    >
    <Form form={form} layout="vertical">
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
    name="staffName"
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
    <Upload beforeUpload={() => false} maxCount={1}>
      <Button size="large" >Upload Document</Button>
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
    name="expiredDate"
  >
    <DatePicker size="large" style={{ width: "100%", height: "50px" }} />
  </Form.Item>

  {/* Buttons */}
  <div className="flex justify-end gap-3 pt-4">
    <Button size="large" onClick={() => setOpenStaff(false)}>
      Cancel
    </Button>
    <Button type="primary" size="large" onClick={handleCreateStaff} className="bg-red-700 hover:bg-red-800">
      Add
    </Button>
  </div>
</Form>
    </Modal>
  );
};

export default AddStaffModal;
