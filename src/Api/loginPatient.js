import axios from "axios";
import {BACKEND_URL} from "../constants";
const patientExists=async (id,mobile)=>{
    try{
        const result=await axios.get(`${BACKEND_URL}/hmsapi/patients/open/${id}/${mobile}`);
        console.log("THE OTP IS: "+result.data.otp);
        return {result:true,data:result.data};
    }catch(e){
        return {result:false, error:e.response.data.message || e.response.data.error};
    }
}

const verifyPatientOtp=async (id,mobile,otp)=>{
    try{
        const result=await  axios.get(`${BACKEND_URL}/hmsapi/patients/open/${id}/${mobile}/${otp}`);
        return {result:true,data:result.data};
    }catch(e){
        // console.log(e.response)
        return {result:false, error:e.response.data.message || e.response.data.error};
    }
}

export {patientExists,verifyPatientOtp};