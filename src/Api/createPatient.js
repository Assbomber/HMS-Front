import axios from "axios";
import {BACKEND_URL} from "../constants";

const createPatient=async (object,token)=>{
    try{
        const result =await axios.post(`${BACKEND_URL}/hmsapi/patients/`,
        {
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
        return {result:false,error:e.response.data.message || e.response.data.error};
    }
}

export default createPatient;