import axios from "axios";
import {BACKEND_URL} from "../constants";

const updateStaff=async (object,token)=>{

    try{
        const result =await axios.put(`${BACKEND_URL}/hmsapi/staff/`,
        {
            staffId: object.staffId,
            name:object.name,
            role:object.role,
            departments:object.departments.length>0 ? [object.departments[0].departmentId]:[],
            password:"xxx"
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

export default updateStaff;