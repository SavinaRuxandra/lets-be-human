//used Mocha and Chai
const Posts = artifacts.require('./Posts.sol')

contract('Posts', (accounts) => {

  currentAccount = accounts[0]
  secondAccount = accounts[1]

  before(async () => {
    this.posts = await Posts.deployed()
  })

  it('should deploy successfully', async () => {
    const address = await this.posts.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('should add and get post', async () => {
    await this.posts.addPost(currentAccount, "Headline", "Description", "Url", ["photo1", "photo2"]);
    const result = (await this.posts.getPostById(0));
    assert.equal(result[0], 0)
    assert.equal(result[1], currentAccount)
    assert.equal(result[2], "Headline");
    assert.equal(result[3], "Description");
    assert.equal(result[4], "Url");
    expect(result[5]).to.eql(["photo1", "photo2"])
    assert.equal(result[6], false);
  })

  it('should update post', async () => {
    await this.posts.updatePost(0, currentAccount, "HeadlineUpdate", "DescriptionUpdate", "UrlUpdate",  ["photo1Updated", "photo2Updated"])
    const result = (await this.posts.getPostById(0));
    assert.equal(result[0], 0)
    assert.equal(result[1], currentAccount)
    assert.equal(result[2], "HeadlineUpdate");
    assert.equal(result[3], "DescriptionUpdate");
    assert.equal(result[4], "UrlUpdate");
    expect(result[5]).to.eql(["photo1Updated", "photo2Updated"])
    assert.equal(result[6], false);
  })

  it('should delete post', async () => {
    await this.posts.deletePostById(0); 
    const result = (await this.posts.getPostById(0)); 
    assert.equal(result[6], true);
  })

  it('should get all posts', async () => {
    await this.posts.deletePostById(0); 
    await this.posts.addPost(currentAccount, "Headline1", "Description1", "Url1", ["photo1_1", "photo2_1"]);
    await this.posts.addPost(secondAccount, "Headline2", "Description2", "Url2", ["photo1_2", "photo2_2"]);

    const result = (await this.posts.getAllPosts());
    const deleted = result[0];
    const first = result[1];
    const second = result[2];
    assert.equal(deleted[6], true);
    assert.equal(first[0], 1);
    assert.equal(first[1], currentAccount);
    assert.equal(first[2], "Headline1");
    assert.equal(first[3], "Description1");
    assert.equal(first[4], "Url1");
    expect(first[5]).to.eql(["photo1_1", "photo2_1"])
    assert.equal(first[6], false);
    assert.equal(second[0], 2);
    assert.equal(second[1], secondAccount);
    assert.equal(second[2], "Headline2");
    assert.equal(second[3], "Description2");
    assert.equal(second[4], "Url2");
    expect(second[5]).to.eql(["photo1_2", "photo2_2"])
    assert.equal(second[6], false);
  })
})