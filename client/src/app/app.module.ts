import 'reflect-metadata';
import '../polyfills';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {HttpClientModule, HttpClient} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

// NG Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {ElectronService} from './providers/electron.service';

import {WebviewDirective} from './directives/webview.directive';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgZorroAntdModule, NZ_I18N, NZ_MESSAGE_CONFIG, NzModalComponent, NzModalService, zh_CN} from 'ng-zorro-antd';
import {CommonModule, registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import zhExtra from '@angular/common/locales/extra/zh';
import {LayoutComponent} from './components/layout/layout.component';
import {LogComponent} from './components/log/log.component';
import {ExitButtonComponent} from './components/exit-button/exit-button.component';
import {LayoutLogoComponent} from './components/layout-logo/layout-logo.component';
import {LogInComponent} from './components/log/log-in/log-in.component';
import {SignUpComponent} from './components/log/sign-up/sign-up.component';
import {ControlComponent} from './components/control/control.component';
import {HelperComponent} from './components/helper/helper.component';
import {PeriodComponent} from './components/period/period.component';
import {CurrentComponent} from './components/current/current.component';
import {MenuService} from './providers/menu.service';
import {PeriodDetailComponent} from './components/period/period-detail/period-detail.component';
import {CurrentUserLocationComponent} from './components/current/current-user-location/current-user-location.component';
import {CurrentService} from './providers/current.service';
import {PeriodService} from './providers/period.service';
import {CurrentRepoCreateatComponent} from './components/current/current-repo-createat/current-repo-createat.component';
import {CurrentRepoLangComponent} from './components/current/current-repo-lang/current-repo-lang.component';
import {CurrentRepoStarComponent} from './components/current/current-repo-star/current-repo-star.component';
import {CurrentRepoForkComponent} from './components/current/current-repo-fork/current-repo-fork.component';
import {CurrentRepoSizeComponent} from './components/current/current-repo-size/current-repo-size.component';
import {CurrentRepoLastPushComponent} from './components/current/current-repo-last-push/current-repo-last-push.component';
import {CurrentRepoLicenseComponent} from './components/current/current-repo-license/current-repo-license.component';
import {CurrentIssueCommentComponent} from './components/current/current-issue-comment/current-issue-comment.component';
import {CurrentUserRepoComponent} from './components/current/current-user-repo/current-user-repo.component';
import {CurrentUserFollowerComponent} from './components/current/current-user-follower/current-user-follower.component';
import {ConfigService, NOW_HOST} from './providers/config.service';
import {UserService} from './providers/user.service';
import {JwtModule} from '@auth0/angular-jwt';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import {AuthGuard} from './guards/auth.guard';
import { VideoComponent } from './components/video/video.component';
import { TranslateButtonComponent } from './components/translate-button/translate-button.component';
import {CustomTranslateService} from './providers/custom-translate.service';

registerLocaleData(zh, 'zh', zhExtra);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    LayoutComponent,
    LogComponent,
    ExitButtonComponent,
    LayoutLogoComponent,
    LogInComponent,
    SignUpComponent,
    ControlComponent,
    HelperComponent,
    PeriodComponent,
    CurrentComponent,
    PeriodDetailComponent,
    CurrentUserLocationComponent,
    CurrentRepoCreateatComponent,
    CurrentRepoLangComponent,
    CurrentRepoStarComponent,
    CurrentRepoForkComponent,
    CurrentRepoSizeComponent,
    CurrentRepoLastPushComponent,
    CurrentRepoLicenseComponent,
    CurrentIssueCommentComponent,
    CurrentUserRepoComponent,
    CurrentUserFollowerComponent,
    DebounceClickDirective,
    VideoComponent,
    TranslateButtonComponent,
  ],
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [NOW_HOST],
        blacklistedRoutes: [NOW_HOST+'/api/auth']
      }
    }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    ElectronService,
    {provide: NZ_I18N, useValue: zh_CN},
    {provide: NZ_MESSAGE_CONFIG, useValue: {nzDuration: 3000}},
    MenuService,
    CurrentService,
    PeriodService,
    ConfigService,
    UserService,
    AuthGuard,
    NzModalService,
    CustomTranslateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
