//used Mocha and Chai
const Transfer = artifacts.require('./Transfer.sol');
const Web3 = require("web3")

contract('Transfer', (accounts) => {

  accountSender = accounts[2]
  accountReceiver = accounts[0]

  before(async () => {
    this.transfer = await Transfer.deployed()
  })

  it('should deploy successfully', async () => {
    const address = await this.transfer.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it("should make transfer", async () => {
    this.transfer.events.DonationEvent({
      fromBlock:'latest'
    }, 
      function(err, result) {
        console.log("LALA");
        // console.log(Web3.eth.abi.decodeParameters(['address', 'address', 'uint256', 'uint64', 'string'], result))
      });
    const startingBalance = await web3.eth.getBalance(accountReceiver)
    const result = (await this.transfer.pay(accountReceiver, "This is a messsage", 2, { from: accountSender, value: 1 * 1e18 }));
    assert.equal((await web3.eth.getBalance(accountReceiver)), eval(startingBalance) + eval(1 * 1e18));
    
  });

  it('should list donations', async () => {
    const result = (await this.transfer.getDonations())[0];
    assert.equal(result[0], accountSender);
    assert.equal(result[1], accountReceiver);
    assert.equal(result[2], 1 * 1e18);
    assert.equal(result[3], 2);
    assert.equal(result[4], "This is a messsage");
  })
})