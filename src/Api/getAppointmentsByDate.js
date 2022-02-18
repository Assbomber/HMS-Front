import {BACKEND_URL} from "../constants";
import axios from "axios";

const getAppointmentsByDate=  async (startDate,endDate,token)=>{
    const smonth=(startDate.getMonth()+1).toString();
    const sdate= startDate.getDate().toString();
    const sDate=startDate.getFullYear()+"-"+(smonth.length===1?"0"+smonth:smonth)+"-"+(sdate.length===1?"0"+sdate:sdate);

    const emonth=(endDate.getMonth()+1).toString();
    const edate= endDate.getDate().toString();
    const eDate=endDate.getFullYear()+"-"+(emonth.length===1?"0"+emonth:emonth)+"-"+(edate.length===1?"0"+edate:edate);
        try{
            const result =await axios.get(`${BACKEND_URL}/hmsapi/appointments/?start=${sDate}&end=${eDate}`,
                {
                    headers:{'Authorization': `Bearer ${token}`}
                });
            return {result:true,data:result.data}
        }catch(e){
            return {result:false,error:e.response.data.message || e.response.data.error}
        }
}

export default getAppointmentsByDate;