import styled from "styled-components"
import Error from "./Error";
import {useState,useEffect} from "react";
import Loader from "../Components/Loader"
import Success from "../Components/Success";
import getSingleAppointment from "../Api/getSingleAppointment";
import AppointmentCard from "../Components/AppointmentCard";
import { useTranslation } from "react-i18next";

function SingleAppointment() {
    const {t}=useTranslation();
    const [error,setError]=useState({show:false,message:""});
    const [loader,setLoader]=useState(false);
    const [success,setSuccess]=useState({show:false,data:{}});
    const [appointmentNo,setAppointmentNo]=useState("");
    const [appointment,setAppointment]=useState(null);

    const handleSubmit=async ()=>{
        if(appointmentNo===""){
            setError({show:true,message:t('all_details_are_mandatory')})
            return
        }
        setAppointment(null)
        setLoader(true);
        const res=await getSingleAppointment(appointmentNo,localStorage.getItem("token"));
        setLoader(false)
        if(res.result){
            
           setAppointment(res.data)
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

    
    return (
        <Container>
            {error.show && <Error handleClose={handleErrorClose} title={t('error')} message={error.message}/>}
            {loader && <Loader/>}
            {success.show && <Success handleClose={handleSuccessClose} data={success.data}/>}
            <h2>{t('find_an_appointment')}</h2>
            <div>
                <input type="number" value={appointmentNo} onChange={(e)=>setAppointmentNo(e.target.value)} placeholder={t('enter_appointment_id')}/>
                <Submit onClick={handleSubmit}>{t('view_records')}</Submit>

                {appointment!==null && <AppointmentCard {...appointment}/>}
            </div>
           
            
        </Container>
    )
}

export default SingleAppointment

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


