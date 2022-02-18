import styled from "styled-components";
import DatePicker from 'react-date-picker';
import Error from "../Components/Error";
import {useState,useEffect} from "react";
import Loader from "../Components/Loader"
import getAppointmentsByDate from "../Api/getAppointmentsByDate"
import AppointmentCard from "../Components/AppointmentCard"
import { useTranslation } from "react-i18next";

function ViewAppointments() {
    const {t}=useTranslation();
    const [startDate,setStartDate]=useState(new Date());
    const [endDate,setEndDate]=useState(new Date());
    const [error,setError]=useState({show:false,message:""});
    const [loader,setLoader]=useState(false);
    const [filtered,setFiltered]=useState([]);
    const [appointments,setAppointments]=useState([]);

    const handleErrorClose=()=>{
        setError({show:false,message:""});
    }

    const handleSubmit=async ()=>{
        if(!startDate || !endDate){
            setError({show:true,message:"A date is mandatory"});
            return;
        }
        if(startDate>endDate){
            setError({show:true,message:"Start date cannot be greater than end date"});
            return;
        }
        setLoader(true);
        const res=await getAppointmentsByDate(startDate,endDate,localStorage.getItem("token"));
        setLoader(false);
        if(res.result){
            setAppointments(res.data);
        }else{
            setError({show:true,message:res.error})
        }
        
    }

    const handleFilter=(id)=>{
        switch(id){
            case 1: setFiltered(appointments.filter(o=>o.status === 'NEW')); break;
            case 2: setFiltered(appointments.filter(o=>o.status === 'CLOSED')); break;
            case 3: setFiltered(appointments.filter(o=>o.status === 'CANCELLED')); break;
            default: setFiltered(appointments);
        }
    }

    useEffect(()=>{
        async function firstFetch(){
            setLoader(true);
            const res=await getAppointmentsByDate(startDate,endDate,localStorage.getItem("token"));
            setLoader(false);
            if(res.result){
                setAppointments(res.data);
            }else{
                setError({show:true,message:res.error})
            }
        }
        firstFetch();
    },[])

    useEffect(()=>{
        setFiltered(appointments);
    },[appointments])
    return (
        <Container>
            {error.show && <Error handleClose={handleErrorClose} title="Error" message={error.message}/>}
            {loader && <Loader/>}
            <h2>{t('fetch_appointments_by_date')}</h2>
            <div>
                <label for="startDate">{t('start_date')} :  </label>
                <DatePicker className="datepicker" id="startDate" value={startDate} onChange={(date) => setStartDate(date)} />
                <label style={{marginLeft:"10px"}} for="endDate">{t('end_date')} :  </label>
                <DatePicker className="datepicker" id="endDate" value={endDate} onChange={(date) => setEndDate(date)} />
                <Submit onClick={()=>handleSubmit()}>{t('view_records')}</Submit>
            
                {appointments.length>0 ?
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
            </List>:<p style={{textAlign:"center",color:"grey"}}>{t('no_appointments_found_for_selected_date')}</p> }
            
            </div>
            
            
        </Container>
    )
}

export default ViewAppointments

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

