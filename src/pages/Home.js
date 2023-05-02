import React from 'react'
import AppBar from '../components/AppBar'
import Body from '../components/Body'
import abi from '../contracts/Election.json';
  import { useState, useEffect } from "react";
  import { ethers } from "ethers";

const Home = () => {



  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x79ce44C93756b1dF90582c04e72413224Ca7b7a3";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  return (
    <div>
        <AppBar account={account}/>
        {

          (state.contract && state.provider && state.signer) === null?<div></div>:

              <Body state={state}/>
          
        }
    </div>
  )
}

export default Home