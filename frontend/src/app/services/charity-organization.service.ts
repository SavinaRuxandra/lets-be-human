import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { CHARITY_ORGANIZATIONS_CONTRACT_ADDRESS, CHARITY_ORGANIZATIONS_TOKEN_ABI } from "../../abis";
import { CharityOrganization } from '../models/charity-organization.model';


@Injectable({
  providedIn: 'root'
})
export class CharityOrganizationService {
  
  private web3js!: Web3;
  private accounts: any;
  private contract: any;

  constructor() {
    if(window.ethereum) {
      this.web3js = new Web3(window.ethereum);
      this.accounts = this.web3js.eth.getAccounts(); 
      this.contract = new this.web3js.eth.Contract(CHARITY_ORGANIZATIONS_TOKEN_ABI, CHARITY_ORGANIZATIONS_CONTRACT_ADDRESS);
    }
    else {
      this.web3js = new Web3();
      this.web3js.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"))
      this.contract = new this.web3js.eth.Contract(CHARITY_ORGANIZATIONS_TOKEN_ABI, CHARITY_ORGANIZATIONS_CONTRACT_ADDRESS);
    }
  }

  async addCharityOrganization(address: string, 
                               email: string, 
                               name: string, 
                               description: string, 
                               phoneNumber: string): Promise<void> {                                 
    this.accounts = await this.web3js.eth.getAccounts(); 
    await this.contract.methods.addCharityOrganization(address, 
                                                       email, 
                                                       name, 
                                                       description, 
                                                       phoneNumber).send({
      from: this.accounts[0]
    });
  }

  async updateCharityOrganization(address: string, 
                                  email: string, 
                                  name: string, 
                                  description: string, 
                                  phoneNumber: string): Promise<void> {
    console.log(phoneNumber);

    this.accounts = await this.web3js.eth.getAccounts(); 
    await this.contract.methods.updateCharityOrganization(address, 
                                                          email, 
                                                          name, 
                                                          description, 
                                                          phoneNumber).send({
      from: this.accounts[0]
    });
  }

  private async getCharityOrganizationByAddress(address: string): Promise<any> {
    this.accounts = await this.web3js.eth.getAccounts();     
    return await this.contract.methods.getCharityOrganizationByAddress(address).call();
  }

  private async getCharityOrganizations(): Promise<any> {
    this.accounts = await this.web3js.eth.getAccounts(); 
    return await this.contract.methods.getAllCharityOrganizations().call();
  }

  getCharityOrganizationsAsObjects(): Promise<CharityOrganization[]> {
    return this.getCharityOrganizations().then(charityOrganizations => {
      return charityOrganizations.map((charityOrganization: any) =>        
         <CharityOrganization> {
          accountAddress: charityOrganization[0],
          email: charityOrganization[1],
          name: charityOrganization[2],
          description: charityOrganization[3],
          phoneNumber: charityOrganization[4]         
        }
      )
    })
  }

  getCharityOrganizationByAddressAsObject(address: string): Promise<CharityOrganization> {
    return this.getCharityOrganizationByAddress(address)
    .then(charityOrganization => {
      return <CharityOrganization> {
        accountAddress: charityOrganization[0],
        email: charityOrganization[1],
        name: charityOrganization[2],
        description: charityOrganization[3],
        phoneNumber: charityOrganization[4]
      }    
    })
  }
}
