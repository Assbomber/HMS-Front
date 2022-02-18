import {BACKEND_URL} from "../constants";
import axios from "axios";

const deletePatient=  async (id,token)=>{
        try{
            const result =await axios.delete(`${BACKEND_URL}/hmsapi/patients/${id}`,
                {
                    headers:{'Authorization': `Bearer ${token}`}
                });
                return {result:true,data:result.data}
        }catch(e){
                if(e.response.status===403) return {result:false,error:"Only Admins are allowed for this request"};
                return {result:false,error:e.response.data.error || e.response.data.message}
        }
}

export default deletePatient;