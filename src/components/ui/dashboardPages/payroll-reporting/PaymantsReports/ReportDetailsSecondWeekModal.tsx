import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useCreateReportSecondDetailsMutation } from "../../../../../redux/features/payrollReporting/paymentReportApi";
import Swal from "sweetalert2";
import { useEffect } from "react";

const ReportDetailsSecondWeekModal  = ({ open, setOpen, id, refetch }: { open: boolean, setOpen: (open: boolean) => void, id: string | null, refetch: () => void }) => {

  const [form] = Form.useForm();
  const [createReportSecondDetails, { isLoading, isError, isSuccess, data, error }] = useCreateReportSecondDetailsMutation();

  useEffect(() => {
    if (isSuccess) {
      if (data) { 
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

  const onFinish = async (values: any) => {
    const payload = {
      instructorId: id,
      workDetails: {
        date: values.date?.toISOString(),
        workDescription: values.description,
        hours: Number(values.hours),
        hourRate: Number(values["hour-rate"]),
        workType: values["work-type"],
      }
    };

      await createReportSecondDetails(payload)

  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={600}
      title={<p className=" text-primary text-[24px] font-bold">Report Details </p>}
      centered
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <div className="">
          <Form.Item
            name="date"
            label={<p className=" text-primaryText text-[18px] font-semibold"> Date </p>}
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker
              style={{ height: '45px', width: '100%' }}
              placeholder="Select Date"
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<p className=" text-primaryText text-[18px] font-semibold"> Work Description </p>}
            rules={[{ required: true, message: "Please select a description" }]}
          >
            <Input placeholder="Enter work description" size="large" style={{ height: "45px" }} />

          </Form.Item>

          <Form.Item
            label={<p className="text-[18px] font-semibold text-primaryText"> Hours</p>}
            name="hours"
            rules={[{ required: true, message: "Please enter hours" }]}
          >
            <Input type="number" placeholder="Enter Hours" size="large" style={{ height: "45px" }} />
          </Form.Item>

          <Form.Item
            label={<p className="text-[18px] font-semibold text-primaryText"> Hour Rate</p>}
            name="hour-rate"
            rules={[{ required: true, message: "Please enter hour rate" }]}
          >
            <Input type="number" placeholder="Enter Hour Rate" size="large" style={{ height: "45px" }} />
          </Form.Item>

          <Form.Item
            name="work-type"
            label={<p className=" text-primaryText text-[18px] font-semibold"> Work Type </p>}
            rules={[{ required: true, message: "Please select work type" }]}
          >
            <Select
              placeholder="Select Work Type"
              style={{ height: '45px', width: '100%' }}
              options={[
                { value: 'offline', label: 'Offline' },
                { value: 'online', label: 'Online' },
              ]}
            />
          </Form.Item>
        </div>

        <div className="flex  items-center justify-end gap-4 mt-4">
          <Button onClick={() => setOpen(false)}>Close</Button>
          <button className='px-5 py-[6px] text-white bg-primary rounded' type="submit">
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>

      </Form>
    </Modal>
  );
};

export default ReportDetailsSecondWeekModal ;