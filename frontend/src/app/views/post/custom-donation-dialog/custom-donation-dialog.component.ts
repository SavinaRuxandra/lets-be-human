import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-donation-dialog',
  templateUrl: './custom-donation-dialog.component.html',
  styleUrls: ['./custom-donation-dialog.component.scss']
})
export class CustomDonationDialogComponent implements OnInit {

  value?: number

  constructor() { }

  ngOnInit(): void {
  }

}
