import {useState,useEffect} from 'react';
import styled from "styled-components";
import getAllPatients from "../Api/getAllPatients"
import Loader from "./Loader"
import Error from "./Error"
import Updater from "./Updater"
import deletePatient from "../Api/deletePatient"
import { useTranslation } from "react-i18next";

function AllPatients() {
    const {t}=useTranslation();
    const [patients,setPatients]=useState([]);
    const [filteredPatient,setFilteredPatient]=useState([]);
    const [error,setError]=useState({show:false,message:""});
    const [loader,setLoader]=useState(false);
    const [search,setSearch]=useState("");
    const [update,setUpdate]=useState({show:false,data:null});
    const [reload,setReload]=useState(false);
    const [success,setSuccess]=useState({show:false,message:""});
    const [key,setKey]=useState("id");
    const [value,setValue]=useState("")


    const handleShowMessage=(message)=>{
        setSuccess({show:true,message:message});
        setTimeout(()=>setSuccess({show:false,message:""}),3000);
    }
    // const handleSearch=(e)=>{
    //     setSearch(e.target.value);
    //     const [key,value]=e.target.value.split(":");
    //     if(e.target.value==="") setFilteredPatient(patients);
    //     if(value!==undefined){
    //         switch(key){
    //             case "id":
    //                 setFilteredPatient(patients.filter(o=>{
    //                     return o.patientId===Number(value);
    //                 }))
    //                 break;
    //             case "name":
    //                 setFilteredPatient(patients.filter(o=>{
    //                     return o.name.toLowerCase().startsWith(value.toLowerCase());
    //                 }))
    //                 break;
    //             case "gender":
    //                 setFilteredPatient(patients.filter(o=>{
    //                     return o.gender.toLowerCase().startsWith(value.toLowerCase());
    //                 }))
    //                 break;
    //             case "age":
    //                 setFilteredPatient(patients.filter(o=>{
    //                     return o.age===Number(value);
    //                 }))
    //                 break;
    //             case "mobile":
    //                 setFilteredPatient(patients.filter(o=>{
    //                     return o.mobile===Number(value);
    //                 }))
    //                 break;
    //             case "address":
    //                 setFilteredPatient(patients.filter(o=>{
    //                 return o.address.toLowerCase().includes(value.toLowerCase());
    //             }))
    //                 break;
    //             default: 
    //                 setError({show:true,message:"Key Undefined"});
    //         }
    //     }

    // }

    useEffect(() =>{
        async function firstTime(){
            setLoader(true);
            const res=await getAllPatients(localStorage.getItem("token"));
            setLoader(false);
            if(res.result){
                setPatients(res.data);
            }else{
                setError({show:true,message:res.error});
            }
        }
        firstTime();
    },[reload])

    useEffect(() => {
        setFilteredPatient(patients);
    },[patients]);

    const handleErrorClose=()=>{
        setError({show:false,message:""});
    }
    const handleUpdateClose=()=>{
        setUpdate({show:false,data:null});
    }
    const handleReloader=()=>{
        setUpdate({show:false,data:null});
        setReload(!reload);
    }

    const removePatient = async (id) => {
        setLoader(true);
        const res=await deletePatient(id,localStorage.getItem("token"));
        setLoader(false);
        if(res.result){
            handleShowMessage("User Has been Deleted");
            handleReloader();
        }else{
            setError({show:true,message:res.error});
        }
    }


    function handleKey(e){
        setKey(e.target.options[e.target.selectedIndex].id);
    }

    function handleValue(e){
        if(e.target.value==="") {
            setFilteredPatient(patients);
            setValue(e.target.value);
        }
        else{
            console.log("key",key)
            const value=e.target.value;
            setValue(value);
            switch(key){
                case "id":
                    setFilteredPatient(patients.filter(o=>{
                        return o.patientId===Number(value);
                    }))
                    break;
                case "name":
                    setFilteredPatient(patients.filter(o=>{
                        return o.name.toLowerCase().startsWith(value.toLowerCase());
                    }))
                    break;
                case "gender":
                    setFilteredPatient(patients.filter(o=>{
                        return o.gender.toLowerCase().startsWith(value.toLowerCase());
                    }))
                    break;
                case "age":
                    setFilteredPatient(patients.filter(o=>{
                        return o.age===Number(value);
                    }))
                    break;
                case "mobile":
                    setFilteredPatient(patients.filter(o=>{
                        return o.mobile===Number(value);
                    }))
                    break;
                case "address":
                    setFilteredPatient(patients.filter(o=>{
                    return o.address.toLowerCase().includes(value.toLowerCase());
                }))
                    break;
                default: 
                    
            }
        }
    }
    return (
    <Container>
        {success.show && <SuccessMessage>{success.message}</SuccessMessage>}
        {loader && <Loader/>}
        {update.show && <Updater handleClose={handleUpdateClose} handleSuccess={handleShowMessage} handleReload={handleReloader} patient={true} data={update.data}/>}
        {error.show && <Error handleClose={handleErrorClose} title="Error" message={error.message}/>}
        <Filter>
            <h2>{t('patient_list')}</h2>
            <div>
            {/* <p title="Key represents the column name in lower case, whereas value represents the value associated to that column">❓</p> */}
               <select onChange={(e)=>handleKey(e)}>
                   <option id="id">Id</option>
                   <option id="name">Name</option>
                   <option id="age">Age</option>
                   <option id="gender">Gender</option>
                   <option id="address">Address</option>
                   <option id="mobile">Mobile</option>
               </select>
                <input type="text" value={value} onChange={(e)=>handleValue(e)} placeholder="value"/>
                
            </div>
            
        </Filter>
        

        <table>
            <thead>
                <tr>
                    <th>{t('id')}</th>
                    <th>{t('name')}</th>
                    <th>{t('age')}</th>
                    <th>{t('gender')}</th>
                    <th>{t('mobile')}</th>
                    <th>{t('address')}</th>
                </tr>
            </thead>
            <tbody>
                {filteredPatient.length===0?<p>No Records to show</p>:
                    filteredPatient.map(o=>{
                        return <tr key={o.patientId}>
                                <td>{o.patientId}</td>
                                <td>{o.name}</td>
                                <td>{o.age}</td>
                                <td>{o.gender}</td>
                                <td>{o.mobile}</td>
                                <td>{o.address}</td>
                                <Update title="Update Patient" onClick={()=>setUpdate({show:true,data:o})}>
                                    <img src="https://img.icons8.com/color/48/000000/life-cycle-female--v3.gif" alt=""/>
                                </Update>
                                {localStorage.getItem("role")==="ADMIN" && <Delete title="Delete Patient" onClick={()=>removePatient(o.patientId)}>
                                <img src="https://img.icons8.com/color/48/000000/waste--v2.gif" alt=""/>
                                </Delete>}
                        </tr>
                    })
                }
            </tbody>
        </table>

    </Container>
    )

}

