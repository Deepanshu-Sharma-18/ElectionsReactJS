import React, {useState} from 'react'

const AppBar = ({account}) => {

    const [hidden,sethidden] = useState(false);

    const accountVisibility = async() => {
        sethidden(!hidden);
    };
    

  return (
    <div className='relative'>
        <div className=' bg-[#392260] h-20 w-screen px-10 flex justify-between items-center'>
            <div className="">
                <p className='text-white text-center font-bold text-3xl'>Web3Elections</p>
            </div>
            <div className=" absolute top-20  md:top-auto md:right-28 ">
                {hidden===true?<div className="h-auto w-auto">
                    <p  className='text-xl font-bold sm:text-sm text-black md:text-white'> {account}</p>
                </div>:<div></div>}
            </div>
            <div className=" h-14 w-14 md:h-16 md:w-16">
                <button onClick={accountVisibility}>
                    <img src='https://img.freepik.com/free-icon/avatar_318-158392.jpg'/>
                </button>
            </div>
        </div>
        
        
        
    </div>
    
  )
}

export default AppBar