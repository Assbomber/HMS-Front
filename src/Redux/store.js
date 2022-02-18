import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import PatientReducer from "./Patient/patientReducer";
import StaffReducer from "./Staff/staffReducer";


const store=createStore(combineReducers({
    patient:PatientReducer,
    staff:StaffReducer
}),applyMiddleware(thunk));

export default store;