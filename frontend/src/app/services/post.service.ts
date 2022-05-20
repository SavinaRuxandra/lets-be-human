import { Injectable } from '@angular/core';
import { POSTS_CONTRACT_ADDRESS, POSTS_TOKEN_ABI } from "../../abis";
import Web3Modal from "web3modal";
import Web3 from 'web3';
import { from, map, Observable, of } from 'rxjs';
import { WEB3_MODAL_OPTIONS } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private web3js: Web3;
  private web3Modal: Web3Modal;
  private provider: any;
  private accounts: any;
  private contract: any;

  constructor() {
    this.web3Modal = new Web3Modal(WEB3_MODAL_OPTIONS);
    this.web3js = new Web3(window.ethereum);
    this.accounts = this.web3js.eth.getAccounts(); 
    this.contract = new this.web3js.eth.Contract(POSTS_TOKEN_ABI, POSTS_CONTRACT_ADDRESS);
   }

  async addPost(post: Post): Promise<void> { 
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
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
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    await this.contract.methods.deletePostById(postId).send({
      from: this.accounts[0]
    });      
  }

  async updatePost(post: Post): Promise<void> { 
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
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
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    return await this.contract.methods.getAllPosts().call({
      from: this.accounts[0]
    });  
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
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    return await this.contract.methods.getPostById(id).call({
      from: this.accounts[0]
    });    
  }

  getPostById(id: number): Observable<Post> {
    return from(this.getPostByIdPromise(id).then(post => {
      return this.buildPostObjFromList(post)
    }));
  }
  
  private buildPostObjFromList(post: any[]): Post {     
    // console.log("!!!!!!!!!!!!!,", post);
       
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
