import {FETCH_PATIENT,FETCH_PATIENT_ERROR, FETCH_PATIENT_SUCCESS} from "../constants";


function fetchPatient(){
    return {
        type: FETCH_PATIENT,
    }
}

function fetchPatientError(error){
    return {
        type: FETCH_PATIENT_ERROR,
        payload: error
    }
}

function fetchPatientSuccess(success){
    return {
        type: FETCH_PATIENT_SUCCESS,
        payload:success
    }
}


export {fetchPatient,fetchPatientError,fetchPatientSuccess};