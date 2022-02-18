import {FETCH_STAFF,FETCH_STAFF_ERROR, FETCH_STAFF_SUCCESS,RESET} from "../constants";

const initialState={
    loading: false,
    staff:null,
    error:null
}

const staffReducer=(state=initialState,action)=>{
    switch (action.type){
        case FETCH_STAFF: return {
            ...state,
            loading:true,
        }
        case FETCH_STAFF_ERROR: return {
            ...state,
            error:action.payload,
            loading:false
        }
        case FETCH_STAFF_SUCCESS: return {
            ...state,
            staff:action.payload,
            loading:false
        }
        case RESET:return {
            loading:false,
            staff:null,
            error:null
        }
        default: return state;
    }
}

export default staffReducer;