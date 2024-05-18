import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import { AppRoutingModule } from './app-routing.module';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { RegisterComponent } from './register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BaseInterceptor} from "./interceptor/base.interceptor";
import {IndexComponent} from "./index/index.component";
import { CreateRequestComponent } from './create-request/create-request.component';
import {FileuploadComponent} from "./widgets/fileupload.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ViewPredictionRequestResponseComponent } from './view-prediction-request-response/view-prediction-request-response.component';
import {LineChartWrapperComponent} from "./line-chart-wrapper/line-chart-wrapper.component";
import {NgChartsModule} from "ng2-charts";
import {
  LineChartSkeletonLoaderComponent
} from "./widgets/line-chart-skeleton-loader/line-chart-skeleton-loader.component";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import { PredictorFooterComponent } from './predictor-footer/predictor-footer.component';
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    ErrorDialogComponent,
    IndexComponent,
    CreateRequestComponent,
    FileuploadComponent,
    ConfirmationDialogComponent,
    EditDialogComponent,
    LineChartWrapperComponent,
    ViewPredictionRequestResponseComponent,
    LineChartSkeletonLoaderComponent,
    PredictorFooterComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatIconModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatTooltipModule,
        AppRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        MatPaginatorModule,
        MatTableModule,
        NgChartsModule,
        NgxSkeletonLoaderModule,
        MatExpansionModule
    ],
  exports : [
    LineChartWrapperComponent,
    NgChartsModule,
    LineChartSkeletonLoaderComponent,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
