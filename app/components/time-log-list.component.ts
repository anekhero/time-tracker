import {Component, Output} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {ListOf, ListItem} from "../models/list-of";
import {FilterListOf, Filter} from "../models/filter-list-of";
import {It7ErrorService} from "../services/it7-error.service";
import {DataManagerService} from "../services/data-manager.service";
import {PopupService} from "../services/popup.service";
import {TimeLogService} from "../services/time-log.service";
import {TimeLogItem} from "../models/time-log-item";

@Component({
    selector: 'time-log-list',
    templateUrl: PluginConfig.buildTemplateUrl('templates/time-log-list.html')
})
export class TimeLogListComponent {
    private timeLogList: ListOf;

    constructor(private timeLogService: TimeLogService) {
        this.timeLogList = new ListOf();
        this.timeLogService.onUpdate.subscribe(d => this.onTimeLogUpdate(d));
    }

    ngOnInit() {
        this.onTimeLogUpdate(this.timeLogService.list);
    }

    private onTimeLogUpdate(list: TimeLogItem[]) {
        this.timeLogList.update(list);
    }
}
