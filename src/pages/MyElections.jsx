import React, { useEffect, useContext, useState,useCallback } from "react";
import { ethers } from "ethers";
import { StateContext } from "../data/StateContext";
import abi from '../contracts/Election.json';
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
} from "react-router-dom";

const MyElections = () => {
  
  const { state,setState } = useContext(StateContext);
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();
  const [msg, setmessage] = useState("Transaction may take 15-30s to execute");

  const [electionName, setelectionName] = useState("");
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState([]);
  const [own, setowner] = useState("");
  const [id , setid] = useState();
  const [visible ,setvisible] = useState(false);
  const [winner , setwinner] = useState("");

  
  const getelections = useCallback(async () => {
    const { contract } = state;
  
    const ide = searchparams.get("id");
  
    console.log(parseInt(ide));
    const transaction2 = await contract.getElection(parseInt(ide));
    setdata(transaction2[1]);
    console.log("data",data);
    const transaction1 = await contract.getVotersStatus(parseInt(ide));
    setdata1(transaction1);
    console.log("voters:",data1);
    setid(parseInt(ide));
    setowner(transaction2[0].owner);
    setelectionName(transaction2[0].name);
  
    if (transaction2[0].isActive === false) {
      console.log("is active", transaction2[0].isActive);
      await maxcount();
      setvisible(true);
    }
  }, [searchparams, state]);
  
  useEffect(() => {
    getelections();
  }, [getelections]);
  

  const startElection = async () => {
    try {
      setmessage(" executing transaction... Please Wait");
      const { contract } = state;
      const id = searchparams.get("id");
      const transaction2 = await contract.activateElection(parseInt(id));
      await transaction2.wait();
      console.log("Transaction is done");
      setmessage("transaction is done");
    } catch (error) {
      setmessage(error.reason);
    }
  };

  const endElection = async () => {
    try {
      setmessage(" executing transaction... Please Wait");
      const { contract } = state;
      const id = searchparams.get("id");
      const transaction2 = await contract.endElection(parseInt(id));
      await transaction2.wait();
      console.log("Transaction is done");
      setmessage("Transaction done");
      setvisible(true);
      maxcount();
    } catch (error) {
      setmessage(error.reason);
    }
  };

  const maxcount = async() => {

    console.log("data in maxcount" , data);
    let max = 0 ;
    let iteration;
   
     for(let i=0;i<data.length;i++){
      if(parseInt(data[i].voteCount) > max){
        max = parseInt(data[i].voteCount) ;
        iteration=i;
      }
     }

     console.log("max" , max);
     setwinner(data[iteration].name);


    
  };

  return (
    <div className="h-full w-full bg-violet-100 flex-col py-10 px-4 ">
      <div className="container w-screen flex-col justify-center items-center">
        <h1 className=" text-violet-700 font-extrabold text-3xl text-center">
          {electionName}
        </h1>
        <h1 className=" text-violet-700 font-semibold text-sm text-center">
          {own}
        </h1>
        <div className="flex items-center justify-around">
          <button onClick={startElection}>
            <div className="flex justify-center items-center text-center bg-violet-700 hover:scale-105 w-[150px] rounded-xl m-5 h-10 ">
              <p className=" font-medium text-md">
                <span className="text-lg font-bold text-white">
                  Start Election{" "}
                </span>
              </p>
            </div>
          </button>
          <button onClick={endElection}>
            <div className="flex justify-center items-center text-center bg-violet-700 hover:scale-105 w-[150px] rounded-xl m-5 h-10 ">
              <p className=" font-medium text-md">
                <span className="text-lg font-bold text-white">
                  End Election{" "}
                </span>
              </p>
            </div>
          </button>
        </div>
      </div>

      <div className=" flex justify-center w-screen items-center">
        {visible === false?
        <div className="flex mx-auto justify-center text-white bg-violet-700 hover:scale-105 w-[165px] rounded-xl my-10 h-10 ">
          <button
            onClick={() =>
              navigate({
                pathname: "/addvote",
                search: createSearchParams({
                  id: `${parseInt(id)}`,
                }).toString(),
              })
            }
          >
            <span className="text-lg text-center self-center font-bold">
              {" "}
              Vote{" "}
            </span>
          </button>
        </div>: <div className="flex mx-auto justify-center ">
          <span className="text-2xl text-center text-orange-400 font-extrabold my-10">Winner : <span className="text-violet-700 font-extrabold text-2xl text-center">{winner}</span> </span>
            
        </div>
        }
      </div>
      <p className="text-center text-lg font-bold text-red-400 my-15">
        {msg}
      </p>

      <div className="h-10"></div>
      <div className=" flex-col justify-center items-center">
        <h1 className="text-xl text-center font-bold pb-30 ">Candidates</h1>
        <table className="table-auto mx-auto my-10 ">
          <thead>
            <tr>
              <th className="px-10 bg-violet-700 text-white py-2">
                Candidate Name
              </th>
              <th className="px-10 bg-violet-700  text-white py-2">
                Number of Votes
              </th>
            </tr>
          </thead>
          <tbody>
            {data === null ? (
              <div className="">Loading..</div>
            ) : data.length === 0 ? (
              <tr >
                <td className="border bg-red-200 text-md font-semibold px-10 py-2">
                  Yet to be added
                </td>
                <td className="border bg-red-200 text-md font-semibold px-10 py-2">
                  null
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
         
                <tr key={index}>
                  <td className="border bg-red-200 text-md font-semibold px-10 py-2">
                    {data[index].name}{" "}
                  </td>
                  <td className="border bg-red-200 text-md font-semibold px-10 py-2">
                    {parseInt(data[index].voteCount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex mx-auto justify-center text-white bg-violet-700 hover:scale-105 w-[165px] rounded-xl m-5 h-10 ">
          <button
            onClick={() =>
              navigate({
                pathname: "/addcandidate",
                search: createSearchParams({
                  id: `${parseInt(id)}`,
                }).toString(),
              })
            }
          >
            <span className="text-lg text-center self-center font-bold">
              + Add Candidate{" "}
            </span>
          </button>
        </div>
      </div>

      <div className="my-10 flex-col justify-center items-center">
        <h1 className="text-xl text-center font-bold pb-30 ">Voters</h1>
        <table className="table-auto mx-auto my-10 ">
          <thead>
            <tr>
              <th className="px-10 bg-violet-700 text-white py-2">
                Voter Address
              </th>
              <th className="px-10 bg-violet-700  text-white py-2">
                has voted
              </th>
            </tr>
          </thead>
          <tbody>
            {data1 === null ? (
              <div className="">Loading..</div>
            ) : data1.length === 0 ? (
              <tr >
                <td className="border bg-red-200 text-md font-semibold px-5 py-2">
                  Yet to be added
                </td>
                <td className="border bg-red-200 text-md font-semibold px-5 py-2">
                  null
                </td>
              </tr>
            ) : (
              data1.map((item, index) => (
                <tr key={index}>
                  <td className="border bg-red-200 text-xs font-semibold px-5 py-2">
                    {data1[index].user}
                  </td>
                  <td className="border bg-red-200 text-md font-semibold px-5 py-2">
                    {data1[index].hasVoted.toString()
}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex mx-auto justify-center text-white bg-violet-700 hover:scale-105 w-[165px] rounded-xl my-10 h-10 ">
          <button
            onClick={() =>
              navigate({
                pathname: "/addvoter",
                search: createSearchParams({
                  id: `${parseInt(id)}`,
                }).toString(),
              })
            }
          >
            <span className="text-lg text-center self-center font-bold">
              + Add Voter 
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyElections;
