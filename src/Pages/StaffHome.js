import {Redirect} from "react-router-dom";
import {useState,useEffect} from "react";
import Loader from "../Components/Loader";
import Header from "../Components/Header";
import {connect} from "react-redux";
import getStaff from "../Api/getStaff";
import jwt_decode from "jwt-decode";
import Error from "../Components/Error";
import { resetStaff } from "../Redux/Staff/actions";
import styled from "styled-components";
import NewAppointment from "../Components/NewAppointment";
import NewPatient from "../Components/NewPatient";
import PatientAppointments from "../Components/PatientAppointments";
import SingleAppointment from "../Components/SingleAppointment";
import DoctorAppointments from "../Components/DoctorAppointments";
import NewStaff from "../Components/NewStaff";
import NewDepartment from "../Components/NewDepartment";
import ViewAppointments from "../Components/ViewAppointments";
import Dashboard from "../Components/Dashboard"
import AllPatients from "../Components/AllPatients"
import AllStaff from "../Components/AllStaff"
import { useTranslation } from "react-i18next";
 
function StaffHome(props) {
    const {t}=useTranslation();
    const [redirect,setRedirect] =useState(false);
    const [currentComponent,setCurrentComponent] = useState(localStorage.getItem("role")==="ADMIN"? 9:4);
    const [role,setRole]=useState(null);
    const [showNav,setShowNav] = useState(false);

    // console.log(props.staff);
    // console.log(redirect);

    const handleClose=()=>{
        localStorage.removeItem("token");
        props.resetStaff();
        setRedirect(true);
    }


    
    useEffect(()=>{
        try{
            const token=localStorage.getItem("token");
            if(!token){ //no token
                // console.log("No token");
                setRedirect(true);
            }else if(!props.staff.staff){ //no user but token present
                //---get STAFF MEMBER from DB
                // console.log("No props.staff")
                const decoded=jwt_decode(token);
                setRole(decoded.roles[0])
                props.getStaffApi(decoded.sub,token);
            }else { // yes Token, yes User
                // console.log("else");
            }
           
        }catch(e){}
    },[]);

    const handleNavToggle=()=>{
        setShowNav(!showNav);
    }
    return (
            <div>
                {props.staff.loading && <Loader/>}
                {redirect && <Redirect to="/"/>} 
                {props.staff.error && <Error title="Error" message={props.staff.error} handleClose={handleClose}/>}
                <Header user="true" logout={handleClose} navToggler={handleNavToggle}/>
                {/* {props.staff.staff && <div>{props.staff.staff.name}</div>} */}
                <Container>
                    <Left show={showNav}>
                        <StaffData>
                        <img src={role==="ADMIN"?"https://t4.ftcdn.net/jpg/02/53/56/39/360_F_253563983_EPyzR34M1KfVyMfX3jRUQnz5Wq14NiJR.jpg" :role==="DOCTOR"? "https://i.pinimg.com/originals/64/34/d7/6434d72ce9e16251c4f41f4e5a146567.png":"https://cdn-icons-png.flaticon.com/512/560/560200.png"} alt=""></img>
                            <div>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>{t('staff_id')}  :</td>
                                        <td>{props.staff.staff?props.staff.staff.staffId:"0000"}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('staff_name')}   :</td>
                                        <td>{props.staff.staff?props.staff.staff.name:"example"}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('staff_role')}  :</td>
                                        <td>{props.staff.staff?props.staff.staff.role:"NIL"}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </StaffData>
                        {role==="ADMIN" &&  <Selector onClick={()=>setCurrentComponent(9)}>{t('dashboard')}</Selector>}
                       {role!=="DOCTOR" && <Selector onClick={()=>setCurrentComponent(1)}>{t('new_patient')}</Selector>}
                       {role!=="DOCTOR" &&  <Selector onClick={()=>setCurrentComponent(3)}>{t('new_appointment')}</Selector>}
                       { <Selector onClick={()=>setCurrentComponent(2)}>{t('find_patient_appointments')}</Selector>}
                       { <Selector onClick={()=>setCurrentComponent(4)}>{t('find_an_appointment')}</Selector>}
                       {role==="DOCTOR" &&  <Selector onClick={()=>setCurrentComponent(5)}>{t('today_appointments')}</Selector>}
                       {role==="ADMIN" &&  <Selector onClick={()=>setCurrentComponent(6)}>{t('new_staff')}</Selector>}
                       {role==="ADMIN" &&  <Selector onClick={()=>setCurrentComponent(7)}>{t('new_department')}</Selector>}
                       {role!=="DOCTOR" &&  <Selector onClick={()=>setCurrentComponent(8)}>{t('find_appointments_by_date')}</Selector>}
                       {role!=="DOCTOR" &&  <Selector onClick={()=>setCurrentComponent(10)}>{t('all_patients')}</Selector>}
                       {role==="ADMIN" &&  <Selector onClick={()=>setCurrentComponent(11)}>{t('all_staff')}</Selector>}
                       
                    </Left>
                    <Right>
                        {currentComponent===3 && <NewAppointment/>}
                        {currentComponent===2 && <PatientAppointments/>}
                        {currentComponent===1 && <NewPatient/>}
                        {currentComponent===4 && <SingleAppointment/>}
                        {currentComponent===5 && <DoctorAppointments/>}
                        {currentComponent===6 && <NewStaff/>}
                        {currentComponent===7 && <NewDepartment/>}
                        {currentComponent===8 && <ViewAppointments/>}
                        {currentComponent===9 && <Dashboard/>}
                        {currentComponent===10 && <AllPatients/>}
                        {currentComponent===11 && <AllStaff/>}
                    </Right>
                </Container>
                
            </div>
        
    )
}

const Container = styled.div`
    display:flex;
    position:relative;
    align-items:start;

    @media only screen and (max-width:768px){
        flex-direction:column;
    }
`;
const Left=styled.div`
min-height:100vh;
    padding:20px 0 150px;
    flex:1;
    background-color:#018DB0;
    position:sticky;
    top:0;
    @media only screen and (max-width:768px){
        position:absolute;
        display:${props=>props.show? "inline":"none"};
        right:0;
        z-index:1000;
    }
`;
const Right=styled.div`
width:100%;
    flex:3;
    position:sticky;
    top:0;
`;

const StaffData=styled.div`
padding:0 30px 50px;
    &>img{
        width:100px;
        display:block;
        margin:10px auto;
        border-radius:100%;
    }
    table{
        width:100%;
        margin:0 auto;
        tr{
            td:last-child{
                text-align:right;
                color:white;
            }
        }
    }
`;

const Selector = styled.div`
    padding:15px;
    font-size:16px;
    text-align:center;
    background-color:white;
    cursor:pointer;
    border:1px solid #018DB0;
    border-radius:0 50px 50px 0;
    &:hover{
        color:white;
        background-color:#A6CF98;
        transform:Scale(1.08);
        transition-duration:0.4s;
    }

`;

const mapStateToProps =(state)=>{
    return {
        staff: state.staff
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getStaffApi:(id,token)=>dispatch(getStaff(id,token)),
        resetStaff:()=>dispatch(resetStaff())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(StaffHome)
