import styled from "styled-components";
import './Header.css';
import Search from "../Search";

function Header() {
    
  return (
    <main>
    <StyledContainer className="dark">
        <AbsoluteOverlay>
            <StyledDiv className="jumbo"></StyledDiv>
        </AbsoluteOverlay>
        <StyledH1 className='dark' >
        AWESOME FREE STOCK PHOTOS,LIT IMAGES SHARED BY CREATORS.
        <Search/> 
        </StyledH1>
    </StyledContainer>
</main>
  )
}

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 90vh;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  transition: background-color 0.3s ease; 

  &.dark {
    background-color: #000; 
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
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  max-width: 660px;
  margin: auto;
  text-align: center;
  padding: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
    max-width: 90%;
  }
`;




export default Header