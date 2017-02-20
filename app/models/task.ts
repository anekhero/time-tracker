import {TimeLogItem} from "./time-log-item";

export class Task {
    name: string = '';
    duration: number = 0;
    durationLogged: number = 0;
    durationNotLogged: number = 0;
    timeLogItems: TimeLogItem[] = [];

    get isClosed() : boolean {
        return !this.timeLogItems.find(i => !i.isClosed);
    }

    constructor(srcData: Task) {
        Object.assign(this, srcData);
    }
}