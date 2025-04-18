
import moment from 'moment';
import { useNotificationQuery } from '../../redux/features/notification/notificationApi';

const Notification = () => { 
 const {data:notifications} = useNotificationQuery(undefined) 
 console.log(notifications);
    return (
        <div className="">
            <div className="bg-white p-5 rounded-xl">
                <div className="flex items-center justify-between my-4">
                    <div>
                        <h1 className="text-[30px] font-bold text-primary">Notification</h1>
                    </div>
                </div>
                <div>
                    {notifications?.data?.map((item: any, index: number) => {
                        return (
                            <div key={index} className="w-full mx-auto p-4 my-4   min-h-14  shadow-md border border-primary rounded-sm">
                                <div className=" text-sm ">
                                    <div className="flex items-center justify-between gap-5">
                                        <p className="font-semibold text-[#555555]">{item.message}</p>
                                        <div className="flex justify-between items-center gap-5 text-[#A7A7A7]">
                                            <span className="text-xs ">{moment(item.createdAt).format('MM/DD/YYYY')}</span>
                                            <span className="text-xs ">{moment(item.createdAt).format('hh:mm A')}</span>
                                        </div>
                                    </div>

                                
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Notification;
