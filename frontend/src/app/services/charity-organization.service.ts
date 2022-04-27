import { Injectable } from '@angular/core';
import Web3Modal from "web3modal";
import Web3 from 'web3';
import { CHARITY_ORGANIZATIONS_CONTRACT_ADDRESS, CHARITY_ORGANIZATIONS_TOKEN_ABI } from "../../abis";
import { WEB3_MODAL_OPTIONS } from '../shared/constants/constants';


@Injectable({
  providedIn: 'root'
})
export class CharityOrganizationService {
  
  private web3js: any;
  private provider: any;
  private accounts: any;
  web3Modal: any
  contract: any

  constructor() {
    this.web3Modal = new Web3Modal(WEB3_MODAL_OPTIONS);
  }

  async addCharityOrganization(address: string, email: string, name: string, description: string, phoneNumber: string) {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.contract = new this.web3js.eth.Contract(CHARITY_ORGANIZATIONS_TOKEN_ABI, CHARITY_ORGANIZATIONS_CONTRACT_ADDRESS);

    return await this.contract.methods.addCharityOrganization(address, email, name, description, phoneNumber).send({
      from: address
    });
  }

  async getCharityOrganizationByAddress(address: string) {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.contract = new this.web3js.eth.Contract(CHARITY_ORGANIZATIONS_TOKEN_ABI, CHARITY_ORGANIZATIONS_CONTRACT_ADDRESS);
    
    return await this.contract.methods.getCharityOrganizationByAddress(address).call({
      from: address
    });
  }

  async getCharityOrganizations() {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.contract = new this.web3js.eth.Contract(CHARITY_ORGANIZATIONS_TOKEN_ABI, CHARITY_ORGANIZATIONS_CONTRACT_ADDRESS);

    return await this.contract.methods.getAllCharityOrganizations().call({
      from: this.accounts[0]
    });
  }
}
