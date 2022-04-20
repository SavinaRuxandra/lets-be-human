import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { HeaderComponent } from './views/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { FooterComponent } from './views/footer/footer.component';
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
import { LoginComponent } from './views/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDonationDialogComponent } from './views/post/custom-donation-dialog/custom-donation-dialog.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { CreatePostComponent } from './views/create-post/create-post.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterCharityOrganizationComponent } from './views/register/register-charity-organization/register-charity-organization.component';
import { RegisterDonorComponent } from './views/register/register-donor/register-donor.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { SharedDataService } from './shared/shared-data.service';
import { LiveTransactionsComponent } from './views/live-transactions/live-transactions.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    PostComponent,
    LoginComponent,
    CreatePostComponent,
    CustomDonationDialogComponent,
    RegisterCharityOrganizationComponent,
    RegisterDonorComponent,
    HomeComponent,
    SearchFilterPipe,
    LiveTransactionsComponent
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
    CarouselModule.forRoot(),
  ],
  providers: [
    SharedDataService
  ],
  entryComponents:[MatDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
