import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {PluginComponent}  from './components/plugin.component';
import {It7ErrorService} from "./services/it7-error.service";
import {It7AjaxService} from "./services/it7-ajax.service";
import {PopupService} from "./services/popup.service";
import {DataManagerService} from "./services/data-manager.service";
import {BusyPopupComponent} from "./components/busy-popup.component";
import {TimeLogService} from "./services/time-log.service";
import {TimeLogListComponent} from "./components/time-log-list.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        PluginComponent,
        BusyPopupComponent,
        TimeLogListComponent
    ],
    bootstrap: [PluginComponent],
    providers: [
        PopupService,
        DataManagerService,
        It7ErrorService,
        It7AjaxService,
        TimeLogService
    ]
})
export class AppModule {
}
