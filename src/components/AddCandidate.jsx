import React,{useState,useContext} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ethers } from "ethers";
import { StateContext } from '../data/StateContext';

const AddCandidate = () => {
  
    const { state } = useContext(StateContext);
    const [ searchparams ] = useSearchParams();
    const navigate = useNavigate();
    const [msg , setmessage] = useState("Transaction may take 15-30s to execute");
  
    const AddCandidates = async() => {
      try{
        setmessage(" Executing transaction... Please Wait");
        const { contract } = state;
        const id = searchparams.get('id');
        const transaction1 = await contract.addCandidates(parseInt(id),voteradd);

        console.log("Transaction is done");
        setmessage("transaction is done");
        navigate(-1);
      }catch(error){
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
                 Candidate Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="electionname" onChange={changeValue} type="text" placeholder="Candidate Name"/>
              </div>
              
              
              <button onClick={()=>{AddCandidates()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Add
              </button>
              <p className='text-red-400 pt-5'>{msg}</p>
          </form>
          
      </div>
    )
}

export default AddCandidate