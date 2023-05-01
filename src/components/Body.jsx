import React , {useState,useEffect} from 'react'
import { Link, Navigate, Outlet,useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import ElectionCard from './ElectionCard';


const Body = ({state}) => {

  const navigate = useNavigate();
  const [totElections , settotElections] = useState();
  const [electionList,setElectionList] = useState([]);



  useEffect(() => {
      const getelections = async () => {
        const { contract } = state;
        const transaction1 = await contract.getElection(0);
        // settotElections(transaction1[0]);
        console.log("election count is " , transaction1[0]);
        // for(let i = 0; i < ethers.utils.formatEther(totElections)*1000000000000000000; i++){
        //   const transcation2 = await contract.getElection(i);
        //   console.log(transcation2[0]);
        // }
      };
      getelections();
    }, []);

    // const [visible,setVisible] = useState(false);
    // const [candidates,setCandidates] = useState([]);
    // const [electionName , SetElectionName] = useState('');

    // const onlickevent = async() => {
    //     const { contract } = state;
    //     const transaction1 = await contract.createElection("Election 1");
    //     const transaction2 = await contract.activateElection(0);
    //     await transaction1.wait();
    //     await transaction2.wait();
    //     console.log("Transaction is done");
    // };

    // const AddCandidates = async() => {
    //     const { contract } = state;
    //     const transaction1 = await contract.addCandidates(0,'prabhu');
    //     const transaction2 = await contract.addCandidates(0,'raj');
    //     const transaction3 = await contract.addCandidates(0,'shubham');
    //     await transaction1.wait();
    //     await transaction2.wait();
    //     await transaction3.wait();
    //     console.log("Transaction is done");
    // };

    // const AddVote = async() => {
    //     const { contract } = state;
    //     const transaction1 = await contract.vote(0,0);
    //     await transaction1.wait();
    //     console.log("Transaction is done");
    // };

    // const GetCandidate = async() => {
    //     setVisible(false);
    //     const { contract } = state;
    //     const transaction1 = await contract.getElection(0);
    //     setCandidates(transaction1);
    //     console.log(transaction1);
    //     SetElectionName(candidates[0]);
    //     console.log(electionName);
    //     setVisible(true);
    //     console.log("Transaction is done");
    // };

    // const AddVoters = async() => {
    //     const { contract } = state;
    //     const transaction1 = await contract.addVoter(0, ethers.utils.getAddress("0x54BA72F61B1513e2461c3Ee24f6f61679Ed7a4fB"));
    //     const transaction2 = await contract.addVoter(0, ethers.utils.getAddress("0x6205e90Fdb92B3Da03E7D7F267fBc3C619FabB86"));
    //     await transaction1.wait();
    //     await transaction2.wait();
    //     console.log("Transaction is done");
    // };
  return (

    <div className="">
      <div className="flex">
          <button onClick={()=> navigate('newelection',{state})}>
            <div className="flex justify-center items-center text-center bg-orange-400 hover:scale-105 w-[150px] rounded-xl m-5 h-10 ">
                <p className=' font-medium text-md'><span className='text-lg font-bold'>+ </span>Start Election</p>
            </div>
          </button>

          <button>
            <div className="flex justify-center items-center text-center bg-purple-300 hover:scale-105 w-[150px] rounded-xl my-5 mx-1 h-10 ">
                <p className=' font-medium text-md'>My Elections</p>
            </div>
          </button>
      </div>

      <div className=' flex flex-wrap justify-start items-start mx-5 my-5 w-screen'>

          
            
          

          <ElectionCard electionName={"Election 1"}/>
          <button onClick={()=> navigate('electionpage')}>
            <ElectionCard electionName={"Election 1"}/>
          </button>
          <ElectionCard electionName={"Election 1"}/>

          <ElectionCard electionName={"Election 1"}/>
          <ElectionCard electionName={"Election 1"}/>
      </div>
    </div>


  )
}

export default Body