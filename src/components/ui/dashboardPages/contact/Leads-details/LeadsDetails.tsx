import { Button, ConfigProvider, Select, Tabs } from "antd";
import { useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router-dom";
import LeadsClasses from "./LeadsClasses";
import LeadsAppointment from "./LeadsAppointment";
import { useGetLeadByIdQuery } from "../../../../../redux/features/contact/leadContactApi";
import moment from "moment";


const LeadsDetails = () => {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [sort, setSort] = useState("past")
    const { data: leadDetails } = useGetLeadByIdQuery(id)
    const leadInfo = leadDetails?.lead
    console.log("lead Details", leadDetails);

    const pastClasses = leadDetails?.pastClasses
    const upcomingClasses = leadDetails?.upcomingClasses

    const upcomingAppointments = leadDetails?.upcomingAppointments
    const pastAppointments = leadDetails?.pastAppointments

    console.log(pastClasses, "sdfgsd");

    const items = [
        {
            key: "classes",
            label: <p className=" text-[18px] font-semibold "> Classes </p>,
            children: <LeadsClasses sort={sort} upcomingClasses={upcomingClasses} pastClasses={pastClasses} />,

        },
        {
            key: "appointment",
            label: <p className=" text-[18px] font-semibold "> Appointment </p>,
            children: <LeadsAppointment sort={sort} upcomingAppointments={upcomingAppointments} pastAppointments={pastAppointments} />,
        },
    ];


    const handleSortBy = (value: any) => {
        setSort(value)
    }
    return (
        <div className="px-[50px] pt-[30px]">

            <div className=" flex items-center justify-between">
                <h1 className="flex items-center gap-2 mb-5"> <span className="cursor-pointer"><RiArrowLeftLine color='#ab0906' size={30} onClick={() => navigate(-1)} />  </span> <span className="text-[30px] font-bold text-primary">Leads </span></h1>

                <button className=" h-[45px] px-5 bg-primary text-white rounded-lg" onClick={() => navigate(`/contact/email-contact?id=${id}`)}> Email Contacts </button>
            </div>

            <div className=" w-full flex gap-10 pt-[70px]">

                <div className="w-2/5 border border-gray-200 shadow-lg rounded-lg  ">
                    <div className=" mx-auto bg-white  p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center">
                                <span className="text-white text-xl font-bold">{leadInfo?.lead_name?.slice(0, 2)}</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">{leadInfo?.lead_name}</h1>
                                <p className="text-gray-600 text-sm">{leadInfo?.lead_email}</p>

                            </div>
                        </div>

                        <div className="space-y-4">

                            <div className=" flex items-center gap-1">
                                <div className="text-[18px] font-medium">Gender:</div>
                                <div className="text-[18px] font-medium">{leadInfo?.gender}</div>
                            </div>

                            <div className=" flex items-center gap-1">
                                <div className="text-[18px] font-medium">Mobile:</div>
                                <div className="text-[18px] font-medium">{leadInfo?.phone}</div>
                            </div>

                            <div className=" flex items-center gap-1">
                                <div className="text-[18px] font-medium">Created On:</div>
                                <div className="text-[18px] font-medium"> {moment(leadInfo?.createdAt).format("DD-MMM-YYYY")}</div>
                            </div>

                            <div className=" flex items-center gap-1">
                                <div className="text-[18px] font-medium">Time:</div>
                                <div className="text-[18px] font-medium"> {moment(leadInfo?.createdAt).format("HH:mm a")}</div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="w-3/5 border border-gray-200 shadow-lg rounded-lg p-6 ">
                    <div className=" flex items-center justify-end">
                        <Select
                            placeholder="Sort By"
                            value={sort}
                            className="placeholder:text-primary placeholder:font-semibold placeholder:text-[18px]"
                            style={{ height: '45px', width: '120px', border: '1px solid #ab0906', borderRadius: '7px' }}
                            options={[
                                { value: 'past', label: 'Past' },
                                { value: 'upcoming', label: 'Upcoming' },
                            ]}

                            onChange={(value) => handleSortBy(value)}
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
                                        itemHoverColor: "#ab0906",

                                    },
                                },
                            }}
                        >

                            <Tabs defaultActiveKey="services" items={items} />
                        </ConfigProvider>
                    </div>

                </div>

            </div>

            <div className="flex  items-center justify-end gap-4 mt-10">
                <Button onClick={() => navigate(-1)} style={{ height: "40px" }}>Close</Button>
                <button className='px-5 py-[6px] text-white bg-primary rounded' type="submit" style={{ height: "40px" }}>Save</button>
            </div>
        </div>
    );
};

export default LeadsDetails;