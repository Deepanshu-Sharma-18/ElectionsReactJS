import React from 'react'

const ElectionCard = ({electionName}) => {
 
  const random =Math.floor(Math.random() * (4))+1;
  console.log("image",random);
  
  return (
    <div className='h-[250px] w-[200px]  relative hover:scale-105 rounded-xl shadow-lg shadow-[#392260a2] mx-3 my-4'>
        <img className='h-full rounded-xl w-full' src={`bg${random}.jpg`} alt="" />
        <p className=' text-white font-extrabold text-lg absolute top-[120px] text-center w-full'>{electionName}</p>
    </div>
  )
}

export default ElectionCard