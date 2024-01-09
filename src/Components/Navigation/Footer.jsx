import React from 'react';
import './Style.css';
import { Link } from 'react-router-dom';
import { footerLinks, socialMedia} from '../../Constants/Constant';

function Footer() {
  return (
    <div className="px-6 flex justify-center items-center z-50 sm:px-6 bg-[#00040f]">
    <div className="w-full xl:max-w-[1280px]">
    <section className='flex  justify-center items-center  py-6 flex-col sm:py-16'>
        <div className="flex justify-center item-center flex-col w-full mb-8 mb:flex-row">
            <div className='flex-[1.5] w-full flex flex-row justify-between flex-wrap mt-10 md:mt-0'>
            {footerLinks.map((footerlink)=>(
                <div key={footerlink.title} className='flex flex-col my-4 min-w-[150px] ss:my-0'>
                    <h4 className='font-poppins font-medium text-[21px] leading-[27px] text-white'>
                        {footerlink.title}
                    </h4>
                    <ul className='list-none mt-4'>
                        {footerlink.links.map ((link,index)=>(
                            <li key={link.name}  className={`font-poppins font-normal text-[16px] leading-[24px] text-white hover:text-[#00f6ff] cursor-pointer ${index !== footerlink.links.length -1 ? 'mb-4 ' : 'mb-0'}`}>
                             <Link to={link.link} target={link.target} rel="noopener noreferrer">
                                {link.name}
                             </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            </div>
        </div>
        <div className='w-full flex justify-between item-center flex-col pt-6 border-t-[1px] border-t-[#33e0ffr45] md:flex-row'>
            <p className='font-normal text-center text-[18px] leading-[27px] text-white'>
                2023 Imagixx. All Rights Reserved
            </p>
            <div className='flex flex-row mt-6 justify-center item-center text-white md:mt-0'>
                {socialMedia.map((social, index)=>(
                    <div key={social.id} className={`w-[21px] h-[21px] object-contain cursor-pointer ${index !== socialMedia.length -1 ? 'mr-6 ': 'mr-0'}`}>
                        <Link to={social.link} target={social.target} rel="noopener noreferrer">                        
                        {social.icon}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </section>
    </div>
    </div>
    
  )
}

export default Footer