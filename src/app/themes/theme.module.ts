import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeHomeComponent } from './themes/theme-home/theme-home.component';
import { ThemeHeaderComponent } from './theme-header/theme-header.component';
import { ThemeFooterComponent } from './theme-footer/theme-footer.component';
import { BuilderToolsComponent } from './builder-tools/builder-tools.component';
import { ThemeRootComponent } from './theme-root/theme-root.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatStepperModule} from "@angular/material/stepper";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import { MatOptionComponent } from './theme-compnents/mat-option/mat-option.component';
import { SubServiceComponent } from './theme-compnents/sub-service/sub-service.component';
import { TextBoxComponent } from './theme-compnents/text-box/text-box.component';
import { ButtonComponent } from './theme-compnents/button/button.component';
import { DividerComponent } from './theme-compnents/divider/divider.component';
import { ThemeDarkComponent } from './themes/theme-dark/theme-dark.component';
import { ThemeLightComponent } from './themes/theme-light/theme-light.component';
import { FormFieldComponent } from './theme-compnents/form-field/form-field.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { FormFieldHalfComponent } from './theme-compnents/form-field-half/form-field-half.component';
import { SubServiceStackComponent } from './theme-compnents/sub-service-stack/sub-service-stack.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { HeaderComponent } from './themes/theme-dark/header/header.component';
import { CheckboxComponent } from './theme-compnents/checkbox/checkbox.component';
import {_MatMenuDirectivesModule, MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import { EditComponent } from './theme-compnents/edit/edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EmptyPlaceholderComponent } from './theme-compnents/empty-placeholder/empty-placeholder.component';
import { EditTextboxComponent } from './theme-compnents/edit-textbox/edit-textbox.component';
import { RadioButtonComponent } from './theme-compnents/radio-button/radio-button.component';
import {MatRadioModule} from "@angular/material/radio";
import { AboutUsComponent } from './theme-compnents/about-us/about-us.component';
import { PrivacyPolicyComponent } from './theme-compnents/privacy-policy/privacy-policy.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
    declarations: [

        ThemeHomeComponent,
        ThemeHeaderComponent,
        ThemeFooterComponent,
        BuilderToolsComponent,
        ThemeRootComponent,
        MatOptionComponent,
        SubServiceComponent,
        TextBoxComponent,
        ButtonComponent,
        DividerComponent,
        ThemeDarkComponent,
        ThemeLightComponent,
        FormFieldComponent,
        InfoCardComponent,
        FormFieldHalfComponent,
        SubServiceStackComponent,
        SubHeaderComponent,
        HeaderComponent,
        CheckboxComponent,
        EditComponent,
        EmptyPlaceholderComponent,
        EditTextboxComponent,
        RadioButtonComponent,
        AboutUsComponent,
        PrivacyPolicyComponent
    ],
    exports: [
        TextBoxComponent,
        AboutUsComponent,
        PrivacyPolicyComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        RouterModule,
        MatOptionModule,
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        MatStepperModule,
        DragDropModule,
        MatTabsModule,
        MatIconModule,
        _MatMenuDirectivesModule,
        MatMenuModule,
        MatDialogModule,
        FormsModule,
        MatRadioModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        NgxMaterialTimepickerModule,
        MatProgressSpinnerModule,

    ]
})
export class ThemeModule { }
