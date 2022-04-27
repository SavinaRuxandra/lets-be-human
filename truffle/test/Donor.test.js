//used Mocha and Chai
const Donor = artifacts.require('./Donor.sol')

contract('Donor', (accounts) => {

  currentAccount = accounts[0]

  before(async () => {
    this.donor = await Donor.deployed()
  })

  it('should deploy successfully', async () => {
    const address = await this.donor.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('should get name', async () => {
    const result = (await this.donor.getDonorName(currentAccount));
    assert.equal(result, "");
  })

  it('should set name', async () => {
    await this.donor.setDonorName(currentAccount, "New Name");
    const result = await this.donor.getDonorName(currentAccount)
    assert.equal(result, "New Name");
  })
})