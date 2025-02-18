
import { Button, Input, Modal, Form } from "antd";
import {  X } from "lucide-react";

interface NewEventModalProps {
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (isOpen: boolean) => void;
}

const NewEventModal: React.FC<NewEventModalProps> = ({ isLocationModalOpen, setIsLocationModalOpen }) => {
  const [form] = Form.useForm();

  const handleCreateLocation = () => {
    form.validateFields().then((values) => {
      console.log("Location Data:", values);
      setIsLocationModalOpen(false);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={
        <div className="flex items-center justify-between  pb-4">
          <h3 className="text-[22px] font-semibold text-primary">New Event</h3>
          <Button
            type="text"
            className="flex items-center justify-center w-8 h-8 p-0"
            onClick={() => setIsLocationModalOpen(false)}
            icon={<X size={20} />}
          />
        </div>
      }
      open={isLocationModalOpen}
      onCancel={() => setIsLocationModalOpen(false)}
      footer={null}
      width={580}
      className="location-modal"
      closable={false} 
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={ <div className=" flex flex-col gap-y-2"> 
          <p className="text-[22px] font-semibold text-primaryText"> Name</p> 
          <p className="text-[16px] text-primaryText font-medium pb-4"> Give your Event a solid title. Remember, it will be visible to the public. </p>
           </div>}
          name="locationName"
        
        >
          <Input placeholder="Enter a Name" size="large" style={{ height: "50px" }} />
        </Form.Item>

       
        <div className="flex justify-end gap-3 pt-4">
          <Button size="large" onClick={() => setIsLocationModalOpen(false)}>
            Cancel
          </Button>
          <Button type="primary" size="large" onClick={handleCreateLocation} className="bg-primary">
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default NewEventModal;
