import { Injectable } from '@angular/core';
import { POSTS_CONTRACT_ADDRESS, POSTS_TOKEN_ABI } from "../../../abis";
import Web3 from 'web3';
import { from, map, Observable, of } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private web3js!: Web3;
  private accounts: any;
  private contract: any;

  constructor() {
    if(window.ethereum) {
      this.web3js = new Web3(window.ethereum);
      this.accounts = this.web3js.eth.getAccounts(); 
      this.contract = new this.web3js.eth.Contract(POSTS_TOKEN_ABI, POSTS_CONTRACT_ADDRESS);
    }
    else {
      this.web3js = new Web3();
      this.web3js.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"))
      this.contract = new this.web3js.eth.Contract(POSTS_TOKEN_ABI, POSTS_CONTRACT_ADDRESS);
    }
   }

  async addPost(post: Post): Promise<void> { 
    this.accounts = await this.web3js.eth.getAccounts();

    await this.contract.methods.addPost(post.charityOrganizationAddress,
                                        post.headline,
                                        post.description,
                                        post.readMoreUrl,
                                        post.photos).send({
      from: this.accounts[0]
    });  
  }

  async deletePostById(postId: number): Promise<void> { 
    this.accounts = await this.web3js.eth.getAccounts(); 
    await this.contract.methods.deletePostById(postId).send({
      from: this.accounts[0]
    });      
  }

  async updatePost(post: Post): Promise<void> { 
    this.accounts = await this.web3js.eth.getAccounts(); 
    await this.contract.methods.updatePost(post.id,
                                           post.charityOrganizationAddress,
                                           post.headline,
                                           post.description,
                                           post.readMoreUrl,
                                           post.photos).send({
      from: this.accounts[0]
    });   
  }

  private async getAllPostsPromise(): Promise<any> {
    return await this.contract.methods.getAllPosts().call();  
  }

  getAllPosts(): Observable<Post[]> {
    let postObjects: Post[] = [];
    return from(this.getAllPostsPromise().then(posts => {
      posts.forEach((post: any[]) => 
        postObjects.push(this.buildPostObjFromList(post))
      )
      return postObjects
    })
    )
  }

  private async getPostByIdPromise(id: number): Promise<any> { 
    this.accounts = await this.web3js.eth.getAccounts(); 
    return await this.contract.methods.getPostById(id).call();    
  }

  getPostById(id: number): Observable<Post> {
    return from(this.getPostByIdPromise(id).then(post => {
      return this.buildPostObjFromList(post)
    }));
  }
  
  private buildPostObjFromList(post: any[]): Post {            
    return <Post> {
      id: post[0],
      charityOrganizationAddress: post[1],
      headline: post[2],
      description: post[3],
      readMoreUrl: post[4],
      photos: post[5],
      deleted: post[6]
    } 
  }

  getNoPostsOfCharityOrganization(address: string) {
    return this.getAllPosts().pipe(
      map(posts => {
        return posts.filter((post) => post.charityOrganizationAddress == address)
                    .length
      })
    )
  }
}
