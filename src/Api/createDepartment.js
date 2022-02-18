import axios from "axios";
import {BACKEND_URL} from "../constants";

const createDepartment=async (department,token)=>{
    try{
        const result =await axios.post(`${BACKEND_URL}/hmsapi/departments/`,
        {
            name:department
        },
        {
            headers:{'Authorization': `Bearer ${token}`}
        })
         return {result:true,data:result.data}
    }
    catch(e){
        return {result:false,error:e.response.data.message || e.response.data.error};
    }
}

export default createDepartment;