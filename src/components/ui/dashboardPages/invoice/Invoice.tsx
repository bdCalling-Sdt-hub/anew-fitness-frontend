import { ConfigProvider, Empty, Select, Table } from "antd";
import noData from "../../../../assets/noData.png";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import AddInvoiceModal from "./AddInvoiceModal";
import AddOnceInvoiceModal from "./AddOnceInvoiceModal";
import AddMultipleInvoice from "./AddMultipleInvoice";
import { PiExport } from "react-icons/pi";
import { useGetAllInvoiceQuery } from "../../../../redux/features/invoice/invoiceApi";
import moment from "moment";
import { exportToCSV } from "../../../shared/ExportToCSV";

const Invoice = () => {
    const [addClient, setAddClient] = useState(false)
    const [openInvoice, setOpenInvoice] = useState(false)
    const [multipleInvoice, setMultipleInvoice] = useState(false) 
    const [status , setStatus]= useState(true)
    const { data: allInvoice } = useGetAllInvoiceQuery(status) 

    const data = allInvoice?.map((item: any) => ({
        key: item?._id,
        invoiceID: item?.invoiceId,
        client: item?.client,
        className: item?.className,
        contactName: item?.contactName,
        services: item?.services,
        invoiceTotal: item?.invoiceTotal,
        invoiceNumber: item?.invoiceNumber,
        invoiceDate: item?.invoiceDate,
        invoiceDueDate: item?.invoiceDueDate,
        id: item?._id
    }))

    const columns = [
        { title: 'Invoice ID', dataIndex: 'invoiceID', key: 'invoiceID' },
        { title: 'Client', dataIndex: 'client', key: 'client' },
        { title: 'Class Name', dataIndex: 'className', key: 'className' },
        { title: 'Contact Name', dataIndex: 'contactName', key: 'contactName' },
        { title: 'Services', dataIndex: 'services', key: 'services' },
        { title: 'Invoice Total $', dataIndex: 'invoiceTotal', key: 'invoiceTotal' },
        { title: 'Invoice #', dataIndex: 'invoiceNumber', key: 'invoiceNumber' },
        { title: 'Invoice Date', dataIndex: 'invoiceDate', key: 'invoiceDate' , render: (invoiceDate: any) => <span>{moment(invoiceDate).format('MM/DD/YYYY')}</span>},
        { title: 'Invoice Due Date', dataIndex: 'invoiceDueDate', key: 'invoiceDueDate' , render: (invoiceDueDate: any) => <span>{moment(invoiceDueDate).format('MM/DD/YYYY')}</span> },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            render: (_:any, record:any) => (
                <div    onClick={() => {
                    if (record) {
                        exportToCSV([record], {
                            filename: "invoice-list",
                            fields: [
                                "invoiceID",
                                "client",
                                "className",
                                "contactName",
                                "services",
                                "invoiceTotal",
                                "invoiceNumber",
                                "invoiceDate",
                                "invoiceDueDate",
                            ],
                            headers: {
                                invoiceID: "invoiceId",
                                client: "clientName",
                                className: "className",
                                contactName: "contactName",
                                services: "services",
                                invoiceTotal: "invoiceTotal",
                                invoiceNumber: "invoiceNumber",
                                invoiceDate: "invoiceDate",
                                invoiceDueDate: "invoiceDueDate",
                            },
                        });
                    }
                }} >
                    <PiExport size={20} color="#ab0906"  />
                </div>
            )
        },

    ];
    return (
        <div className="p-8  relative">
            <div className="flex justify-between items-center mb-6">
                <div className='flex items-center gap-1'>

                    <h2 className="text-[30px] font-bold"> Invoice </h2>
                    {/* <p className="text-primaryText bg-[#FFC1C0] w-[30px] h-[30px] flex items-center justify-center rounded-full font-medium">{data.length}</p> */}
                </div>

                <div className="flex items-center gap-3">

                    <Select
                        className="filter-select"
                     onChange={(value) => setStatus(value)}
                        placeholder="Classes"
                        style={{ height: '40px', width: '100px' }}
                        options={[
                            { value: "true", label: 'Active' },
                            { value: "false", label: 'Inactive' },
                        ]}
                    />

                    <button
                        className="flex items-center justify-center gap-4 border border-primary text-primary hover:bg-primary hover:text-white w-auto p-2 px-5 rounded-lg"
                        onClick={() => {
                            if (data) {
                                exportToCSV(data, {
                                    filename: "invoice-list",
                                    fields: [
                                        "invoiceID",
                                        "client",
                                        "className",
                                        "contactName",
                                        "services",
                                        "invoiceTotal",
                                        "invoiceNumber",
                                        "invoiceDate",
                                        "invoiceDueDate",
                                    ],
                                    headers: {
                                        invoiceID: "invoiceId",
                                        client: "clientName",
                                        className: "className",
                                        contactName: "contactName",
                                        services: "services",
                                        invoiceTotal: "invoiceTotal",
                                        invoiceNumber: "invoiceNumber",
                                        invoiceDate: "invoiceDate",
                                        invoiceDueDate: "invoiceDueDate",
                                    },
                                });
                            }
                        }}
                    >
                        Export
                    </button>

                    <button className=" flex items-center justify-center gap-4 bg-primary text-white w-auto p-2 px-5 rounded-lg"
                        onClick={() => setOpenInvoice(true)}
                    >
                        <span className=""> New </span>
                        <span> <LuPlus size={25} />  </span>
                    </button>

                </div>


            </div>

            <div className="mx-auto bg-white rounded-lg shadow-sm">
                {data?.length > 0 ? (
                    <ConfigProvider
                        theme={{
                            components: {
                                Pagination: { itemActiveBg: "#6C57EC", borderRadius: 100 },
                            },
                            token: { colorPrimary: "white" },
                        }}
                    >
                        <Table columns={columns} dataSource={data} className="border rounded-lg" />
                    </ConfigProvider>
                ) : (
                    <div className="py-8 flex justify-center items-center">
                        <Empty
                            image={noData}
                            imageStyle={{ width: 150, height: 150, marginLeft: 65 }}
                            description={
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <p className="text-primaryText font-semibold text-[22px]">
                                        No invoices available
                                    </p>
                                </div>
                            }
                        />
                    </div>
                )}
            </div>
            <AddInvoiceModal open={openInvoice} setOpen={setOpenInvoice} setAddClient={setAddClient} setMultipleInvoice={setMultipleInvoice} />
            <AddOnceInvoiceModal open={addClient} setOpen={setAddClient} setOpenInvoice={setOpenInvoice} />
            <AddMultipleInvoice open={multipleInvoice} setOpen={setMultipleInvoice} setOpenInvoice={setOpenInvoice} />
        </div>
    );
};

export default Invoice;