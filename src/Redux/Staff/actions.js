import {FETCH_STAFF,FETCH_STAFF_ERROR, FETCH_STAFF_SUCCESS,RESET} from "../constants";


function fetchStaff(){
    return {
        type: FETCH_STAFF,
    }
}

function fetchStaffError(error){
    return {
        type: FETCH_STAFF_ERROR,
        payload: error
    }
}

function fetchStaffSuccess(success){
    return {
        type: FETCH_STAFF_SUCCESS,
        payload:success
    }
}

function resetStaff(){
    return {
        type:RESET
    }
}

export {fetchStaff,fetchStaffError,fetchStaffSuccess,resetStaff};