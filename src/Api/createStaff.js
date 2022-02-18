import axios from "axios";
import {BACKEND_URL} from "../constants";

const createStaff=async (name,password,role,department,token)=>{
    console.log("posted",name,password,role.name,department);
    try{
        const result =await axios.post(`${BACKEND_URL}/hmsapi/staff/`,
        {
            name:name,
            password:password,
            role:role.name,
            departments:department
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

export default createStaff;