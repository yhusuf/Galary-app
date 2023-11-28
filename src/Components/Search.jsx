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
            <input  onChange={(e) => setInput(e.target.value)} 
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
  position: relative;
  width: 100%;
  max-width: 590px;

  div {
    width: 100%;
    position: relative;
    display: flex;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #838282, #0c0c0c30);
    font-size: 20px;
    border-radius: 10px;
    outline: none;
    color: white;
    width: 100%; 
    height: 50px;
    outline: none;
    padding-left: 45px;
    padding-right: 10px;
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