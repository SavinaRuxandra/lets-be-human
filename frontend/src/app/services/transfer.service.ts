import { Injectable } from '@angular/core';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { BehaviorSubject, Observable, Subject, } from 'rxjs';

import { TRANSFER_CONTRACT_ADDRESS, TRANSFER_TOKEN_ABI } from '../../abis';
import { Donation } from '../models/transfer';


@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private web3js: any;
  private provider: any;
  private accounts: any;
  web3Modal: any
  private donationsSource$ = new BehaviorSubject<Donation[]>([]);
  donations$: Observable<Donation[]> = this.donationsSource$.asObservable();

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();
  contract: any;

  constructor() {
    this.createProvider();

    this.getDonations().then((result) => {
      this.donationsSource$.next(result);
    })
  }

  createProvider(): void {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "INFURA_ID"
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "8545",
      cacheProvider: true,
      providerOptions,
      theme: {
        background: "rgb(103, 77, 150)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
  }

  async connectAccount() {
    this.web3Modal.clearCachedProvider();

    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.accountStatusSource.next(this.accounts)
  }

  async tranferEthereum(transferAddress: string, amount: number, postId: number, message: string) {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.contract = new this.web3js.eth.Contract(TRANSFER_TOKEN_ABI, TRANSFER_CONTRACT_ADDRESS);

    const donate = await this.contract.methods.pay(transferAddress, message, postId).send({ from: this.accounts[0], value: amount * 1e18 })

    this.getDonations().then((result) => {
      this.donationsSource$.next(result);
    })

    return donate;
  }

  async getDonations() {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts(); 
    this.contract = new this.web3js.eth.Contract(TRANSFER_TOKEN_ABI, TRANSFER_CONTRACT_ADDRESS);
    return await this.contract.methods.getDonations().call({
      from: this.accounts[0]
    });
  }

}