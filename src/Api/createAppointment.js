import axios from "axios";
import {BACKEND_URL} from "../constants";

const createAppointment=async (patientId,departmentId,startDate,doctorId,comment,token)=>{
    try{
        const month=(startDate.getMonth()+1).toString();
        const date= startDate.getDate().toString();
        const fullDate=startDate.getFullYear()+"-"+(month.length===1?"0"+month:month)+"-"+(date.length===1?"0"+date:date);
        console.log(fullDate);
        const result =await axios.post(`${BACKEND_URL}/hmsapi/appointments/`,
        {
            patientId:patientId,
            doctorId:doctorId,
            departmentId:departmentId,
            date:fullDate,
            comments:comment
        },
        {
            headers:{'Authorization': `Bearer ${token}`}
        })
         return {result:true,data:result.data}
    }
    catch(e){
        console.log(e.response)
        return {result:false,error:e.response.data.message || e.response.data.error};
    }
}

export default createAppointment;