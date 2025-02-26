import { Button, ConfigProvider, Dropdown, Empty, MenuProps, Table } from "antd";
import { MoreHorizontal } from "lucide-react";
import { LuPlus } from "react-icons/lu";
import noData from "../../../../assets/noData.png"
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useState } from "react";
import AddStaffModal from "../appointment/StaffAvailable/AddStaffModal";
import { useNavigate } from "react-router-dom";


const data = [
    { name: 'Mithila', roles: ['Instructor'], access: true, created: '02-feb-2025' },
    { name: 'Mina', roles: ['Instructor'], access: true, created: '02-feb-2025' },
    { name: 'Asad', roles: ['Sales'], access: false, created: '02-feb-2025' },
    { name: 'Sarah', roles: ['Owner', 'Instructor'], access: false, created: '02-feb-2025' },
];
const StaffManagement = () => { 
    const [staff , setStaff]= useState(false) 
    const navigate = useNavigate();

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles: string[]) => <div className="flex gap-2">
                {roles.map((role, index) => <div key={index} className=" text-primaryText border border-[#00721E] rounded-lg px-2 py-1 text-lg font-medium">{role}

                </div>)}</div>
        },
        {
            title: 'Access',
            dataIndex: 'access',
            key: 'access',
            render: (access: boolean) => <div> {access ? <IoMdCheckmarkCircleOutline size={24} color="#AB0906" /> : <IoMdCheckmarkCircleOutline size={24} color="#D8D8D8" />}</div>,
        },
        {
            title: 'Created',
            dataIndex: 'created',
            key: 'created',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <Dropdown menu={{ items, className: "custom-dropdown-width" }} trigger={['click']} >
                    <Button type="text" icon={<MoreHorizontal className="w-5 h-5" />} />
                </Dropdown>
            ),
        },
    ];

    const items: MenuProps['items'] = [
        { key: '1', label: <div className='font-medium tracking-wide ' onClick={() => setStaff(true)} > Edit </div> },
        { key: '2', label: 'Delete' },
    ];

    return (
        <div className=" pt-[30px]">
            <div className="flex justify-end items-center gap-7">
                <button className=" border border-primary text-primaryText text-[18px] font-semibold px-6 h-[45px] rounded-lg flex items-center gap-2 " onClick={() => setStaff(true)} >
                    <span> <LuPlus size={22} />  </span>
                    <span> Add New Staff </span>
                </button>

                <button className=" flex items-center justify-center gap-2 bg-primary text-white w-auto h-[45px] p-2 px-5 rounded-lg" 
                onClick={() => navigate("/role-management")} >
                    <span> <LuPlus size={22} />  </span>
                    <span className="">Add Management Role </span>
                </button>
            </div>

            <div className="mx-auto bg-white rounded-lg shadow-sm mt-10">
                {data.length > 0 ?
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
                        <Table columns={columns} dataSource={data} className="border rounded-lg" />
                    </ConfigProvider> : <div className="py-8 flex justify-center items-center">
                        <Empty
                            image={noData}
                            imageStyle={{ width: 150, height: 150, marginLeft: 65 }}
                            description={
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <p className="text-primaryText font-semibold text-[22px]">
                                        You don't have any Location yet
                                    </p>
                                </div>
                            }
                        />
                    </div>}
            </div> 
            <AddStaffModal openStaff={staff} setOpenStaff={setStaff} />
        </div>
    );
};

export default StaffManagement;