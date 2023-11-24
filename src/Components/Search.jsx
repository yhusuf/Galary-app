import  {useState} from 'react';
import styled from 'styled-components';
import {FaSearch} from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';



function Search(){ 
const [input, setInput]= useState("");

const submitHandler = (e)=>{
    e.preventDefault();

};
  return (
        <Searchstyle onSubmit={submitHandler}>
        <div className='search' >
            <FaSearch></FaSearch>
            <input className='inpt' onChange={(e) => setInput(e.target.value)} 
            value={input}
            type="text" />
        </div>    
        </Searchstyle>
    
  );
}

const Searchstyle = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 100%;
    position: relative;
    max-width: 800px; /* Set a maximum width for the parent container */
    display: flex;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #838282, #0c0c0c30);
    font-size: 20px;
    padding: 1rem 3rem;
    border-radius: 10px;
    outline: none;
    color: white;
    width: 110%; /* Set initial width as a percentage */

    @media only screen and (min-width: 600px) {
      width: 80%; /* Gradually increase width for screens larger than 600px */
    }

    @media only screen and (min-width: 475px) and (max-width: 690px) {
      width: 95%;
      justify-content: center;
      align-self: center;
      
    }

    @media only screen and (min-width: 700px) {
      width: 500px; /* Set a fixed width for screens larger than 1200px */
    }
  }

  svg {
    position: absolute;
    top: 55%;
    left: 0%;
    transform: translate(10%, -50%);
    color: black;
    font-size: 20px;
  }
`;



export default Search;