import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { WechatShareService } from '../_services';

@Component({
  templateUrl: './connect-us.component.html',
  styleUrls: ['./connect-us.component.css']
})
export class ConnectUsComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public weChatService: WechatShareService) {}

  ngOnInit() {}

  share() {
    console.log ("Try to Share to wechat...");
    let title = "Step";
    let imgUrl = "../../assets/img/home.jpg";
    let desc = "for test";
    let slug = "Nothing";
    this.weChatService.doShare(title, imgUrl, desc, slug);
  }
}
