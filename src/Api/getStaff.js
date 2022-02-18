import {BACKEND_URL} from "../constants";
import {fetchStaff,fetchStaffError,fetchStaffSuccess} from "../Redux/Staff/actions";
import axios from "axios";

const getStaff=  (id,token)=>{
    // console.log("id:"+id);
    return  async (dispatch)=>{
        dispatch(fetchStaff());
        try{
            const result =await axios.get(`${BACKEND_URL}/hmsapi/staff/${id}`,
                {
                    headers:{'Authorization': `Bearer ${token}`}
                });
                dispatch(fetchStaffSuccess(result.data));
        }catch(e){
                dispatch(fetchStaffError(e.response.data.error || e.response.data.message));
        }
    }
}

export default getStaff;