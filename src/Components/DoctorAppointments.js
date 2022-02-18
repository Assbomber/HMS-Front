import AppointmentCard from "./AppointmentCard";
import styled from "styled-components";
import getAppointmentByDoctorIdAndDate from "../Api/getAppointmentByDoctorIdAndDate";
import {useState,useEffect} from "react";
import jwt_decode from "jwt-decode";
import Error from "../Components/Error"
import Loader from "../Components/Loader"
import { useTranslation } from "react-i18next";

function DoctorAppointments() {
    const {t}=useTranslation();
    const [appointments,setAppointments]=useState([]);
    const [date,setDate]=useState(new Date());
    const [filtered,setFiltered]=useState([]);
    const [error,setError]=useState({show:false,message:""})
    const [loader,setLoader]=useState(true);
    const [reloader,setReloader]=useState(false);
    useEffect(() =>{
        async function todaysAppointments(){
            const res=await getAppointmentByDoctorIdAndDate(jwt_decode(localStorage.getItem("token")).sub,date,localStorage.getItem("token"));
            setLoader(false);
            if(res.result){
                setAppointments(res.data);
            }else{
                setError({show:true,message:res.error})
            }
        }
        todaysAppointments();
    },[reloader])

    useEffect(()=>{
        setFiltered(appointments);
    },[appointments])

    const handleErrorClose=()=>{
        setError({show:false,message:""});
    }

    const handleReload=()=>{
        console.log("Reloading");
        setReloader(!reloader);
    }

    


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
            {loader && <Loader/>}
            {error.message && <Error title="Error" message={error.message} handleClose={handleErrorClose} />}
            <h2>{t('today_appointments')}</h2>
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
                return <AppointmentCard key={o.appointmentId} upload="true" handleReload={handleReload} {...o}/>
            })}
            </List>:<p style={{color:"grey", textAlign:"center"}}>{t('no_appointments')}</p> }
        </Container>
    )
}

export default DoctorAppointments

const Container = styled.div`
min-height:100vh;
background: rgb(2,0,36);
padding:20px 0;
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,255,255,0) 0%, rgba(0,212,255,1) 100%);
    h2{
        text-align: center;
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
