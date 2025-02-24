import { ConfigProvider, Menu } from 'antd';
import  {  useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import logo from "../../assets/logo.svg";
import { BsBoxSeam, BsCalendarPlus } from 'react-icons/bs';
import { FaHouseChimney } from 'react-icons/fa6';
import { RxCalendar } from 'react-icons/rx';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { RiUserStarFill } from 'react-icons/ri';
import { TbReportSearch } from 'react-icons/tb';


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
            icon: <FaHouseChimney size={24} />,
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
                    label: <Link to="/appointment">1-1 Appointment</Link>
                },
            
            ]
        },
        {
            key: "/contact",
            icon: <RiUserStarFill size={24} />,
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
            key: "/logout",
            icon: <IoIosLogOut size={24} />,
            label: <p onClick={handleLogout}>Logout</p>
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
          

            <img src={logo} alt="" className=' h-[116px]    ' />
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