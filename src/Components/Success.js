import styled from "styled-components";
import { useTranslation } from "react-i18next";

function Success(props) {
    const {t}=useTranslation();
    return (
        <Container>
            <Message>
                    <button onClick={()=>props.handleClose()}><img src="https://cdn-icons-png.flaticon.com/512/61/61155.png" alt=""/></button>
                    <h2>{t('success')}</h2>
                    <img src="https://www.kernelios.com/wp-content/uploads/2018/07/successgif.gif" alt=""></img>
                    {props.data}
            </Message>
        </Container>
    )
}

export default Success

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

    &>img{
        width:100px;
        display:block;
        margin:10px auto;
    }

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
