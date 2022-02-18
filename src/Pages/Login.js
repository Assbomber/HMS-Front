import Header from "../Components/Header"
import styled from "styled-components";
import Error from "../Components/Error";
import React,{useState,useEffect} from "react";
import Loader from "../Components/Loader";
import {Redirect} from "react-router-dom";
import loginStaff from "../Api/loginStaff";
import {patientExists} from "../Api/loginPatient";
import Otp from "../Components/Otp";
import { useTranslation } from "react-i18next";
function Login() {
    const {t}=useTranslation();
    const [patientForm,setPatientForm] = useState({id:"",mobile:""});
    const [staffForm,setStaffForm]=useState({id:"",password:""});
    const [error,setError]=useState({show:false,message:""});
    const [redirect,setRedirect]=useState({redirect:false,path:"",});
    const [loader,setLoader]=useState(true);
    const [internalLoader,setInternalLoader]=useState(false);
    const [otp,setOtp]=useState();


    const handleOtpCLose=()=>{
        setPatientForm({id:"",mobile:""});
        setOtp();
    }
    const handlePatientLogin=async () => {
        if(patientForm.id==="" || patientForm.mobile===""){
            setError({show:true,message:t('all_details_are_mandatory')})
            return;
        }
        setInternalLoader(true);
        const result=await patientExists(patientForm.id,patientForm.mobile);
        if(result.result){
            
            setOtp(result.data);
        }else{
            setError({show:true,message:result.error})
        }
        setInternalLoader(false);

    }
    const handleStaffLogin=async ()=>{
        if(staffForm.id==="" || staffForm.password===""){
            setError({show:true,message:t('all_details_are_mandatory')})
            return;
        }
        setInternalLoader(true);
        const out=await loginStaff(staffForm.id,staffForm.password);
        if(out.result){
            localStorage.setItem("token",out.data.token);
            localStorage.setItem("role",out.data.role)
            setRedirect({redirect:true,path:"/staff"})
        }else{
            setError({show:true,message:out.message});
            setStaffForm({id:"",password:""});
        }
        setInternalLoader(false);
    }

    const handleErrorClose=()=>{
        setError({show:false,message:""});
    }


    useEffect(()=>{
        if(localStorage.getItem("token")){
            setRedirect({redirect:true,path:"/staff"});
        }
        setLoader(false);
    },[]);
    return (

    <div>
        {loader? <Loader/>:
      <Container>
        {/* <video style={{zIndex:"0",position:"absolute", filter: "sepia(100%) hue-rotate(190deg) saturate(500%)"}} width="100%" height="100%"autoplay="true" muted loop id="myVideo">
            <source src="/video.mp4" type="video/mp4"/>
            Your browser does not support HTML5 video.
        </video> */}
            {otp && <Otp handleClose={handleOtpCLose} {...otp}/>}
            {internalLoader && <Loader/>}
            {redirect.redirect && <Redirect to={redirect.path}/>}
            {error.show && <Error title={t('error')} message={error.message} handleClose={handleErrorClose}/>}
            <Header/>
            <Logger>
                <Fields>
                    <h1>{t('staff_login')}</h1>
                    <img src="https://icon-library.com/images/staff-icon-png/staff-icon-png-2.jpg" alt=""></img>
                    <input type="number" placeholder={t('enter_id')} onChange={(e)=>setStaffForm({...staffForm,id:e.target.value})} value={staffForm.id} />
                    <input type="password" placeholder={t('enter_password')}  onChange={(e)=>setStaffForm({...staffForm,password:e.target.value})} value={staffForm.password} />
                    <Submit onClick={()=>handleStaffLogin()}>{t('sign_in')}</Submit>
                </Fields>
                <Divider/>
                <Fields>
                    <h1>{t('patient_login')}</h1>
                <img src="https://www.freeiconspng.com/uploads/patient-icon-8.png" alt=""></img>
                    <input type="number" placeholder={t('enter_id')}  onChange={(e)=>setPatientForm({...patientForm,id:e.target.value})} value={patientForm.id} />
                    <input type="number" placeholder={t('enter_mobile')} onChange={(e)=>setPatientForm({...patientForm,mobile:e.target.value})} value={patientForm.mobile}/>
                    <Submit onClick={()=>handlePatientLogin()}>{t('view_records')}</Submit>
                </Fields>
            </Logger>
            
        </Container>
        }
        </div>

    )
}


export default Login;

const Container=styled.div`
    width:100%;
    height:100vh;
    background-repeat:no-repeat;
    background-size:cover;
    background-position:left top;
    position:relative;
    background-color:transparent;
    background-image:url(https://www.huronconsultinggroup.com/-/media/Images/HuronConsultingGroup/3-Web-Services-Photos/Huron-Rounding.ashx?h=532&w=2000&la=en&hash=39F83BAF6487FFA0239744FF7C9E51E4);
`

const Logger=styled.div`
    padding:20px;
    max-width:700px;
    position:absolute;
    left:0;
    top:120px;
    right:0;
    margin:auto;
    display:flex;
    justify-content:space-between;
    border-radius:20px;
    background-color:white;

    @media only screen and (max-width:768px){
        flex-direction:column;
    }
`

const Fields=styled.div`
h1{
    text-align:center;
}
    input{
        padding:10px;
        margin:5px 0;
        width:100%;
        border:1px solid black;
        border-radius:10px;
    }
    img{
        width:100px;
        display:block;
        margin:10px auto;
    }
`;
const Divider=styled.div`
   
   width:2px;
   margin:0 20px;
   background-color:#018DB0;

   @media only screen and (max-width:768px){
       height:1px;
       width:100%;
       margin:20px 0;
   }
`;

const Submit=styled.button`
    width:100%;
    height:40px;
    outline:none;
    border:none;
    background-color:#3FA796;
    border-radius:10px;
    color:white;
    font-size:16px;
    margin-top:10px;
    cursor:pointer;
    &:hover{
        transform:Scale(1.02);
        transition-duration:0.2s;
    }
`;