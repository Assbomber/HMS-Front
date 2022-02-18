import {BACKEND_URL} from "../constants";
import axios from "axios";

const getDashboard=  async (token)=>{
        try{
            const result =await axios.get(`${BACKEND_URL}/hmsapi/admin/dashboard`,
                {
                    headers:{'Authorization': `Bearer ${token}`}
                });
            return {result:true,data:result.data}
        }catch(e){
            return {result:false,error:e.response.data.message || e.response.data.error}
        }
}

export default getDashboard;