import ServicePage from "@/services/ServicePage";
import AdminReviewBox from "../components/adminReviewBox";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function ReviewFlaggedErrand() {
  const { serviceId } = useParams();
  const [flagRecord, setFlaggedRecord] = useState(null);
  const [status,setStatus]=useState("")
  const [reason,setReason]=useState("")

  const handleDismiss = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/dismissFlag`,
    { ...flagRecord, status, reason },
    { withCredentials: true }
  );
if (res.status === 200) {
  toast.success("The report has been dismissed.");

  setTimeout(() => {
    window.location.href = "/adminSettings";
  }, 1500);
}
};

const onUpdate = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/updateFlag`,
    { ...flagRecord, status, reason },
    { withCredentials: true }
  );
  if (res.status === 200) {
    toast.success("The report has been updated.");
  }
};

const handleRemove = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/removeFlag`,
    { ...flagRecord, status, reason },
    { withCredentials: true }
  );
  if (res.status === 200) {
    toast.success("The report has been removed.");
  }
};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/getFlaggedId/` + serviceId,
          { withCredentials: true }
        );

        setFlaggedRecord(res.data.data);
      } catch (err) {
        console.log("Error fetching flag:", err);
      }
    };

    fetchData();
  }, [serviceId]);
  useEffect(()=>{
    if(flagRecord){
        setStatus(flagRecord.status)
        setReason(flagRecord.reason)
    }
  },[flagRecord])
  useEffect(() => {
    if (flagRecord) {
      console.log(flagRecord, "SD");
    }
  }, [flagRecord]);

  if (!flagRecord) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-fit">
        <ToastContainer/>
      <ServicePage />
      <AdminReviewBox reason={reason} setReason={setReason} setStatus={setStatus} status={status} onUpdate={onUpdate} handleDismiss={handleDismiss} handleRemove={handleRemove}/>
    </div>
  );
}