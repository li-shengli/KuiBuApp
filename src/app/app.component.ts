import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConnectUsComponent } from './connect-us/connect-us.component';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
    constructor(public dialog: MatDialog) {}

    ngOnInit() {
        console.debug("Load all users");
    }

    connectUs() {
        const dialogRef = this.dialog.open(ConnectUsComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
}