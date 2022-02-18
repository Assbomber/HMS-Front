import styled from "styled-components"
import Error from "./Error";
import {useState,useEffect} from "react";
import Loader from "../Components/Loader"
import Success from "../Components/Success";
import getPatientAppointments from "../Api/getPatientAppointments";
import AppointmentCard from "../Components/AppointmentCard";
import { useTranslation } from "react-i18next";

function PatientAppointments() {
    const {t}=useTranslation();
    const [error,setError]=useState({show:false,message:""});
    const [loader,setLoader]=useState(false);
    const [success,setSuccess]=useState({show:false,data:{}});
    const [patientId,setPatientId]=useState("");
    const [appointments,setAppointments]=useState([]);
    const [filtered,setFiltered]=useState([]);



    const handleSubmit=async ()=>{
        
        if(patientId===""){
            setError({show:true,message:t('all_details_are_mandatory')});
            return;
        }
        setAppointments([])
        setLoader(true);
        const res=await getPatientAppointments(patientId,localStorage.getItem("token"));
        setLoader(false)
        if(res.result){
           setAppointments(res.data)
           if(res.data.length===0) setError({show:true,message:"No Records found"});
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

    useEffect(()=>{
        setFiltered(appointments);
    },[appointments])

    const handleFilter=(id)=>{
        switch(id){
            case 1: setFiltered(appointments.filter(o=>o.status === 'NEW')); break;
            case 2: setFiltered(appointments.filter(o=>o.status === 'CLOSED')); break;
            case 3: setFiltered(appointments.filter(o=>o.status === 'CANCELLED')); break;
            default: setFiltered(appointments);
        }
    }
    
    return (
        <Container>
            {error.show && <Error handleClose={handleErrorClose} title={t('error')} message={error.message}/>}
            {loader && <Loader/>}
            {success.show && <Success handleClose={handleSuccessClose} data={success.data}/>}
            <h2>{t('find_patient_appointments')}</h2>
            <div>
                <input type="number" value={patientId} onChange={(e)=>setPatientId(e.target.value)} placeholder={t('enter_patient_id')}/>
                <Submit onClick={handleSubmit}>{t('view_records')}</Submit>

                {appointments.length>0 &&
            <List>
                
                <Selector>
                    <h4>Filter By</h4>
                    <div>
                        <p onClick={()=>handleFilter(1)}>New</p>
                        <p onClick={()=>handleFilter(2)}>Closed</p>
                        <p onClick={()=>handleFilter(3)}>Cancelled</p>
                        <p onClick={()=>handleFilter(4)}>Show All</p>
                    </div>
                </Selector>
                {filtered.map((o,idx)=>{
                return <AppointmentCard key={o.appointmentId} {...o}/>
            })}
            </List> }
                
            </div>
           
            
        </Container>
    )
}

export default PatientAppointments

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

        
        &>input{
            width:100%;
            padding:10px;
            border-radius:10px;
            margin:10px 0;
            border:1px solid #018DB0;
        }
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

const Selector=styled.div`
    position:relative;
    width:100px;
    margin-left:auto;
    &>div{
        z-index:1000;
        display:none;
    }
    &:hover{
        &>div{
            position:absolute;
            cursor:pointer;
            display:inline-block;
            background-color:#018DB0;
            padding:10px;
            border-radius:5px;
        }
    }
    p:hover{
        color:white;
    }
`;
const List = styled.div``;


