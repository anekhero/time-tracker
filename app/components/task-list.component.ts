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
import {TaskService} from "../services/task.service";
import {Task} from "../models/task";

@Component({
    selector: 'task-list',
    templateUrl: PluginConfig.buildTemplateUrl('templates/task-list.html')
})
export class TaskListComponent {
    public taskList: ListOf; // Used on template
    public totalDuration: number = 0;
    public totalLogs: number = 0;

    constructor(private taskService: TaskService,
                private dm: DataManagerService,
                private helper: HelperService) {
        this.taskList = new ListOf();
        this.taskService.onUpdate.subscribe(d => this.onTaskUpdate(d));
    }

    ngOnInit() {
        this.onTaskUpdate(this.taskService.list);
    }

    public onCreatItemFromTaskClick(task: Task) {
        this.dm.addTimeLogItem({summary: task.name});
    }

    private onTaskUpdate(list: Task[]) {
        this.taskList.update(list);
        this.totalDuration = 0;
        this.totalLogs = 0;
        list.forEach(task => {
            this.totalDuration += task.duration;
            this.totalLogs += task.timeLogItems.length;
        });
    }
}
