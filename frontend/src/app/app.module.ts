import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { HeaderComponent } from './views/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PostComponent } from './views/post/post.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDonationDialogComponent } from './views/post/custom-donation-dialog/custom-donation-dialog.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { CreatePostComponent } from './views/create-post/create-post.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { SharedHeadlineButtonDataService } from './services/shared-headline-button-data.service';
import { LiveTransactionsComponent } from './views/live-transactions/live-transactions.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { RegisterDonorDialogComponent } from './views/register/register-donor-dialog/register-donor-dialog.component';
import { RegisterCharityOrganizationDialogComponent } from './views/register/register-charity-organization-dialog/register-charity-organization-dialog.component';
import { SharedUserDataService } from './services/shared-user-data.service';
import { MatDividerModule } from '@angular/material/divider';
import { DonationDetailsComponent } from './views/live-transactions/donation-details/donation-details.component';
import { SinglePostComponent } from './views/single-post/single-post.component';
import { ConfirmDeleteDialogComponent } from './views/post/confirm-delete-dialog/confirm-delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    PostComponent,
    CreatePostComponent,
    CustomDonationDialogComponent,
    HomeComponent,
    SearchFilterPipe,
    LiveTransactionsComponent,
    UserProfileComponent,
    RegisterDonorDialogComponent,
    RegisterCharityOrganizationDialogComponent,
    DonationDetailsComponent,
    SinglePostComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatDialogModule,
    MatSliderModule,
    MatMenuModule,
    MatSnackBarModule,
    BrowserModule,
    ScrollingModule,
    MatDividerModule,
    CarouselModule.forRoot(),
  ],
  providers: [
    SharedHeadlineButtonDataService,
    SharedUserDataService
  ],
  entryComponents:[MatDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
