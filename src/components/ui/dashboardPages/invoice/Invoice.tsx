import { ConfigProvider, Empty, Select, Table } from "antd";
import noData from "../../../../assets/noData.png";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import AddInvoiceModal from "./AddInvoiceModal";
import AddOnceInvoiceModal from "./AddOnceInvoiceModal";
import AddMultipleInvoice from "./AddMultipleInvoice";
import { PiExport } from "react-icons/pi";

const data = [
    {
        key: "1",
        invoiceID: "1-Porchcam Singapore-...",
        client: "Porchcam Singapore",
        project: "Brand Identity",
        contactName: "Feng Li",
        tasks: "Conception",
        invoiceTotal: "$2,500.00",
        invoiceNumber: "1",
        invoiceDate: "4/6/2018",
        invoiceDueDate: "4/27/2018"
    },
    {
        key: "2",
        invoiceID: "2-Porchcam Singapore-...",
        client: "Porchcam Singapore",
        project: "Brand Identity",
        contactName: "Feng Li",
        tasks: "Prototypes, Initial proposal",
        invoiceTotal: "$8,250.00",
        invoiceNumber: "2",
        invoiceDate: "4/6/2018",
        invoiceDueDate: "4/27/2018"
    },
    {
        key: "3",
        invoiceID: "4-Porchcam USA-Prototype 1",
        client: "Porchcam USA",
        project: "Docking Station",
        contactName: "Billing Contact",
        tasks: "Prototype 1",
        invoiceTotal: "$15,000.00",
        invoiceNumber: "4",
        invoiceDate: "4/6/2018",
        invoiceDueDate: "6/6/2018"
    },
    {
        key: "4",
        invoiceID: "1-Porchcam Singapore-...",
        client: "Porchcam Singapore",
        project: "Brand Identity",
        contactName: "Feng Li",
        tasks: "Conception",
        invoiceTotal: "$2,500.00",
        invoiceNumber: "1",
        invoiceDate: "4/6/2018",
        invoiceDueDate: "4/27/2018"
    },
    {
        key: "5",
        invoiceID: "2-Porchcam Singapore-...",
        client: "Porchcam Singapore",
        project: "Brand Identity",
        contactName: "Feng Li",
        tasks: "Prototypes, Initial proposal",
        invoiceTotal: "$8,250.00",
        invoiceNumber: "2",
        invoiceDate: "4/6/2018",
        invoiceDueDate: "4/27/2018"
    },
    {
        key: "6",
        invoiceID: "4-Porchcam USA-Prototype 1",
        client: "Porchcam USA",
        project: "Docking Station",
        contactName: "Billing Contact",
        tasks: "Prototype 1",
        invoiceTotal: "$15,000.00",
        invoiceNumber: "4",
        invoiceDate: "4/6/2018",
        invoiceDueDate: "6/6/2018"
    },
    {
        key: "7",
        invoiceID: "1-Porchcam Singapore-...",
        client: "Porchcam Singapore",
        project: "Brand Identity",
        contactName: "Feng Li",
        tasks: "Conception",
        invoiceTotal: "$2,500.00",
        invoiceNumber: "1",
        invoiceDate: "4/6/2018",
        invoiceDueDate: "4/27/2018"
    },
    {
        key: "8",
        invoiceID: "2-Porchcam Singapore-...",
        client: "Porchcam Singapore",
        project: "Brand Identity",
        contactName: "Feng Li",
        tasks: "Prototypes, Initial proposal",
        invoiceTotal: "$8,250.00",
        invoiceNumber: "2",
        invoiceDate: "4/6/2018",
        invoiceDueDate: "4/27/2018"
    },
];
const Invoice = () => {
    const [addClient, setAddClient] = useState(false)
    const [openInvoice, setOpenInvoice] = useState(false)
    const [multipleInvoice, setMultipleInvoice] = useState(false)

    const columns = [
        { title: 'Invoice ID', dataIndex: 'invoiceID', key: 'invoiceID' },
        { title: 'Client', dataIndex: 'client', key: 'client' },
        { title: 'Class Name', dataIndex: 'project', key: 'project' },
        { title: 'Contact Name', dataIndex: 'contactName', key: 'contactName' },
        { title: 'Services', dataIndex: 'tasks', key: 'tasks' },
        { title: 'Invoice Total $', dataIndex: 'invoiceTotal', key: 'invoiceTotal' },
        { title: 'Invoice #', dataIndex: 'invoiceNumber', key: 'invoiceNumber' },
        { title: 'Invoice Date', dataIndex: 'invoiceDate', key: 'invoiceDate' },
        { title: 'Invoice Due Date', dataIndex: 'invoiceDueDate', key: 'invoiceDueDate' },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            render: () => (
                <div>
                  <PiExport size={20} color="#ab0906" />
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
                        defaultValue={'Active'}
                        placeholder="Classes"
                        style={{ height: '40px', width: '100px' }}
                        options={[
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                        ]}
                    />

                    <button className=" flex items-center justify-center gap-4 border border-primary text-primary hover:bg-primary hover:text-white w-auto p-2 px-5 rounded-lg"> Export
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
                {data.length > 0 ? (
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