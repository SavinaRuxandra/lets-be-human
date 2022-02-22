import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private transferService: TransferService) { }

  ngOnInit(): void {
  }

  makeTransfer(amount: number): void {
    this.transferService.tranferEthereum("0x72392994996CD4bb565aaE316E7ec7e1F50AbD45", amount)
  }
}
