
import { Outlet } from 'react-router-dom';
import backgroundImage from '../../../assets/loginbg.svg'; 
import logo from '../../../assets/logo.svg';

const Auth = () => {
    return (
        <div
    
    > 

<div className="flex items-center justify-center w-full min-h-screen">
            {/* Background Image Section - 60% */}
            <div 
                className="w-3/5 min-h-screen"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            ></div>

            {/* Form Section - 40% */}
            <div
                className="w-2/5 bg-white  rounded-lg flex items-start font-josefin "
                style={{ zIndex: 2 }}
            > 

            <div className='border border-primary px-[50px] py-[40px] rounded-lg font-josefin w-[550px]'>  
                <div className=' flex items-center justify-center'> 
                   <img src={logo} alt="" className='' /> 
                </div>
            <Outlet />
            </div>
               
            </div>
        </div>
        
     
    </div>
    
    );
};

export default Auth;