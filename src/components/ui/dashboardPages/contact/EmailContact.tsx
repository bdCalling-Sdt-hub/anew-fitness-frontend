import { Form, Input, Select } from "antd";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
const EmailContact = () => {
    const navigate = useNavigate()
    return (
        <div className=" px-[50px] pt-[30px]">
            <h1 className="flex items-center gap-2 mb-5"> <span><RiArrowLeftLine color='#ab0906' size={30} onClick={() => navigate(-1)} />  </span> <span className="text-[30px] font-bold text-primary">Contacts </span></h1>

            <div className=" flex items-center justify-center py-7 w-full border border-[#D8D8D8] rounded-lg mb-10 ">
                <div className=" w-2/3 flex flex-col gap-y-1">
                    <p className=" text-[40px] font-bold"> Send To  </p>
                    <p className="text-[22px] font-medium tracking-wider ">Who are you sending this email to? </p>
                    <div className=" flex items-center gap-5 pt-2">
                        <p className=" text-[22px] font-medium "> Created at </p>
                        <Select
                            className=""
                            defaultValue={'all'}

                            style={{ height: '45px', width: '40%' }}
                            options={[
                                { value: 'all', label: 'All' },
                                { value: '1 week', label: '1 Week' },
                                { value: '1 month', label: '1 Month' },
                                { value: '1 year', label: '1 year' },
                            ]}
                        />
                    </div>
                </div>
            </div>

            <div className=" flex items-center justify-center py-7 w-full border border-[#D8D8D8] rounded-lg  ">
                <Form className=" w-2/3 flex flex-col gap-y-1 " >
                    <Form.Item name="subject" label={<p className=" text-primaryText text-[22px] font-medium pe-5"> Subject </p>}>
                        <Input className=" rounded-lg " style={{ height: '50px', width: '100%' }} placeholder="Enter Subject" />
                    </Form.Item>

                    <Form.Item name="message" label={<p className=" text-primaryText text-[22px] font-medium pe-3"> Message </p>}>
                        <TextArea rows={8} className=" rounded-lg " style={{  width: '100%' , resize:  "none" }} placeholder="Enter Message" />
                    </Form.Item>
                </Form>
            </div>  
            
            <div className="flex justify-end gap-6 mt-5 ">
            <button className='text-[22px] text-[#808080] font-semibold' onClick={()=>navigate(-1)}>Cancel</button>
            <button  style={{ 
                height: '50px',
            }} className="bg-primary rounded-lg text-white text-[22px] px-7 font-semibold">Save</button>
          </div>
        </div>
    );
};

export default EmailContact;