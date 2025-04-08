import {  Form, Input } from "antd";
// import stateCityOptions from "../../../../constant/constant"; 
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GetLocalStorage } from "../../../../utils/LocalStroage";
import { useGetAdminProfileQuery, useGetStaffProfileQuery, useUpdateAdminProfileMutation, useUpdateStaffProfileMutation } from "../../../../redux/features/auth/authApi";
import { imageUrl } from "../../../../redux/base/baseApi"; 
import Swal from "sweetalert2";

interface Profile {
    businessName: string;
    name: string;    
    email: string;    
    address: string;    
    region: string; 
    image: string;    
}

const GeneralManagement = () => {
    const [imagePreview, setImagePreview] = useState<string>('/user.svg');
    const [file, setFile] = useState<File | null>(null); 
    const [profile , setProfile] = useState<Profile>()
    const role = GetLocalStorage("role");   
    const [form] = Form.useForm();
     
    const {data:adminProfile} = useGetAdminProfileQuery(undefined) 
    const {data:staffProfile} = useGetStaffProfileQuery(undefined)    

    console.log(profile);

    // update profile   
    const [updateAdminProfile , {isError , isSuccess , error , data}] = useUpdateAdminProfileMutation(); 
    const [updateStaffProfile , {isError: staffIsError , isSuccess: staffIsSuccess , error: staffError , data: staffData}] = useUpdateStaffProfileMutation(); 
 
    // for staff profile
      useEffect(() => {
         if (staffIsSuccess) {
             if (staffData) {
                 Swal.fire({
                     text: staffData?.message,
                     icon: "success",
                     timer: 1500,
                     showConfirmButton: false
                 })
             }
 
         }
         if (staffIsError) {
             Swal.fire({          
                 //@ts-ignore
                 text: staffIsError?.staffData?.message,
                 icon: "error",
             });
         }
     }, [staffIsSuccess, staffIsError, staffError, staffData]);
 
 
     // for resend password  
     useEffect(() => {
         if (isSuccess) {
             if (data) {
                 Swal.fire({
                     text: data?.message,
                     icon: "success",
                     timer: 1500,
                     showConfirmButton: false
                 })
             }
 
         }
         if (isError) {
             Swal.fire({
                 title: "Failed to Login",
                 //@ts-ignore
                 text: error?.data?.message,
                 icon: "error",
             });
         }
     }, [isSuccess, isError, error, data]); 


    useEffect(() => {
        if (role === "admin" && adminProfile) {
          setProfile(adminProfile);
        } else if (role !== "admin" && staffProfile) {
          setProfile(staffProfile);
        }
      }, [role, adminProfile, staffProfile]);   

      console.log(profile); 

      useEffect(() => {
        if (profile) {
            form.setFieldsValue({
                businessName: profile?.businessName,
                name: profile?.name,
                email: profile?.email,
                address: profile?.address,
                region: profile?.region,
            });
            setImagePreview(profile?.image?.startsWith("http") ? profile?.image : `${imageUrl}${profile?.image}` || '/user.svg');
        }
    }, [profile, form]);

    const handleImageChange = (e:any) => { 
        const file = e.target.files?.[0];
        const imgUrl = URL.createObjectURL(file);
        setImagePreview(imgUrl);
        setFile(file);
    }; 

    const onFinish = async (values: any) => {  
        console.log("sdgdfsg" ,values);
        const formData = new FormData(); 
        formData.append("businessName", values.businessName); 
        formData.append("name", values.name); 
        formData.append("email", values.email); 
        formData.append("address", values.address); 
        if (file) {
            formData.append("image", file); 
        } 

        if (role === "admin") {  
            await updateAdminProfile(formData).then((res) => {
             console.log(res);})
        } else {  
            await updateStaffProfile(formData).then((res) => {
             console.log(res);} )
        }  
    }; 

    return (
        <div className="pt-[30px]">

            <p className=" text-[35px] text-primary font-bold">General Settings</p>
            <p className=" text-[22px] font-medium  pb-10"> Set up your general settings information </p>

            <Form layout="vertical" className=" border border-[#D8D8D8] p-8 rounded-lg " form={form} onFinish={onFinish}>
                <div className="flex justify-start items-center gap-4 pb-7">
                    <div className="w-[150px] h-[150px] relative  rounded-full">
                        <img
                            src={imagePreview}
                            alt="User Profile"
                            className="w-[150px] h-[150px] object-cover rounded-full"
                        />
                        <label
                            className="absolute bottom-[0px] cursor-pointer right-1 bg-primary rounded-full p-1 text-white"
                            htmlFor="imageUploadBanner"
                        >
                            <CiEdit size={29} />
                        </label>

                        <input
                            id="imageUploadBanner"
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>
                </div>

                <p className=" text-[30px] font-bold pb-4"> Main Details </p>

                <Form.Item
                    label={<p className="text-[18px] font-semibold text-primaryText"> Business Name</p>}
                    name="businessName"
                >
                    <Input placeholder="Enter Business Name" size="large" style={{ height: "45px" }} />
                </Form.Item>

                <Form.Item
                    label={<p className="text-[18px] font-semibold text-primaryText"> User Name</p>}
                    name="name"
                >
                    <Input placeholder="Enter User Name" size="large" style={{ height: "45px" }} />
                </Form.Item>

                <Form.Item
                    label={<p className="text-[18px] font-semibold text-primaryText"> Email</p>}
                    name="email"
                >
                    <Input placeholder="Enter Email" size="large" style={{ height: "45px" }} />
                </Form.Item>

                <Form.Item
                    label={<p className="text-[18px] font-semibold text-primaryText"> Address</p>}
                    name="address"
                >
                    <Input placeholder="Enter Address " size="large" style={{ height: "45px" }} />
                </Form.Item>

                {/* <Form.Item
                    label={<p className="text-[18px] font-semibold text-primaryText"> Region</p>}
                    name="region"
                >
                    <Cascader
                        options={stateCityOptions}
                        placeholder="Select State & City"
                        size="large"
                        style={{ width: "100%", height: "45px" }}
                    />
                </Form.Item> */}

                <div className="flex  items-center justify-end gap-4 mt-4">

                    <button className='px-7 py-[10px] text-white bg-primary rounded' type="submit">Save</button>
                </div>
            </Form>
        </div>
    );
};

export default GeneralManagement;