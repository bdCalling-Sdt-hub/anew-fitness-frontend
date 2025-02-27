// @ts-nocheck
import { ConfigProvider, Menu } from 'antd';
import  {  useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosLogOut, IoMdSettings } from "react-icons/io";
import logo from "../../assets/logo.svg";
import { BsBoxSeam, BsCalendarPlus } from 'react-icons/bs';
import {  FaLocationDot, FaUsers } from 'react-icons/fa6';
import { RxCalendar } from 'react-icons/rx';
import { LiaChalkboardTeacherSolid, LiaMoneyCheckAltSolid } from 'react-icons/lia';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { TbReportMoney, TbReportSearch, TbUserShare } from 'react-icons/tb';
import { GrMoney } from 'react-icons/gr';
import { MdNotificationsActive } from 'react-icons/md';
import { IoHomeOutline } from 'react-icons/io5';


const Sidebar = () => {
    const location = useLocation(); 
    const path = location.pathname; 
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState("");
    const [openKeys, setOpenKeys] = useState([]);


    const handleLogout=()=>{
        localStorage.removeItem("token")
        navigate("/auth/login")
    }

    const menuItems = [
        {
            key: "/",
            icon: <IoHomeOutline size={24} />,
            label: <Link to="/" className='' >Home</Link>
        },
        {
            key: "/calender",
            icon: <RxCalendar size={24} />,
            label: <Link to="/calender">Calendar </Link>
        }, 
        {
            key: "services",
            icon: <BsBoxSeam size={24} />,
            label: "Services",
            children: [
                { 
                    key: "/classes",  
                    icon: <LiaChalkboardTeacherSolid size={24} />,
                    label: <Link to="/classes">Classes</Link> 
                },
                { 
                    key: "/appointment",  
                    icon: <HiOutlineClipboardDocumentCheck size={24} />,
                    label: <Link to="/appointment">Staff Available</Link>
                },
            
            ]
        },
        {
            key: "/contact",
            icon: <TbUserShare size={24} />,
            label: <Link to="/contact">Contact </Link>
        },  
        {
            key: "reports",
            icon: <TbReportSearch size={24} />,
            label: "Reports",
            children: [
                { 
                    key: "/class-booking",  
                    icon: <LiaChalkboardTeacherSolid size={24} />,
                    label: <Link to="/class-booking">Class Bookings</Link> 
                },
                { 
                    key: "/appointment-booking",  
                    icon: <BsCalendarPlus size={22} />,
                    label: <Link to="/appointment-booking">Appointments Bookings</Link>
                },
            
            ]
        },
        {
            key: "reporting",
            icon: <LiaMoneyCheckAltSolid size={24} />,
            label: <Link to="/payroll-reporting">Payroll Reporting</Link> ,
            children: [
                { 
                    key: "/payment-overview",  
                    icon: <GrMoney size={24} />,
                    label: <Link to="/payment-overview">Payment Overview</Link> 
                },
                { 
                    key: "/payment-reports",  
                    icon: <TbReportMoney size={22} />,
                    label: <Link to="/payment-reports">Payment Reports</Link>
                },
            
            ]
        },
        {
            key: "Settings",
            icon: <IoMdSettings size={24} />,
            label: <Link to="/general-settings">Settings</Link> ,
            children: [
                { 
                    key: "/staff-management",  
                    icon: <FaUsers size={24} />,
                    label: <Link to="/staff-management">Staff Management</Link> 
                },
                { 
                    key: "/location-management",  
                    icon: <FaLocationDot size={24} />,
                    label: <Link to="/location-management">Location Management</Link> 
                },
                { 
                    key: "/notification",  
                    icon: <MdNotificationsActive size={24} />,
                    label: <Link to="/notification">Notification</Link> 
                },
            
            
            ]
        },
        
        {
            key: "/logout",
            icon: <IoIosLogOut size={24} />,
            label: <p onClick={handleLogout}>Log Out</p>
        },
    ];


    useEffect(() => {
        const selectedItem = menuItems.find(item => 
            item.key === path || item.children?.some(sub => sub.key === path)
        );

        if (selectedItem) {
            setSelectedKey(path);

            if (selectedItem.children) {
                setOpenKeys([selectedItem.key]);
            } else {
                const parentItem = menuItems.find(item => 
                    item.children?.some(sub => sub.key === path)
                );
                if (parentItem) {
                    setOpenKeys([parentItem.key]);
                }
            }
        }
    }, [path]); 

    const handleOpenChange = (keys) => {
        setOpenKeys(keys);
    }; 


    return (
        <div className=''>
            <div className=' flex items-center justify-center my-[40px] ' onClick={()=>navigate("/")}>
          

            <img src={logo} alt="" className=' h-[100px]    ' />
            </div>  
            <p className=' border-t-[1px] border-primary pb-[25px]'/>

            <ConfigProvider
            theme={{
                token: {
                 colorText: '#1E1E1E',  
                 
                },
                components: {
                    Menu: {     
                        itemBorderRadius: '0px'as any,
                        itemHeight: 54,            
                        itemSelectedColor: '#fff',
                       itemSelectedBg: '#ab0906',  
                       itemBg: '#fff', 
                       itemHoverBg: '#ab0906', 
                       itemHoverColor: '#fff',
                    },
                },
            }}
        >
            <Menu
               mode="inline"
                selectedKeys={[selectedKey]}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
                style={{ borderRightColor: "transparent", background: "transparent" , color: "white" }}
                items={menuItems}
            /> 
            </ConfigProvider>
        </div>
    )
}

export default Sidebar;