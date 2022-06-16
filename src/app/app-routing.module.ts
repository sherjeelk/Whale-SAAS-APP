import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ThemeRootComponent} from "./themes/theme-root/theme-root.component";
import {SettingsComponent} from "./settings/settings.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./services/auth-guard.service";
import {ManageServiceComponent} from "./settings/manage-service/manage-service.component";
import {ProductComponent} from "./settings/product/product.component";
import {ProfileComponent} from "./settings/profile/profile.component";
import {AppearanceSettingComponent} from "./settings/appearance-setting/appearance-setting.component";

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '',
    component: HomeComponent
  }, {
    canActivate: [AuthGuard],
    path: 'settings',
    component: SettingsComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'signup',
    component: LoginComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'theme-root',
    component: ThemeRootComponent,
    loadChildren: () => import('./themes/theme.module').then(m => m.ThemeModule)
  },
  {
    path: 'settings/manage-service',
    component: ManageServiceComponent
  },
  {
    path: 'settings/product',
    component: ProductComponent
  },
  {
    path: 'settings/profile',
    component: ProfileComponent
  },
  {
    path: 'settings/appearance',
    component: AppearanceSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
