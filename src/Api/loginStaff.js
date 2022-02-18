import axios from "axios";
import {BACKEND_URL} from "../constants"


const loginStaff=async (id,password)=>{
    try{
        const result =await axios.post(`${BACKEND_URL}/login`,
        new URLSearchParams({id:id,password:password}),
        {
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        });
        return {result:true,data:result.data};
    }catch(e){
        if(e.response.status===401)
        return {result:false,message:e.response.data.error};
        else return {result:false,message:e.message};
    }
}

export default loginStaff;