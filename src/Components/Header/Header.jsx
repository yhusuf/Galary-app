import styled from "styled-components";
import './Header.css';
import Search from "../Search";
import Navbar from "../Navbar/Navbar";

function Header() {
    
  return (
    <main>
    <StyledContainer >
    <Navbar/>
        <AbsoluteOverlay>
            <StyledDiv className="jumbo"></StyledDiv>
        </AbsoluteOverlay>
        <StyledH1 >
        High-quality stock photos, royalty free images, shared by creators.
        <div className="search"><Search/></div>  
        </StyledH1>
        <Last>
          <h3>trending</h3>
        </Last>
    </StyledContainer>
</main>
  )
}

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
  background-color: #000; 
  transition: background-color 0.3s ease;
  @media (max-width:320px){
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
  max-width: 760px;
  margin: auto;
  text-align: center;
  text-transform: uppercase;
  .search{
    width: 100%;
    justify-content:center ;
    align-items: center;
    padding: 1rem 3rem; 
    align-self: center;
  }
  @media (max-width:320px){
    top: -60px;
    font-weight: 500;
    line-height: 40px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1rem;
  }
`;

const Last = styled.div`
h3{
  color: white;
}
`


export default Header