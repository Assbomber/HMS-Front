import styled from "styled-components"
import Error from "./Error";
import {useState,useEffect} from "react";
import Loader from "../Components/Loader"
import Success from "../Components/Success";
import createDepartment from "../Api/createDepartment";
import { useTranslation } from "react-i18next";

function NewStaff() {
    const {t}=useTranslation();
    const [error,setError]=useState({show:false,message:""});
    const [loader,setLoader]=useState(false);
    const [success,setSuccess]=useState({show:false,data:null});
    const [department,setDepartment]=useState("");

    const handleSubmit=async ()=>{
        
        if(department==="" ){
            setError({show:true,message:t('all_details_are_mandatory')});
            return;
        }
        setLoader(true);
        const res=await createDepartment(department,localStorage.getItem("token"));
        setLoader(false)
        if(res.result){
            // console.log(res);
           setSuccess({show:true,data:"A new Department has been created with DepartmentId: "+res.data.departmentId});
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
            {error.show && <Error handleClose={handleErrorClose} title="Error" message={error.message}/>}
            {loader && <Loader/>}
            {success.show && <Success handleClose={handleSuccessClose} data={success.data}/>}
            <h2>{t('register_new_department')}</h2>
            <div>
                <input value={department} onChange={(e)=>setDepartment(e.target.value)} type="text" placeholder={t('enter_department_name')}/>
                <Submit onClick={()=>handleSubmit()}>{t('register_department')}</Submit>
            </div>
            
        </Container>
    )
}

export default NewStaff

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


