import React, { useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ethers } from "ethers";


import ElectionCard from "./ElectionCard";

const Body = ({ state,account }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  console.log("entry point", state);
  const [totElections, settotElections] = useState(0);
  const [electionList, setElectionList] = useState([]);

  useEffect(() => {
    const gettotalelections = async () => {
      const { contract } = state;
      const transaction1 = await contract.getElectionCount();
      const totElections = transaction1.toNumber(); // move totElections inside the function
      console.log(totElections);
      
      const electionArr = [];
      for (let i = 0; i < totElections; i++) {
        const transaction2 = await contract.getElection(i);
        electionArr.push(transaction2[0].name.toString());
        console.log(transaction2[0]);
      }
      setElectionList(electionArr);
      settotElections(totElections);
      setVisible(true);
    };

    gettotalelections();
  }, []);

  return (
    <div className="mx-auto">
 
      {visible === false ? (
        <div className="flex w-screen h-screen justify-center items-center text-lg font-bold">
          Loading....
        </div>
      ) : (
        <div className="">
          <div className="flex my-10 sm:px-40 sm:my-2">
            <button onClick={() => navigate(`/newelection`)}>
              <div className="flex justify-center items-center text-center bg-orange-400 hover:scale-105 w-[150px] rounded-xl m-5 h-10 ">
                <p className=" font-medium text-md">
                  <span className="text-lg font-bold">+ </span>Create Election
                </p>
              </div>
            </button>
          </div>

          <div className="text-3xl font-extrabold text-violet-700  flex w-screen justify-center items-center text-center">
            <h1>Live Elections </h1>
          </div>

          <div className=" flex justify-start md:justify-center sm:px-32 items-start md:items-center mx-5 my-9 w-screen">
            {electionList === null ? (
              <div className="">Loading......</div>
            ) : (
              electionList.length === 0? <div className="flex justify-center items-center text-center text-2xl my-44 font-extrabold text-blue-700">No Live Elections </div>:
              electionList.map((item, index) => (
                <button
                  onClick={() =>
                    navigate({
                      pathname: "/myelections",
                      search: createSearchParams({ id: `${index}` }).toString(),
                    })
                  }
                >
                  <ElectionCard key={index} electionName={item} />
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
