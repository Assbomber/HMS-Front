import styled from "styled-components"
import Error from "./Error";
import {useState} from "react";
import createPatient from "../Api/createPatient";
import Loader from "../Components/Loader"
import Success from "../Components/Success";
import { useTranslation } from "react-i18next";

function NewPatient() {

    const {t}=useTranslation();
    const [error,setError]=useState({show:false,message:""});
    const [loader,setLoader]=useState(false);
    const [success,setSuccess]=useState({show:false,data:{}});
    const [formData,setFormData]=useState({name:"",age:"",address:"",gender:"MALE",mobile:""});

    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(formData.name==="" || formData.address==="" || formData.age==="" || formData.gender==="" || formData.mobile==="") {
            setError({show:true,message:t('all_details_are_mandatory')});
            return;
        }
        setLoader(true);
        const res=await createPatient(formData,localStorage.getItem("token"));
        setLoader(false)
        if(res.result){
            
           setSuccess({show:true,data:t('new_patient_created')+": "+res.data.patientId});
        }else {
            setError({show:true,message:res.error});
        }
        

    }

    const handleErrorClose=()=>{
        setError({show:false,message:""});
    }
    const handleSuccessClose=()=>{
        setFormData({name:"",age:"",address:"",gender:"MALE",mobile:""});
        setSuccess({show:false,data:null});

    }
    return (
        <Container>
            {error.show && <Error handleClose={handleErrorClose} title={t('error')} message={error.message}/>}
            {loader && <Loader/>}
            {success.show && <Success handleClose={handleSuccessClose} data={success.data}/>}
            <h2>{t('create_new_patient')}</h2>
            <div>
                <form>
                <input requried value={formData.name} onChange={(e)=>setFormData({...formData,name: e.target.value})} type="text" placeholder={t('enter_patient_name')}/>
                <input required value={formData.age} onChange={(e)=>setFormData({...formData,age: e.target.value})} type="number" placeholder={t('enter_patient_age')}/>
                
                <input required value={formData.address} onChange={(e)=>setFormData({...formData,address: e.target.value})} type="text" placeholder={t('enter_patient_address')}/>
                <input required value={formData.mobile} onChange={(e)=>setFormData({...formData,mobile: e.target.value})} type="number" placeholder={t('enter_patient_mobile')}/>
                <label htmlFor="gender">Gender: </label>
                <select required value={formData.gender} onChange={(e)=>setFormData({...formData,gender: e.target.value})} id={t('gender')}>
                    <option value="MALE" selected>MALE</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="OTHERS">OTHER</option>
                </select>
                <Submit type="submit" onClick={(e)=>handleSubmit(e)}>{t('register_patient')}</Submit>
                </form>
            </div>
            
        </Container>
    )
}

export default NewPatient

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
        input{
            width:100%;
            padding:10px;
            border-radius:10px;
            margin:10px 0;
            border:1px solid #018DB0;
        }
        select{
            width:100%;
            padding:10px;
            border-radius:10px;
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


