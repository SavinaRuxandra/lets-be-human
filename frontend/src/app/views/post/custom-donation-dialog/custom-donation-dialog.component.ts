import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-donation-dialog',
  templateUrl: './custom-donation-dialog.component.html',
  styleUrls: ['./custom-donation-dialog.component.scss']
})
export class CustomDonationDialogComponent implements OnInit {

  amount: number = 0
  message: string = ""

  constructor(private dialogRef: MatDialogRef<CustomDonationDialogComponent>) {}

  ngOnInit(): void {
  }

  confirm(response: boolean): void {
    this.dialogRef.close(
    {
      response: response,
      amount: this.amount,
      message: this.message
    })
}

}
