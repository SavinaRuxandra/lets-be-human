import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private transferService: TransferService,
              private router: Router) { }

  ngOnInit(): void {
  }

  loginDoner(): void {
    this.transferService.connectAccount()
      .then(result => this.router.navigate(["main-page"]))

  }

}
