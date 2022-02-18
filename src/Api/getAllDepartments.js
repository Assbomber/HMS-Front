import {BACKEND_URL} from "../constants";
import axios from "axios";

const getAllDepartments=  async (token)=>{
        try{
            const result =await axios.get(`${BACKEND_URL}/hmsapi/departments/`,
                {
                    headers:{'Authorization': `Bearer ${token}`}
                });
            return {result:true,data:result.data}
        }catch(e){
            return {result:false,error:e.response.data.message || e.response.data.error}
        }
}

export default getAllDepartments;