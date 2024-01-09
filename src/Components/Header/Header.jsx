import styled from "styled-components";
import './Header.css';
import Search from "../Search";
import Navbar from "../Navigation/Navbar";
import Stat from "../Stat";

function Header() {
    
  return (
    <main>
    <StyledContainer >
        <Navbar/>
        <AbsoluteOverlay>
            <StyledDiv className="jumbo"></StyledDiv>
        </AbsoluteOverlay>
          <StyledH1 >
            High-quality stock photos, royalty-free images, shared by creators.
          <div className="search">
            <Search/>
          </div>  
        </StyledH1>
        <div className="stat">
          <Stat/>
        </div>
    </StyledContainer>

</main>
  )
}

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 85vh;
  justify-content: center;
  background-color: #000; 
  transition: background-color 0.3s ease;
  @media (max-width:360px){
    height: 100vh;
  }
`;
const AbsoluteOverlay = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;
const StyledDiv = styled.div`
  position: absolute;
  inset: -10px;
  opacity: 0.5;
`;
const StyledH1 = styled.h1`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 33px;
  font-weight: 600;
  color: #fff;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  max-width: 860px;
  margin: auto;
  text-align: center;
  text-transform: uppercase;
  padding: 1rem 3rem; 
  top: -8px;
  .search{
    width: 100%;
    justify-content:center ;
    display: flex;
    align-items: center;
    align-self: center;
    font-size: 20px;
    font-weight: lighter;
    margin: auto;
  }
  @media (max-width:320px){
    top: -60px;
    font-weight: 500;
    line-height: 40px;
  }
  @media (max-width:1024px) and  (min-width:430px)  {
    top: -10px; 
  }

  @media (max-width:425px)and (min-width: 322px){
    top: 0px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1rem;
  }
`;




export default Header