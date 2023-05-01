import React, {useState} from 'react'
import { Outlet } from 'react-router-dom';

const AppBar = ({account}) => {

    const [hidden,sethidden] = useState(false);

    const accountVisibility = async() => {
        sethidden(!hidden);
    };
    

  return (
    <div className=''>
        <div className=' bg-[#392260] h-20 w-screen px-10 flex justify-between items-center'>
            <div className="">
                <p className='text-white text-center font-bold text-3xl'>Web3Elections</p>
            </div>
            <div className=" h-14 w-14 md:h-16 md:w-16">
                <button onClick={accountVisibility}>
                    <img src='https://img.freepik.com/free-icon/avatar_318-158392.jpg'/>
                </button>
            </div>
        </div>
        <div className="flex justify-end">
            {hidden===true?<div className="absolute h-60 w-18 flex-col p-5 items-center justify-center text-white bg-gray-400">
                <h6 className='font-bold text-center text-lg text-[#392260]'>Account</h6>
                <p  className='text-sm'> {account}</p>
            </div>:<div></div>}
        </div>
        
        
    </div>
    
  )
}

export default AppBar