import styled from "styled-components";

function Error(props) {
    return (
        <Container>
            <Message>
                    <button onClick={()=>props.handleClose()}><img src="https://cdn-icons-png.flaticon.com/512/61/61155.png" alt=""/></button>
                    <h2>{props.title}</h2>
                    {props.message}
            </Message>
        </Container>
    )
}

export default Error

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
`;
