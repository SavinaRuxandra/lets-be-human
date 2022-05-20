import { Component, OnInit } from '@angular/core';
// import { IpfsService } from './services/ipfs.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blockchainApp';

  // id: string | null = null;
  // version: string | null  = null;
  // status: string | null  = null;

  constructor(){}

  // ngOnInit() {
  //   this.start();
  // }

  // async start() {
  //   const id = await this.IPFSService.getId();
  //   this.id = id.id;

  //   const version = await this.IPFSService.getVersion();
  //   this.version = version.version

  //   const status = await this.IPFSService.getStatus();
  //   this.status = status ? 'Online' : 'Offline'
  // }
}
