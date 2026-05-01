import { CheckCircle, Eye, Flag } from "lucide-react";
import { useState } from "react";
import { dummyData } from "../adminSettings/page";
import { MobileReportCard } from "../adminSettings/page";
import { AnimatePresence,motion } from "framer-motion";
export default function AdminFlagged() {
  const [selected, setSelected] = useState("Pending");
  const [selectedFlag,setSelectedFlag]=useState(undefined)
  const errandsList=dummyData.filter((data)=>data.type==="Errand" && data.status===selected)
  const usersList=dummyData.filter((data)=>data.type==="User Profile" && data.status===selected)
  console.log(errandsList,usersList)
  return (
    <div className="max-w-full mt-8 px-12">
      <div className="flex w-fit items-center gap-1 rounded-lg bg-gray-100 p-1.5 shadow-inner">
        <button onClick={()=>{setSelected("Pending")}} className={`flex items-center gap-2 rounded-md ${selected==="Pending"?"bg-white shadow-sm ":"bg-none "} px-4 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-50`}>
          <Flag className={`h-4 w-4 ${selected==="Pending"?"text-red-500":"text-gray-500"}`}/>
          <span>Pending</span>
          <span className={`ml-1 rounded-full px-2 py-0.5  ${selected==="Pending"?"text-red-600 text-xs bg-red-100 ":"text-gray-400"}`}>
            {dummyData.filter((data)=>data.status==="Pending").length}
          </span>
        </button>
                <button onClick={()=>{setSelected("Under Review")}} className={`flex items-center gap-2 rounded-md ${selected==="Under Review"?"bg-white shadow-sm ":"bg-none "} px-4 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-50`}>
           <Eye className={`h-4 w-4 ${selected==="Under Review"?"text-amber-600":"text-gray-500"}`}/>
          <span>Under Review</span>
                    <span className={`ml-1 rounded-full px-2 py-0.5  ${selected==="Under Review"?"text-amber-600 text-xs bg-amber-300/20 ":"text-gray-400"}`}>
             {dummyData.filter((data)=>data.status==="Under Review").length}
          </span>
        </button>
        <button onClick={()=>{setSelected("Completed")}} className={`flex items-center gap-2 rounded-md ${selected==="Completed"?"bg-white shadow-sm ":"bg-none "} px-4 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-50`}>
           <CheckCircle className={`h-4 w-4 ${selected==="Completed"?"text-green-600":"text-gray-500"}`}/>
          <span>Completed</span>
                              <span className={`ml-1 rounded-full px-2 py-0.5  ${selected==="Completed"?"text-green-600 text-xs bg-green-300/20 ":"text-gray-400"}`}>
             {dummyData.filter((data)=>data.status==="Completed").length}
          </span>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white space-y-4 shadow-lg w-full p-6 h-[calc(100vh-12rem)] rounded-xl overflow-scroll overflow-x-hidden over">
            <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"/>
            <p className="text-xl font-medium">Users Flagged ({usersList.length})</p>
            </div>
            {usersList.map((card,i)=><MobileReportCard onClick={()=>{console.log("s")}} key={i} card={card}/>)}
        </div>
        
        {selectedFlag&&
        <AnimatePresence>
         <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}} className="bg-white space-y-4 shadow-lg w-full p-6 h-[calc(100vh-12rem)] rounded-xl overflow-scroll overflow-x-hidden over">
        </motion.div>
        </AnimatePresence>}
      </div>
    </div>
  );
}
