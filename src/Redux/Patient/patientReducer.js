import {FETCH_PATIENT,FETCH_PATIENT_ERROR, FETCH_PATIENT_SUCCESS} from "../constants";

const initialState={
    loading: false,
    patient:null,
    error:null
}

const patientReducer=(state=initialState,action)=>{
    switch (action.type){
        case FETCH_PATIENT: return {
            ...state,
            loading:true,
        }
        case FETCH_PATIENT_ERROR: return {
            ...state,
            error:action.payload,
            loading:false
        }
        case FETCH_PATIENT_SUCCESS: return {
            ...state,
            patient:action.payload,
            loading:false
        }
        default: return state;
    }
}

export default patientReducer;