import './Style.css';
import { useState } from 'react';
import {navLinks} from  '../../Constants/Constant';
import { GiFloatingGhost } from "react-icons/gi";
import Search from '../Search';
import {NavLink, Link} from 'react-router-dom'


function Navsearch({bg,tx,Close,Menu}) {
    const [toggle, SetToggle] = useState(false);
    return (
      <div className="flex justify-center items-center ">
        <div className={`w-full xl:max-w-[1280px] fixed z-[50] top-[-1px] px-6 ${bg} border-b-[1px] border-b-[#33e0ffr45] py-[0px] my-[0px] h-[80px] justify-center items-center flex sm:px-6`} >
        <nav className="w-full flex py-6 justify-between items-center navbar">
          <div className='flex z-500'>
            <NavLink to={"/"} className='cursor-pointer flex z-500 '>
            <div className='p-[5px] relative bottom-1 z-500'>
                <GiFloatingGhost className={`text-[30px] h-[32px] ${tx}`} />
              </div>
                <h2 className={`hidden cursor-pointer sm:block justify-center items-center text-2xl ml-4 font-poppins font-semibold ${tx}`}>Imagixx</h2> 
            </NavLink>
          </div>
              <div className='w-[500px] px-[15px] items-center justify-center flex'>
              <Search className='w-[100%]'/>
            </div>

          <ul className="list-none hidden justify-end items-center sm:flex">
             {navLinks.map((nav, index)=>(
              <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[20px] hover:text-[#ff3333r45] ${tx} ${index===navLinks.length -1 ? 'mr-0' : 'mr-10'} ` } >
                <Link to={nav.link}>
                {nav.title}
                </Link>
              </li>
             ))} 
          </ul>
          
          <div className="sm:hidden flex justify-end items-center">
            <img src={toggle ? `${Close}`: `${Menu}` } alt="menu" className={`w-[28px] h-[28px] object-contain`} onClick={() => SetToggle((prev) => !prev)} />
  
            <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-gray-800 bg-opacity-60 backdrop-blur-md absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-0`}>
          <ul className="list-none flex flex-col justify-end items-center z-50">
             {navLinks.map((nav, index)=>(
              <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${index === navLinks.length -1 ? 'mr-0' : 'mb-4'} ` } >
                    {nav.title}
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

export default Navsearch