export default AllPatients;

const Update=styled.button`
    width:40px;
    height:40px;
    position:absolute;
    right:40px;
    display:none;
    cursor:pointer;
    img{
        width:100%;
    }
`;

const Delete=styled.button`
    width:40px;
    height:40px;
    position:absolute;
    right:0px;
    display:none;
    cursor:pointer;
    img{
        width:100%;
    }
`;

const Container=styled.div`
min-height:100vh;
    padding:20px;
    height:100vh;
    &>table{
        border-collapse: collapse;
        margin:20px 0;
        width:100%;
        thead{
            tr{
                border:2px solid black;
                background-color:#018DB0;
                color:white;
                th{
                    padding:10px;
                    text-align:left;
                    
                }
            }
        }
        tbody{
            tr{
                position:relative;
                border-radius:5px;
                border-bottom:1px solid grey;
                td:first-child{
                    background-color:#4FBDBA;
                    color:white;
                    border-bottom:1px solid white;
                }
                td{
                    padding:10px;
                    text-align:left;
                    
                }

                &:hover{
                    transform:Scale(1.02);
                    transition-duration:0.4s;
                    background-color:#D3DEDC;
                    td:first-child{
                        background-color:green;
                        color:white;
                        border-bottom:1px solid white;
                    }
                    td{
                        padding:10px;
                        text-align:left;
                        
                    }
                    ${Update},${Delete}{
                        display:inline-block;
                    }
                }
            }
            
        }
        
    }
`;

const Filter=styled.div`
    display:flex;
    justify-content:space-between;
    div{
        display:flex;
        align-items:center;
        input{
            margin-left:10px;
            padding:7px 10px;
        }
        select{
            padding:7px;
        }
    }
`;

const SuccessMessage=styled.div`
position:fixed;
bottom:25px;
margin:auto;
left:0;
right:0;
width:250px;
color:white;
border-radius:5px;
padding:10px;
z-index:1000;
background-color:rgba(0,0,0,0.7);
text-align:center;
`;


