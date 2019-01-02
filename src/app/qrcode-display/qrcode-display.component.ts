import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  imgSrc: any;
}

@Component({
  selector: 'app-qrcode-display',
  templateUrl: './qrcode-display.component.html',
  styleUrls: ['./qrcode-display.component.css']
})
export class QrcodeDisplayComponent implements OnInit {
  barImg:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  ngOnInit() {
    this.barImg = this.data.imgSrc;
  }

}
