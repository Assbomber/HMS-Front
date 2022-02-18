import styled from "styled-components";
import Loader from "./Loader";
import LineChart from 'react-linechart';
import getDashboard from "../Api/getDashboard";
import {useState,useEffect} from "react";
import Error from "./Error";
import { useTranslation } from "react-i18next";

function Dashboard() {

    const {t}=useTranslation();
    const [error,setError] =useState({show:false,message:""});
    const [newData,setNewData] = useState({})
    const [loader,setLoader] = useState(false);
    const [data,setData] = useState(
        [
            {									
                color: "turquoise",
                points: [
                    {x:"2021-08-04", y: 0},
                    {x:"2021-09-23", y: 0},
                    {x:"2021-10-09", y: 0},
                    {x:"2021-11-04", y: 0},
                    {x:"2021-12-12", y: 0},
                    {x:"2022-01-01", y: 0}
                ] 
            }
        ]
    );
    

    useEffect(()=>{
        async function firstLoad(){
            setLoader(true);
            const res=await getDashboard(localStorage.getItem("token"));
            setLoader(false);
            if(res.result){
                
                setNewData(res.data);
                
            }else{
                setError({show:true,message:res.error})
            }
        } 
        firstLoad();
    },[]);

    const handleErrorClose=()=>{
        setError({show:false,message:""});
    }

    

    useEffect(()=>{
        const arr=[];
                for(var i in newData.LastSixMonthsPatientCount){
                    arr.push({x:i,y:newData.LastSixMonthsPatientCount[i]});
        }
        setData([{
            color: "turquoise",
            points:arr
        }])
    },[newData]);

    
    return (
        <Container>
            {loader && <Loader/>}
            {error.show && <Error handleClose={handleErrorClose} title="Error" message={error.message}/>}
            <h2>{t('dashboard')}</h2>
            <Flex>
                <Card color="#24A19C">
                    <h3>{t('todays_appointments')}</h3>
                    <h1>{newData.TodayAppointmentCount? newData.TodayAppointmentCount:"0"}</h1>
                </Card>
                <Card color="#D22779">
                    <h3>{t('new_patients_today')}</h3>
                    <h1>{newData.TodayPatientCount? newData.TodayPatientCount:"0"}</h1>
                </Card>
                <Card color="#8B9A46">
                    <h3>{t('new_patients_month')}</h3>
                    <h1>{newData.LastSixMonthsPatientCount?newData.LastSixMonthsPatientCount[Object.keys(newData.LastSixMonthsPatientCount)[5]]:"0"}</h1>
                </Card>
            </Flex>
            <LineChart isDate={true} width={800} ticks={6} xLabel={t('months')} yLabel={t('patient_count')} height={400} data={data}/>
        </Container>
    )
}

export default Dashboard

const Container=styled.div`
min-height:100vh;
    width:100%;
    padding:20px;
`;

const Card=styled.div`
padding:10px;
    width:250px;
    height:100px;
    background-color:${props=>props.color};
    border-radius:10px;
    text-align:center;
    color:white;
    box-shadow: 0px 8px 19px 2px rgba(0,0,0,0.75);
`;

const Flex=styled.div`
    margin:10px 0;
    display:flex;
    flex-wrap: wrap;
    justify-content:space-between;
`;
