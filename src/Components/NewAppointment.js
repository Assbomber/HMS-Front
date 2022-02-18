import styled from "styled-components"
import Error from "./Error";
import {useState,useEffect} from "react";
import Loader from "../Components/Loader"
import Success from "../Components/Success";
import getAllDepartments from "../Api/getAllDepartments";
import getStaffbyDepartment from "../Api/getStaffbyDepartment";
import DatePicker from 'react-date-picker';
import createAppointment from "../Api/createAppointment";
import { useTranslation } from "react-i18next";

function NewAppointment() {

    const {t}=useTranslation();
    const [error,setError]=useState({show:false,message:""});
    const [loader,setLoader]=useState(false);
    const [success,setSuccess]=useState({show:false,data:{}});
    const [departments,setDepartments]=useState([]);
    const [selectedDepartment,setSelectedDepartment]=useState({});
    const [doctors,setDoctors]=useState([]);
    const [selectedDoctor,setSelectedDoctor]=useState({});
    const [comment,setComment]=useState("");
    const [patientId,setPatientId]=useState("");
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() =>{
        async function func(){
            const res=await getAllDepartments(localStorage.getItem("token"));
            if(res.result){
                setDepartments(res.data);
            }else{
                setError({show:true,message:res.error})
            }
        }
        func();
    },[])

    const handleSubmit=async ()=>{
        
        if(patientId==="" || !selectedDepartment.name || !selectedDoctor.doctor || !startDate ){
            setError({show:true,message:t('all_details_are_mandatory_not_comment')});
            return;
        }
        setLoader(true);
        const res=await createAppointment(patientId, selectedDepartment.departmentId,startDate,selectedDoctor.staffId,comment,localStorage.getItem("token"));
        setLoader(false)
        if(res.result){
            // console.log(res);
           setSuccess({show:true,data:t('new_appointment_created')+": "+res.data.appointmentId});
        }else {
            // console.log(res);
            setError({show:true,message:res.error});
        }
        

    }

    const handleErrorClose=()=>{
        setError({show:false,message:""});
    }
    const handleSuccessClose=()=>{
        setSuccess({show:false,data:null});
    }

    const handleDepartmentChange=async (e)=>{
        setSelectedDepartment({departmentId:e.target.options[e.target.selectedIndex].id,name:e.target.options[e.target.selectedIndex].value});
        const res=await getStaffbyDepartment(e.target.options[e.target.selectedIndex].id,localStorage.getItem("token"));
        if(res.result){
            setDoctors(res.data);
            setSelectedDoctor(res.data[0] || {});
        } 
        else setError({show:true,message:res.error});
    }
    const handleDoctorChange=(e)=>{
        
        setSelectedDoctor({staffId:e.target.options[e.target.selectedIndex].id,doctor:e.target.options[e.target.selectedIndex].value});
        
    }
    return (
        <Container>
            {error.show && <Error handleClose={handleErrorClose} title={t('error')} message={error.message}/>}
            {loader && <Loader/>}
            {success.show && <Success handleClose={handleSuccessClose} data={success.data}/>}
            <h2>{t('create_new_appointment')}</h2>
            <div>
                <input value={patientId} onChange={(e)=>setPatientId(e.target.value)} type="number" placeholder={t('enter_patient_id')}/>
                <label htmlFor="department">{t('department')}:</label>
                <select  onChange={(e)=>handleDepartmentChange(e)} id="department">
                <option value="" disabled selected>{t('select_your_option')}</option>
                    {departments.map((o,idx)=><option key={idx} id={o.departmentId} value={o.name}>{o.name} id:{o.departmentId}</option>)}
                </select>

                <label htmlFor="specialist">{t('specialist')}: </label>
                <select  onChange={(e)=>handleDoctorChange(e)} id="specialist">
                {/* <option value="" disabled selected>{t('select_your_option')}</option> */}
                    {doctors.map((o,idx)=><option key={idx} id={o.staffId} value={o.doctor}>{o.doctor} id:{o.staffId}</option>)}
                </select>
                <label htmlFor="date">{t('date')}: </label>
                <DatePicker onCalendarClose={()=>setStartDate(startDate)} className="datepicker" minDate={new Date()} id="date" value={startDate} onChange={(date) => setStartDate(date)} />
                <textarea  value={comment} rows="3" onChange={(e)=>setComment(e.target.value)} type="text" placeholder={t('enter_comment')}/>
               
                <Submit onClick={()=>handleSubmit()}>{t('create_new_appointment')}</Submit>
            </div>
            
        </Container>
    )
}

export default NewAppointment

const Container=styled.div`
min-height:100vh;
background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,255,255,0) 0%, rgba(0,212,255,1) 100%);
    padding:20px;
    width:100%;
    h2{
        text-align:center;
    }
    &>div:last-child{
        margin:30px auto;
        max-width:500px;

        .datepicker{
            margin:10px 0;
        }
        
        &>input{
            width:100%;
            padding:10px;
            border-radius:10px;
            margin:10px 0;
            border:1px solid #018DB0;
        }
        &>select{
            width:100%;
            padding:10px;
            border-radius:10px;
        }
    }
    textarea{
        margin:10px 0;
        padding:10px;
        width:100%;
        border-radius:10px;
    }
`;

const Submit=styled.button`
    outline:none;
    border:none;
    background-color:#018DB0;
    cursor:pointer;
    width:100%;
    color:white;
    padding:15px;
    margin:10px 0;
    border-radius:10px;
    &:hover{
        transform:Scale(1.02);
        transition-duration:0.4s;
    }
`;


