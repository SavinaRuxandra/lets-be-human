import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Subscription } from 'rxjs';
import { Donation } from 'src/app/models/donation';
import { HeaderButtonEnum } from 'src/app/models/header-button.enum';
import { PostService } from 'src/app/services/post.service';
import { SharedHeadlineButtonDataService } from 'src/app/services/shared-headline-button-data.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-live-transactions',
  templateUrl: './live-transactions.component.html',
  styleUrls: ['./live-transactions.component.scss']
})
export class LiveTransactionsComponent implements OnInit {

  donations$!: Donation[]
  subscription$!: Subscription;

  constructor(private transferService: TransferService,
              private postService: PostService,
              private sharedHeadlineButtonDataService: SharedHeadlineButtonDataService,
              private snackService: SnackbarService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription$ = this.transferService.getLiveDonations().subscribe((donations) => 
      this.donations$ = donations.slice().reverse().slice(0,100)
      )  
  }

  goToPost(id: number): void {
    this.postService.getPostById(id).subscribe(
      () => {
        this.router.navigate(['/post', id]);
        this.sharedHeadlineButtonDataService.setActiveButton(HeaderButtonEnum.NONE);
      },
      err => this.snackService.error("This post was deleted"));
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

}
