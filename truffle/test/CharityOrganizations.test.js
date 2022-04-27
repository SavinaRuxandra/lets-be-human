//used Mocha and Chai
const CharityOrganizations = artifacts.require('./CharityOrganizations.sol')

contract('CharityOrganizations', (accounts) => {

  currentAccount = accounts[0]
  secondAccount = accounts[1]

  before(async () => {
    this.charityOrganizations = await CharityOrganizations.deployed()
  })

  it('should deploy successfully', async () => {
    const address = await this.charityOrganizations.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('should add and get charity organizations', async () => {
    await this.charityOrganizations.addCharityOrganization(currentAccount, "test@yahoo", "Name", "Description", "0745454545")
    const result = (await this.charityOrganizations.getCharityOrganizationByAddress(currentAccount));
    assert.equal(result[0], "test@yahoo");
    assert.equal(result[1], "Name");
    assert.equal(result[2], "Description");
    assert.equal(result[3], "0745454545");
  })

  it('should add and get charity organizations', async () => {
    await this.charityOrganizations.addCharityOrganization(currentAccount, "test1@yahoo", "Name1", "Description1", "07454545451")
    await this.charityOrganizations.addCharityOrganization(secondAccount, "test2@yahoo", "Name2", "Description2", "07454545452")

    const result = (await this.charityOrganizations.getAllCharityOrganizations());
    const first = result[1];
    const second = result[2]
    assert.equal(first[0], "test1@yahoo");
    assert.equal(first[1], "Name1");
    assert.equal(first[2], "Description1");
    assert.equal(first[3], "07454545451");
    assert.equal(second[0], "test2@yahoo");
    assert.equal(second[1], "Name2");
    assert.equal(second[2], "Description2");
    assert.equal(second[3], "07454545452");
  })
  
})