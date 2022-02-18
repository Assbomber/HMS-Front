import styled from "styled-components";
import {useState,useEffect} from "react";
import {verifyPatientOtp} from "../Api/loginPatient";
import {Redirect} from "react-router-dom";

function Otp(props) {

    
    const [otp,setOtp]=useState("");
    const [error,setError]=useState({show:false,message:""});
    const [redirect,setRedirect]=useState(false);
    const [timer,setTimer]=useState(90);
    const [data,setData]=useState(null);

    useEffect(() => {
        if(timer===0) props.handleClose();
        const time =
          timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
          
        return () => clearInterval(time);
      }, [timer]);
    
    const handleVerify=async ()=>{
        if(!otp){
            setError({show:true,message:"Please enter OTP"});
            return
        }
        const result=await verifyPatientOtp(props.patientId,props.mobile,otp);
        
        if(result.result){
            setData(result.data);
            setRedirect(true);
        }else{
            setError({show:true,message:result.error});
        }
    }

    return (
        <Container>
            {redirect && <Redirect to={{ pathname: "/patient", state: {data: data} }} />}
            <Message>
            <button onClick={()=>props.handleClose()}><img src="https://cdn-icons-png.flaticon.com/512/61/61155.png" alt=""/></button>
                <h4>Hi {props.name}, please type in OTP sent to your mobile number {props.mobile}.</h4>
                <h6>Valid for {timer} seconds</h6>
                <input type="number" placeholder="Enter your OTP" value={otp} onChange={(e)=>setOtp(e.target.value)}/>
                {error.show && <p>{error.message}</p> }
                <Submit onClick={()=>handleVerify()}>Verify</Submit>
            </Message>
        </Container>
    )
}

export default Otp

const Container = styled.div`
    background-color:rgba(0,0,0,0.5);
    position:absolute;
    z-index:100;
    left:0;
    right:0;
    top:0;
    bottom:0;
    display:flex;
    justify-content:center;
    align-items:center;


`;

const Message=styled.div`
    max-width:300px;
    border-radius:10px;
    padding:20px;
    background-color:white;
    position:relative;

    input{
        width:100%;
        margin:10px 0;
        padding:10px;
    }
    p{
        font-size:13px;
        color:red;
        margin:0 0 10px;
    }

    button:first-child{
        img{
            width:100%;
        }
        position:absolute;
        right:10px;
        top:7px;
        width:15px;
        height:15px;
    }

`;

const Submit=styled.button`
    width:100%;
    padding:10px;
    outline:none;
    border:none;
    color:white;
    background-color:green;
    cursor:pointer;
    &:hover{
        transform:Scale(1.02);
        transition-duration:0.4s;
    }
`
