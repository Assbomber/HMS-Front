import {BACKEND_URL} from "../constants";
import axios from "axios";

const getAppointmentByDoctorIdAndDate=  async (id,startDate,token)=>{
    const month=(startDate.getMonth()+1).toString();
    const date= startDate.getDate().toString();
    const fullDate=startDate.getFullYear()+"-"+(month.length===1?"0"+month:month)+"-"+(date.length===1?"0"+date:date);
    
        try{
            const result =await axios.get(`${BACKEND_URL}/hmsapi/appointments/doctor/${id}/${fullDate}`,
                {
                    headers:{'Authorization': `Bearer ${token}`}
                });
                console.log(result);
            return {result:true,data:result.data}
        }catch(e){
            return {result:false,error:e.response.data.message || e.response.data.error}
        }
}

export default getAppointmentByDoctorIdAndDate;