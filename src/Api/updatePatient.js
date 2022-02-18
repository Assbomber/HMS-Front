import axios from "axios";
import {BACKEND_URL} from "../constants";

const updatePatient=async (object,token)=>{
    try{
        const result =await axios.put(`${BACKEND_URL}/hmsapi/patients/`,
        {
            patientId: object.patientId,
            name:object.name,
            age:object.age,
            gender:object.gender,
            mobile:object.mobile,
            address:object.address
        },
        {
            headers:{'Authorization': `Bearer ${token}`}
        })
         return {result:true,data:result.data}
    }
    catch(e){
        if(e.response.status===403) return {result:false,error:"Only Admins are allowed for this request"};
        return {result:false,error:e.response.data.message || e.response.data.error};
    }
}

export default updatePatient;