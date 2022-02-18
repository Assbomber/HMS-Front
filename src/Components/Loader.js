import styled from "styled-components";

function Loader() {
    return (
        <Container>
            <Message>
                    <img src="/loading.gif" alt=""></img>
            </Message>
        </Container>
    )
}

export default Loader

const Container = styled.div`
    background-color:rgba(0,0,0,0.4);
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
    max-width:200px;
    border-radius:10px;
    padding:20px;
    position:relative;
    img{
        width:100%;
    }
`;

