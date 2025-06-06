import { Card, Modal } from 'antd';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FiUserPlus } from 'react-icons/fi';

const AddInvoiceModal = ({ open, setOpen, setAddClient, setMultipleInvoice }: { open: boolean, setOpen: (open: boolean) => void, setAddClient: (addClient: boolean) => void, setMultipleInvoice: (multipleInvoice: boolean) => void }) => {
    return (
        <Modal open={open} onCancel={() => setOpen(false)} footer={null} width={600} centered>

        <div>
          <div className=" ">
            <div className=" mx-auto">
  
              <div className="grid md:grid-cols-1 gap-6">
                {/* Group Class Card */}
                <Card
                  hoverable
                  className="group transition-all duration-300 hover:shadow-xl py-[25px] bg-[#f8fafc]"
                  onClick={() => setAddClient(true)}
                >
                  <div className="flex flex-col items-center text-center gap-y-4">
                    <div className='flex items-center gap-2'>
                      <FiUserPlus className="w-8 h-8   group-hover:scale-110 transition-transform" />
                      <p className='text-[26px] font-bold'>Add A New Invoice</p>
                    </div>
                    <p className="text-[#000000] text-[16px]">
                      Add your invoice details to invite them.
                    </p>
                  </div>
                </Card>
  
                {/* Special Event Card */}
                <Card
                  hoverable
                  className="group transition-all duration-300 hover:shadow-xl py-[25px] bg-[#f8fafc]"
                  onClick={() => setMultipleInvoice(true)}
                >
                  <div className="flex flex-col items-center text-center  gap-y-4">
  
                    <div className='flex items-center gap-2'>
                      <AiOutlineUsergroupAdd className="w-8 h-8   group-hover:scale-110 transition-transform" />
                      <p className='text-[26px] font-bold'>Add multiple invoice at Once</p>
                    </div>
                    <p className="text-[#000000] text-[16px] text-center">
                      Upload a CSV file with your invoice list to invite them via email.
                    </p>
                  </div>
                </Card>
  
              </div>
            </div>
          </div>
        </div>
  
      </Modal>
    );
};

export default AddInvoiceModal;