import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {StoreService} from "../service/store.service";
import {User} from "../model/User";
import {Router} from "@angular/router";
import {PredictionRequestService} from "../service/predictionRequests.service";
import {PredictionRequest, Status} from "../model/PredictionRequest";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {PredictionResponseService} from "../service/predictionResponse.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = this.store.isAdmin() ? ['name', 'description', 'telephone', 'status', 'actions', 'admin'] :
    ['name', 'description', 'telephone', 'status', 'actions'];
  dataSource: MatTableDataSource<PredictionRequest>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    public store: StoreService,
    private router: Router,
    private predictionRequestService: PredictionRequestService,
    private predictionResponseService: PredictionResponseService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
  }


  ngOnInit(): void {
    this.predictionRequestService.getAllPredictionRequests().subscribe(response => {
      this.dataSource = new MatTableDataSource<PredictionRequest>(response)
      this.dataSource.paginator = this.paginator;
    })
  }

  logout() {
    this.store.changeUser(new User());
    this.router.navigate([''])
  }


  createRequestPage() {
    this.router.navigate(['home', 'create-request'])
  }

  delete(id: number) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '350px'
    }).afterClosed().subscribe(async result => {
      if (result) {
        this.deleteItem(id);
      }
    });
  }

  deleteItem(id: number) {
    this.predictionRequestService.deleteRequest(id).subscribe(response => {
      this.ngOnInit()
    });
  }

  edit(element: PredictionRequest) {
    this.dialog.open(EditDialogComponent, {
      width: '350px',
      data: element
    }).afterClosed().subscribe(async result => {
      if (result) {
        this.editItem(result);
      }
    });
  }

  private editItem(element: PredictionRequest) {
    this.predictionRequestService.editRequest(element).subscribe(response => {
      this.ngOnInit()
    });
  }

  view(id: number) {
    this.predictionResponseService.viewResponse(id).subscribe(response => {
      const encodedObject = encodeURIComponent(JSON.stringify(response));
      this.router.navigate(['home', 'view_request'],{ queryParams: { response: encodedObject } })
    });
  }

  checkStatusDone(status: Status) {
    return status == Status.DONE
  }

  approve(id: number) {
    this.predictionRequestService.editStatus(id, Status.APPROVED).subscribe(() => {
      this.ngOnInit()
    });
  }

  decline(id: number) {
    this.predictionRequestService.editStatus(id, Status.DECLINED).subscribe(() => {
      this.ngOnInit()
    });
  }
}
