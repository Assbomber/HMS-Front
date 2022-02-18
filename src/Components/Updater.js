import styled from "styled-components";
import {useState,useEffect} from "react";
import updatePatient from "../Api/updatePatient"
import Error from "./Error";
import getAllDepartments from "../Api/getAllDepartments"
import updateStaff from "../Api/updateStaff"

function Updater(props) {

   
    const [data,setData]=useState(props.data);
    const [error,setError] = useState({show:false,message:""});
    const [loader,setLoader]=useState(false);
    const [departments,setDepartments] = useState([])


    useEffect(() =>{
        async function firstFetch(){
            const res=await getAllDepartments(localStorage.getItem("token"));
            if(res.result){
                setDepartments(res.data);
            }else{
                setError({show:true,message:res.error})
            }
        }
        firstFetch();
    },[])
    const handleUpdate=async ()=>{
        setLoader(true);
        var res=null
        if(props.patient)res=await updatePatient(data,localStorage.getItem("token"));
        else res=await updateStaff(data,localStorage.getItem("token"))
        setLoader(false);
        if(res.result){
            props.handleSuccess("User has been Updated");
            props.handleReload();
        }else{
            setError({show:true,message:res.error});
        }
    }

    const handleErrorClose=()=>{
        setError({show:false,message:""});
    }
    return (
        <Container>
            {error.show && <Error handleClose={handleErrorClose} title="Error" message={error.message}/>}
            <Message>
                    <button onClick={()=>props.handleClose()}><img src="https://cdn-icons-png.flaticon.com/512/61/61155.png" alt=""/></button>
                    <h2>Update {props.patient? `Patient ID ${props.data.patientId}`:`Staff ID ${props.data.staffId}`}</h2>
                    <label for="name">Name: </label>
                    <input type="text" id="name" onChange={(e)=>setData({...data,name:e.target.value})} value={data.name}/>
                    {props.patient && <div>
                        <label for="age">Age: </label>
                    <input type="numbber" id="age" onChange={(e)=>setData({...data,age:e.target.value})} value={data.age}/>

                    <label for="gender">Gender: </label>
                    <input type="text" id="gender" onChange={(e)=>setData({...data,gender:e.target.value})} value={data.gender}/>

                    <label for="mobile">Moblie: </label>
                    <input type="number" id="mobile" onChange={(e)=>setData({...data,mobile:e.target.value})} value={data.mobile}/>

                    <label for="address">Address: </label>
                    <input type="text" id="address" onChange={(e)=>setData({...data,address:e.target.value})} value={data.address}/>
                        </div>
                    }
                     {data.role === 'DOCTOR' && <label for="role">Department:</label>}
                     {data.role==="DOCTOR" && <select id="role" onChange={(e)=>setData({...data,departments:[{departmentId:e.target.options[e.target.selectedIndex].id,name:e.target.options[e.target.selectedIndex].value}]})}>
                         <option id={data.departments[0].departmentId} value={data.departments[0].name} selected disabled>{data.departments[0].name}</option>
                         {departments.map(o=>{
                            return <option key={o.departmentId} id={o.departmentId} value={o.name}>{o.name}</option>
                         })}
                         </select>}
                    

                    <Submit onClick={handleUpdate}>
                        UPDATE
                        {loader && <img src="https://i.pinimg.com/originals/5c/87/9a/5c879ab8cba794923686df4b950f497b.gif" alt=""></img>}
                    </Submit>
                    

            </Message>
        </Container>
    )
}

export default Updater

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
    max-width:400px;
    border-radius:10px;
    padding:20px;
    background-color:white;
    position:relative;
    

    button{
        img{
            width:100%;
        }
        position:absolute;
        right:10px;
        top:7px;
        width:15px;
        height:15px;
    }
    select,input{
        width:100%;
        padding:10px;
        border-radius:5px;
        border:1px solid black;
    }
`;

const Submit=styled.div`
    cursor:pointer;
    background-color:#018DB0;
    margin:10px 0;
    padding:10px;
    border-radius:5px;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    img{
        width:20px;
        height:20px;

    }
    &:hover{
        transform:Scale(1.02);
        transition-duration:0.4s;
    }
`;