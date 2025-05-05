import { ConfigProvider, Empty, Switch, Table, Tabs } from "antd";
import { TbEdit } from "react-icons/tb";
import noData from "../../../../../assets/noData.png";
import { useState } from "react";
import { useDeleteClientContactMutation, useGetAllClientContactQuery, useUpdateClientStatusMutation } from "../../../../../redux/features/contact/clientContactApi";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";



const ClientContact = ({ setAddClient, setEditClientData }: { setAddClient: (addClient: boolean) => void, setEditClientData: (editClientData: any) => void }) => {
    const [tabOption, setTabOption] = useState("services")
    const { data: allClient, refetch } = useGetAllClientContactQuery(undefined);
    const [deleteClientContact] = useDeleteClientContactMutation()
    const [updateClientStatus] = useUpdateClientStatusMutation()


    const data = allClient?.map((item: any) => ({
        key: item?._id,
        client_name: item?.name,
        address: item?.address,
        phone: item?.phone,
        gender: item?.gender,
        client_email: item?.client_email,
        status: item?.active,
        id: item?._id
    }))

    const activeClients = allClient
        ?.filter((item: any) => item?.active)
        ?.map((item: any) => ({
            key: item?._id,
            client_name: item?.name,
            address: item?.address,
            phone: item?.phone,
            gender: item?.gender,
            client_email: item?.client_email,
            status: item?.active,
            id: item?._id
        }));

    const inactiveClients = allClient
        ?.filter((item: any) => !item?.active)
        ?.map((item: any) => ({
            key: item?._id,
            client_name: item?.name,
            address: item?.address,
            phone: item?.phone,
            gender: item?.gender,
            client_email: item?.client_email,
            status: item?.active,
            id: item?._id
        }));

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
                await deleteClientContact(id).then((res) => {
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
                        {allClient?.length || 0}
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


    const columns = [
        { title: 'Client Name', dataIndex: 'client_name', key: 'client_name' },
        { title: 'Email', dataIndex: 'client_email', key: 'client_email' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Gender', dataIndex: 'gender', key: 'gender' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <div className="flex items-center gap-4">
                    <TbEdit size={22} color="#575555" onClick={() => { setAddClient(true), setEditClientData(record) }} />
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => handleDelete(record?.id)} >
                        <Trash2 className="h-5 w-5 text-[#FE3838]" />
                    </button>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#AB0906',
                            },
                        }}
                    >
                        <Switch defaultValue={record?.status} onChange={(value) => handleStatusChange(value, record?.id)} />
                    </ConfigProvider>

                </div>
            ),
        },
    ];

    const handleStatusChange = async (value: any, id: string) => {
        const data = {
            active: value,
            id
        }
        await updateClientStatus(data).then((res) => {
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
                <div className="mx-auto bg-white rounded-lg shadow-sm">
                    {getCurrentData()?.length > 0 ?

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
                                styles={{ image: { width: 150, height: 150, marginLeft: 65 } }}
                                description={
                                    <div className="flex flex-col items-center gap-1 text-center">
                                        <p className="text-primaryText font-semibold text-[22px]">
                                            You don't have any client contact yet
                                        </p>

                                    </div>
                                }
                            />
                        </div>}
                </div>
            </div>
        </div>
    );
};

export default ClientContact;