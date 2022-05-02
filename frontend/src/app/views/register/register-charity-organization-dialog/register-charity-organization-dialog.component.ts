import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CharityOrganization } from 'src/app/models/charity-organization.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CharityOrganizationService } from 'src/app/services/charity-organization.service';

@Component({
  selector: 'app-register-charity-organization-dialog',
  templateUrl: './register-charity-organization-dialog.component.html',
  styleUrls: ['./register-charity-organization-dialog.component.scss']
})
export class RegisterCharityOrganizationDialogComponent implements OnInit {

  registerForm!: FormGroup;
  address: string

  constructor(private authentificationService: AuthentificationService,
              private charityOrganizationService: CharityOrganizationService,
              private formBuilder: FormBuilder,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) address: string) {
    this.address = address;
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
    const charityOrganization = <CharityOrganization> {
      accountAddress: this.address,
      email: this.getEmailFormControl(),
      name:this.getNameFormControl(),
      description: this.getDescriptionFormControl(),
      phoneNumber: this.getPhoneNumberFormControl()
    } 
    this.charityOrganizationService.addCharityOrganization(
        charityOrganization.accountAddress,
        charityOrganization.email,
        charityOrganization.name,
        charityOrganization.description,
        charityOrganization.phoneNumber
      ).then(() => {
          this.authentificationService.setCurrentCharityOrganization(charityOrganization);
          this.router.navigate(["main-page"]);
      })
  }
}
