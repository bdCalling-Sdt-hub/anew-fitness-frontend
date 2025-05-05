// @ts-nocheck
import { ConfigProvider, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosLogOut, IoMdSettings } from "react-icons/io";
import logo from "../../assets/logo.svg";
import { BsBoxSeam, BsCalendarPlus } from 'react-icons/bs';
import { FaLocationDot, FaUsers } from 'react-icons/fa6';
import { RxCalendar } from 'react-icons/rx';
import { LiaChalkboardTeacherSolid, LiaMoneyCheckAltSolid } from 'react-icons/lia';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { TbReportMoney, TbReportSearch, TbUserShare } from 'react-icons/tb';
import { GrMoney } from 'react-icons/gr';
import { MdNotificationsActive } from 'react-icons/md';
import { IoHomeOutline } from 'react-icons/io5';
import { PiInvoice } from 'react-icons/pi';
import { GetLocalStorage } from '../../utils/LocalStroage';
import { useGetStaffProfileQuery } from '../../redux/features/auth/authApi';


const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState("");
    const [openKeys, setOpenKeys] = useState([]);
    const role = GetLocalStorage("role");
    const { data: staffProfile } = useGetStaffProfileQuery(undefined); 
    const [control, setControl] = useState();

    useEffect(() => {
        if (role !== "admin" && staffProfile?.accessControls) {
            setControl(staffProfile.accessControls);
        }
    }, [role, staffProfile]);

    const handleLogout = () => {     

                    navigate("/auth/login")  
                    localStorage.removeItem("accessToken") 


    }

    const menuItems = [
        {
            key: "home",
            icon: <IoHomeOutline size={24} />,
            label: <Link to="/" className='' >Home</Link>
        },
        {
            key: "calendar",
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
            key: "invoice",
            icon: <PiInvoice size={24} />,
            label: <Link to="/invoice"> Invoice </Link>
        },
        {
            key: "contact",
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
            key: "payroll-reporting",
            icon: <LiaMoneyCheckAltSolid size={24} />,
            label: <Link to="/payroll-reporting">Payroll Reporting</Link>,
            children: [
                {
                    key: "/payment-overview",
                    icon: <GrMoney size={24} />,
                    label: <Link to="/payment-overview">Payment Overview</Link>
                },
                {
                    key: "/create-payment-reports",
                    icon: <TbReportMoney size={22} />,
                    label: <Link to="/create-payment-reports">Payment Reports</Link>
                },

            ]
        },
        {
            key: "settings",
            icon: <IoMdSettings size={24} />,
            label: <Link to="/general-settings">Settings</Link>,
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
            key: "logout",
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
 
    const alwaysVisibleKeys = ["home", "logout"]; 

    const filteredMenuItems = menuItems.filter(item => {
        // Always include home and logout
        if (alwaysVisibleKeys.includes(item.key)) return true;
    
        // If role is admin, include everything
        if (role === "admin") return true;
    
        // If access control is defined
        if (control?.length) {
            // Check if item's key is allowed
            if (control.includes(item.key)) return true;
    
            // Check if any of its children keys are allowed
            if (item.children) {
                const allowedChildren = item.children.filter(child => control.includes(child.key));
                if (allowedChildren.length > 0) {
                    item.children = allowedChildren;
                    return true;
                }
            }
        }
    
        return false;
    });

    return (
        <div className=''>
            <div className=' flex items-center justify-center my-[40px] ' onClick={() => navigate("/")}>


                <img src={logo} alt="" className=' h-[100px]    ' />
            </div>
            <p className=' border-t-[1px] border-primary pb-[25px]' />

            <ConfigProvider
                theme={{
                    token: {
                        colorText: '#1E1E1E',

                    },
                    components: {
                        Menu: {
                            itemBorderRadius: '0px' as any,
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
                    onSelect={({ key }) => setSelectedKey(key)}
                    style={{ borderRightColor: "transparent", }}
                    items={filteredMenuItems}
                />
            </ConfigProvider>
        </div>
    )
}

export default Sidebar;