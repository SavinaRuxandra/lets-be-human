import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { equalValueValidator } from 'src/app/custom-validators/equal-value.validator';
import { uniqueEmailValidator } from 'src/app/custom-validators/unique-email.validator';
import { CharityOrganization } from 'src/app/models/charity-organization.model';
import { UserRole } from 'src/app/models/user-role.model';
import { User } from 'src/app/models/user.model';
import { CharityOrganizationService } from 'src/app/services/charity-organization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-charity-organization',
  templateUrl: './register-charity-organization.component.html',
  styleUrls: ['./register-charity-organization.component.scss']
})
export class RegisterCharityOrganizationComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private charityOrganizationService: CharityOrganizationService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private snack: MatSnackBar) { } 

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      description: [''],
      phoneNumber: [''],
      accountAddress: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required]
    },
    {validators: [equalValueValidator('password', 'repeatPassword'), uniqueEmailValidator('email', this.userService)]});
  }

  onSubmit(): void {
    const charityOrganizationToAdd = <CharityOrganization> {
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      name: this.registerForm.controls['name'].value,
      description: this.registerForm.controls['description'].value,
      phoneNumber: this.registerForm.controls['phoneNumber'].value,
      accountAddress: this.registerForm.controls['accountAddress'].value,
    }    
    
    this.charityOrganizationService.addCharityOrganization(charityOrganizationToAdd)
      .pipe(
        map((response: CharityOrganization) => {
          this.userService.login(<User> {email: response.email, password: response.password});
          this.snack.open("Account created", "x", {duration: 4000})
          this.router.navigate(['/start']);
        })
      );
        // ,
        // error => {
        //   this.snack.open("Something went wrong. Please try again", "x", {duration: 4000})
        // });
  }
}