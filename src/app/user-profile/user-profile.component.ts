import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService } from '../_services';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry, MatIconModule, MatSelectChange } from '@angular/material';
import { QrcodeDisplayComponent } from '../qrcode-display/qrcode-display.component';

declare var navigator: any;
declare var Camera: any;
declare var cordova: any;
declare var plugins: any;
declare var window: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  myPhoto: string = "assets/img/125495334_31n.jpg";
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
      motto: [this.currentUser.motto],
      photo: "assets/img/125495334_31n.jpg"
    });

    if (this.currentUser.photo != null) {
      this.myPhoto = this.currentUser.photo;
    }

  }

  onSubmit() {
    console.log("Update user details: " + this.userDetailsForm.value.nickName);
    this.userDetailsForm.value.photo = document.getElementById('myImage').getAttribute("src");
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

  onSuccess(imageUrl) {
      const options = { quality: 100 };

      plugins.crop.promise(imageUrl, options).then( 
        (path) => {
          function getFileContentAsBase64(path, callback){
            window.resolveLocalFileSystemURL(path, gotFile, fail);
                    
            function fail(e) {
              alert('Cannot found requested file');
            }

            function gotFile(fileEntry) {
               fileEntry.file(function(file) {
                  var reader = new FileReader();
                  reader.onloadend = function(e) {
                       var content = this.result;
                       callback(content);
                  };
                  // The most important point, use the readAsDatURL Method from the file plugin
                  reader.readAsDataURL(file);
               });
            }
        }

        getFileContentAsBase64(path, function (base64Image) {
            var image = document.getElementById('myImage');
            image.setAttribute('src', base64Image);
          });
      }).catch( (error) => {
        alert("something wrong for "+error);
      });

  }


  // capture error callback
  captureError (error) {
     navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
  };

  // start image capture
  takePic() {
    let options = {
        allowEdit: false,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        mediaType: Camera.MediaType.PICTURE,
        destinationType: Camera.DestinationType.FILE_URI,
        targetWidth: 500,
        targetHeight: 500
    }
    
    navigator.camera.getPicture(this.onSuccess, this.captureError, options);
    
  }

  qrCode() {
    let options = {
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
    };
    
    cordova.plugins.qrcodejs.encode('TEXT_TYPE', this.currentUser.id, (base64EncodedQRImage) => {
          this.dialog.open(QrcodeDisplayComponent, {
            width: '300px',
            data: {imgSrc: base64EncodedQRImage}
          });
        }, (err) => {
          console.error('QRCodeJS error is ' + JSON.stringify(err));
        }, options);
  }

}
