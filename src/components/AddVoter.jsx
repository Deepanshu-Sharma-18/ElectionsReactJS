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
      console.log(error.reason)
      setmessage(error.reason);
    }
};



  const [voteradd , setVoteradd] =  useState("");
  const changeValue = (event) => {
    setVoteradd(event.target.value);
  };
  return (
    
    <div className='w-screen h-screen bg-violet-100 flex items-center justify-center text-center'>
        <form className="bg-violet-700 shadow-md rounded-xl px-40 pt-20 pb-20 mb-4">
            <div className="mb-4 ">
            <label className="block text-white text-xl  font-extrabold mb-2" htmlFor="electionname">
               Voter Address
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 my-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="electionname" onChange={changeValue} type="text" placeholder="VoterAddress"/>
            </div>
            
            
            <button onClick={()=>{AddVoters()}} className="bg-white hover:bg-violet-100 text-violet-700 font-bold py-2 px-14 rounded focus:outline-none focus:shadow-outline" type="button">
                Add
            </button>
            <p className='text-red-400 pt-5'>{msg}</p>
        </form>
        
    </div>
  )
}

export default AddVoter