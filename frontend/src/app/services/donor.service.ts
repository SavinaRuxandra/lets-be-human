import { Injectable } from '@angular/core';
import { DONOR_CONTRACT_ADDRESS, DONOR_TOKEN_ABI } from "../../../abis";
import Web3 from 'web3';
import { Donor } from '../models/donor.model';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  private web3js!: Web3;
  private accounts: any;
  private contract: any;

  constructor() {
    if(window.ethereum) {
      this.web3js = new Web3(window.ethereum);
      this.accounts = this.web3js.eth.getAccounts(); 
      this.contract = new this.web3js.eth.Contract(DONOR_TOKEN_ABI, DONOR_CONTRACT_ADDRESS);
    }
    else {
      this.web3js = new Web3();
      this.web3js.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"))
      this.contract = new this.web3js.eth.Contract(DONOR_TOKEN_ABI, DONOR_CONTRACT_ADDRESS);
    }
  }

  async setDonorUsername(address: string, username: string): Promise<void> {
    this.accounts = await this.web3js.eth.getAccounts(); 
    await this.contract.methods.setDonorUsername(address, username).send({
      from: this.accounts[0]
    });
  }

  private async getDonorUsername(address: string): Promise<string> {        
    return await this.contract.methods.getDonorUsername(address).call();
  }

  getDonorByAddress(address: string): Promise<Donor> {
    return this.getDonorUsername(address).then(username => {
      return <Donor> {
        username: username,
        accountAddress: address
      }    
    })
  }
}
