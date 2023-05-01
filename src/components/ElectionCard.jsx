import React from 'react'

const ElectionCard = ({electionName}) => {
  return (
    <div className='h-[250px] w-[200px] bg-blue-400 relative hover:scale-105 rounded-xl shadow-lg shadow-[#392260] mx-3 my-4'>
        <img className='h-full rounded-xl w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNhB1aFPd-hm0RZqhlCzED3C9dk42Se2d6MA&usqp=CAU" alt="banner" />
        <p className='text-white absolute top-[120px] text-center w-full'>{electionName}</p>
    </div>
  )
}

export default ElectionCard