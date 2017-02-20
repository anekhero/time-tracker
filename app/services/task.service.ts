import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {TimeLogItem} from "../models/time-log-item";
import {TimeLogService} from "./time-log.service";
import {Task} from "../models/task";

@Injectable()
export class TaskService {
    public list: Task[] = [];
    private _onUpdate: BehaviorSubject<Task[]>;
    public onUpdate: Observable<Task[]>;

    constructor(private timeLogService: TimeLogService) {
        this._onUpdate = new BehaviorSubject(this.list);
        this.onUpdate = this._onUpdate.asObservable();

        timeLogService.onUpdate.subscribe(l => this.onTimeLogUpdate(l));
    }

    public update(src: Task[]) {
        this.list.splice(0, this.list.length);
        src.forEach((task: Task) => {
            this.list.push(new Task(task))
        });
        this._onUpdate.next(this.list);
    }

    public fireUpdate(){
        this._onUpdate.next(this.list);
    }

    private onTimeLogUpdate(list: TimeLogItem[]) {
        this.update(this.buildTasks(list));
    }

    private buildTasks(list: TimeLogItem[]): Task[] {
        let tasks: Task[] = [];
        let tasksBy: any = {};
        list.forEach(i => {
            let task: Task = tasksBy[i.summary];
            if(!task) {
                task = new Task({name: i.summary} as Task);
                tasks.push(task);
                tasksBy[i.summary] = task;
            }
            let duration = i.isClosed ?  i.duration : i._unclosedDuration;
            task.duration += duration;
            if(i.isLogged){
                task.durationLogged += duration;
            } else {
                task.durationNotLogged += duration;
            }
            task.timeLogItems.push(i);
        });
        return tasks;
    }
}