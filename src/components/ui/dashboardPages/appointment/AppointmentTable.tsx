import { ConfigProvider, Tabs } from "antd";
import { LuPlus } from "react-icons/lu";
import ServicesPage from "./Services/ServicesPage";
import StaffAvailablePage from "./StaffAvailable/StaffAvailablePage";
import { useState } from "react";
import AppointmentModal from "../calender/AppointmentModal";
import AddStaffModal from "./StaffAvailable/AddStaffModal";


const AppointmentTable = () => {
   
    const [openStaff , setOpenStaff] = useState(false)
    const [tabOption, setTabOption] = useState("services") 

    const items = [
        {
            key: "staff",
            label: <p className=" text-[18px] font-semibold "> Staff Available </p>,
            children: <StaffAvailablePage setOpenStaff={setOpenStaff} />,
        },
    ];

    const onChange = (key: string) => {
        setTabOption(key)
    };


    return (
        <div className="pt-8 px-8 ">

            <div className=" flex items-center justify-between">
                <p className=" text-[30px] font-bold "> Staff Available </p>

                     <button className=" flex items-center justify-center gap-4 bg-primary text-white w-auto p-2 px-5 rounded-lg"
                        onClick={() => setOpenStaff(true)}
                    >
                        <span className=""> New Staff </span>
                        <span> <LuPlus size={25} />  </span>
                    </button>
        

            </div>

            <div className=" mt-[30px] border border-[#ECECEC] p-5 rounded-lg ">
                <ConfigProvider
                    theme={{
                        components: {
                            Tabs: {
                                itemActiveColor: "#ab0906",
                                itemSelectedColor: "#ab0906",
                                inkBarColor: "#ab0906",
                                itemHoverColor: "#ab0906"
                            },
                        },
                    }}
                >

                    <Tabs defaultActiveKey="services" items={items} onChange={onChange} />
                </ConfigProvider>

            </div>
            
            <AddStaffModal openStaff={openStaff} setOpenStaff={setOpenStaff} />
        </div>
    );
};

export default AppointmentTable;