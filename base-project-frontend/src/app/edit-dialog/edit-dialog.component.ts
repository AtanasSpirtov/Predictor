import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PredictionRequest} from "../model/PredictionRequest";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileGroup} from "../widgets/fileupload.component";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: PredictionRequest) {
  }

  editPredictionRequestForm: FormGroup;

  ngOnInit(): void {
    this.editPredictionRequestForm = new FormGroup({
        id: new FormControl(this.data.id),
        name: new FormControl(this.data.name, [Validators.required, Validators.maxLength(100)]),
        description: new FormControl(this.data.description, [Validators.maxLength(300)]),
        status: new FormControl(this.data.status),
        telephone: new FormControl(this.data.telephone, [Validators.required, Validators.pattern("[0-9 ]{10,15}")]),
        fileFormGroup: new FormControl(new FileGroup(this.data.excelFile)),
      }
    )
  }

  onConfirm(): void {
    this.dialogRef.close(this.editPredictionRequestForm.value as PredictionRequest);
  }

  onDismiss(): void {
    this.dialogRef.close(null);
  }

  getFileObject() {
    return [new File([this.editPredictionRequestForm.get('fileFormGroup')?.value.fileStream], "provided")];
  }
}
