import { Button, ConfigProvider, Select, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import {  useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import LeadsClasses from "./LeadsClasses";
import LeadsAppointment from "./LeadsAppointment";


const LeadsDetails = () => {
    const navigate = useNavigate() 
        const [tabOption, setTabOption] = useState("classes") 
    
        const items = [
            {
                key: "classes",
                label: <p className=" text-[18px] font-semibold "> Classes </p>, 
                children: <LeadsClasses />,
              
            },
            {
                key: "appointment",
                label: <p className=" text-[18px] font-semibold "> Appointment </p>,
                children: <LeadsAppointment />, 
            }, 
        ];  
    
        const onChange = (key: string) => {
            setTabOption(key)
        }; 
    return (
        <div className="px-[50px] pt-[30px]">

            <div className=" flex items-center justify-between">
                <h1 className="flex items-center gap-2 mb-5"> <span><RiArrowLeftLine color='#ab0906' size={30} onClick={() => navigate(-1)} />  </span> <span className="text-[30px] font-bold text-primary">Leads </span></h1>

                <button className=" h-[45px] px-5 bg-primary text-white rounded-lg" onClick={() => navigate("/contact/email-contact")}> Email Contacts </button>
            </div>

            <div className=" w-full flex gap-10 pt-[70px]">

                <div className="w-2/5 border border-gray-200 shadow-lg rounded-lg  ">
                    <div className=" mx-auto bg-white  p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center">
                                <span className="text-white text-xl font-bold">SA</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">Mithila Khan</h1>
                                <p className="text-gray-600 text-sm">mithila082@gmail.com</p>

                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className=" flex items-center gap-1">
                                <div className="text-[18px] font-medium ">Leads Since:</div>
                                <div className="text-[18px] font-medium">Fri, 07-2023</div>
                            </div>

                            <div className=" flex items-center gap-1">
                                <div className="text-[18px] font-medium">Gender:</div>
                                <div className="text-[18px] font-medium">Male</div>
                            </div>

                            <div className=" flex items-center gap-1">
                                <div className="text-[18px] font-medium">Mobile:</div>
                                <div className="text-[18px] font-medium">+1234569674</div>
                            </div>

                            <div className=" flex items-center gap-1">
                                <div className="text-[18px] font-medium">Created On:</div>
                                <div className="text-[18px] font-medium">02-feb-2023</div>
                            </div>

                            <div>
                                <div className="text-[18px] font-medium mb-2">Contact Note:</div>
                                <TextArea
                                    className="w-full border-primary rounded-lg resize-none"
                                    rows={5}
                                    placeholder="Enter contact note"
                                    style={{ resize: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-3/5 border border-gray-200 shadow-lg rounded-lg p-6 ">
                    <div className=" flex items-center justify-end">
                        <Select
                            placeholder="Sort By"
                            className="placeholder:text-primary placeholder:font-semibold placeholder:text-[18px]"
                            style={{ height: '45px', width: '120px', border: '1px solid #ab0906', borderRadius: '7px' }}
                            options={[
                                { value: 'past', label: 'Past' },
                                { value: 'upcoming', label: 'Upcoming' },
                            ]}
                        />
                    </div> 

                    <div>
            <ConfigProvider
                    theme={{
                        components: {
                            Tabs: {
                                itemActiveColor: "#ab0906",
                                itemSelectedColor: "#ab0906",
                                inkBarColor: "#ab0906",
                                itemHoverColor: "#ab0906" ,
                             
                            },
                        },
                    }}
                >

                    <Tabs defaultActiveKey="services" items={items} onChange={onChange} />
                </ConfigProvider> 
            </div> 

                </div>

            </div> 

            <div className="flex  items-center justify-end gap-4 mt-10">
                    <Button onClick={() => navigate(-1)} style={{height:"40px"}}>Close</Button>
                    <button className='px-5 py-[6px] text-white bg-primary rounded' type="submit" style={{height:"40px"}}>Save</button>
                </div>
        </div>
    );
};

export default LeadsDetails;