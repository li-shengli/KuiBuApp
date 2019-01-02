import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService } from '../_services';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry, MatIconModule, MatSelectChange } from '@angular/material';
import { QrcodeDisplayComponent } from '../qrcode-display/qrcode-display.component';

declare var navigator: any;
declare var Camera: any;
declare var cordova: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userDetailsForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.userDetailsForm = this.formBuilder.group ({
      id: [this.currentUser.id],
      nickName: [this.currentUser.nickName],
      motto: [this.currentUser.motto]
    });


  }

  onSubmit() {
    console.log("Update user details: " + this.userDetailsForm.value.nickName);
    this.userService.update(this.userDetailsForm.value).subscribe(
      data => {
        console.log('user stored');
        this.router.navigate(['']);
      },
      error => {
        console.log('something is wrong: '+ error.message);
        this.alertService.error(error.message);
      });
  }

  onSuccess(imageData) {
    var image = document.getElementById('myImage');
    var imageUrl = "data:image/jpeg;base64," + imageData
    image.setAttribute('src', "data:image/jpeg;base64," + imageData);
    this.currentUser.photo = imageUrl;
    this.userService.update(this.currentUser).subscribe(
      data => {
        console.log('user stored');
        this.router.navigate(['']);
      },
      error => {
        console.log('something is wrong: '+ error.message);
        this.alertService.error(error.message);
      });
  }

  // capture error callback
  captureError (error) {
     navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
  };

  // start image capture
  takePic() {
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = this.setOptions(srcType);
    
    navigator.camera.getPicture(this.onSuccess, this.captureError, options);
  }

  setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        targetHeight: 100,
        targetWidth: 100,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }

  qrCode() {
    let options = {
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
    };
    
    cordova.plugins.qrcodejs.encode('TEXT_TYPE', 'A78564FF786BBB1244', (base64EncodedQRImage) => {
        console.info('QRCodeJS response is ' + base64EncodedQRImage);
          this.doneDialog(base64EncodedQRImage);
        }, (err) => {
            console.error('QRCodeJS error is ' + JSON.stringify(err));
        }, options);
  }

  doneDialog(base64EncodedQRImage) {
    const dialogRef = this.dialog.open(QrcodeDisplayComponent, {
      width: '300px',
      data: {imgSrc: base64EncodedQRImage}
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  
  
  
}
