import styled from "styled-components"
import Error from "./Error";
import {useState,useEffect} from "react";
import Loader from "../Components/Loader"
import Success from "../Components/Success";
import getAllDepartments from "../Api/getAllDepartments";
import createStaff from "../Api/createStaff";
import { useTranslation } from "react-i18next";

function NewStaff() {

    const {t}=useTranslation();
    const [error,setError]=useState({show:false,message:""});
    const [loader,setLoader]=useState(false);
    const [success,setSuccess]=useState({show:false,data:null});
    const [departments,setDepartments]=useState([]);
    const [selectedDepartment,setSelectedDepartment]=useState(null);
    const [roles,setRoles]=useState([{roleId:1,name:"ADMIN"},{roleId:2,name:"DOCTOR"},{roleId:3,name:"RECEPTIONIST"}]);
    const [selectedRole,setSelectedRole]=useState({});
    const [staffName,setStaffName]=useState("");
    const [staffPassword,setStaffPassword]=useState("");

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
        
        if(staffName==="" || selectedRole.name==="" || staffPassword==="" || (selectedRole.roleId==="2" && selectedDepartment===null) ){
            setError({show:true,message:t('all_details_are_mandatory')});
            return;
        }
        setLoader(true);
        const dep=[];
        if(selectedDepartment!==null)dep.push(selectedDepartment.departmentId);
        const res=await createStaff(staffName,staffPassword,selectedRole,dep,localStorage.getItem("token"));
        setLoader(false)
        if(res.result){
            // console.log(res);
           setSuccess({show:true,data:"A new Staff has been created with StaffId: "+res.data.staffId+"\n Role:"+res.data.role});
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

    const handleDepartmentChange= (e)=>{
        setSelectedDepartment({departmentId:e.target.options[e.target.selectedIndex].id,name:e.target.options[e.target.selectedIndex].value});
    }
    const handleRoleChange=(e)=>{
        setSelectedDepartment(null)
        setSelectedRole({roleId:e.target.options[e.target.selectedIndex].id,name:e.target.options[e.target.selectedIndex].value});
        
    }
    
    return (
        <Container>
            {error.show && <Error handleClose={handleErrorClose} title={t('error')} message={error.message}/>}
            {loader && <Loader/>}
            {success.show && <Success handleClose={handleSuccessClose} data={success.data}/>}
            <h2>{t('register_new_staff')}</h2>
            <div>
                <input value={staffName} onChange={(e)=>setStaffName(e.target.value)} type="text" placeholder={t('enter_staff_name')}/>
                <input value={staffPassword} onChange={(e)=>setStaffPassword(e.target.value)} type="password" placeholder={t('enter_staff_password')}/>
                <label htmlFor="Role">{t('staff_role')}: </label>
                <select  onChange={(e)=>handleRoleChange(e)} id="Role">
                <option value="" disabled selected>{t('select_your_option')}</option>
                    {roles.map((o,idx)=><option key={idx} id={o.roleId} value={o.name}>{o.name} id:{o.roleId}</option>)}
                </select>
                
                
                {selectedRole.roleId==="2" && <label htmlFor="department">{t('department')}: </label>}
                {selectedRole.roleId==="2" && <select  onChange={(e)=>handleDepartmentChange(e)} id="department">
                <option value="" disabled selected>{t('select_your_option')}</option>
                    {departments.map((o,idx)=><option key={idx} id={o.departmentId} value={o.name}>{o.name} id:{o.departmentId}</option>)}
                </select>}
               
                <Submit onClick={()=>handleSubmit()}>{t('register_staff')}</Submit>
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


