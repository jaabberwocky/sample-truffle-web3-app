const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", (accounts) => {
  it("...should store the value 89.", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    // Set value of 89
    await simpleStorageInstance.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await simpleStorageInstance.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });

  it("...should get the value 100 after storing it", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    // Set value of 89
    await simpleStorageInstance.set(100, { from: accounts[0] });

    // Get stored value
    const storedData = await simpleStorageInstance.get.call();

    assert.equal(storedData, 100, "The value 100 was not stored.");
  });

  it("...should get the balance of 0 by default", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();
    const accounts = await web3.eth.getAccounts();

    // Get stored value
    const balance = await simpleStorageInstance.getBalance(accounts[0]);

    assert.equal(balance, 0, "The default balance value of 0 was not returned");
  });

  it("...should get the balance of 100 after requesting for it", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();
    const accounts = await web3.eth.getAccounts();

    await simpleStorageInstance.request(100);

    // Get stored value
    const balance = await simpleStorageInstance.getBalance(accounts[0]);

    assert.equal(balance, 100, "The balance value of 100 was not returned");
  });
});
