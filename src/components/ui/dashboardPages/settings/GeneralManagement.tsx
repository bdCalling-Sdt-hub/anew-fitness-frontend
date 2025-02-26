import { Cascader, Form, Input } from "antd";
import stateCityOptions from "../../../../constant/constant";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

const GeneralManagement = () => { 
    const [imagePreview, setImagePreview] = useState<string>('/user.svg');
    const [file, setFile] = useState<File | null>(null);  

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
                setFile(selectedFile);
            };
            reader.readAsDataURL(selectedFile);
        }
    }; 

    return (
        <div className="pt-[30px]">  

            <p className=" text-[35px] text-primary font-bold">General Settings</p>
            <p className=" text-[22px] font-medium  pb-10"> Set up your general settings information </p>

            <Form layout="vertical" className=" border border-[#D8D8D8] p-8 rounded-lg "> 
            <div className="flex justify-center">
                    <div className="w-[300px] h-[200px] relative bg-red-50 rounded-lg">
                        <img
                            src={imagePreview}
                            alt="User Profile"
                            className="w-full h-full object-fill rounded-lg"
                        />
                        <label
                            className="absolute bottom-[0px] cursor-pointer -right-[8px] bg-primary rounded-full p-1 text-white"
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
                    name="Business Name"
                >
                    <Input placeholder="Enter Business Name" size="large" style={{ height: "45px" }} />
                </Form.Item> 

                <Form.Item
                    label={<p className="text-[18px] font-semibold text-primaryText"> User Name</p>}
                    name="User Name"
                >
                    <Input placeholder="Enter User Name" size="large" style={{ height: "45px" }} />
                </Form.Item> 

                <Form.Item
                    label={<p className="text-[18px] font-semibold text-primaryText"> Email</p>}
                    name="Email"
                >
                    <Input placeholder="Enter Email" size="large" style={{ height: "45px" }} />
                </Form.Item> 

                <Form.Item
                    label={<p className="text-[18px] font-semibold text-primaryText"> Address</p>}
                    name="Address Name"
                >
                    <Input placeholder="Enter Address Name" size="large" style={{ height: "45px" }} />
                </Form.Item> 

                <Form.Item
                    label={<p className="text-[18px] font-semibold text-primaryText"> Region</p>}
                    name="Region"
                >
                         <Cascader
        options={stateCityOptions}
        placeholder="Select State & City"
        size="large"
        style={{ width: "100%", height: "45px" }}
      />
                </Form.Item> 

                <div className="flex  items-center justify-end gap-4 mt-4">
                
                <button className='px-7 py-[10px] text-white bg-primary rounded' type="submit">Save</button>
            </div> 
            </Form>
        </div>
    );
};

export default GeneralManagement;