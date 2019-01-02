import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, TaskService } from '../_services';

@Component({
  selector: 'new-task.component',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  newTaskForm: FormGroup;
  loading = false;
  submitted = false;

  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
     this.newTaskForm = this.formBuilder.group({
            taskType: ["Reading", Validators.required],
            taskName: ["", Validators.required],
            expectedDays: [Validators.required],
            pagesCurrent: [Validators.required],
            pagesIntotal: [Validators.required]
        });
  }

}
