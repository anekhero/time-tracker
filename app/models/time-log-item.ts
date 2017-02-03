export class TimeLogItem {
    id: string = '';
    summary: string = '';
    dateStart: string = '';
    dateEnd: string = '';
    isClosed: boolean;

    get duration(){
        let s = (new Date(this.dateStart)).getTime();
        let e = (new Date(this.dateEnd)).getTime();
        console.log(s, e, (isNaN(s) || isNaN(e)));
        return (isNaN(s) || isNaN(e)) ? 0 : e-s ;
    }

    constructor(srcData: TimeLogItem) {
        Object.assign(this, srcData);
    }
}