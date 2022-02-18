import {useLocation,Redirect} from "react-router-dom";
import Header from "../Components/Header";
import styled from "styled-components";
import {useState} from "react";
import AppointmentCard from "../Components/AppointmentCard";
import { useTranslation } from "react-i18next";

function PatientHome(props) {
    const {t}=useTranslation();

    const location = useLocation();
    var data="";
    if(location.state) data=location.state.data;
    // console.log(location);
    const [logout,setLogout]=useState(false);
    const [filtered,setFiltered]=useState(data.appointments);

    function handleLogout(){
        setLogout(true);
    }

    const handleFilter=(id)=>{
        switch(id){
            case 1: setFiltered(data.appointments.filter(o=>o.status === 'NEW')); break;
            case 2: setFiltered(data.appointments.filter(o=>o.status === 'CLOSED')); break;
            case 3: setFiltered(data.appointments.filter(o=>o.status === 'CANCELLED')); break;
            default: setFiltered(data.appointments);
        }
    }
    return (
        <Container>
             {!location.state && <Redirect to="/"/>}
             {logout && <Redirect to="/"/>}
            <Header user="true" logout={()=>handleLogout()} />
            <SubContainer>
                <Left>
                    <img src="https://cdn-icons-png.flaticon.com/512/1430/1430453.png" alt=""></img>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td>{t('patient_id')}  :</td>
                                <td>{location.state?data.patient.patientId:"0000"}</td>
                            </tr>
                            <tr>
                                <td>{t('name')}  :</td>
                                <td>{location.state?data.patient.name:"example"}</td>
                            </tr>
                            <tr>
                                <td>{t('age')}  :</td>
                                <td>{location.state?data.patient.age:"00"}</td>
                            </tr>
                            <tr>
                                <td>{t('mobile')}  :</td>
                                <td>{location.state?data.patient.mobile:"00000000"}</td>
                            </tr>
                            <tr>
                                <td>{t('gender')}   :</td>
                                <td>{location.state?data.patient.gender:"Null"}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p>{t('need_help')}</p>
                        <p>📧 care@amanhospitals.med</p>
                        <p>📞 9997776660</p>
                    </div>
                    
                </Left>
                <Right>
                    <h2>{t('your_recent_appointments')}</h2>
                    {data!=="" && data.appointments.length===0? <p style={{textAlign: 'center',color: 'grey'}}>🥺 No recent appointments found</p> : data.appointments && <List>
                
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
            </List>}
                </Right>
            </SubContainer>
        </Container>
    )
}

export default PatientHome

const Container = styled.div`

`;

const SubContainer=styled.div`
    margin:50px auto 50px;
    max-width:1024px;
    background-color:#FFFDDE;
    border-radius:20px;
    display:flex;
    align-items:start;
    padding:10px;
    box-shadow: 0px 1px 12px 0px rgba(0,0,0,0.75);

    @media only screen and (max-width:768px){
        flex-direction:column;
    }
    
`;


const Left=styled.div`
    flex:1;
    position:sticky;
    top:0;
    padding-right:10px;
    margin:0 auto;
    &>img{
        display:block;
        margin:20px auto;
        width:150px;
        object-fit: contain;
        border-radius:100%;
        background-color:white;

    }

    &>div:nth-child(2){
        padding:0 30px 0;
        table{
            width:100%;
        tr{
            td:nth-child(2){
                color:#018DB0;
                text-align:right;
            }
        }
    }
    }
    &>div:last-child{
        margin:40px 0;
        padding:0 30px;
        color:#018DB0;
    }

    @media only screen and (max-width:768px){
        position:relative;
    }
`;

const Right=styled.div`
    flex:2;
    width:100%;
    padding: 0 0 0 10px;
    border-left:1px solid #018DB0;

    h2{
        margin:0 auto 10px;
        text-align:center;

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