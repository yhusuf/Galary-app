import { stats } from "../Constants/Constant";
import './Navigation/Style.css';


function Stat() {
  return (
    <div className="w-full overflow-hidden ">
          <div className="sm:px-16 px-6 flex justify-center items-center">
        <div className="xl:max-w-[1280px] w-full">
           <section className='flex justify-center items-center flex-row flew-wrap mb-6 sm:mb-9 '>
           {stats.map((stat)=>(
            <div key={stat.id} className={`flex-1 flex-wrap flex justify-center items-center flex-row m-3`}>
                <h4 className="font-poppins font-semibold text-[20px] leading-[33px] text-white xs:text-[40px] xs:leading-[53px]">{stat.value}</h4>
                <p className="font-poppins font-normal text-[15px] leading-[21px] text-gradient uppercase ml-3 text-white xs:text-[20px] xs:leading-[26px]">{stat.title}</p>
            </div>
           ))} 
            </section>
        </div> 
    </div>
    </div>
  )
}

export default Stat