export class TimeLogItem {
    id: string = '';
    summary: string = '';
    dateStart: string = '';
    dateEnd: string = '';
    isClosed: boolean;
    isLogged: boolean;

    _unclosedDuration: number = 0;

    get duration(){
        let s = (new Date(this.dateStart)).getTime();
        let e = (new Date(this.dateEnd)).getTime();
        return (isNaN(s) || isNaN(e)) ? 0 : e-s ;
    }

    constructor(srcData: TimeLogItem) {
        Object.assign(this, srcData);
    }
}