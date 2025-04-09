import { Button, Cascader, Form, Input, Modal, Select } from "antd";
import stateCityOptions from "../../../../constant/constant";
import { useEffect } from "react";
import { useAddLocationMutation, useEditLocationMutation } from "../../../../redux/features/location/locationApi";
import Swal from "sweetalert2";

// interface editDataType {
//     firstName: string,
//     lastName: string,
//     hourRate: string,
//     locationType: string,
//     activeStatus: string,
//     mobileNumber: string,
//     workType: string,
//     email: string,
//     address: string,
//     status: string,
//     id: string, 
//     name: string,
//     region: string,
// }

const AddLocationModal = ({ open, setOpen, editData, setEditData, refetch }: { open: boolean, setOpen: (open: boolean) => void, editData: any, setEditData:any, refetch: () => void }) => { 
    const [form] = Form.useForm();   
    const [addLocation , { isLoading , isError , isSuccess , data , error}] =  useAddLocationMutation(); 
    const [editLocation , { isLoading: editIsLoading , isError: editIsError , isSuccess: editIsSuccess , data: editsData , error: editError}] = useEditLocationMutation(); 

          useEffect(() => {
              if (isSuccess) {
                  if (data) {
                      Swal.fire({
                          text: data?.message,
                          icon: "success",
                          timer: 1500,
                          showConfirmButton: false
                      }).then(() => {
                          setOpen(false); 
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
                  if (editsData) {
                      Swal.fire({
                          text: editsData?.message,
                          icon: "success",
                          timer: 1500,
                          showConfirmButton: false
                      }).then(() => {
                          setOpen(false);  
                          setEditData({})
                          refetch();  
                          form.resetFields(); 
                      })
                  }
              }
              if (editIsError) {
                  Swal.fire({
                      //@ts-ignore
                      text: editError?.editsData?.message,
                      icon: "error",
                  });
              }
          }, [editIsSuccess, editIsError, editError, editsData]);    

    useEffect(() => { 
        if (editData) { 
            form.setFieldsValue({ 
                locationName: editData?.name,
                address: editData?.address,
                region: editData?.region,
                locationType: editData?.locationType,
                hourRate: editData?.hourRate,
                firstName: editData?.firstName,
                lastName: editData?.lastName,
                email: editData?.email,
                mobileNumber: editData?.mobileNumber,
                workType: editData?.workType, 
            })
        } else {
            form.resetFields(); 
        }
    }, [editData, form]);
  
    const onFinish = async (values:{locationName:string , address:string , region:string , locationType:string , hourRate:string , firstName:string , lastName:string , email:string , mobileNumber:string , workType:string}) => {   
        console.log(values);

        if(editData?.id) {  
            await editLocation({ id: editData?.id , data:values}).then((res)=>{
                console.log(res);
            })
        } else {
            
            await addLocation(values).then((res)=>{
                console.log(res);
            })
        }

     }

    return (
        <Modal open={open} onCancel={() => {setOpen(false); setEditData({})}} footer={null} width={850} title={<p className=" text-primary text-[24px] font-bold">{editData?.id ? "Edit Location" : "Create Location" } </p>} centered>
            <Form layout="vertical" onFinish={onFinish} form={form}>
                <div className=" grid grid-cols-2 gap-10">

                    <div>

                        <Form.Item
                            label={<p className="text-[18px] font-semibold text-primaryText"> Location Name</p>}
                            name="locationName"

                        >
                            <Input placeholder="Enter Location Name" size="large" style={{ height: "45px" }} />
                        </Form.Item>

                        <Form.Item
                            label={<p className="text-[18px] font-semibold text-primaryText"> Address</p>}
                            name="address"

                        >
                            <Input placeholder="Enter Address" size="large" style={{ height: "45px" }} />
                        </Form.Item>

                        <Form.Item
                            label={<p className="text-[18px] font-semibold text-primaryText"> Region</p>}
                            name="region"
                        >
                            <Cascader
                                options={stateCityOptions}
                                placeholder="Select State & City"
                                size="large"
                                style={{ width: "100%", height: "45px" }}
                            />
                        </Form.Item>

                        <Form.Item name="locationType" label={<p className=" text-primaryText text-[18px] font-semibold">  Location Type </p>}>
                            <Select
                                className=""
                                placeholder="Select  Location Type"
                                style={{ height: '45px', width: '100%' }}
                                options={[
                                    { value: 'office', label: 'office' },
                                    { value: 'Location 2', label: 'Location 2' },
                                    { value: 'Location 3', label: 'Location 3' },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<p className="text-[18px] font-semibold text-primaryText"> Hour Rate</p>}
                            name="hourRate"

                        >
                            <Input type="number" placeholder="Enter Hour Rate" size="large" style={{ height: "45px" }} />
                        </Form.Item>

                    </div>

                    <div>
                        <Form.Item
                            label={<p className="text-[18px] font-semibold text-primaryText"> First Name</p>}
                            name="firstName"

                        >
                            <Input placeholder="Enter First Name" size="large" style={{ height: "45px" }} />
                        </Form.Item>

                        <Form.Item
                            label={<p className="text-[18px] font-semibold text-primaryText"> Last Name</p>}
                            name="lastName"

                        >
                            <Input placeholder="Enter Last Name" size="large" style={{ height: "45px" }} />
                        </Form.Item>

                        <Form.Item
                            label={<p className="text-[18px] font-semibold text-primaryText"> Email</p>}
                            name="email"

                        >
                            <Input placeholder="Enter Email" size="large" style={{ height: "45px" }} />
                        </Form.Item>

                        <Form.Item
                            label={<p className="text-[18px] font-semibold text-primaryText"> Mobile Number</p>}
                            name="mobileNumber"

                        >
                            <Input placeholder="Enter Mobile Number" size="large" style={{ height: "45px" }} />
                        </Form.Item>
                        <Form.Item name="workType" label={<p className=" text-primaryText text-[18px] font-semibold"> Work Type </p>}>
                            <Select
                                className=""
                                placeholder="Select Work Type"
                                style={{ height: '45px', width: '100%' }}
                                options={[
                                    { value: 'offline', label: 'Offline' },
                                    { value: 'online', label: 'Online' },
                                ]}
                            />
                        </Form.Item>
                    </div>


                </div>

                <div className="flex  items-center justify-end gap-4 mt-4">
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <button onClick={()=>form.submit()} className='px-5 py-[6px] text-white bg-primary rounded' type="submit">{editIsLoading||isLoading ? "Loading.." : 'Save'}</button>
                </div>

            </Form>
        </Modal>
    );
};

export default AddLocationModal;