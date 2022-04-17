import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { loggedRole } from 'src/app/constants/constants';
import { UserRole } from 'src/app/models/user-role.model';
import { User } from 'src/app/models/user.model';
import { CharityOrganizationService } from 'src/app/services/charity-organization.service';
import { DonorService } from 'src/app/services/donor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  error: string = '';

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    const user = <User> {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }
    this.userService.login(user).subscribe(() => {
      this.dialog.closeAll();
      this.router.navigate(['/start']);
    },
    error => {
      this.error = "Invalid credentials"
    })
  } 
}
 
