import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {TimeLogItem} from "../models/time-log-item";

@Injectable()
export class TimeLogService {
    public list: TimeLogItem[] = [];
    private _onUpdate: BehaviorSubject<TimeLogItem[]>;
    public onUpdate: Observable<TimeLogItem[]>;

    constructor() {
        this._onUpdate = new BehaviorSubject(this.list);
        this.onUpdate = this._onUpdate.asObservable();
    }

    public update(src: TimeLogItem[]) {
        this.list.splice(0, this.list.length);
        src.forEach((item: TimeLogItem) => {
            this.list.push(new TimeLogItem(item))
        });
        this._onUpdate.next(this.list);
    }

    public fireUpdate(){
        this._onUpdate.next(this.list);
    }
}