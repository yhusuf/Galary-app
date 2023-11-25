import '../Navbar/Style.css';
import { useState } from 'react';
import {close,menu} from '../../assets';
import {navLinks} from  '../../Constants/Constant';
import { GiFloatingGhost } from "react-icons/gi";

function Navbar() {
    const [toggle, SetToggle] = useState(false);
  return (
    <div className="px-6 flex justify-center items-center sm:px-6">
      <div className="w-full xl:max-w-[1280px]">
      <nav className="w-full flex py-6 justify-between item-center navbar">
        <div className='flex'>
          <div className='p-[5px] relative bottom-1'>
          <GiFloatingGhost className='text-[30px] h-[32px]' style={{color:'black'}}/>
          </div>
          <h2 className='hidden sm:block justify-center items-center text-2xl ml-4 font-poppins font-semibold'>Imagixx</h2>
        </div>
        <ul className="list-none hidden justify-end item-center sm:flex">
           {navLinks.map((nav, index)=>(
            <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[20px] text-black ${index===navLinks.length -1 ? 'mr-0' : 'mr-10'} ` } >
                <a href={`#${nav.id}`} >
                  {nav.title}
                </a>
            </li>
           ))} 
        </ul>
        
        <div className="sm:hidden flex flex-1 justify-end item-center">
          <img src={toggle ? close: menu } alt="menu" className="w-[28px] h-[28px] object-contain " onClick={() => SetToggle((prev) => !prev)} />

          <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
        <ul className="list-none flex flex-col justify-end item-center">
           {navLinks.map((nav, index)=>(
            <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] text-black ${index === navLinks.length -1 ? 'mr-0' : 'mb-4'} ` } >
                <a href={`#${nav.id}`} >
                  {nav.title}
                </a>
            </li>
           ))}
            
        </ul>
        </div>
        </div>
    </nav>
      </div>
    </div>
  )
}

export default Navbar