import {Component, Output} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {ListOf} from "../models/list-of";
import {FilterListOf, Filter} from "../models/filter-list-of";
import {SortListOf} from '../models/sort-list-of';
import {It7ErrorService} from "../services/it7-error.service";
import {DataManagerService} from "../services/data-manager.service";
import {TimeLogService} from "../services/time-log.service";
import {TimeLogItem} from "../models/time-log-item";
import {TaskService} from "../services/task.service";

@Component({
    selector: 'inventory-public-plugin',
    templateUrl: PluginConfig.buildTemplateUrl('templates/plugin.html')
})
export class PluginComponent {
    public newTimeLogItemSummary: string = '';
    public newTimeLogItemSummaryAutocomplete: string[] = [];
    public logs: TimeLogItem[] = [];

    constructor(
        config: PluginConfig,
        private err: It7ErrorService,
        private dm: DataManagerService,
        private timeLogService: TimeLogService
    ) {
        this.timeLogService.onUpdate.subscribe((l => this.onTimeLogUpdate(l)));
    }

    ngOnInit() {
        this.dm.initData();
    }

    public onTimeLogUpdate(list: TimeLogItem[]) {
        this.newTimeLogItemSummaryAutocomplete = list.map((i: TimeLogItem) => i.summary).filter((v, i, a) => a.indexOf(v) === i);
    }

    // Call from template
    public onAddTimeLogClick() {
        this.newTimeLogItemSummary || (this.newTimeLogItemSummary = 'unknown');
        this.dm.addTimeLogItem({summary: this.newTimeLogItemSummary});
        this.newTimeLogItemSummary = '';
    }

    // Call from template
    public onCloseTimeLogClick() {
        this.dm.closeOpenedTimeLogItem();
    }

    // Call from template
    public onClearTimeLogClick() {
        this.dm.clearTimeLog();
    }
}
