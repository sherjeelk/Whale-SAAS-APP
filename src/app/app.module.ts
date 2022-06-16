import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {HeaderComponent} from './Shared/header/header.component';
import {DetailPopupComponent} from './Shared/detail-popup/detail-popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ThemeModule} from "./themes/theme.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {SettingsComponent} from './settings/settings.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";
import {LoginComponent} from './auth/login/login.component';
import {AppearanceSettingComponent} from './settings/appearance-setting/appearance-setting.component';
import {HttpClientModule} from "@angular/common/http";
import { DomainVerificationComponent } from './settings/domain-verification/domain-verification.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ManageApiComponent } from './settings/manage-api/manage-api.component';
import { ProductComponent } from './settings/product/product.component';
import { ManageServiceComponent } from './settings/manage-service/manage-service.component';
import {MatTableModule} from "@angular/material/table";
import { AddServiceComponent } from './settings/add-service/add-service.component';
import {MatRadioModule} from "@angular/material/radio";
import { AddProductComponent } from './settings/add-product/add-product.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { LogoutAlertComponent } from './Shared/logout-alert/logout-alert.component';
import {SafeUrlPipe} from "./Shared/Pipe/safe-url.pipe";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ProfileComponent } from './settings/profile/profile.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DetailPopupComponent,
    SettingsComponent,
    LoginComponent,
    AppearanceSettingComponent,
    DomainVerificationComponent,
    ManageApiComponent,
    ProductComponent,
    ManageServiceComponent,
    AddServiceComponent,
    AddProductComponent,
    LogoutAlertComponent,
    SafeUrlPipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ThemeModule,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTabsModule,
    FormsModule,
    MatSelectModule,
    MatStepperModule,
    MatProgressBarModule,
    MatTableModule,
    MatRadioModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ClipboardModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
