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
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function setContract() {
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        "0x5A20Ef34b97657baFbFc9020E35780ced8beBe32"
      );

      setAccounts(accounts);
      setWeb3(web3);
      setContract(instance);

      const response = await contract.methods.get().call();
      setStorageValue(response);
      setHasLoaded(true);
    }
    setContract();
  }, []);

  const handleSend = async (event) => {
    event.preventDefault();
    await contract.methods.set(transactionValue).send({ from: accounts[0] });
    const response = await contract.methods.get().call();
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

// class App extends Component {
//   state = { storageValue: 0, web3: null, accounts: null, contract: null };

//   componentDidMount = async () => {
//     try {
//       // Get network provider and web3 instance.
//       const web3 = await getWeb3();

//       // Use web3 to get the user's accounts.
//       const accounts = await web3.eth.getAccounts();

//       // Get the contract instance.
//       const networkId = await web3.eth.net.getId();
//       const deployedNetwork = SimpleStorageContract.networks[networkId];
//       const instance = new web3.eth.Contract(
//         SimpleStorageContract.abi,
//         "0x5A20Ef34b97657baFbFc9020E35780ced8beBe32"
//       );

//       // Set web3, accounts, and contract to the state, and then proceed with an
//       // example of interacting with the contract's methods.
//       this.setState({ web3, accounts, contract: instance }, this.runExample);
//     } catch (error) {
//       // Catch any errors for any of the above operations.
//       alert(
//         `Failed to load web3, accounts, or contract. Check console for details.`
//       );
//       console.error(error);
//     }
//   };

//   runExample = async () => {
//     const { accounts, contract } = this.state;

//     // Stores a given value, 5 by default.
//     await contract.methods.set(15).send({ from: accounts[0] });

//     // Get the value from the contract to prove it worked.
//     const response = await contract.methods.get().call();

//     // Update state with the result.
//     this.setState({ storageValue: response });
//   };

//   render() {
//     if (!this.state.web3) {
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }
//     return (
//       <div className="App">
//         <h1>Good to Go!</h1>
//         <p>Your Truffle Box is installed and ready.</p>
//         <p>Your account: {this.state.accounts[0]}</p>
//         <h2>Smart Contract Example</h2>
//         <p>
//           If your contracts compiled and migrated successfully, below will show
//           a stored value of 5 (by default).
//         </p>
//         <p>
//           Try changing the value stored on <strong>line 42</strong> of App.js.
//         </p>
//         <div>The stored value is: {this.state.storageValue}</div>
//       </div>
//     );
//   }
// }

export default App;
