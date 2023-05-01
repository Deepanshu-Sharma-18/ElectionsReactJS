import React,{useState} from 'react'

const NewElection = ({state}) => {

    const [elecname , Setelecname] =  useState("");

    const startElections = async({electionname}) => {
      const { contract } = state;
          const transaction1 = await contract.createElection(electionname);
          await transaction1.wait();
          console.log("Transaction is done");
    };

    const changeValue = (event) => {
      Setelecname(event.target.value);
    };

  return (
    <div className='w-screen h-screen bg-slate-300 flex items-center justify-center text-center'>
        <form className="bg-white shadow-md rounded-xl px-16 pt-6 pb-8 mb-4">
            <div className="mb-4 ">
            <label className="block text-gray-700 text-lg font-medium mb-2" htmlfor="electionname">
               Election Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="electionname" onChange={changeValue} type="text" placeholder="ElectionName"/>
            </div>
            
            
            <button onClick={()=>{startElections("")}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Create
            </button>
            <p className='text-red-400 pt-5'>* It may take up to 1 min to process. Please wait until</p>
        </form>
        
    </div>
  )
}

export default NewElection