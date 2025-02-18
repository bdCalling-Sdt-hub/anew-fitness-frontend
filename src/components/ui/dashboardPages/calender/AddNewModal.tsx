import { Card,Modal } from 'antd';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { PiCalendarHeartDuotone } from 'react-icons/pi';
import { TiGroupOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

const AddNewModal = ({modalOpen , setModalOpen , setOpen}:{modalOpen: boolean, setModalOpen: (modalOpen: boolean) => void  , setOpen: (open: boolean) => void}) => {  

  const navigate = useNavigate();
  
    return ( 
        <Modal  open={modalOpen} onCancel={() => setModalOpen(false)} footer={null} width={600} centered> 
        
        <div>
              <div className=" ">
      <div className=" mx-auto">
        
        <div className="grid md:grid-cols-1 gap-6">
          {/* Group Class Card */}
          <Card 
            hoverable 
            className="group transition-all duration-300 hover:shadow-xl py-[25px] bg-[#f8fafc]" 
            onClick={() => navigate("/create-class")}
          >
            <div className="flex flex-col items-center text-center gap-y-4"> 
                <div className='flex items-center gap-2'> 
              <TiGroupOutline  className="w-9 h-9   group-hover:scale-110 transition-transform" />
              <p className='text-[30px] font-bold'>Group Class</p>
                </div>
              <p className="text-[#000000] text-[16px]">
                A group class allows you to have multiple participants. It can be an online or in person class.
              </p>
            </div>
          </Card>

          {/* Special Event Card */}
          <Card 
            hoverable 
            className="group transition-all duration-300 hover:shadow-xl py-[25px] bg-[#f8fafc]" 
            onClick={() => navigate("/create-event")}
          >
            <div className="flex flex-col items-center text-center  gap-y-4"> 

            <div className='flex items-center gap-2'> 
              <PiCalendarHeartDuotone  className="w-9 h-9   group-hover:scale-110 transition-transform" />
              <p className='text-[30px] font-bold'>Special Event</p>
                </div>
                <p className="text-[#000000] text-[16px] text-center">
                For multiple participants, displayed on your events page
                Good for retreats, workshops, or similar.
              </p>
            </div>
          </Card> 

          {/* Special Event Card */}
          <Card 
            hoverable 
            className="group transition-all duration-300 hover:shadow-xl py-[25px] bg-[#f8fafc]"
          >
            <div className="flex flex-col items-center text-center  gap-y-4"> 

            <div className='flex items-center gap-2' onClick={() =>{ setOpen(true)}}> 
              <HiOutlineClipboardDocumentCheck  className="w-9 h-9   group-hover:scale-110 transition-transform" />
              <p className='text-[30px] font-bold'> Appointment</p>
                </div>
                {/* <p className="text-[#000000] text-[16px] text-center">
                Book a private session for personalized coaching, training, or consultation.  
                Ideal for one-on-one fitness coaching, wellness guidance, or specialized sessions.
              </p> */}
            </div>
          </Card>
        </div>
      </div>
    </div> 
        </div>  
       
        </Modal>
    );
};

export default AddNewModal;