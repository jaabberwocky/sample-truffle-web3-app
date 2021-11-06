import React, { Component, useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

const App = () => {
  const [storageValue, setStorageValue] = useState(0);
  const [transactionValue, setTransactionValue] = useState(0);
  const [requestValue, setRequestValue] = useState(0);
  const [balance, setBalance] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [accounts, setAccounts] = useState(null);
  const [instanceContract, setInstanceContract] = useState(null);

  useEffect(() => {
    async function setContract() {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        "0x5A20Ef34b97657baFbFc9020E35780ced8beBe32"
      );
      setAccounts(accounts);
      setWeb3(web3);
      setInstanceContract(instance);

      // set account changed event
      window.ethereum.on("accountsChanged", async function () {
        const newAccounts = await web3.eth.getAccounts();
        console.log("newAccounts:", newAccounts[0]);
        setAccounts(newAccounts);
      });

      // TODO: understand why we can't use instanceContract here
      const response = await instance.methods.get().call();
      setStorageValue(response);
      const _balance = await instance.methods.getBalance(accounts[0]).call();
      setBalance(_balance);

      setHasLoaded(true);
    }
    setContract();
  }, []);

  const handleSend = async (event) => {
    event.preventDefault();
    await instanceContract.methods
      .set(transactionValue)
      .send({ from: accounts[0] });
    const response = await instanceContract.methods.get().call();
    setStorageValue(response);
    setTransactionValue(0);
  };

  const handleValueChange = (event) => {
    setTransactionValue(event.target.value);
  };

  const handleRequest = async (event) => {
    event.preventDefault();
    await instanceContract.methods
      .request(requestValue)
      .send({ from: accounts[0] });
    const response = await instanceContract.methods.balance(accounts[0]).call();
    setBalance(response);
    setRequestValue(0);
  };

  const handleRequestValueChange = (event) => {
    setRequestValue(event.target.value);
  };

  return (
    <div className="App">
      <h1>Web3 App</h1>
      <p>Your account: {hasLoaded ? accounts[0] : "loading"}</p>
      <h2>Storage App</h2>
      <p>
        App showcasing smart contract interaction
      </p>
      <form onSubmit={handleSend}>
        Stored value: <input value={transactionValue} onChange={handleValueChange} />
        <button type="submit">change</button>
      </form>
      <form onSubmit={handleRequest}>
        Request value: <input value={requestValue} onChange={handleRequestValueChange} />
        <button type="submit">request</button>
      </form>
      <div>The stored value is: {storageValue}</div>
      <div>Account balance: {balance}</div>
    </div>
  );
};

export default App;
