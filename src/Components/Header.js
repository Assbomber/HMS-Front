import styled from "styled-components"
import i18next from "i18next";


function Header(props) {
    
    const lang=localStorage.getItem('i18nextLng');
    return (
        <Head user={props.user}>
            <Logo>
                <a href="/"><img src="/logo.png" alt="Logo" title="Home"/></a>
            </Logo>
            <div>
                <Language>
                    <select onChange={(e)=> i18next.changeLanguage(e.target.options[e.target.selectedIndex].value)}>
                        {lang==='en'? <option value="en" selected >English</option>:<option value="en" >English</option>}
                        {lang==='hi'? <option value="hi" selected >हिन्दी</option>:<option value="hi" >हिन्दी</option>}
                        
                    </select>
                </Language>
                {props.user && <Logout onClick={()=>props.logout()}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/OOjs_UI_icon_logOut-ltr-invert.svg/1024px-OOjs_UI_icon_logOut-ltr-invert.svg.png" alt="Logout" title="Logout"/>
                </Logout>}
                {localStorage.getItem("token") && <Menu title="Open Menu" onClick={()=>props.navToggler()}>
                <img src="https://img.icons8.com/ios-glyphs/30/ffffff/menu--v1.png" alt=""/>
                </Menu>}

            </div>
            
            
        </Head>
    )
}

export default Header



const Language =styled.div`
    select{
        padding:6px 5px;
        border-radius:5px;
        margin-right:10px;
        
    }
`;

const Head=styled.header`
    z-index:100;
    display:flex;
    align-items:center;
    justify-content:space-between;
    background-color:${props=>props.user? "#018DB0" :"transparent" };
    padding-right:20px;
    width:100%;
    height:60px;
    box-shadow: 0px 1px 12px 0px rgba(0,0,0,0.75);

    &>div:last-child{
        display:flex;
        min-width:70px;
        justify-content:space-between;
    }
`;

const Logo=styled.div`
    background-color:white;
    max-width:400px;
    width:100%;
    position:relative;
    bottom:5px;
    padding:0px 20px;
    border-radius:0 0 30px 0 ;
    img{
        position:relative;
        top:10px;
        width:100%;
    }

`;

const Logout=styled.button`
    width:30px;
    background:none;
    border:none;
    cursor:pointer;
    img{
        width:100%;
    }
    &:hover{
        transform: Scale(1.02);
        transition-duration:0.5s;
    }
`;

const Menu=styled.button`
    width:30px;
    background:none;
    border:none;
    cursor:pointer;
    display:none;
    img{
        width:100%;
    }
    &:hover{
        transform: Scale(1.02);
        transition-duration:0.5s;
    }

    @media only screen and (max-width:768px){
        display:inline-block;
    }
`;