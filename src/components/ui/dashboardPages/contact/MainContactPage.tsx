import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import ClientContact from "./Client/ClientContact";
import LeadsContact from "./Leads/LeadsContact";
import AddClientModal from "./Client/AddClientModal";
import { useNavigate } from "react-router-dom";
import AddNewLeadsModal from "./Leads/AddNewLeadsModal";
import MultipleContactModal from "./MultipleContactModal";
import ServicesPage from "../appointment/Services/ServicesPage";
import AppointmentModal from "../calender/AppointmentModal";


const MainContactPage = () => {
    const [selectedItem, setSelectedItem] = useState("Clients")
    const [addClient, setAddClient] = useState(false) 
    const [editClientData, setEditClientData] = useState<any>({})
    const [editAppointmentData, setEditAppointmentData] = useState<any>({})
    const [openLeads, setOpenLeads] = useState(false)
    const [multipleContact, setMultipleContact] = useState(false)
    const [openService, setOpenService] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="pt-8 px-8 ">

            <div className=" flex items-center justify-between">

                <div className=" flex items-center gap-4">
                    {["Clients", "Leads", "1-1 Appointment"].map((item, index) => (

                        <button key={index} className={`  text-[18px] font-semibold px-6 h-[45px] rounded-lg ${selectedItem === item ? "bg-primary text-white" : " border border-primary text-primaryText"} `} onClick={() => setSelectedItem(item)}> {item} </button>
                    )
                    )}
                </div>

                <div className=" flex items-center gap-5 ">

                    <button className=" border border-primary text-primaryText text-[18px] font-semibold px-6 h-[45px] rounded-lg" onClick={() => navigate("/contact/email-contact")}> Email Contacts </button>
                    {
                        selectedItem === "Clients" ?

                            <button className=" flex items-center justify-center gap-2 bg-primary text-white w-auto h-[45px] p-2 px-5 rounded-lg"
                                onClick={() => setAddClient(true)}
                            >
                                <span> <LuPlus size={22} />  </span>
                                <span className=""> Add New Client </span>
                            </button> :
                            selectedItem === "Leads" ?
                                <button className=" flex items-center justify-center gap-4 bg-primary text-white w-auto h-[45px] p-2 px-5 rounded-lg"
                                    onClick={() => setOpenLeads(true)}
                                >
                                    <span> <LuPlus size={25} />  </span>
                                    <span className=""> Add New Leads </span>
                                </button> :
                                <button className=" flex items-center justify-center gap-4 bg-primary text-white w-auto h-[45px] p-2 px-5 rounded-lg"
                                    onClick={() => setOpenService(true)}
                                >
                                    <span className=""> New </span>
                                    <span> <LuPlus size={25} />  </span>
                                </button>
                    }
                </div>

            </div>

            <div className=" w-full pt-[60px] ">
                {
                    selectedItem === "Clients" ? <ClientContact setAddClient={setAddClient} setEditClientData={setEditClientData} /> : selectedItem === "Leads" ? <LeadsContact setAddClient={setAddClient} /> : <ServicesPage setOpenService={setOpenService} setEditAppointmentData={setEditAppointmentData} />
                }
            </div>


            <AddClientModal open={addClient} setOpen={setAddClient} setOpenLeads={setOpenLeads} editClientData={editClientData} setEditClientData={setEditClientData} />
            <AddNewLeadsModal open={openLeads} setOpen={setOpenLeads} setAddClient={setAddClient} setMultipleContact={setMultipleContact} />
            <MultipleContactModal open={multipleContact} setOpen={setMultipleContact} setOpenLeads={setOpenLeads} />
            <AppointmentModal open={openService} setOpen={setOpenService} setEditAppointmentData={setEditAppointmentData} editAppointmentData={editAppointmentData} />
        </div>
    );
};

export default MainContactPage;