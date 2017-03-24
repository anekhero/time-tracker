import {Component, Output} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {ListOf, ListItem} from "../models/list-of";
import {FilterListOf, Filter} from "../models/filter-list-of";
import {It7ErrorService} from "../services/it7-error.service";
import {DataManagerService} from "../services/data-manager.service";
import {PopupService} from "../services/popup.service";
import {TimeLogService} from "../services/time-log.service";
import {TimeLogItem} from "../models/time-log-item";
import {HelperService} from "../services/helper.service";
import {BusyPopup} from "./busy-popup.component";
import {EditPopup} from "./edit-popup.component";

@Component({
    selector: 'time-log-list',
    templateUrl: PluginConfig.buildTemplateUrl('templates/time-log-list.html')
})
export class TimeLogListComponent {
    private timeLogList: ListOf;

    constructor(private timeLogService: TimeLogService,
                private dm: DataManagerService,
                private helper: HelperService,
                private popupService: PopupService
    ) {
        this.timeLogList = new ListOf();
        this.timeLogService.onUpdate.subscribe(d => this.onTimeLogUpdate(d));
        this.helper.tick.subscribe(() => this.updateUnclosedDuration())
    }

    ngOnInit() {
        this.onTimeLogUpdate(this.timeLogService.list);
    }

    // Call from template
    public onChangeItemSummaryClick(item: TimeLogItem) {
        //this.popupService.showPopup(new EditPopup());
        let newSummary = window.prompt('Change summary', item.summary);
        if('string' === typeof newSummary && newSummary) {
            item.summary = newSummary;
            this.dm.saveTimeLog();
        }
    }

    // Call from template
    public changeLoggedFlag(item: TimeLogItem) {
        item.isLogged = !item.isLogged;
        this.dm.saveTimeLog();
    }

    private updateUnclosedDuration() {
        let unclosed = this.timeLogService.list.find(i => !i.isClosed);
        if(unclosed) {
            unclosed._unclosedDuration = (new Date()).getTime() - (new Date(unclosed.dateStart)).getTime();
            this.timeLogService.fireUpdate();
        }
    }

    private onTimeLogUpdate(list: TimeLogItem[]) {
        this.timeLogList.update(list);
    }
}