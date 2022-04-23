import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Donation } from 'src/app/models/transfer';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-live-transactions',
  templateUrl: './live-transactions.component.html',
  styleUrls: ['./live-transactions.component.scss']
})
export class LiveTransactionsComponent implements OnInit {

  donations$!: Observable<Donation[]>

  constructor(private transferService: TransferService) { }

  ngOnInit(): void {
      this.donations$ = this.transferService.donations$.pipe(map((donations) => donations.slice().reverse().slice(0,8)));      
  }

}
