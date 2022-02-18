import {BACKEND_URL} from "../constants";
import axios from "axios";


const uploadPrescription=async (file,id,token)=>{
    const formData=new FormData();
    formData.append("file",file)
    try{
        const result=await axios.put(`${BACKEND_URL}/hmsapi/appointments/${id}`,formData,
        {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+token 
          }
        });
        console.log(result);
        return {result:true,data:result.data}
    }catch(e){
        return {result:false,error:e.response.data.message || e.response.data.error}
    }
}

export default  uploadPrescription;