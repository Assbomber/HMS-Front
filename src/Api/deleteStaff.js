import {BACKEND_URL} from "../constants";
import axios from "axios";

const deleteStaff=  async (id,token)=>{
        try{
            const result =await axios.delete(`${BACKEND_URL}/hmsapi/staff/${id}`,
                {
                    headers:{'Authorization': `Bearer ${token}`}
                });
                return {result:true,data:result.data}
        }catch(e){
                return {result:false,error:e.response.data.error || e.response.data.message}
        }
}

export default deleteStaff;