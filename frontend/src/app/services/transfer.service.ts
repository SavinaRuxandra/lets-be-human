import { Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import { BehaviorSubject, map, Observable } from 'rxjs';

import { TRANSFER_CONTRACT_ADDRESS, TRANSFER_TOKEN_ABI } from "../../abis";
import { Donation } from '../models/donation';
import { WEB3_MODAL_OPTIONS } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private web3js: any;
  private provider: any;
  private accounts: any;
  web3Modal: any
  contract: any

  donationsSource$ = new BehaviorSubject<Donation[]>([]);
  balanceSource$ = new BehaviorSubject<number>(0);
  
  constructor() {
    this.web3Modal = new Web3Modal(WEB3_MODAL_OPTIONS);
    this.getDonations().then((result) => {
      this.donationsSource$.next(result);
    })
    this.getBalance().then((balance) => {
      this.balanceSource$.next(balance);
    })
  }

  async tranferEthereum(transferAddress: string, amount: number, postId: number, message: string): Promise<void> {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.contract = new this.web3js.eth.Contract(TRANSFER_TOKEN_ABI, TRANSFER_CONTRACT_ADDRESS);

    await this.contract.methods.pay(transferAddress, message, postId).send({
       from: this.accounts[0], value: Web3.utils.toWei(amount.toString(), 'ether') }
    )

    this.getDonations().then((donation) => {
      this.donationsSource$.next(donation);
    })

    this.getBalance().then((balance) => {
      this.balanceSource$.next(balance);
    })
  }

  private async getDonations() {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.contract = new this.web3js.eth.Contract(TRANSFER_TOKEN_ABI, TRANSFER_CONTRACT_ADDRESS);
    return await this.contract.methods.getDonations().call({
      from: this.accounts[0]
    });
  }

  private async getBalance(): Promise<number> {  
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts(); 
    return this.web3js.eth.getBalance(this.accounts[0]).then((balance: string) => {
      return parseFloat(Web3.utils.fromWei(balance, 'ether')).toFixed(2);
    })
  }

  getLiveDonations(): Observable<Donation[]> {
    return this.donationsSource$.asObservable();
  }

  getCurrentBalance(): Observable<number> {
    return this.balanceSource$.asObservable();
  }

  getMoneyShared(address: string): Observable<string> {
    return this.getLiveDonations().pipe((map(donations => {
      const sum = donations.filter(donations => donations.accountSender === address)
                           .reduce((sum, donation) => sum + +donation.amount, 0)                           
      return Web3.utils.fromWei(sum.toString(), 'ether')
    })))
  }

  getMoneyReceived(address: string): Observable<string> {
    return this.getLiveDonations().pipe((map(donations => {
      const sum = donations.filter(donations => donations.accountReceiver === address)
                           .reduce((sum, donation) => sum + +donation.amount, 0)                           
      return Web3.utils.fromWei(sum.toString(), 'ether')
    })))
  }

  getMoneyRaisedForPost(postId: number): Observable<string> {
    return this.getLiveDonations().pipe((map(donations => {      
      const sum = donations.filter(donations => donations.postId == postId)
                           .reduce((sum, donation) => sum + +donation.amount, 0)                           
      return Web3.utils.fromWei(sum.toString(), 'ether')
    })))
  }
}