import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ethers } from "ethers";
import { StateContext } from "../data/StateContext";

const Vote = () => {
  const [data, setdata] = useState([]);
  const { state } = useContext(StateContext);
  const [searchparams] = useSearchParams();
  const [msg, setmessage] = useState(
    "Transaction may take up to 30s to execute"
  );
  const nav = useNavigate();

  useEffect(() => {
    const getelections = async () => {
      const id = searchparams.get("id");
      const { contract } = state;

      console.log(parseInt(id));
      const transaction2 = await contract.getElection(parseInt(id));
      setdata(transaction2[1]);
      console.log(data);
    };
    
    getelections();
  }, []);
  
  const AddVote = async (index) => {
    try {
      setmessage(" Executing Transaction... Please Wait");
      const { contract } = state;
      const id = searchparams.get("id");
      const transaction1 = await contract.vote(parseInt(id), index);
      await transaction1.wait();
      console.log("Transaction is done");
      setmessage("transaction is done");
      nav(-1);
    } catch (error) {
      setmessage(error.reason);
    }
  };

  return (
      <div className="bg-violet-100 h-screen w-auto px-5">
        <div className=" flex-col justify-center items-center">
          <h1 className="text-xl md:text-3xl  text-violet-700 text-center font-extrabold pb-30 pt-28">Candidates</h1>
          <table className="table-auto mx-auto mt-10 ">
            <thead>
              <tr>
                <th className=" px-10 md:px-24 bg-violet-700 text-white py-0 md:py-2">
                  Candidate Name
                </th>
                <th className=" px-10 md:px-24 bg-violet-700  text-white py-0 md:py-2">
                  Number of Votes
                </th>
              </tr>
            </thead>
            <tbody>
              {data === null ? (
                <div className="">Loading..</div>
              ) : (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className=" text-md font-semibold px-10 md:px-24  py-0 md:py-2">
                      {data[index].name}{" "}
                    </td>
                    <td className=" text-md font-semibold px-10 md:px-24 py-0 md:py-2">
                      {parseInt(data[index].voteCount)}
                    </td>
                    <td>
                      <div className="flex mx-auto justify-center text-white bg-violet-700 hover:scale-105 w-auto rounded-xl m-5 px-5 md:px-10 h-7 md:h-10 ">
                        <button onClick={() => AddVote(index)}>
                          <span className="text-sm md:text-lg text-center self-center font-bold">
                            Vote
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <p className="text-center text-sm md:text-lg font-semibold text-red-400 my-20">
            {msg}
          </p>
        </div>
      </div>
  
  );
};

export default Vote;
