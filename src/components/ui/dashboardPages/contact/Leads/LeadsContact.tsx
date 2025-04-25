import { ConfigProvider, Empty, Switch, Table, Tabs } from "antd";
import { TbEdit } from "react-icons/tb";
import noData from "../../../../../assets/noData.png";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDeleteLeadContactMutation, useGetAllLeadContactQuery, useUpdateLeadStatusMutation } from "../../../../../redux/features/contact/leadContactApi";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";



const LeadsContact = ({ setAddClient , setEditLeadData }: { setAddClient: (open: boolean) => void , setEditLeadData: any}) => {
    const [tabOption, setTabOption] = useState("services")
    const navigate = useNavigate();
    const { data: allLeads, refetch } = useGetAllLeadContactQuery(undefined);
    const [updateLeadStatus] = useUpdateLeadStatusMutation();
    const [deleteLeadContact] = useDeleteLeadContactMutation();

    const data = allLeads?.map((lead: any) => ({
        key: lead._id,
        lead_name: lead?.name,
        address: lead?.address,
        phone: lead?.phone,
        gender: lead?.gender,
        lead_email: lead?.lead_email,
        createdAt: moment(lead?.createdAt).fromNow(),
        status: lead?.active,
        id: lead?._id
    }));


    const activeClients = allLeads
        ?.filter((item: any) => item?.active)
        ?.map((lead: any) => ({
            key: lead._id,
            lead_name: lead?.name            ,
            address: lead?.address,
            phone: lead?.phone,
            gender: lead?.gender,
            lead_email: lead?.lead_email,
            createdAt: moment(lead?.createdAt).fromNow(),
            status: lead?.active,
            id: lead?._id
        }));

    const inactiveClients = allLeads
        ?.filter((item: any) => !item?.active)
        ?.map((lead: any) => ({
            key: lead._id,
            lead_name: lead?.name,
            address: lead?.address,
            phone: lead?.phone,
            gender: lead?.gender,
            lead_email: lead?.lead_email,
            createdAt: moment(lead?.createdAt).fromNow(),
            status: lead?.active,
            id: lead?._id
        }));

    const getCurrentData = () => {
        if (tabOption === "active") return activeClients;
        if (tabOption === "inactive") return inactiveClients;
        return data || [];
    };

    const items = [
        {
            key: "services",
            label: (
                <div className="flex items-center gap-1">
                    <p className="text-[18px] font-semibold">All Clients</p>
                    <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">
                        {allLeads?.length || 0}
                    </p>
                </div>
            ),
        },
        {
            key: "active",
            label: (
                <div className="flex items-center gap-1">
                    <p className="text-[18px] font-semibold">Active Clients</p>
                    <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">
                        {activeClients?.length || 0}
                    </p>
                </div>
            ),
        },
        {
            key: "inactive",
            label: (
                <div className="flex items-center gap-1">
                    <p className="text-[18px] font-semibold">Inactive Clients</p>
                    <p className="text-primaryText bg-[#FFC1C0] w-[25px] h-[25px] flex items-center justify-center rounded-full font-medium">
                        {inactiveClients?.length || 0}
                    </p>
                </div>
            ),
        },
    ];

    const onChange = (key: string) => {
        setTabOption(key)
    };


    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then(async (result) => {

            if (result.isConfirmed) {
                await deleteLeadContact(id).then((res) => {
                    if (res?.data) {
                        Swal.fire({
                            text: res?.data?.message,
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                        }).then(() => {
                            refetch();
                        });
                    } else {
                        Swal.fire({
                            //@ts-ignore
                            text: res?.error?.data?.message,
                            icon: "error",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    }
                })
            }
        });

    }

    const columns = [
        { title: 'Lead Name', dataIndex: 'lead_name', key: 'lead_name' },
        { title: 'Email', dataIndex: 'lead_email', key: 'lead_email' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <div className="flex items-center gap-4">
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#AB0906',
                            },
                        }}
                    >
                        <Switch defaultValue={record?.status} onChange={(value) => handleStatusChange(value, record?.id)} />
                    </ConfigProvider>

                    <FaRegEye size={22} color="#575555" onClick={() =>navigate(`/contact/leads-details?id=${record?.id}`) } className=" cursor-pointer" />
                    <TbEdit size={22} color="#575555" className=" cursor-pointer" onClick={() =>{ setAddClient(true) , setEditLeadData(record)}} />
                    <button className="" onClick={() => handleDelete(record?.id)} >
                        <Trash2 className="h-5 w-5 text-[#FE3838]" />
                    </button>
                </div>
            ),
        },
    ];


    const handleStatusChange = async (value: any, id: string) => {
        const data = {
            active: value,
            id
        }
        await updateLeadStatus(data).then((res) => {
            if (res?.data) {
                Swal.fire({
                    text: res?.data?.message,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    refetch();
                });
            } else {
                Swal.fire({
                    //@ts-ignore
                    text: res?.error?.data?.message,
                    icon: "error",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        })
    }


    return (
        <div>

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

                    <Tabs defaultActiveKey="services" items={items} onChange={onChange} />
                </ConfigProvider>
            </div>

            <div>

                <div>
                    <div className="mx-auto bg-white rounded-lg shadow-sm">
                        {getCurrentData().length > 0 ?

                            <ConfigProvider
                                theme={{
                                    components: {
                                        Pagination: {
                                            itemActiveBg: "#6C57EC",
                                            borderRadius: 100
                                        }
                                    },
                                    token: {
                                        colorPrimary: "white"
                                    }
                                }}
                            >
                                <Table columns={columns} dataSource={getCurrentData()} className="border rounded-lg" />
                            </ConfigProvider> : <div className="py-8 flex justify-center items-center">
                                <Empty
                                    image={noData}
                                    imageStyle={{ width: 150, height: 150, marginLeft: 65 }}
                                    description={
                                        <div className="flex flex-col items-center gap-1 text-center">
                                            <p className="text-primaryText font-semibold text-[22px]">
                                                You don't have any Leads yet
                                            </p>

                                        </div>
                                    }
                                />
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadsContact;