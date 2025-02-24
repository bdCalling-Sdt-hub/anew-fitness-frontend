import { Trash2 } from "lucide-react";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { HiPlus } from "react-icons/hi2";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const data = [
  { id: 1, name: "Mithila" },
  { id: 2, name: "Amit" },
];

const StaffAvailablePage = ({setOpenStaff}:{setOpenStaff:(isOpen: boolean)=>void}) => {
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({}); 
  const navigate = useNavigate();

  const toggleItem = (id: number) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full">
      {data.map((item) => {
        const isOpen = openItems[item.id] || false;
        return (
          <div key={item.id} className="rounded-lg border border-gray-200 bg-white mb-4 w-full">
            {/* Header Section */}
            <div className="px-[35px] py-7 flex justify-between items-center">
              <div>
                <h3 className="text-[22px] font-bold text-primaryText pb-2">{item?.name}</h3>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleItem(item.id)}>
                  <span className="text-[#FE3838] text-[22px] font-bold">
                    Availability Not Set
                  </span>
                  {isOpen ? <FaChevronUp size={22} color="#FE3838" />   : <FaChevronDown size={22} color="#FE3838" /> }
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full" onClick={()=>setOpenStaff(true)}>
                    <TbEdit size={26} color="#575555"  /> 
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Trash2 className="h-6 w-6 text-[#FE3838]" />
                </button>
              </div>
            </div>

            {/* Expanded Content */}
            {isOpen && (
              <div className="px-6 py-4 border-t border-gray-200 bg-[#f8fafc]">
                <div className="mb-4">
                  <h4 className="text-[18px] font-medium text-primaryText mb-[2px]">Availability</h4>
                  <p className="text-[18px] font-medium  text-primaryText">
                    Client can't book appointments with this staff unless you add some available times.
                  </p>
                </div>
                <button className="flex items-center gap-2 text-primary "  onClick={()=> navigate("/appointment/add-availability")}>
                  <HiPlus size={22} color="#ab0906" />
                  <span className=" font-bold text-[22px]">Add Availability</span>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StaffAvailablePage;
