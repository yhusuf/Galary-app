import React from 'react';
import { Image } from '../Constants/Constant';
import '../Components/Navigation/Style.css';
import Footer from "../Components/Navigation/Footer";
import Navbar from "../Components/Navigation/Navsearch";
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Close, Menu } from '../assets';

function Popular() {
  return (
    <div className="w-full overflow-hidden bg-[#00040f] ">
      
      <div className="px-6 flex justify-center relative items-center z-[100] sm:px-6 ">
        <div className="w-full xl:max-w-[1280px] z-[100] ">
          <Navbar bg={`bg-[#00040f]`} tx={`text-white`} Menu={Menu} Close={Close}/>
        </div>
      </div>

      
      <div className="flex justify-center items-start mt-[140px] z-[1]">
        <div className="xl:max-w-[1280px] w-full z-[1]">
          <div className='flex flex-col flex-wrap justify-center items-center px-6'>
            <h1 className='font-bold text-[40px] text-white md:text-[40px] ssm:text-[35px]'>
              Popular searches
            </h1>
            <p className='text-white font-poppins text-[20px] md:text-[20px] xs:text-[15px] ssm:text-[15px]'>
              The Most popular search term on Imagixx
            </p>
          </div>
         <All
            animate={{opacity:1}}
            initial={{opacity:0}}
            exit={{opacity:0}}
            transition={{duration:0.9}}>
          <section className="flex flex-1 relative flex-wrap px-8 py-6 sm:py-16 md:flex-row z-[1]">
            {Image.map((view) => (
              <div key={view.id} className="relative w-full sm:w-1/4 md:w-1/4 xs:w-1/3 ssm:w-1/2 p-[10px] sm:p-2 md:p-4 cursor-pointer z-[1]">
                <NavLink to={"/Searched/" + view.name}>
                  <img src={view.image} alt={view.name} loading="lazy" className="w-full h-full object-cover rounded-lg"/>
                  <p className="absolute inset-0 flex items-center justify-center text-white text-[23px] font-bold  font-nopop tracking-wider">
                  {view.name}
                  </p>
                </NavLink>

              </div>
            ))}
           
            <div className='absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full blue__gradient'/>
            <div className='absolute z-[3] -left-1/2 bottom-0 w-[50%] h-[50%] rounded-full blue__gradient'/>
            <div className='absolute z-[0] w-[50%] h-[50%] top-0 -right-[50%] rounded-full blue__gradient'/>
          </section>
          <Footer/>
          </All>
        </div>
      </div>
    </div>
  );
}

const All = styled(motion.div)`
  z-index: 1;
`
export default Popular;
