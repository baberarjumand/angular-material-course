import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
})
export class CourseDialogComponent implements OnInit {
  description: string;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) { description, longDescription, category }: Course,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>
  ) {
    this.description = description;

    this.form = this.fb.group({
      description: [description, Validators.required],
    });
  }

  ngOnInit() {}

  save() {}

  close() {
    this.dialogRef.close();
  }
}
