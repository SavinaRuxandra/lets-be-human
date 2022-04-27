import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CharityOrganization } from 'src/app/models/charity-organization.model';
import { CharityOrganizationService } from 'src/app/services/charity-organization.service';
import { SharedUserDataService } from 'src/app/services/shared-user-data.service';

@Component({
  selector: 'app-register-charity-organization-dialog',
  templateUrl: './register-charity-organization-dialog.component.html',
  styleUrls: ['./register-charity-organization-dialog.component.scss']
})
export class RegisterCharityOrganizationDialogComponent implements OnInit {

  registerForm!: FormGroup;
  currentAddress!: string

  constructor(private sharedUserDataService: SharedUserDataService,
              private charityOrganizationService: CharityOrganizationService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.sharedUserDataService.getCurrentAddress().pipe(take(1)).subscribe(address => this.currentAddress = address);
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          name: ['', Validators.required],
          description: ['', Validators.required],
          phoneNumber: [''],
        })
        // {validators: uniqueEmailValidator('email', this.userService)]});
  }

  getEmailFormControl(): string {
    return this.registerForm.controls['email'].value;
  }

  getNameFormControl(): string {
    return this.registerForm.controls['name'].value;
  }

  getDescriptionFormControl(): string {
    return this.registerForm.controls['description'].value;
  }

  getPhoneNumberFormControl(): string {
    return this.registerForm.controls['phoneNumber'].value;
  }

  register(): void {        
    this.charityOrganizationService.addCharityOrganization(
        this.currentAddress,
        this.getEmailFormControl(),
        this.getNameFormControl(),
        this.getDescriptionFormControl(),
        this.getPhoneNumberFormControl(),
      ).then(() => {
          const charityOrganization = <CharityOrganization> {
            email: this.getEmailFormControl(),
            name:this.getNameFormControl(),
            description: this.getDescriptionFormControl(),
            phoneNumber: this.getPhoneNumberFormControl(),
            accountAddress: this.currentAddress
          }
          this.sharedUserDataService.setCurrentCharityOrganization(charityOrganization);
          this.router.navigate(["main-page"]);
      })
  }
}
