import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-donation-dialog',
  templateUrl: './custom-donation-dialog.component.html',
  styleUrls: ['./custom-donation-dialog.component.scss']
})
export class CustomDonationDialogComponent implements OnInit {

  donationForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<CustomDonationDialogComponent>,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.donationForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0.000000000000000000001)]],
      message: ['']
    })
  }

  confirm(response: boolean): void {
    this.dialogRef.close(
    {
      response: response,
      amount: this.donationForm.controls['amount'].value,
      message: this.donationForm.controls['message'].value
    })
}

}
