import { ConfigProvider, Menu } from 'antd';
import  {  useState } from 'react';
import { MdOutlineCategory } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiUserGroup } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "../../assets/logo.svg";
import { AiOutlineSafety } from 'react-icons/ai';
import { BsPatchQuestion } from 'react-icons/bs';
import { FaHouseChimney } from 'react-icons/fa6';
import { RxCalendar } from 'react-icons/rx';


const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState(location.pathname);


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
            key: "/users",
            icon: <HiUserGroup size={24} />,
            label: <Link to="/users">Users</Link>
        },
        {
            key: "/faqs",
            icon: <BsPatchQuestion size={24} />,
            label: <Link to="/faqs">FAQ</Link>
        },
        { 
            key: "/terms",  
            icon: <AiOutlineSafety size={24} />,
            label: <Link to="/terms" className="text-[#1E1E1E] hover:text-[#1E1E1E]">Terms And Condition</Link>
        },
   
        {
            key: "subMenuSetting",
            icon: <IoSettingsOutline size={24} />,
            label:<Link to="/profile" className="text-[#1E1E1E] hover:text-[#1E1E1E]">Settings</Link>,
          
        },
        {
            key: "/logout",
            icon: <IoIosLogOut size={24} />,
            label: <p onClick={handleLogout}>Logout</p>
        },
    ];





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
                onClick={(e) => setSelectedKey(e.key)}
                style={{ borderRightColor: "transparent", background: "transparent" , color: "white"}} 
                items={menuItems}
            /> 
            </ConfigProvider>
        </div>
    )
}

export default Sidebar;