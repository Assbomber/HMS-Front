import styled from "styled-components";
import {useState} from "react";
import uploadPrescription from "../Api/uploadPrescription"
import jwt_decode from "jwt-decode";
import Loader from "../Components/Loader.js";
import Error from "../Components/Error.js";
import {BACKEND_URL} from "../constants"
import { useTranslation } from "react-i18next";
function AppointmentCard(obj) {
    const {t}=useTranslation();
    const [props,setProps]=useState(obj)
    const [file,setFile]=useState(null);
    const [error,setError]=useState({show:false,message:""});
    const [loader,setLoader]=useState(false);

    const link =BACKEND_URL+"/hmsapi/appointments/download/"+props.appointmentId;

    

    const handleErrorClose=()=>{
        setError({show:false,message:""});
    }
    const handleUpload=async ()=>{
        if(file===null){
            setError({show:true,message:"Select a file"});
            return
        }
        setLoader(true);
        const res=await uploadPrescription(file,props.appointmentId,localStorage.getItem("token"));
        setLoader(false);
        if(res.result){
            obj.handleReload();
            setProps(res.data);
        }else{
            setError({show:true,message:res.error});
        }
    }
    return (
        <Container status={props.status}>
            {error.message!=="" && <Error title="Error" message={error.message} handleClose={handleErrorClose}/>}
            {loader && <Loader/>}
            <p style={{color:"grey",fontWeight:"bold", fontSize:"20px"}}>{t('appointment_id')}: {props.appointmentId}</p>
            <Flex>
                <p>{t('date_of_appointment')}: {props.date}</p>
                <p>{t('status')}: {props.status==="NEW"? <span style={{color:"green",fontWeight:"bold"}}>{props.status}</span>:<span style={{color:"red",fontWeight:"bold"}}>{props.status}</span> } </p>
            </Flex>
            <Flex>
                <table>
                    <p>{t('attendee')}</p>
                    <tbody>
                        <tr>
                            <td>{t('patient_id')}: </td>
                            <td>{props.patient.patientId}</td>
                        </tr>
                        <tr>
                            <td>{t('patient_name')}: </td>
                            <td>{props.patient.name}</td>
                        </tr>
                        <tr>
                            <td>{t('patient_age')}: </td>
                            <td>{props.patient.age}</td>
                        </tr>
                        <tr>
                            <td>{t('patient_mobile')}: </td>
                            <td>{props.patient.mobile}</td>
                        </tr>
                        <tr>
                            <td>{t('patient_gender')}: </td>
                            <td>{props.patient.gender}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <p>{t('attendant')}</p>
                    <tr>
                            <td>{t('staff_id')}: </td>
                            <td>{props.staff.staffId} </td>
                        </tr>
                        <tr>
                            <td>{t('specialist_name')}: </td>
                            <td>{props.staff.name}</td>
                        </tr>
                        <tr>
                            <td>{t('department')}: </td>
                            <td>{props.department.name}</td>
                        </tr>
                <tbody>
                        
                        </tbody>
                </table>
            </Flex>
            <p><span style={{fontWeight:"bold"}}>{t('comment')}: </span> {props.comments? props.comments:"no comments..."}</p>
            {props.status==="CLOSED" && <a title="Download prescription" href={link} download>
                    <img src="https://spotrx.com/wp-content/uploads/2019/06/get-prescription-gif.gif" alt=""/>
                </a>}
            {localStorage.getItem("token") && jwt_decode(localStorage.getItem("token")).roles[0]==="DOCTOR" && obj.upload==="true" && <div>
            <label for="myfile">Select a file:</label>
            <input style={{padding:"5px"}} type="file" id="myfile"  onChange={(e)=>setFile(e.target.files[0])} name="myfile" accept=".pdf"/>
            <Upload onClick={()=>handleUpload()}>{props.status==="CLOSED"? "Update":"Upload"} prescription</Upload>
            </div>}
        </Container>
    )
}

export default AppointmentCard

const Container = styled.div`
    width:100%;
    background-color:white;
    box-shadow: -2px 1px 11px 0px rgba(0,0,0,0.75);
    border-radius:10px;
    margin:10px 0;
    border-left: ${props=>props.status==="NEW"?"10px solid green":"10px solid red"};
    padding:20px;
    position:relative;

    &>a{
        width:50px;
        outline:none;
        border:none;
        position:absolute;
        bottom:30px;
        right:20px;
        cursor:pointer;
        img{
            width:100%;
        }
    }

`;

const Flex=styled.div`
    display:flex;
    justify-content:space-between;
    align-items:start;
    

    table{
        p{
            color:#018DB0;
            font-weight:bold;
            font-size:20px;
        }
        tr{
            td:first-child{
                font-weight:bold;
            }
            td:last-child{
                text-align:right;
            }
        }
    }
    @media only screen and (max-width:500px){
        flex-direction:column;
    }
`;

const Upload=styled.div`
    background-color: #018DB0;
    padding :10px;
    display:inline-block;
    color:white;
    cursor:pointer;
    margin:10px 0;
    &:hover{
        transform:Scale(1.02);
        transition-duration:0.4s;
    }
`;
