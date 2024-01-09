import './Style.css';
import { useState } from 'react';
import { Close, Menu } from '../../assets';
import {navLinks} from  '../../Constants/Constant';
import { GiFloatingGhost } from "react-icons/gi";
import {NavLink,Link} from 'react-router-dom';


function Navbar() {
    const [toggle, SetToggle] = useState(false);
  return (
    <div className="px-6 flex justify-center items-center z-50 sm:px-6">
      <div className="w-full xl:max-w-[1280px]">
      <nav className="w-full flex py-6 justify-between items-center navbar">
        <div className='flex'>
          <div className='cursor-pointer flex'>
          <NavLink to={'/'} className='cursor-pointer flex'>
          <div className='p-[5px] relative bottom-1'>
              <GiFloatingGhost className='text-[30px] h-[32px]' style={{color:'white'}}/>
            </div>
              <h2 className='hidden cursor-pointer sm:block justify-center items-center text-2xl ml-4 font-poppins font-semibold text-white'>Imagixx</h2> 
          </NavLink>
            </div>
        </div>
        <ul className="list-none hidden justify-end items-center sm:flex">
           {navLinks.map((nav, index)=>(
            <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[20px] text-white ${index===navLinks.length -1 ? 'mr-0' : 'mr-10'} ` } >
                <Link to={nav.link}>
                  {nav.title}
                </Link>
            </li>
           ))} 
        </ul>
        
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img src={toggle ? Close : Menu } alt="menu" className="w-[28px] h-[28px] object-contain" onClick={() => SetToggle((prev) => !prev)} />

          <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-gray-800 bg-opacity-60 backdrop-blur-sm absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar text-opacity-3 z-50`}>
        <ul className="list-none flex flex-col justify-end items-center z-100">
           {navLinks.map((nav, index)=>(
            <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${index === navLinks.length -1 ? 'mr-0' : 'mb-4'} ` } >
                <Link to={nav.link}>
                {nav.title}
                </Link>
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