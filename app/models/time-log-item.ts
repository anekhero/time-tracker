export class TimeLogItem {
    id: string = '';
    summary: string = '';
    dateStart: string = '';
    dateEnd: string = '';
    isClosed: boolean;

    constructor(srcData: TimeLogItem) {
        Object.assign(this, srcData);
    }
}