import React,{useState,useContext} from 'react'
import { ethers } from "ethers";
import { StateContext } from '../data/StateContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AddVoter = () => {

  const { state } = useContext(StateContext);
  const nav = useNavigate();
  const [ searchparams ] = useSearchParams();
  const [msg , setmessage] = useState("Transaction may take 15-30s to execute");


  

  const AddVoters = async() => {
    try{
      setmessage(" Executing transaction... Please Wait");
      const id = searchparams.get('id');
      const { contract } = state;
      const transaction1 = await contract.addVoter(parseInt(id), ethers.utils.getAddress(voteradd));
      await transaction1.wait();
      console.log("Transaction is done");
      setmessage("transaction is done");
      nav(-1);
    }catch (error) {
//       const errorData = JSON.parse(error);
// const errorMessage = errorData.data.originalError.message;
// console.log(errorMessage); // "execution reverted: The voter has already been added."

      console.log(error.reason)
      setmessage(error.reason);
    }
};



  const [voteradd , setVoteradd] =  useState("");
  const changeValue = (event) => {
    setVoteradd(event.target.value);
  };
  return (
    
    <div className='w-screen h-screen bg-slate-300 flex items-center justify-center text-center'>
        <form className="bg-white shadow-md rounded-xl px-16 pt-6 pb-8 mb-4">
            <div className="mb-4 ">
            <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="electionname">
               Voter Address
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="electionname" onChange={changeValue} type="text" placeholder="VoterAddress"/>
            </div>
            
            
            <button onClick={()=>{AddVoters()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Add
            </button>
            <p className='text-red-400 pt-5'>{msg}</p>
        </form>
        
    </div>
  )
}

export default AddVoter