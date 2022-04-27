import { Injectable } from '@angular/core';
import { DONOR_CONTRACT_ADDRESS, DONOR_TOKEN_ABI } from "../../abis";
import Web3Modal from "web3modal";
import Web3 from 'web3';
import { WEB3_MODAL_OPTIONS } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  private web3js: any;
  private provider: any;
  private accounts: any;
  web3Modal: any
  contract: any

  constructor() {
   this.web3Modal = new Web3Modal(WEB3_MODAL_OPTIONS)
  }

  async getDonorUsername(address: string): Promise<string> {        
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.contract = new this.web3js.eth.Contract(DONOR_TOKEN_ABI, DONOR_CONTRACT_ADDRESS);
    
    return await this.contract.methods.getDonorUsername(address).call({
      from: this.accounts[0]
    });
  }

  async setDonorUsername(address: string, username: string) {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.contract = new this.web3js.eth.Contract(DONOR_TOKEN_ABI, DONOR_CONTRACT_ADDRESS);
    return await this.contract.methods.setDonorUsername(address, username).send({
      from: address
    });
  }
}
