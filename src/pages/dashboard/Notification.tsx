import { Button } from 'antd';
const Notification = () => { 

    return (
        <div className="">
            <div className="bg-white p-5 rounded-xl">
                <div className="flex items-center justify-between my-4">
                    <div>
                        <h1 className="text-[30px] font-bold text-primary">Notification</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            style={{
                                height: '40px',

                                borderRadius: '8px',
                                border: '2px solid #ab0906',

                                background: 'white',

                                color: '#ab0906',
                                fontWeight: '400',
                                fontSize: 14,
                            }}
                        >
                            <span>Read all</span>
                        </Button>
                    </div>
                </div>
                <div>
                    {[1, 1, 1, 1, 1].map((_item: any, index: number) => {
                        return (
                            <div key={index} className="w-full mx-auto p-4 my-4   min-h-20  shadow-md border border-primary rounded-sm">
                                <div className=" text-sm">
                                    <div className="flex items-center gap-5">
                                        <p className="font-semibold text-[#555555]">A new lesson has booked</p>
                                        <div className="flex justify-between items-center gap-5 text-[#A7A7A7]">
                                            <span className="text-xs ">04-06-2024</span>
                                            <span className="text-xs ">10:00 AM</span>
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <p className="text-sm text-[#818181]">Christopher Nolan</p>
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
