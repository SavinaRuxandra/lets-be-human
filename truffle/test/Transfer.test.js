//used Mocha and Chai
const Transfer = artifacts.require('./Transfer.sol')

contract('Transfer', (accounts) => {

  accountSender = accounts[0]
  accountReceiver = accounts[1]

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
    const startingBalance = await web3.eth.getBalance(accountReceiver)
    this.transfer.pay(accountReceiver, "This is a messsage", 2, { from: accountSender, value: 1 * 1e18 });
    assert.equal(await web3.eth.getBalance(accountReceiver), eval(startingBalance) + eval(5))
  });

  it('should list donation', async () => {
    const result = (await this.transfer.getDonations())[0];
    assert.equal(result[0], accountSender);
    assert.equal(result[1], accountReceiver);
    assert.equal(result[2], 1 * 1e18);
    assert.equal(result[3], 2);
    assert.equal(result[4], "This is a messsage");
  })
})