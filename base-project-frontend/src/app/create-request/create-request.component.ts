import {Component, OnInit} from '@angular/core';
import {User} from "../model/User";
import {StoreService} from "../service/store.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PredictionRequestService} from "../service/predictionRequests.service";
import {PredictionRequest, Status} from "../model/PredictionRequest";
import {Constants} from "../widgets/Constants";


@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {
  createPredictionRequestForm: FormGroup;

  csvData: string[][] | null;
  displayedColumns: string[] = [];
  constants = Constants
  constructor(private store: StoreService, private router: Router, private predictionRequestService: PredictionRequestService) {
    this.createPredictionRequestForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        description: new FormControl('', [Validators.maxLength(300)]),
        telephone: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10,15}")]),
        fileFormGroup: new FormControl(null),
      }
    )
  }
  filePassesColumnValidation() {
    return (this.displayedColumns.includes(Constants.DATE_COLUMN) && this.displayedColumns.includes(Constants.VALUE_COLUMN));
  }
  ngOnInit(): void {
    this.createPredictionRequestForm.get('fileFormGroup')?.valueChanges
      .subscribe((file) => {
        if (file.fileStream != null) {
          this.displayedColumns = atob(file.fileStream).split('\n')[0].split(',')
          this.csvData = atob(file.fileStream).split('\n').slice(1, 8).map(row => row.split(","))
        } else {
          this.displayedColumns = []
          this.csvData = null
        }
      })
  }

  goToListRequests() {
    this.router.navigate(['home'])
  }

  saveRequest() {
    if (this.createPredictionRequestForm.valid && this.filePassesColumnValidation()) {
      let predictionRequest = new PredictionRequest(
        this.createPredictionRequestForm.get('name')?.value,
        this.createPredictionRequestForm.get('description')?.value,
        Status.PENDING,
        this.createPredictionRequestForm.get('telephone')?.value,
        this.createPredictionRequestForm.get('fileFormGroup')?.value.fileStream
      )
      this.predictionRequestService.savePredictionRequests(predictionRequest).subscribe(response => {
        this.router.navigate(['home'])
      })
    }
  }
}
