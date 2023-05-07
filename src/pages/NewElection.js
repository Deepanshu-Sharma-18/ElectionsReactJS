import React,{ useState,useContext } from 'react'
import { StateContext } from '../data/StateContext'
import { useNavigate } from 'react-router-dom';


const NewElection = () => {

  const { state,setState } = useContext(StateContext);
  const navigate = useNavigate();
  const [ msg , setMsg ] = useState("Transaction may take 30s to execute");

  console.log('NewElection',state);
  const [elecname , Setelecname] =  useState("");
  

  
  
  
  
  const startElections = async() => {
    try{

      const { contract } = state;

          const transaction1 = await contract.createElection(elecname);
          await transaction1.wait();
          console.log("Transaction is done");
          setMsg("Transaction is done");
          navigate(-1);
    }catch(error){
      setMsg(error.reason);
    }
    };

    const changeValue = (event) => {
      Setelecname(event.target.value);
    };

  return (
    <div className='w-screen h-screen bg-slate-300 flex items-center justify-center text-center'>
      <div className='shadow-md rounded-xl px-32 h-72 pt-6 pb-8 mb-4 bg-white py-16'>
        
        <form className="bg-white ">
            <div className="mb-4 ">
            <label className="block text-gray-700 py-4 text-lg font-semibold mb-2" htmlFor="electionname">
               Election Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="electionname" onChange={changeValue} type="text" placeholder="ElectionName"/>
            </div>
            
            
            <button onClick={()=>{startElections()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Create
            </button>
            <p className='text-red-400 pt-5'>{msg}</p>
        </form>
      </div>
        
    </div>
  )
}

export default NewElection