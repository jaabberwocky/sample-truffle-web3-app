import React, { Component, useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

const App = () => {
  const [storageValue, setStorageValue] = useState(0);
  const [transactionValue, setTransactionValue] = useState(0);
  const [web3, setWeb3] = useState(null);
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

      // TODO: understand why we can't use instanceContract here
      const response = await instance.methods.get().call();
      setStorageValue(response);
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
  };

  const handleValueChange = (event) => {
    setTransactionValue(event.target.value);
  };

  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <p>Your account: {hasLoaded ? accounts[0] : "loading"}</p>
      <h2>Smart Contract Example</h2>
      <p>
        If your contracts compiled and migrated successfully, below will show a
        stored value of the contract.
      </p>
      <form onSubmit={handleSend}>
        <input value={transactionValue} onChange={handleValueChange} />
        <button type="submit">send</button>
      </form>
      <div>The stored value is: {storageValue}</div>
    </div>
  );
};

export default App;
